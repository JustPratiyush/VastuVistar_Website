document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollAnimations();
  initTestimonialSlider();
  initAOS();
  initVastuModal();
});

function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  let isScrolling = false;
  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
        updateActiveNavLink();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.setAttribute("aria-expanded", "false");
        navbarCollapse.classList.remove("show");
      }
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
      { threshold: 0.1 }
    );
    elements.forEach((element) => {
      element.classList.add(className);
      observer.observe(element);
    });
  };

  const animatedElements = document.querySelectorAll("[data-animate]");
  if (animatedElements.length) {
    animateOnScroll(animatedElements);
  }
}

function initTestimonialSlider() {
  const slider = document.querySelector(".testimonials-slider");
  if (!slider) return;
}

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

function initVastuModal() {
  const vastuModal = document.getElementById("vastuModal");
  if (!vastuModal) return;
  const modal = new bootstrap.Modal(vastuModal);

  window.openVastuModal = function () {
    modal.show();
    if (typeof gtag !== "undefined") {
      gtag("event", "open_modal", {
        event_category: "engagement",
        event_label: "vastu_modal",
      });
    }
  };

  window.closeVastuModal = function () {
    modal.hide();
  };

  vastuModal.addEventListener("shown.bs.modal", function () {
    document.body.style.overflow = "hidden";
  });

  vastuModal.addEventListener("hidden.bs.modal", function () {
    document.body.style.overflow = "auto";
  });

  vastuModal.addEventListener("click", function (e) {
    if (e.target === vastuModal) {
      modal.hide();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && vastuModal.classList.contains("show")) {
      modal.hide();
    }
  });
}

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
