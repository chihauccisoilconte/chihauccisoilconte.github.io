(function () {
  'use strict';

  var translations = window.siteChineseTranslations;
  var switcher = document.querySelector('.language-switcher');
  if (!translations || !switcher) return;

  var storageKey = 'website-language';
  var entries = [];
  var normalize = function (text) { return text.replace(/\s+/g, ' ').trim(); };
  var translate = function (text) {
    var key = normalize(text);
    if (!Object.prototype.hasOwnProperty.call(translations, key)) return text;
    return text.replace(/\S[\s\S]*\S|\S/, function () { return translations[key]; });
  };

  // Keep the original nodes so switching never replaces links, images or gallery controls.
  document.querySelectorAll('#sidebar, main, title').forEach(function (root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        return node.parentElement.closest('script, style, noscript, .language-switcher, [translate="no"]')
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var node;
    while ((node = walker.nextNode())) {
      if (normalize(node.nodeValue)) entries.push({ node: node, original: node.nodeValue });
    }
  });
  var attributes = [];
  document.querySelectorAll('[aria-label], [alt], [placeholder], [title]').forEach(function (element) {
    if (element.closest('.language-switcher, [translate="no"]')) return;
    ['aria-label', 'alt', 'placeholder', 'title'].forEach(function (name) {
      if (element.hasAttribute(name)) attributes.push({ element: element, name: name, original: element.getAttribute(name) });
    });
  });

  function applyLanguage(language) {
    var chinese = language === 'zh-CN';
    entries.forEach(function (entry) {
      entry.node.nodeValue = chinese ? translate(entry.original) : entry.original;
    });
    attributes.forEach(function (entry) {
      entry.element.setAttribute(entry.name, chinese ? translate(entry.original) : entry.original);
    });
    document.documentElement.lang = chinese ? 'zh-CN' : 'en';
    switcher.querySelectorAll('button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    switcher.setAttribute('aria-label', chinese ? '网站语言' : 'Website language');
  }

  function savedLanguage() {
    try { return localStorage.getItem(storageKey); } catch (_) { return null; }
  }
  function currentLanguage() {
    var query = new URL(window.location.href).searchParams.get('lang');
    return query === 'en' || query === 'zh-CN' ? query : savedLanguage() === 'zh-CN' ? 'zh-CN' : 'en';
  }
  switcher.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-language]');
    if (!button) return;
    var language = button.dataset.language;
    applyLanguage(language);
    try { localStorage.setItem(storageKey, language); } catch (_) { /* Private browsing can disable storage. */ }
    var url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    try { window.history.replaceState(null, '', url); } catch (_) { /* File previews may disallow history. */ }
  });
  // Carry the selection across internal pages even when browser storage is unavailable.
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download')) return;
    var url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || !/\/(?:[^/.]+\.html)?$/.test(url.pathname)) return;
    url.searchParams.set('lang', document.documentElement.lang);
    link.href = url.href;
  });
  window.addEventListener('popstate', function () { applyLanguage(currentLanguage()); });
  applyLanguage(currentLanguage());
  switcher.hidden = false;
}());
