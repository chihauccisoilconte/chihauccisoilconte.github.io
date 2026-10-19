# Website technical checklist

Created: 2026-10-17

Scope: technical improvements only. Preserve the site's artistic identity and
intellectual content. This checklist records a source review, a fresh Jekyll
build, and generated-file checks; browser behaviour has not yet been tested.
The initial review made no fixes. Completed follow-up work is recorded below.

This filename starts with an underscore so Jekyll does not publish it as a
normal static page. Future work should consult this checklist and check off
items only after implementation and appropriate verification.

## 1. Functional fixes

- [ ] Quote the titles in `docaliveworkshopgz.md` and
  `docaliveworkshophk.md`. Unquoted colons cause YAML warnings and output without
  the intended layout. Confirm both pages render through their layouts.
- [x] Fix gallery scripts that access nonexistent `.demo` elements. Replaced
  22 copied scripts with `assets/js/gallery.js` (2026-10-17).
- [x] Correct thumbnail-to-slide mappings across project layouts. Verified all
  111 thumbnail mappings across 21 generated pages by image filename.
- [x] Keep primary navigation available on mobile interior pages. Added an
  explicit visibility rule in `_sass/hydeout/_layout.scss`, preserving existing
  homepage and desktop navigation. Verified the Jekyll build, generated CSS,
  and all six navigation destinations on six representative pages (2026-10-17).
  Visual browser verification remains outstanding.
- [ ] Repair the missing `/favicon.png` reference.
- [ ] Fix the protocol-less `csc.dei.unipd.it` links in `6iiiworkshop.md`.
- [ ] Resolve the different email addresses in `_config.yml` and `4contact.md`;
  confirm the intended address before standardizing it.

## 2. Accessibility and responsive behaviour

- [ ] Add meaningful image alternatives, or empty alt text for decorative
  images. The generated-site audit found 300 of 320 image elements missing
  `alt`; repeated gallery images are included in this count.
- [x] Use semantic, keyboard-operable gallery controls. Support Escape to close,
  appropriate dialog semantics, focus management, and focus restoration.
- [x] Make project labels available without hover and preserve visible keyboard
  focus on project links.
- [ ] Darken default content links: `#ccc` on white has approximately 1.6:1
  contrast. Verify final text and interaction-state contrast.
- [x] Remove `maximum-scale=1` from the viewport declaration.
- [x] Make fixed-width video embeds responsive.
- [ ] Review the 200px desktop content padding and 200% modal widths; prevent
  horizontal overflow and keep modal controls reachable.
- [ ] Verify representative pages in desktop, tablet, and phone browsers,
  including navigation, galleries, zoom, and keyboard use.

## 3. Performance

- [x] Generate appropriately sized portfolio thumbnails and responsive image
  variants. Homepage and Design grids now use 240px/480px WebP variants with
  480px PNG fallbacks, preserving original images (2026-10-17). Regenerate with
  `python3 _scripts/generate_thumbnails.py` (requires Pillow).
- [ ] Add lazy loading to below-the-fold images and suitable embeds, while
  keeping initial prominent content eager-loaded.
  Portfolio grids completed: first four images eager, remaining images lazy.
  Other images and embeds remain to be addressed.
- [ ] Add image dimensions or aspect ratios to reserve layout space.
  Portfolio thumbnail dimensions completed; other images remain outstanding.
- [ ] Measure actual browser transfer sizes and loading behaviour after changes.
  Baseline: the homepage references about 16.7 MB of unique local image files,
  excluding external embeds; no generated image elements used lazy loading.

## 4. Metadata and configuration

- [ ] Set `site.url` to the public origin rather than `/` and verify generated
  absolute URLs and the site-search form.
- [ ] Add page descriptions, canonical links, and social-preview metadata.
- [ ] Replace the Strophonion placeholder page title `test single project`.
- [ ] Centralize contact values so page content and sidebar links stay aligned.

## 5. Maintainability

- [x] Consolidate repeated gallery JavaScript into one shared script.
- [ ] Move toward a shared project layout with project content/data in Markdown
  and front matter, preserving existing URLs and content.
- [ ] Correct nested HTML document wrappers, malformed tags, and invalid list
  structure in layouts.
- [ ] Review duplicate and legacy pages, including `akselfoon (copy).md`, the
  two Baron pages, old `CV.md`, and `grid test.html`. Confirm intended use before
  removing or excluding anything; retain redirects where needed.
- [ ] Update repository build/maintenance instructions to reflect this site.
- [ ] Add proportionate build and local-link checks that detect malformed front
  matter even when Jekyll exits successfully.
- [ ] Review dependency upgrades separately from functional fixes. The review
  build used Jekyll 3.10.0; assess compatibility before changing versions.

## Verification notes

- Review build: `bundle exec jekyll build --destination /tmp/conte-site-review`.
- Build completed with YAML warnings for the two DocAlive pages.
- Local-link audit covered generated local `href` and `src` targets; external
  URLs were not checked.
- Browser testing and live-site performance measurements remain outstanding.
- Gallery follow-up (2026-10-17): Jekyll build and JavaScript syntax checks
  passed, with the existing DocAlive warnings. Node-based controller checks
  covered selection, next/previous wrapping, missing captions, keyboard arrows,
  Escape, closing, and empty/missing galleries. Modal width and image sizing
  were bounded to the viewport, and its stacking order was raised. Browser
  verification and complete gallery accessibility work remain outstanding.
- Thumbnail follow-up (2026-10-17): verified all 33 rendered grid images across
  Home and Design, variant paths, pixel dimensions, and loading attributes;
  visually inspected a representative thumbnail contact sheet. Homepage grid
  source files decreased from 16.65 MB to 30 KB (240px WebP) or 96 KB (480px
  WebP). Design grid decreased from 42.9 MB to 81 KB or 219 KB respectively.
  These are file totals, not measured browser transfers; logo and third-party
  embeds are excluded. Jekyll builds with the existing DocAlive YAML warnings.
