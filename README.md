#aggiungere progetto
1 - creare immagini e meterle dentro "img"
2 - Creare layout specifico (da cartella "layout")
3 - creare file "-md" nella cartella principale

# Hydeout

### Website languages

The sidebar offers English and Simplified Chinese (简体中文). English is the
default. The selector remembers the visitor's choice in browser storage and
adds `?lang=en` or `?lang=zh-CN` to internal page links. Either parameter can
also be used to share a page in a specific language.

Chinese text is maintained in `_data/zh-CN.json`. Each key is an original
English text node with surrounding whitespace removed and internal whitespace
collapsed to a single space. When editing English copy, update the matching
key and Chinese translation together. Text separated by HTML tags has separate
entries. `assets/js/translations-zh.js` uses Jekyll to bundle this dictionary;
`assets/js/language.js` switches text without rebuilding links or galleries.

The selector requires JavaScript. If scripts are unavailable, the original
English pages remain readable. Project and personal names, publication
references, downloadable PDFs, and third-party embedded content retain their
original language. These are client-side translations on the existing URLs;
they do not create separately indexed Chinese pages.

### Search metadata

`_data/seo.json` contains the search title, description, and optional sharing
image for each public page. Keep descriptions specific to the actual project
and describe Nicolò's contribution accurately. Add `sitemap: true` to include
a new canonical public page in `/sitemap.xml`. Images must exist in the repo;
pages without an image use the site logo. Page front matter can override
`seo_title`, `description`, `image`, and `canonical_url`.

The shared head outputs descriptions, canonical URLs, Open Graph/Twitter
previews, and JSON-LD about the site and its author. `noindex: true` excludes
drafts, utility pages, and the old CV from indexing; keep these out of the
sitemap too. Duplicate pages retain their URLs and reference their preferred
canonical page. These controls affect search discovery, not access or privacy.

After publishing, verify the domain in Google Search Console and Bing
Webmaster Tools, submit `https://chihauccisoilconte.eu/sitemap.xml`, and inspect
important URLs. Google or Bing verification tags can be added to the custom
head if those services request them. Do not add a guessed verification token.

`robots.txt` permits crawler access and advertises the sitemap. There is no
separate training opt-in/out rule: search crawling and AI training are distinct
choices, and crawler access alone does not guarantee indexing or AI citations.
The Chinese selector remains a browser-side translation; use separately
rendered Chinese URLs and `hreflang` for independently indexed Chinese pages.

Validate a build with `python3 _scripts/check-metadata.py /path/to/built/site`.

Hydeout updates the original [Hyde](https://github.com/poole/hyde)
theme for [Jekyll](http://jekyllrb.com) 3.x and adds new functionality.

![Desktop](/_screenshots/1.png?raw=true)
<img alt="Mobile home page" src="/_screenshots/2.png?raw=true" width="300px" />
<img alt="Mobile post page" src="/_screenshots/3.png?raw=true" width="300px" />

### Usage

Hydeout is available as the `jekyll-theme-hydeout` Ruby Gem.
Add `gem "jekyll-theme-hydeout", "~> 3.4"` to your Gemfile and run
`bundle install`.

Hydeout uses pagination, so if you have an `index.md`, you'll need to swap
it with an `index.html` that uses the `index` layout:

```
---
layout: index
title: Home
---
```

### Keep It Simple

In keeping with the original Hyde theme, Hydeout aims to keep the overall
design lightweight and plugin-free. JavaScript is currently limited only
to Disqus and Google Analytics (and is only loaded if you provide configuration
variables).

Hydeout makes heavy use of Flexbox in its CSS. If Flexbox is not available,
the CSS degrades into a single column layout.

### Customization

Hydeout replaces Hyde's class-based theming with the use
of the following SASS variables:

```scss
$sidebar-bg-color: #202020 !default;
$sidebar-sticky: true !default;
$layout-reverse: false !default;
$link-color: #268bd2 !default;
```

To override these variables, create your own `assets/css/main.scss` file.
Define your own variables, then import in Hydeout's SCSS, like so:

```scss
---
# Jekyll needs front matter for SCSS files
---

$sidebar-bg-color: #ac4142;
$link-color: #ac4142;
$sidebar-sticky: false;
@import "hydeout";
```

See the [_variables](_sass/hydeout/_variables.scss) file for other variables
you can override.

You can see the full set of partials you can replace in the
[`_includes`](_includes) folder, but there are a few worth noting:

* `_includes/copyright.html` - Insert your own copyright here.

* `_includes/custom-head.html` - Insert custom head tags (e.g. to load your
  own stylesheets)

* `_includes/custom-foot.html` - Insert custom elements at the end of the
  body (e.g. for custom JS)

* `_includes/custom-nav-links.html` - Additional nav links to insert at the
  end of the list of links in the sidebar.

  Pro-tip: The `nav`s in the sidebar are flexboxes. Use the `order` property
  to order your links.

* `_includes/custom-icon-links.html`- Additional icon links to insert at the
  end of the icon links at the bottom of the sidebar. You can use the `order`
  property to re-order.

* `_includes/favicons.html` - Replace references to `favicon.ico` and
  `favicon.png` with your own favicons references.

* `_includes/font-includes.html` - The Abril Fatface font used for the site
  title is loaded here. If you're overriding that font in the CSS, be sure
  to also remove the font load reference here.

### New Features

* Hydeout adds a new tags page (accessible in the sidebar). Just create a
  new page with the tags layout:

  ```
  ---
  layout: tags
  title: Tags
  ---
  ```

* Hydeout adds a new "category" layout for dedicated category pages.
  Category pages are automatically added to the sidebar. All other pages
  must have `sidebar_link: true` in their front matter to show up in
  the sidebar. To create a category page, use the `category` layout"

  ```
  ---
  layout: category
  title: My Category
  ---

  Description of "My Category"
  ```

* A simple redirect-to-Google search is available. Just create a page with
  the `search` layout.

  ```
  ---
  layout: search
  title: Google Search
  ---
  ```

* Disqus integration is ready out of the box. Just add the following to
  your config file:

  ```yaml
  disqus:
    shortname: my-disqus-shortname
  ```

  If you don't want Disqus or want to use something else, override
  `comments.html`.

* For Google Analytics support, define a `google_analytics` variable with
  your property ID in your config file.

There's also a bunch of minor tweaks and adjustments throughout the
theme. Hope this works for you!
