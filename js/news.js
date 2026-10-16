/* ============================================================
   SOLUTION SOULS SCHOOLS — News Module
   Search, category filtering, load more
   ============================================================ */

var News = (function () {
  "use strict";

  var searchInput, filterBtns, newsItems, loadMoreBtn;
  var itemsPerPage = 6;
  var currentFilter = "all";
  var currentSearch = "";
  var visibleCount = itemsPerPage;

  function init() {
    searchInput = document.getElementById("news-search");
    filterBtns = document.querySelectorAll(".news-filter-btn");
    newsItems = document.querySelectorAll(".news-grid__item");
    loadMoreBtn = document.getElementById("news-load-more");

    if (!newsItems.length) return;

    setupFilters();
    setupSearch();
    setupLoadMore();
    applyFilters();
  }

  function setupFilters() {
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentFilter = this.getAttribute("data-filter");
        visibleCount = itemsPerPage;

        filterBtns.forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        this.classList.add("active");
        this.setAttribute("aria-pressed", "true");

        applyFilters();
      });
    });
  }

  function setupSearch() {
    if (!searchInput) return;

    var debounceTimer;
    searchInput.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        currentSearch = searchInput.value.trim().toLowerCase();
        visibleCount = itemsPerPage;
        applyFilters();
      }, 300);
    });
  }

  function setupLoadMore() {
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener("click", function () {
      visibleCount += itemsPerPage;
      applyFilters();
    });
  }

  function applyFilters() {
    var matchedCount = 0;

    newsItems.forEach(function (item) {
      var category = item.getAttribute("data-category") || "";
      var text = item.textContent.toLowerCase();
      var matchesFilter = currentFilter === "all" || category === currentFilter;
      var matchesSearch = !currentSearch || text.indexOf(currentSearch) !== -1;

      if (matchesFilter && matchesSearch) {
        if (matchedCount < visibleCount) {
          item.classList.remove("hidden");
          item.style.animation = "fadeInUp 0.4s ease both";
        } else {
          item.classList.add("hidden");
        }
        matchedCount++;
      } else {
        item.classList.add("hidden");
      }
    });

    // Show/hide load more button
    if (loadMoreBtn) {
      if (matchedCount > visibleCount) {
        loadMoreBtn.style.display = "inline-flex";
        loadMoreBtn.parentElement.style.display = "block";
      } else {
        loadMoreBtn.parentElement.style.display = "none";
      }
    }

    // Show "no results" message
    var noResults = document.getElementById("news-no-results");
    if (noResults) {
      noResults.style.display = matchedCount === 0 ? "block" : "none";
    }
  }

  return { init: init };
})();
