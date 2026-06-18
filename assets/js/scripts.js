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
