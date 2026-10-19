"""Regenerate portfolio thumbnails: python3 _scripts/generate_thumbnails.py.

Requires Pillow. Original project/gallery images are never modified.
Thumbnail alt text is empty because the adjacent project title names the link.
"""
from pathlib import Path
import re
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
sources = set()
for layout in (ROOT / '_layouts').glob('projectslist*.html'):
    sources.update(re.findall(r'include portfolio-thumbnail.html src="([^"]+)"', layout.read_text()))

destination = ROOT / 'img/thumbnails'
destination.mkdir(exist_ok=True)
for source in sorted(sources):
    path = ROOT / source
    with Image.open(path) as original:
        image = ImageOps.exif_transpose(original).convert('RGBA')
        for width in (240, 480):
            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            resized.save(destination / f'{path.stem}-{width}.webp', quality=82, method=6)
            if width == 480:
                resized.save(destination / f'{path.stem}-{width}.png', optimize=True)
print(f'Generated thumbnails for {len(sources)} images.')
