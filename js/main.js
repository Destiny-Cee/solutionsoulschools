/* ============================================================
   SOLUTION SOULS SCHOOLS — Main Module
   Scroll reveals, counters, accordion, back-to-top, toast
   ============================================================ */

var Main = (function () {
  "use strict";

  function init() {
    setupScrollReveal();
    setupCounters();
    setupBackToTop();
    setupAccordion();
    setupImageLazyLoad();
  }

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  function setupScrollReveal() {
    var elements = document.querySelectorAll(".reveal, .reveal--left, .reveal--right, .reveal--scale");
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) { el.classList.add("revealed"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Counter Animation ---------- */
  function setupCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    if (!("IntersectionObserver" in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute("data-count") + "+";
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) { observer.observe(el); });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 2000;
    var start = performance.now();

    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = current + "+";
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ---------- Back to Top ---------- */
  function setupBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    btn.setAttribute("aria-label", "Back to top");
    btn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  /* ---------- Accordion ---------- */
  function setupAccordion() {
    var triggers = document.querySelectorAll(".accordion__trigger");
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var item = this.closest(".accordion__item");
        var content = item.querySelector(".accordion__content");
        var isActive = item.classList.contains("active");

        // Close siblings
        var parent = item.parentElement;
        parent.querySelectorAll(".accordion__item.active").forEach(function (sibling) {
          if (sibling !== item) {
            sibling.classList.remove("active");
            var sContent = sibling.querySelector(".accordion__content");
            if (sContent) sContent.style.maxHeight = "0px";
            var sTrigger = sibling.querySelector(".accordion__trigger");
            if (sTrigger) sTrigger.setAttribute("aria-expanded", "false");
          }
        });

        // Toggle current
        if (isActive) {
          item.classList.remove("active");
          content.style.maxHeight = "0px";
          trigger.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------- Lazy Load Images ---------- */
  function setupImageLazyLoad() {
    var images = document.querySelectorAll('img[loading="lazy"]');
    if (!images.length || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
            }
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "200px" }
    );

    images.forEach(function (img) { observer.observe(img); });
  }

  return { init: init };
})();
