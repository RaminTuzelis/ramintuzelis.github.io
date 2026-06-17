// Active Link On Navigation Bar ------------------------------------------------------------------------
const navLinks = document.querySelectorAll(".nav-links li a");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
  });
});

// Hamburger Menu -------------------------------------------------------------------------------
const hamburger = document.querySelector(".hamburger");
const navHamLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navHamLinks.classList.toggle("active");
});

// Certificates --------------------------------------------------------------------------------
const certificates = document.querySelectorAll(".certificates-item");
const certificateModalOverlay = document.querySelector(
  ".certificate-modal-overlay"
);
const certificateModalImage = document.querySelector(".certificate-modal-img");
const closeCertificateModalButton = document.querySelector(
  ".close-certificate-modal"
);

const closeCertificateModal = () => {
  certificateModalOverlay.classList.remove("active");
};

const openCertificateModal = (certificate) => {
  const certificateImage = certificate.querySelector("img");

  certificateModalImage.src = certificateImage.src;
  certificateModalImage.alt = certificateImage.alt;
  certificateModalOverlay.classList.add("active");
};

certificates.forEach((certificate) => {
  certificate.addEventListener("click", () => {
    openCertificateModal(certificate);
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

// Contact Form Validation ---------------------------------------------------------------------
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let form = this;
  let formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        document.getElementById("formResponse").style.display = "block";
        form.reset();
      } else {
        alert("There was a problem sending the message.");
      }
    })
    .catch(function (error) {
      alert("There was an error submitting the form.");
    });
});

// Update footer year automatically --------------------------------------------------------------
const currentYear = document.getElementById("currentYear");
currentYear.textContent = new Date().getFullYear();
