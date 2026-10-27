#!/usr/bin/env python3
"""Check the rendered search metadata and sitemap; requires BeautifulSoup."""
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import unquote, urlsplit
from urllib.robotparser import RobotFileParser

from bs4 import BeautifulSoup


def check(destination):
    root = Path(destination)
    source = Path(__file__).resolve().parents[1]
    expected = json.loads((source / '_data/seo.json').read_text())['pages']
    origin = 'https://chihauccisoilconte.eu'
    tree = ET.parse(root / 'sitemap.xml')
    locations = [node.text for node in tree.findall('.//{*}loc')]
    assert len(locations) == len(set(locations)), 'Duplicate sitemap URLs'
    assert set(locations) == {
        origin + path for path, data in expected.items() if data.get('sitemap')
    }, 'Sitemap must match the canonical public page list'

    titles, descriptions = set(), set()
    for location in locations:
        url = urlsplit(location)
        assert not url.query and not url.fragment
        path = unquote(url.path).lstrip('/') or 'index.html'
        doc = BeautifulSoup((root / path).read_text(), 'html.parser')
        assert len(doc.select('title')) == 1, path
        title = doc.title.get_text().strip()
        description = doc.select('meta[name="description"]')
        assert len(description) == 1 and description[0]['content'], path
        assert title not in titles, ('Duplicate title', path)
        assert description[0]['content'] not in descriptions, ('Duplicate description', path)
        titles.add(title)
        descriptions.add(description[0]['content'])
        assert doc.select_one('link[rel="canonical"]')['href'] == location, path
        assert not doc.select('meta[name="robots"][content*="noindex"]'), path
        assert doc.select_one('meta[property="og:url"]')['content'] == location, path
        assert doc.select_one('meta[property="og:title"]')['content'] == title, path
        assert doc.select_one('meta[property="og:description"]')['content'] == description[0]['content'], path
        image = urlsplit(doc.select_one('meta[property="og:image"]')['content'])
        assert image.scheme == 'https' and image.netloc == url.netloc, path
        assert (root / image.path.lstrip('/')).is_file(), (path, image.path)
        assert doc.select_one('meta[name="twitter:image"]')['content'] == image.geturl(), path
        schema = json.loads(doc.select_one('script[type="application/ld+json"]').string)
        graph = schema['@graph']
        person = next(item for item in graph if item['@type'] == 'Person')
        page = next(item for item in graph if item['@type'] in ['WebPage', 'ProfilePage'])
        assert person['name'] == 'Nicolò Merendino' and person['sameAs'], path
        assert page['url'] == location and page['name'] == title, path
        if url.path == '/3about.html':
            assert page['@type'] == 'ProfilePage'
            assert page['mainEntity']['@id'] == person['@id']

    for path in ['404.html', 'CV.html', 'search.html', 'tags.html', 'grid test.html',
                 'docaliveworkshopgz.html', 'docaliveworkshophk.html']:
        doc = BeautifulSoup((root / path).read_text(), 'html.parser')
        assert doc.select_one('meta[name="robots"][content*="noindex"]'), path
        assert not doc.select('script[type="application/ld+json"]'), path

    for path, target in [('akselfoon (copy).html', '/knurl.html'),
                         ('7barondeatwavebarberini.html', '/7barondeathwavebarberini.html'),
                         ('3outreach.html', '/3about.html')]:
        doc = BeautifulSoup((root / path).read_text(), 'html.parser')
        assert doc.select_one('link[rel="canonical"]')['href'] == origin + target, path

    robots = RobotFileParser()
    content = (root / 'robots.txt').read_text()
    robots.parse(content.splitlines())
    assert origin + '/sitemap.xml' in content
    for bot in ['Googlebot', 'bingbot', 'OAI-SearchBot']:
        assert robots.can_fetch(bot, origin + '/'), bot
        assert robots.can_fetch(bot, origin + '/knurl.html'), bot
    search = BeautifulSoup((root / 'search.html').read_text(), 'html.parser')
    assert search.select_one('input[name="sitesearch"]')['value'] == urlsplit(origin).netloc
    print(f'Passed metadata checks for {len(locations)} public pages, sitemap, JSON-LD, '
          'sharing images, robots rules, duplicate canonicals, and noindex pages.')


if __name__ == '__main__':
    check(sys.argv[1] if len(sys.argv) > 1 else '_site')
