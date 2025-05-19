// Navbar Active State Handler
document.addEventListener("DOMContentLoaded", function () {
  // Get all navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  // Function to remove active class from all nav links
  function removeActiveClasses() {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });
  }

  // Function to set active class on clicked nav link
  function setActiveLink(clickedLink) {
    removeActiveClasses();
    clickedLink.classList.add("active");
    clickedLink.setAttribute("aria-current", "page");
  }

  // Add click event listeners to all nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent default behavior temporarily to handle active state
      e.preventDefault();

      // Set this link as active
      setActiveLink(this);

      // Get the target section ID from href
      const targetId = this.getAttribute("href");

      // Smooth scroll to the target section
      if (targetId && targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Optional: Update active state based on scroll position
  // This will automatically update the active nav item as user scrolls
  function updateActiveOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100; // Offset for navbar height

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        const correspondingNavLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`
        );
        if (
          correspondingNavLink &&
          !correspondingNavLink.classList.contains("active")
        ) {
          setActiveLink(correspondingNavLink);
        }
      }
    });
  }

  // Add scroll event listener for automatic active state updates
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    // Debounce scroll events for better performance
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveOnScroll, 50);
  });

  // Initialize: Set home as active if no hash in URL
  if (!window.location.hash) {
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
      setActiveLink(homeLink);
    }
  } else {
    // If there's a hash in URL, activate corresponding nav link
    const targetLink = document.querySelector(
      `.nav-link[href="${window.location.hash}"]`
    );
    if (targetLink) {
      setActiveLink(targetLink);
    }
  }
});

// Additional features for enhanced user experience

// Handle logo click - should activate home
document.addEventListener("DOMContentLoaded", function () {
  const logoLink = document.querySelector('a[href="#home"]');
  const homeNavLink = document.querySelector('.nav-link[href="#home"]');

  if (logoLink && homeNavLink) {
    logoLink.addEventListener("click", function (e) {
      e.preventDefault();

      // Set home nav link as active
      const navLinks = document.querySelectorAll(".nav-link");
      navLinks.forEach((link) => {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      });

      homeNavLink.classList.add("active");
      homeNavLink.setAttribute("aria-current", "page");

      // Scroll to home section
      const homeSection = document.querySelector("#home");
      if (homeSection) {
        homeSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }
});

// Mobile navbar collapse handling
document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navLinks = document.querySelectorAll(".nav-link");

  // Close mobile menu when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        // Use Bootstrap's collapse method if available
        if (window.bootstrap && window.bootstrap.Collapse) {
          const bsCollapse =
            window.bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      }
    });
  });
});
