/* ============================================================
   SOLUTION SOULS SCHOOLS — Forms Module
   Validation, toast notifications, newsletter
   ============================================================ */

var Forms = (function () {
  "use strict";

  function init() {
    setupContactForm();
    setupAdmissionForm();
    setupNewsletterForm();
    setupToastContainer();
  }

  /* ---------- Toast Container ---------- */
  function setupToastContainer() {
    if (document.querySelector(".toast-container")) return;
    var container = document.createElement("div");
    container.className = "toast-container";
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  function showToast(type, title, message) {
    var container = document.querySelector(".toast-container");
    if (!container) return;

    var toast = document.createElement("div");
    toast.className = "toast toast--" + type;

    var iconSvg =
      type === "success"
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

    toast.innerHTML =
      '<div class="toast__icon">' + iconSvg + "</div>" +
      '<div class="toast__content"><h4>' + title + "</h4><p>" + message + "</p></div>" +
      '<button class="toast__close" aria-label="Close notification">&times;</button>';

    container.appendChild(toast);

    var closeBtn = toast.querySelector(".toast__close");
    closeBtn.addEventListener("click", function () {
      removeToast(toast);
    });

    setTimeout(function () {
      removeToast(toast);
    }, 5000);
  }

  function removeToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add("removing");
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }

  /* ---------- Validation Helpers ---------- */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    if (!phone.trim()) return true; // optional
    return /^[\d\s\+\-\(\)]{7,20}$/.test(phone.trim());
  }

  function setError(field, message) {
    field.classList.add("error");
    var errorEl = field.parentElement.querySelector(".form-error");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("visible");
    }
  }

  function clearError(field) {
    field.classList.remove("error");
    var errorEl = field.parentElement.querySelector(".form-error");
    if (errorEl) {
      errorEl.classList.remove("visible");
    }
  }

  function clearAllErrors(form) {
    form.querySelectorAll(".form-control").forEach(function (field) {
      clearError(field);
    });
  }

  function validateRequired(form) {
    var isValid = true;
    form.querySelectorAll("[data-required]").forEach(function (field) {
      if (!field.value.trim()) {
        setError(field, "This field is required");
        isValid = false;
      } else {
        clearError(field);
      }
    });
    return isValid;
  }

  /* ---------- Contact Form ---------- */
  function setupContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearAllErrors(form);

      var isValid = validateRequired(form);
      var name = form.querySelector("#contact-name");
      var email = form.querySelector("#contact-email");
      var phone = form.querySelector("#contact-phone");
      var message = form.querySelector("#contact-message");

      if (email && email.value.trim() && !validateEmail(email.value)) {
        setError(email, "Please enter a valid email address");
        isValid = false;
      }

      if (phone && phone.value.trim() && !validatePhone(phone.value)) {
        setError(phone, "Please enter a valid phone number");
        isValid = false;
      }

      if (message && message.value.trim() && message.value.trim().length < 10) {
        setError(message, "Message must be at least 10 characters");
        isValid = false;
      }

      if (!isValid) {
        showToast("error", "Form Error", "Please fix the errors below and try again.");
        return;
      }

      showToast("success", "Message Sent!", "Thank you for contacting us. We'll get back to you soon.");
      form.reset();
    });

    // Real-time validation on blur
    setupLiveValidation(form);
  }

  /* ---------- Admission Form ---------- */
  function setupAdmissionForm() {
    var form = document.getElementById("admission-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearAllErrors(form);

      var isValid = validateRequired(form);
      var email = form.querySelector("#admission-email");
      var phone = form.querySelector("#admission-phone");

      if (email && email.value.trim() && !validateEmail(email.value)) {
        setError(email, "Please enter a valid email address");
        isValid = false;
      }

      if (phone && phone.value.trim() && !validatePhone(phone.value)) {
        setError(phone, "Please enter a valid phone number");
        isValid = false;
      }

      if (!isValid) {
        showToast("error", "Form Error", "Please fix the errors below and try again.");
        return;
      }

      showToast("success", "Enquiry Submitted!", "Your admission enquiry has been received. We will contact you shortly.");
      form.reset();
    });

    setupLiveValidation(form);
  }

  /* ---------- Newsletter Form ---------- */
  function setupNewsletterForm() {
    var forms = document.querySelectorAll(".footer__newsletter-form");
    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector("input[type='email']");
        if (!input) return;

        if (!input.value.trim()) {
          showToast("error", "Error", "Please enter your email address.");
          input.focus();
          return;
        }

        if (!validateEmail(input.value)) {
          showToast("error", "Error", "Please enter a valid email address.");
          input.focus();
          return;
        }

        showToast("success", "Subscribed!", "Thank you for subscribing to our newsletter.");
        input.value = "";
      });
    });
  }

  /* ---------- Live Validation ---------- */
  function setupLiveValidation(form) {
    form.querySelectorAll(".form-control").forEach(function (field) {
      field.addEventListener("blur", function () {
        if (this.hasAttribute("data-required") && !this.value.trim()) {
          setError(this, "This field is required");
        } else if (this.type === "email" && this.value.trim() && !validateEmail(this.value)) {
          setError(this, "Please enter a valid email address");
        } else if (this.hasAttribute("data-required") || this.value.trim()) {
          clearError(this);
        }
      });

      field.addEventListener("input", function () {
        if (this.classList.contains("error")) {
          clearError(this);
        }
      });
    });
  }

  return {
    init: init,
    showToast: showToast
  };
})();
