// Active Link On Navigation Bar ------------------------------------------------------------------------
const navLinks = document.querySelectorAll(".nav-links li a");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
  });
});

// Certificates --------------------------------------------------------------------------------
const certificates = document.querySelectorAll(".certificates-item");
certificates.forEach((certificate) => {
  certificate.addEventListener("click", () => {
    const imgSrc = certificate.querySelector("img").src;
    const overlay = document.createElement("div");

    overlay.classList.add("overlay");
    overlay.innerHTML = `
            <div class="overlay-content">
                <img src="${imgSrc}" alt="Certificate">
                <span class="close-overlay">&times;</span>
            </div>
        `;

    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.classList.add("active");
    }, 10);

    const closeOverlay = overlay.querySelector(".close-overlay");
    const closeCertificateOverlay = () => {
      overlay.classList.remove("active");
      document.removeEventListener("keydown", handleCertificateOverlayKeydown);

      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 500);
    };

    closeOverlay.addEventListener("click", closeCertificateOverlay);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeCertificateOverlay();
      }
    });

    const handleCertificateOverlayKeydown = (event) => {
      if (event.key === "Escape") {
        closeCertificateOverlay();
      }
    };
    document.addEventListener("keydown", handleCertificateOverlayKeydown);
  });
});

// Projects Modal ----------------------------------------------------------------

const projectImages = document.querySelectorAll(".project-img");
const modalImage = document.querySelector(".project-modal-img");
const modalTitle = document.querySelector(".project-modal-title");
const modalText = document.querySelector(".project-modal-text");
const modalOverlay = document.querySelector(".project-modal-overlay");
const closeModal = document.querySelector(".close-modal");

const closeProjectModal = () => {
  modalOverlay.classList.remove("active");
};

projectImages.forEach((projectImage) => {
  projectImage.addEventListener("click", () => {
    const projectItem = projectImage.closest(".project-item");
    const projectTitle = projectItem.querySelector("h3").textContent;
    const projectText = projectItem.querySelector("p").textContent;
    const projectImageSrc = projectImage.getAttribute("src");

    modalImage.src = projectImageSrc;
    modalImage.alt = `${projectTitle} Project Full View`;
    modalTitle.textContent = projectTitle;
    modalText.textContent = projectText;

    modalOverlay.classList.add("active");
  });
});

closeModal.addEventListener("click", closeProjectModal);

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeProjectModal();
  }
});

// GSAP Animations ----------------------------------------------------------------
gsap.registerPlugin(ScrollTrigger);

gsap.from(".contact-form input, .contact-form textarea, .submit-btn", {
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 1.5,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".contact-form",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

// Contact Form Validation ----------------------------------------------------------------------------------------------------------------------
// Function to launch confetti animation when form is successfully submitted
function launchConfetti() {
  let end = Date.now() + 3 * 1000; // Confetti duration: 3 seconds

  // Confetti from different sides with color variations
  let colors = ["#bb0000", "#ffffff", "#00ff00"];

  // Recursive function to create confetti continuously until 3 seconds pass
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 }, // Left side
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 }, // Right side
      colors: colors,
    });

    // Continue confetti animation if 3 seconds have not passed
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Contact form submission event listener with confetti
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  let form = this;
  let formData = new FormData(form); // Capture form data

  // Send form data using fetch API
  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        document.getElementById("formResponse").style.display = "block"; // Show success message
        form.reset(); // Reset the form

        // Trigger confetti effect
        launchConfetti();
      } else {
        alert("There was a problem sending the message."); // Error message
      }
    })
    .catch(function (error) {
      alert("There was an error submitting the form."); // Error message
    });
});

// Hamburger Menu ----------------------------------------------------------------------------------------------------------------------------
// Select the hamburger menu and the navigation links
const hamburger = document.querySelector(".hamburger");
const navHamLinks = document.querySelector(".nav-links");

// Toggle the 'active' class to open or close the hamburger menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navHamLinks.classList.toggle("active");
});

// Update footer year automatically
const currentYear = document.getElementById("currentYear");
currentYear.textContent = new Date().getFullYear();
