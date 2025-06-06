// Add this to your existing script.js file

// Vastu Modal Functionality
function openVastuModal() {
  const modal = document.getElementById("vastuModal");
  modal.classList.add("active");

  // Prevent body scroll when modal is open
  document.body.style.overflow = "hidden";

  // Focus trap for accessibility
  const closeButton = modal.querySelector(".vastu-modal-close");
  closeButton.focus();
}

function closeVastuModal() {
  const modal = document.getElementById("vastuModal");
  modal.classList.remove("active");

  // Restore body scroll
  document.body.style.overflow = "auto";

  // Return focus to the read more button
  const readMoreBtn = document.querySelector(".read-more-btn");
  if (readMoreBtn) {
    readMoreBtn.focus();
  }
}

// Initialize modal functionality when page loads
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("vastuModal");

  if (modal) {
    // Close modal when clicking outside the card
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeVastuModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeVastuModal();
      }
    });
  }

  // Add intersection observer for element animations
  const elements = document.querySelectorAll(".element");

  if (elements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
      // Initially pause animations until visible
      element.style.animationPlayState = "paused";
    });
  }
});
