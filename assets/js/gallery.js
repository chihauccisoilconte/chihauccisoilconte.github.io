// Shared controller for the project galleries (slide numbers are one-based).
(function () {
  'use strict';

  var modal = document.getElementById('myModal');
  if (!modal) return;

  var slides = Array.from(modal.querySelectorAll('.mySlides'));
  var caption = modal.querySelector('#caption');
  var slideIndex = 0;
  var opener = null;
  var background = [];
  var previousOverflow = '';

  function controls() {
    return Array.from(modal.querySelectorAll('button, [href], [tabindex="0"]'))
      .filter(function (element) { return !element.disabled && element.getClientRects().length; });
  }

  function showSlide(index) {
    if (!slides.length) return;
    slideIndex = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.style.display = i === slideIndex ? 'block' : 'none';
    });
    var image = slides[slideIndex].querySelector('img');
    if (caption) {
      caption.textContent = image ? image.getAttribute('alt') || '' : '';
    }
  }

  window.openModal = function () {
    if (!slides.length) return;
    if (modal.style.display === 'block') return;
    opener = document.activeElement;
    previousOverflow = document.body.style.overflow;
    showSlide(slideIndex);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Disable background interaction even in legacy nested project layouts.
    var branch = modal;
    while (branch.parentElement && branch !== document.body) {
      Array.from(branch.parentElement.children).forEach(function (sibling) {
        if (sibling !== branch && !sibling.inert) {
          sibling.inert = true;
          background.push(sibling);
        }
      });
      branch = branch.parentElement;
    }
    (controls()[0] || modal).focus();
  };

  window.closeModal = function () {
    if (modal.style.display !== 'block') return;
    modal.style.display = 'none';
    background.forEach(function (element) { element.inert = false; });
    background = [];
    document.body.style.overflow = previousOverflow;
    if (opener && opener.isConnected) opener.focus();
  };

  window.plusSlides = function (offset) {
    showSlide(slideIndex + offset);
  };

  window.currentSlide = function (number) {
    showSlide(number - 1);
  };

  document.addEventListener('keydown', function (event) {
    if (modal.style.display !== 'block') return;
    if (event.key === 'Tab') {
      var items = controls();
      var first = items[0];
      var last = items[items.length - 1];
      if (!first) { event.preventDefault(); modal.focus(); }
      else if (event.shiftKey && (document.activeElement === first || document.activeElement === modal)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === modal)) {
        event.preventDefault(); first.focus();
      }
      return;
    }
    if (event.key === 'Escape') window.closeModal();
    else if (event.key === 'ArrowLeft') window.plusSlides(-1);
    else if (event.key === 'ArrowRight') window.plusSlides(1);
    else return;
    event.preventDefault();
  });

  showSlide(0);
})();
