// Active Link On Navigation Bar ------------------------------------------------------------------------
const navLinks = document.querySelectorAll(".nav-links li a");
const hamburger = document.querySelector(".hamburger");
const navHamLinks = document.querySelector(".nav-links");
const pageSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
let isNavLinkClickScrolling = false;

const closeMobileMenu = () => {
  hamburger.classList.remove("active");
  navHamLinks.classList.remove("active");
};

const setActiveNavLink = (sectionId) => {
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${sectionId}`
    );
  });
};

const updateActiveNavLink = () => {
  if (isNavLinkClickScrolling) {
    return;
  }

  const scrollPosition = window.scrollY + 140;
  let currentSection = pageSections[0];

  pageSections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      currentSection = section;
    }
  });

  const isAtPageBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

  if (isAtPageBottom) {
    currentSection = pageSections[pageSections.length - 1];
  }

  if (currentSection) {
    setActiveNavLink(currentSection.id);
  }
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetSectionId = link.getAttribute("href").replace("#", "");

    isNavLinkClickScrolling = true;
    setActiveNavLink(targetSectionId);
    closeMobileMenu();

    setTimeout(() => {
      isNavLinkClickScrolling = false;
      updateActiveNavLink();
    }, 900);
  });
});

// Hamburger Menu -------------------------------------------------------------------------------
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navHamLinks.classList.toggle("active");
});

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);
updateActiveNavLink();

// Certificates --------------------------------------------------------------------------------
const certificates = document.querySelectorAll(".certificates-item");
const certificateModalOverlay = document.querySelector(
  ".certificate-modal-overlay"
);
const certificateModalImage = document.querySelector(".certificate-modal-img");
const closeCertificateModalButton = document.querySelector(
  ".close-certificate-modal"
);
let lastFocusedCertificate = null;

const closeCertificateModal = () => {
  certificateModalOverlay.classList.remove("active");
  certificateModalOverlay.setAttribute("aria-hidden", "true");
  certificateModalOverlay.setAttribute("inert", "");
  lastFocusedCertificate?.focus();
};

const openCertificateModal = (certificate) => {
  const certificateImage = certificate.querySelector("img");

  certificateModalImage.src = certificateImage.src;
  certificateModalImage.alt = certificateImage.alt;
  lastFocusedCertificate = certificate;
  certificateModalOverlay.classList.add("active");
  certificateModalOverlay.setAttribute("aria-hidden", "false");
  certificateModalOverlay.removeAttribute("inert");
  closeCertificateModalButton.focus();
};

certificates.forEach((certificate) => {
  const certificateName = certificate.querySelector("img").alt;

  certificate.setAttribute("role", "button");
  certificate.setAttribute("tabindex", "0");
  certificate.setAttribute("aria-label", `Open ${certificateName}`);

  certificate.addEventListener("click", () => {
    openCertificateModal(certificate);
  });

  certificate.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCertificateModal(certificate);
    }
  });
});

closeCertificateModalButton.addEventListener("click", closeCertificateModal);

certificateModalOverlay.addEventListener("click", (event) => {
  if (event.target === certificateModalOverlay) {
    closeCertificateModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    certificateModalOverlay.classList.contains("active")
  ) {
    closeCertificateModal();
  }
});

// Projects Modal ----------------------------------------------------------------

const projectImages = document.querySelectorAll(".project-img");
const modalImage = document.querySelector(".project-modal-img");
const modalTitle = document.querySelector(".project-modal-title");
const modalText = document.querySelector(".project-modal-text");
const modalOverlay = document.querySelector(".project-modal-overlay");
const closeModal = document.querySelector(".close-modal");
let lastFocusedProjectImage = null;

const closeProjectModal = () => {
  modalOverlay.classList.remove("active");
  modalOverlay.setAttribute("aria-hidden", "true");
  modalOverlay.setAttribute("inert", "");
  lastFocusedProjectImage?.focus();
};

const openProjectModal = (projectImage) => {
  const projectItem = projectImage.closest(".project-item");
  const projectTitle = projectItem.querySelector("h3").textContent;
  const projectText = projectItem.querySelector("p").textContent;
  const projectImageSrc = projectImage.getAttribute("src");

  modalImage.src = projectImageSrc;
  modalImage.alt = `${projectTitle} Project Full View`;
  modalTitle.textContent = projectTitle;
  modalText.textContent = projectText;
  lastFocusedProjectImage = projectImage;

  modalOverlay.classList.add("active");
  modalOverlay.setAttribute("aria-hidden", "false");
  modalOverlay.removeAttribute("inert");
  closeModal.focus();
};

projectImages.forEach((projectImage) => {
  const projectTitle = projectImage
    .closest(".project-item")
    .querySelector("h3").textContent;

  projectImage.setAttribute("role", "button");
  projectImage.setAttribute("tabindex", "0");
  projectImage.setAttribute("aria-label", `Open ${projectTitle} preview`);

  projectImage.addEventListener("click", () => {
    openProjectModal(projectImage);
  });

  projectImage.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectModal(projectImage);
    }
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

// Contact Form Validation ---------------------------------------------------------------------
const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formResponse = document.getElementById("formResponse");
const submitButton = contactForm.querySelector(".submit-btn");

const showError = (input, errorElement, message) => {
  const formField = input.closest(".form-field");

  formField.classList.add("error");
  errorElement.textContent = message;
};

const clearError = (input, errorElement) => {
  const formField = input.closest(".form-field");

  formField.classList.remove("error");
  errorElement.textContent = "";
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const showFormResponse = (message, type) => {
  formResponse.textContent = message;
  formResponse.className = `${type} is-visible`;
};

const hideFormResponse = () => {
  formResponse.textContent = "";
  formResponse.className = "";
};

const validateContactForm = () => {
  let isValid = true;

  if (nameInput.value.trim() === "") {
    showError(nameInput, nameError, "Please enter your name.");
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    showError(emailInput, emailError, "Please enter your email.");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (messageInput.value.trim() === "") {
    showError(messageInput, messageError, "Please enter your message.");
    isValid = false;
  } else {
    clearError(messageInput, messageError);
  }

  return isValid;
};

nameInput.addEventListener("input", () => {
  clearError(nameInput, nameError);
});

emailInput.addEventListener("input", () => {
  clearError(emailInput, emailError);
});

messageInput.addEventListener("input", () => {
  clearError(messageInput, messageError);
});

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  hideFormResponse();

  if (!validateContactForm()) {
    return;
  }

  let form = this;
  let formData = new FormData(form);

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        showFormResponse("Message sent successfully!", "success");
        form.reset();
      } else {
        showFormResponse(
          "Something went wrong. Please try again later.",
          "error"
        );
      }
    })
    .catch(function (error) {
      showFormResponse(
        "Network error. Please check your connection and try again.",
        "error"
      );
    })
    .finally(function () {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    });
});

// Update footer year automatically --------------------------------------------------------------
const currentYear = document.getElementById("currentYear");
currentYear.textContent = new Date().getFullYear();

// Scroll To Top -------------------------------------------------------------------------------
const scrollToTopButton = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollToTopButton.classList.add("active");
  } else {
    scrollToTopButton.classList.remove("active");
  }
});

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
