// Active Link On Navigation Bar -----------------------------------------------
const navLinks = document.querySelectorAll('.nav-links li a');

// Add active class to the current link (highlight it)
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        // Add active class to the clicked link
        this.classList.add('active');
    });
});

// Certificates Carousel -------------------------------------------------------

// First take all elements who have class .certificates-item
const certificates = document.querySelectorAll('.certificates-item');

// Add event listener to each element
certificates.forEach(certificate => {
    certificate.addEventListener('click', () => {
        const imgSrc = certificate.querySelector('img').src;
        const overlay = document.createElement('div');

        overlay.classList.add('overlay');
        overlay.innerHTML = `
            <div class="overlay-content">
                <img src="${imgSrc}" alt="Certificate">
                <span class="close-overlay">&times;</span>
            </div>
        `;

        // Add the overlay to the body
        document.body.appendChild(overlay);

        // Trigger the animation by adding 'active' class
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10); // Small delay to trigger CSS transition

        // Add event listener for closing the modal
        const closeOverlay = overlay.querySelector('.close-overlay');
        closeOverlay.addEventListener('click', () => {
            overlay.classList.remove('active'); // Start closing animation
            setTimeout(() => {
                document.body.removeChild(overlay); // Remove after animation
            }, 500); // Wait for the closing animation to complete
        });
    });
});

// Projects Modal ----------------------------------------------------------------
// Modal functionality for projects
const projectImg = document.querySelector('.project-img');
const modalOverlay = document.querySelector('.project-modal-overlay');
const closeModal = document.querySelector('.close-modal');

// Open modal on project image click
projectImg.addEventListener('click', () => {
    modalOverlay.classList.add('active');
});

// Close modal on close button click
closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});


// GSAP Animations --------------------------------------------
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animation for skills section
gsap.from(".skills-grid .skill-item", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.5,
    ease: "power4.out",
    scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animation for certificates section
gsap.from(".certificates-grid .certificates-item", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.5,
    ease: "power4.out",
    scrollTrigger: {
        trigger: ".certificates-section",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animation for projects section
gsap.from(".project-item", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.5,
    ease: "power4.out",
    scrollTrigger: {
        trigger: ".projects-section",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Animation for contact form fields
gsap.from(".contact-form input, .contact-form textarea, .submit-btn", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.5,
    ease: "power4.out",
    scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Contact Form Validation ---------------------------------------------------------

    document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let form = this;
    let formData = new FormData(form);

    fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
    'Accept': 'application/json'
}
}).then(function(response) {
    if (response.ok) {
    document.getElementById('formResponse').style.display = 'block';
    form.reset();
} else {
    alert('There was a problem sending the message.');
}
}).catch(function(error) {
    alert('There was an error submitting the form.');
});
});

// Hamburger Menu ----------------------------------------------------------------
const hamburger = document.querySelector('.hamburger');
const navHamLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navHamLinks.classList.toggle('active');
});