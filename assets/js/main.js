/**
 * Vastu Vistar - Main JavaScript
 * Optimized and organized for better performance and maintainability
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initNavigation();
  initScrollAnimations();
  initTestimonialSlider();
  initAOS();
  initVastuModal();
});

/**
 * Initialize smooth scrolling and active navigation
 */
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Handle scroll events with throttle
  let isScrolling = false;
  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        // Toggle navbar background on scroll
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }

        // Update active nav link
        updateActiveNavLink();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // Close mobile menu when clicking a nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Close mobile menu if open
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.setAttribute("aria-expanded", "false");
        navbarCollapse.classList.remove("show");
      }

      // Smooth scroll to section
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const fromTop = window.scrollY + 100;

    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
}

/**
    const submitBtn = form.querySelector('button[type="submit"]');
    const buttonText = submitBtn.querySelector(".button-text");
    const spinner = submitBtn.querySelector(".spinner-border");

    try {
      // Show loading state
      submitBtn.disabled = true;
      buttonText.textContent = "Sending...";
      spinner.classList.remove("d-none");

      // Send form data to backend
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      // Show success message
      const successModal = new bootstrap.Modal(
        document.getElementById("successModal")
      );
      successModal.show();

      // Reset form
      form.reset();
      form.classList.remove("was-validated");

      // Reset privacy policy acceptance
      if (privacyCheckbox) {
        privacyCheckbox.checked = false;
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      // Show error message
      const errorAlert = document.createElement("div");
      errorAlert.className = "alert alert-danger mt-3";
      errorAlert.role = "alert";
      errorAlert.innerHTML = `
        <div class="d-flex align-items-center">
          <i class="fas fa-exclamation-circle me-2"></i>
          <div>There was an error submitting your message. Please try again later.</div>
        </div>
      `;

      // Insert after the form
      form.parentNode.insertBefore(errorAlert, form.nextSibling);

      // Remove error message after 5 seconds
      setTimeout(() => {
        errorAlert.classList.add("fade");
        setTimeout(() => errorAlert.remove(), 300);
      }, 5000);
    } finally {
      // Reset button state
      if (submitBtn) {
        submitBtn.disabled = false;
        buttonText.textContent = "Send Message";
        spinner.classList.add("d-none");
      }
    }
  });

  // Reset error states on input
  form
    .querySelectorAll(".form-control, .form-select, .form-check-input")
    .forEach((input) => {
      input.addEventListener("input", () => {
        if (input.checkValidity()) {
          input.classList.remove("is-invalid");
          input.classList.add("is-valid");
        } else {
          input.classList.remove("is-valid");
        }

        // Special handling for privacy policy
        if (input === privacyCheckbox) {
          const privacyLabel = input.closest(".form-check");
          if (input.checked) {
            privacyLabel.classList.remove("text-danger");
            privacyLabel.classList.add("text-success");
          } else {
            privacyLabel.classList.remove("text-success");
          }
        }
      });
    });
}

/**
 * Initialize scroll animations using Intersection Observer
 */
function initScrollAnimations() {
  const animateOnScroll = (elements, className = "animate__animated") => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate__fadeInUp");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    elements.forEach((element) => {
      element.classList.add(className);
      observer.observe(element);
    });
  };

  // Animate elements with data-animate attribute
  const animatedElements = document.querySelectorAll("[data-animate]");
  if (animatedElements.length) {
    animateOnScroll(animatedElements);
  }
}

/**
 * Initialize testimonial slider
 */
function initTestimonialSlider() {
  const slider = document.querySelector(".testimonials-slider");
  if (!slider) return;

  // Initialize with Slick or similar slider library
  // Example with Slick (you'll need to include the library):
  // $(slider).slick({
  //   dots: true,
  //   arrows: false,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  // });
}

/**
 * Initialize AOS (Animate On Scroll) library if included
 */
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
}

// Initialize Vastu Modal
function initVastuModal() {
  const vastuModal = document.getElementById("vastuModal");

  if (!vastuModal) return;

  // Initialize Bootstrap modal
  const modal = new bootstrap.Modal(vastuModal);

  // Open modal function
  window.openVastuModal = function () {
    modal.show();
    // Track modal open event if analytics is available
    if (typeof gtag !== "undefined") {
      gtag("event", "open_modal", {
        event_category: "engagement",
        event_label: "vastu_modal",
      });
    }
  };

  // Close modal function
  window.closeVastuModal = function () {
    modal.hide();
  };

  // Handle modal shown event
  vastuModal.addEventListener("shown.bs.modal", function () {
    // Add any additional logic when modal is shown
    document.body.style.overflow = "hidden";
  });

  // Handle modal hidden event
  vastuModal.addEventListener("hidden.bs.modal", function () {
    // Add any additional logic when modal is hidden
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside
  vastuModal.addEventListener("click", function (e) {
    if (e.target === vastuModal) {
      modal.hide();
    }
  });

  // Close with escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && vastuModal.classList.contains("show")) {
      modal.hide();
    }
  });
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
