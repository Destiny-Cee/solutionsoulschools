/* ============================================================
   SOLUTION SOULS SCHOOLS — Gallery Module
   Filtering, lightbox, keyboard navigation
   ============================================================ */

var Gallery = (function () {
  "use strict";

  var lightbox, lightboxImg, lightboxCounter;
  var currentImages = [];
  var currentIndex = 0;

  function init() {
    setupFilters();
    setupLightbox();
    setupGalleryItems();
  }

  /* ---------- Gallery Filtering ---------- */
  function setupFilters() {
    var filterBtns = document.querySelectorAll(".gallery-filter-btn");
    var items = document.querySelectorAll(".gallery-grid__item");
    if (!filterBtns.length || !items.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = this.getAttribute("data-filter");

        filterBtns.forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        this.classList.add("active");
        this.setAttribute("aria-pressed", "true");

        items.forEach(function (item) {
          var category = item.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            item.classList.remove("hidden");
            item.style.animation = "fadeInUp 0.4s ease both";
          } else {
            item.classList.add("hidden");
            item.style.animation = "";
          }
        });
      });
    });
  }

  /* ---------- Gallery Items Click ---------- */
  function setupGalleryItems() {
    var items = document.querySelectorAll(".gallery-grid__item, .gallery-preview__item");
    items.forEach(function (item, index) {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", "View image " + (index + 1));

      item.addEventListener("click", function () {
        openLightbox(this);
      });

      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(this);
        }
      });
    });
  }

  /* ---------- Lightbox ---------- */
  function setupLightbox() {
    lightbox = document.querySelector(".lightbox");
    if (!lightbox) return;

    lightboxImg = lightbox.querySelector(".lightbox__image");
    lightboxCounter = lightbox.querySelector(".lightbox__counter");

    var closeBtn = lightbox.querySelector(".lightbox__close");
    var prevBtn = lightbox.querySelector(".lightbox__prev");
    var nextBtn = lightbox.querySelector(".lightbox__next");

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", showPrev);
    if (nextBtn) nextBtn.addEventListener("click", showNext);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("active")) return;
      switch (e.key) {
        case "Escape": closeLightbox(); break;
        case "ArrowLeft": showPrev(); break;
        case "ArrowRight": showNext(); break;
      }
    });
  }

  function openLightbox(clickedItem) {
    if (!lightbox) return;

    var visibleItems = Array.from(
      document.querySelectorAll(".gallery-grid__item:not(.hidden), .gallery-preview__item")
    );

    currentImages = visibleItems.map(function (item) {
      var img = item.querySelector("img");
      return {
        src: img ? img.src : "",
        alt: img ? img.alt : ""
      };
    });

    var idx = visibleItems.indexOf(clickedItem);
    currentIndex = idx >= 0 ? idx : 0;

    showImage(currentIndex);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    var closeBtn = lightbox.querySelector(".lightbox__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showImage(index) {
    if (!currentImages.length) return;
    currentIndex = index;
    var item = currentImages[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    if (lightboxCounter) {
      lightboxCounter.textContent = currentIndex + 1 + " / " + currentImages.length;
    }
  }

  function showPrev() {
    showImage((currentIndex - 1 + currentImages.length) % currentImages.length);
  }

  function showNext() {
    showImage((currentIndex + 1) % currentImages.length);
  }

  return { init: init };
})();
