/* ============================================================
   SOLUTION SOULS SCHOOLS — Navigation Module
   Mobile menu, sticky header, scroll effects, active states
   ============================================================ */

var Navigation = (function () {
  "use strict";

  var navbar, hamburger, navMenu, navOverlay, navLinks;
  var scrolled = false;

  function init() {
    navbar = document.querySelector(".navbar");
    hamburger = document.querySelector(".navbar__hamburger");
    navMenu = document.querySelector(".navbar__nav");
    navOverlay = document.querySelector(".nav-overlay");
    navLinks = document.querySelectorAll(".navbar__nav a");

    if (!navbar) return;

    setupScroll();
    setupMobileMenu();
    setupSmoothScroll();
    setupActiveLink();
    setupCloseOnOutsideClick();
  }

  function setupScroll() {
    var onScroll = function () {
      var y = window.scrollY || window.pageYOffset;
      if (y > 50 && !scrolled) {
        navbar.classList.add("scrolled");
        scrolled = true;
      } else if (y <= 50 && scrolled) {
        navbar.classList.remove("scrolled");
        scrolled = false;
      }
      updateBackToTop(y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function updateBackToTop(y) {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;
    if (y > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }

  function setupMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", function () {
      var isOpen = navMenu.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (navMenu.classList.contains("open")) {
          closeMenu();
        }
      });
    });
  }

  function openMenu() {
    navMenu.classList.add("open");
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    if (navOverlay) navOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    navMenu.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    if (navOverlay) navOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function setupCloseOnOutsideClick() {
    if (navOverlay) {
      navOverlay.addEventListener("click", closeMenu);
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu && navMenu.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  function setupSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var targetId = this.getAttribute("href");
        if (targetId === "#" || targetId.length < 2) return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        var headerOffset = navbar ? navbar.offsetHeight : 76;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      });
    });
  }

  function setupActiveLink() {
    var currentPath = window.location.pathname;
    var fileName = currentPath.split("/").pop();
    if (fileName === "" || fileName === "/") fileName = "index.html";

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href) return;
      var linkFile = href.split("/").pop();
      if (linkFile === fileName || (fileName === "index.html" && (href === "./" || href === "index.html" || href === "/"))) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  return { init: init };
})();
