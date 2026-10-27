# Website work log

## 2026-10-17 — technical review and first fixes

### Scope and preferences

The user approved technical improvements only. Preserve the artistic identity
and intellectual content. Continue from the current working tree; changes have
not been committed or deployed during this session.

The prioritized task list is `_TECHNICAL_TODO.md`. Read it alongside this log
before continuing. Both files use underscore-prefixed names to stay out of the
published Jekyll site.

### Completed

1. **Mobile navigation** — `_sass/hydeout/_layout.scss` explicitly keeps primary
   navigation visible on interior pages. Existing home and desktop behaviour
   is preserved. Checked generated CSS and six navigation destinations on six
   representative pages.
2. **Galleries** — replaced copied inline scripts in 22 layouts with
   `assets/js/gallery.js`. Fixed thumbnail indices by matching image filenames,
   removed accesses to missing `.demo` elements, implemented slide wrapping,
   and added arrow keys and Escape. Updated modal stacking and sizing in
   `_sass/hydeout/_singleproject.scss`. Verified 111 mappings across 21 generated
   pages and exercised controller behaviour with Node-based DOM stubs.
3. **Portfolio thumbnails** — Home and Design grids now use
   `_includes/portfolio-thumbnail.html` with 240px/480px WebP images and 480px
   PNG fallbacks in `img/thumbnails/`. First four images per grid load eagerly;
   the rest use lazy loading. Explicit image dimensions reserve space.
   Original full-size project/gallery images were preserved.

Thumbnail regeneration: `python3 _scripts/generate_thumbnails.py` (Pillow).
The script discovers source images from the includes in the two grid layouts.
When adding an image, also supply its correct aspect-ratio dimensions to the
include; the script generates assets but does not update include dimensions.

### Verification and measurements

- Jekyll builds successfully, with two pre-existing DocAlive YAML warnings.
- `git diff --check` passed after the changes.
- Gallery JavaScript syntax and controller logic checks passed; these were
  Node-based checks, not real-browser interaction tests.
- Checked all 33 rendered grid image occurrences, their generated paths,
  intrinsic dimensions, and loading attributes.
- Visually inspected a contact sheet of representative generated thumbnails.
- Homepage grid: originals 16.65 MB; WebP variants total about 30 KB at 240px
  or 96 KB at 480px.
- Design grid: originals 42.9 MB; WebP variants total about 81 KB at 240px or
  219 KB at 480px.
- These are image file totals, not browser transfer measurements. They exclude
  the logo and external embeds. Real-browser responsive and accessibility
  verification remains outstanding.
- The user previewed the changes locally and approved continuing from here.

### Local preview

Started with:

```sh
bundle exec jekyll serve --host 127.0.0.1 --port 4000 --destination /tmp/conte-local-preview
```

URLs:

- Home: http://127.0.0.1:4000/
- Design: http://127.0.0.1:4000/1design.html
- Gallery example: http://127.0.0.1:4000/knurl.html

The server was running and auto-regenerating at session end. A future session
must check whether it is still running before starting another instance.
Opening the listening socket required sandbox escalation in this session.

### Remaining work

Consult `_TECHNICAL_TODO.md` for the full list. No next implementation task has
been selected yet. Main outstanding areas:

- Gallery accessibility: semantic controls, focus management/restoration, and
  dialog semantics. Arrow keys and Escape alone do not complete this work.
- Image alternative text, visible project labels without hover, link contrast,
  and removal of the viewport zoom restriction.
- Responsive embeds and broader browser layout checks.
- Quote the two DocAlive workshop titles to fix YAML parsing/layout failures.
- Repair missing favicon and malformed external links; confirm intended email
  before resolving the differing configured/contact addresses.
- Metadata, public site URL, template cleanup, and dependency review.
- Performance optimization outside the portfolio grids and actual browser
  measurements.

Avoid treating earlier changes as new work or overwriting the uncommitted
working tree. Do not remove duplicate/legacy pages without confirming their
intended use.

## 2026-10-18 — Rednote social icon

- Added a conditional Rednote link after Instagram in the shared sidebar.
- Added the Simple Icons CC0 Xiaohongshu SVG, using the existing social icon
  colour and hover treatment with an accessible link label.
- `_config.yml` has a blank `rednote` setting pending the user's profile URL;
  the icon stays hidden until that URL is supplied.
- Jekyll build and `git diff --check` passed (existing DocAlive YAML warnings
  remain). Verified generated link markup using a temporary config URL and
  confirmed no link renders with the blank setting. No deployment performed.

### Rednote follow-up

- Set the user-provided Rednote profile URL in `_config.yml`.
- Kept social icons on one line with smaller icons and consistent gaps.
- Updated the local preview override to use the real profile URL.

## 2026-10-19 — mobile usability fixes

- Removed the viewport zoom restriction and exposed social navigation on mobile
  interior pages. Preserved the single-row social icon treatment.
- Made YouTube/Vimeo embeds responsive while retaining their declared ratios.
- Made project labels visible on narrow/touch layouts and added keyboard focus
  styling. Tablet grids use two columns; removed the fixed 200px content inset
  and reduced tablet padding.
- Converted gallery triggers and controls to buttons; added dialog semantics,
  focus entry/trapping/restoration, background inertness, scroll locking, and
  44px modal controls. Reduced gallery spacing in short landscape viewports.
- Fresh Jekyll build, generated-page checks, JavaScript syntax and gallery
  behaviour checks passed. Run `node _scripts/test-gallery.cjs` for the latter.
  Existing DocAlive YAML warnings remain. Browser/real-device visual checks
  remain outstanding: no connected browser was available in this session.

## 2026-10-19 — mobile image backgrounds and video follow-up

- Explicitly reset native appearance/background/shadow on gallery buttons,
  retaining visible keyboard focus and moving image spacing outside buttons.
- Replaced iframe aspect-ratio sizing with proportional padding containers;
  rendered videos preserve their original ratios without aspect-ratio support.
- Versioned the CSS URL per build so cached pre-update styles are refreshed.
- Jekyll build, generated embed checks, gallery tests, and diff checks passed.
  Existing DocAlive warnings remain; actual phone rendering is not verified.

## 2026-10-19 — portfolio hover alignment

- Removed inherited thumbnail margins and made picture elements block-level
  so hover overlays follow the image bounds.
- Bounded and centered desktop captions, reduced padding, enabled long-word
  wrapping, and scaled title text with card width. Mobile captions stay below
  images.
- Jekyll build and diff checks passed; existing DocAlive warnings remain.
  Visual browser verification remains unavailable in this session.

## 2026-10-19 — research publication update

- Read Google Scholar profile Bl2vmM8AAAAJ (16 entries) and the six
  missing 2025–2026 records. Added BruSHŪ, The Obstruction Manual, Outdoor
  Impact Mitigation, Adria installation, Encyclopedia of Failed Performances,
  and the doctoral thesis, preserving existing citation markup and sections.
- Verified NIME records at https://nime.org/proc/nime2026_52/,
  https://nime.org/proc/nime2026_2/, and
  https://nime.org/proc_alt/nime2026_alt_6/; verified Adria DOI via Crossref.
- Kept the whole-journal Scholar record out: it is not a separate authored
  paper. Retained existing workshops. Corrected Chowndolo's venue year to 2023.
- Build and generated citation-link checks passed; pre-existing DocAlive YAML
  warnings remain. No visual browser check performed.

## 2026-10-20 — desktop sidebar sizing

- Scaled desktop sidebar width, logo, menu text, icons, and spacing together
  using a viewport-height-based font unit, capped at the original desktop size.
  Replaced the fixed logo spacer with proportional spacing on desktop.
- Preserved mobile layout rules and kept overflow available as a fallback for
  enlarged text or additional navigation. Added a home label to the logo image.
- Jekyll build and diff checks passed; verified compiled responsive CSS and
  all six menu links/seven social links on Home, Design, and Knurl.
  Existing DocAlive YAML warnings remain. No connected browser was available,
  so visual viewport checks remain outstanding. No deployment performed.

### Desktop description spacing follow-up

- Balanced the desktop description with equal space above and below, moving
  existing whitespace above it without increasing total sidebar height.
- Jekyll build and diff checks passed; local preview regenerated the CSS.

## 2026-10-20 — search visibility planning

- Saved the Google/search-engine and AI search recommendations in
  `_TECHNICAL_TODO.md`, under “Search visibility follow-up”.
- Next session: start with metadata/public origin, sitemap, and project
  introductions, then Search Console verification and live indexing checks.
- Planning only: no site implementation, deployment, or external account
  changes. The review covered local source, not live indexing status.

## 2026-10-27 — selectable Simplified Chinese

- Added an English / 简体中文 sidebar selector with remembered preference,
  shareable language query parameters, and internal-link propagation when
  browser storage is blocked. Bundled 551 translation entries locally with
  Jekyll; translated navigation, main-page copy, project descriptions, page
  titles, and gallery accessibility labels. Original publication references,
  names, PDFs, and third-party embeds keep their existing language.
- Preserved original DOM nodes and English copy when switching. Added Chinese
  font fallbacks and line spacing, visible keyboard focus, and corrected the
  existing mobile logo width overflow discovered during viewport checks.
- Jekyll build, JavaScript syntax, existing gallery checks, and browser checks
  passed. Checked switching and exact English main-markup restoration on all
  38 root pages with the shared sidebar; checked remembered choice, blocked
  storage navigation, Chinese gallery controls, and desktop/mobile rendering.
  Two pre-existing DocAlive YAML warnings remain. No deployment performed.
- Translation maintenance and client-side indexing limitations are documented
  in README.md.

### Chinese AI translation disclaimer

- Added a small Chinese notice beneath the language selector: “中文内容由 AI 翻译，可能存在不准确之处。” It appears only when Chinese is selected, on desktop and mobile.
- Jekyll build and diff checks passed; existing DocAlive YAML warnings remain.

## 2026-10-27 — Outreach merged into About

- Moved the Outreach map, performance table, and visualization credit into the
  existing About-page Outreach section at `/3about.html#outreach`. Removed the
  obsolete link to a separate page and removed Outreach from sidebar navigation.
- Converted `/3outreach.html` into a redirect preserving language/query
  parameters, with a no-JavaScript fallback. Existing Chinese translations
  apply to the moved content.
- Jekyll build and diff checks passed. Verified rendered section/embeds,
  sidebar navigation, translation coverage, and redirect targets with English,
  Chinese, and additional query parameters. Existing DocAlive YAML warnings
  remain. No deployment performed.

### Contact details and social icon order

- Removed the inactive VAT number from Contact. Added an English and Chinese
  note explaining that, despite being based in China and offering a Chinese
  website, I do not speak Chinese and should be contacted in English.
- Reordered the shared sidebar icons: email, GitHub, Facebook, Instagram,
  Mastodon, LinkedIn, Rednote.
- Jekyll build and diff checks passed. Verified rendered Contact copy,
  translation coverage, and all seven icons in order on Home, About, and
  Contact. Existing DocAlive YAML warnings remain. No deployment performed.

### Final website refinements

- Moved Outreach to the bottom of About. Left-aligned the smaller language
  selector, increased homepage gallery-to-text spacing, and placed the CMA
  faculty-profile contact link in its own final paragraph below a divider.
- Added Ars Electronica and Modular Commune in Beijing to the homepage and
  Outreach venue lists, with corresponding Chinese translations.
- Final Jekyll build, JavaScript syntax, gallery checks, and diff checks passed;
  the two pre-existing DocAlive YAML warnings remain.

## 2026-10-27 — responsive sidebar and aligned mobile galleries

- Sized the desktop sidebar logo, typography, and spacing for viewport height,
  keeping menu text at least 14px. Switched phones and windows at most 600px
  high to a compact header with a two-column menu and no independent sidebar
  scrollbar; navigation remains available in the normal page flow.
- Replaced inline-block portfolio cards with responsive CSS grids using the
  available content width. Rows align at the top despite wrapping captions;
  thumbnails keep consistent proportions. Fixed nested/unclosed gallery-list
  markup on Home and Design, while retaining the extra gap below Home's grid.
- Corrected the homepage cascade so the Chinese AI disclaimer stays hidden in
  English. Language controls remain smaller and aligned with the compact menu.
- Jekyll build, diff checks, and existing gallery tests passed. Headless browser
  checks passed for Home, Design, and Knurl in both languages at 19 viewport
  sizes (114 combinations), including phone/landscape, desktop, and short
  windows. Checked sidebar fitting, menu visibility, horizontal overflow,
  aligned gallery rows, disclaimer switching, and mobile lightbox controls.
  Inspected desktop/mobile/landscape screenshots. External embeds and web fonts
  were blocked during these browser checks; pre-existing DocAlive YAML build
  warnings remain. No deployment performed.

## 2026-10-27 — search and AI discovery metadata

- Set the canonical public origin to `https://chihauccisoilconte.eu` and added
  descriptive search titles and unique summaries for 30 canonical public pages
  in `_data/seo.json`. Shared HTML now includes canonical links, Open Graph /
  Twitter previews, author metadata, and JSON-LD Person/WebSite/WebPage graphs;
  About is a ProfilePage linked to the same Person entity and official profiles.
- Added a curated sitemap and crawler-accessible robots file. No separate AI
  training policy was introduced; search crawling and training are separate.
  Exact duplicate URLs reference their preferred canonical page. Utility/test
  pages, the old CV, and explicitly internal DocAlive mock-ups use noindex and
  are omitted from the sitemap; all original URLs and content remain available.
- Fixed the DocAlive YAML titles so metadata/noindex actually render, removing
  the previous build warnings. Replaced Strophonion's placeholder page title.
  Kept the existing homepage wording and Chinese translation. The structured
  metadata connects the practice name with Nicolò Merendino behind the scenes;
  main-page browser titles have matching Chinese translations.
- Added `_scripts/check-metadata.py` to verify all 30 sitemap entries, unique
  titles/descriptions, absolute canonicals, existing sharing images, JSON-LD,
  noindex pages, duplicate URLs, crawler access, and the corrected site-search
  domain. Jekyll build, metadata checks, gallery checks, and diff checks passed.
- Reviewed official Google guidance on AI search, canonicalization, snippets,
  sitemaps, ProfilePage data and multilingual sites, plus OpenAI crawler docs.
  Documented maintenance and next steps in README and the technical checklist.
  Search Console/Bing setup, live crawl/indexing verification, independently
  rendered Chinese pages, and deployment remain outstanding. No indexing,
  ranking, rich-result, or AI-citation outcome is claimed.

### Metadata scope clarification

- Restored the original homepage wording and its original Chinese translation
  at the user's request. Search improvements stay in metadata, crawler files,
  and build configuration; no project-content rewrite or visual redesign.
- Rebuilt and checked all metadata after restoring the copy.

## 2026-10-27 — mobile menu and gallery row spacing follow-up

- Replaced the narrow-screen side-by-side logo/menu with a vertical mobile
  header: logo, menu, smaller language selector, disclaimer, then social links.
  Desktop and short-window desktop rules are unchanged.
- Equalized grid row heights while mobile/touch captions are visible, letting
  the tallest caption determine row height without clipping text. This fixes
  the inconsistent first-to-second-row gap caused by wrapping project names.
- Jekyll build and diff checks passed. Touch-enabled browser checks passed for
  Home and Design at nine phone/tablet widths in both languages (36 layouts),
  verifying stacked navigation, equal image-row spacing, and no overflow.
  Desktop screenshots matched the previous version exactly at 1440x900 and
  1024x768 in both languages. Inspected mobile screenshots; external embeds
  and web fonts were blocked during browser tests. No deployment performed.

### Responsive mobile gallery captions

- Added card-width-based caption sizing with a readable 0.75rem–1rem range,
  disabled forced caption line breaks on mobile/touch layouts, and reserved a
  consistent two-line caption area. Long titles remain fully visible.
- Browser checks passed for 36 Home/Design layouts across nine widths in both
  languages: every caption fits within two lines, row spacing is uniform, and
  text does not overflow. Desktop screenshots remain identical to the prior
  desktop design. Jekyll build and diff checks passed. Not deployed.

### Mobile branding row

- Made the mobile branding row span the viewport, with the logo flush to the
  top-left edge and the existing UX/UI Design / Digital Fabrication / Research
  description beside it. Kept the menu and language controls stacked below.
- Jekyll build and diff checks passed. Touch-enabled checks passed across 36
  layouts, verifying edge alignment, a visible three-line description, caption
  sizing, equal gallery rows, and no overflow. Desktop screenshots matched the
  prior version exactly in both languages at 1440x900 and 1024x768. External
  embeds and fonts were blocked during browser tests. Not deployed.
