// Active Link On Navigation Bar -----------------------------------------------
// Select all navigation links in the navigation bar
const navLinks = document.querySelectorAll('.nav-links li a');

// Add active class to the current link (highlight it)
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Remove the 'active' class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        // Add the 'active' class to the clicked link
        this.classList.add('active');
    });
});

// Certificates Carousel -------------------------------------------------------
// Select all elements with the class '.certificates-item'
const certificates = document.querySelectorAll('.certificates-item');

// Add event listener to each certificate
certificates.forEach(certificate => {
    certificate.addEventListener('click', () => {
        const imgSrc = certificate.querySelector('img').src; // Get the image source
        const overlay = document.createElement('div'); // Create a new 'div' element

        // Add 'overlay' class to the new div and set its content with the image and close button
        overlay.classList.add('overlay');
        overlay.innerHTML = `
            <div class="overlay-content">
                <img src="${imgSrc}" alt="Certificate">
                <span class="close-overlay">&times;</span>
            </div>
        `;

        // Append the overlay to the body
        document.body.appendChild(overlay);

        // Trigger the animation by adding 'active' class after a small delay
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10); // 10ms delay to trigger CSS transition

        // Close overlay event listener
        const closeOverlay = overlay.querySelector('.close-overlay');
        closeOverlay.addEventListener('click', () => {
            // Remove the 'active' class to start closing animation
            overlay.classList.remove('active');
            // Remove the overlay from the DOM after animation completes
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 500); // Wait for 500ms for the animation to finish
        });
    });
});

// Projects Modal ----------------------------------------------------------------
// Select project image and modal elements
const projectImg = document.querySelector('.project-img');
const modalOverlay = document.querySelector('.project-modal-overlay');
const closeModal = document.querySelector('.close-modal');

// Open the modal when the project image is clicked
projectImg.addEventListener('click', () => {
    modalOverlay.classList.add('active'); // Show the modal by adding 'active' class
});

// Close the modal when the close button is clicked
closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active'); // Hide the modal by removing 'active' class
});

// GSAP Animations --------------------------------------------
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animation for skills section (fades in and moves up each skill item)
gsap.from(".skills-grid .skill-item", {
    opacity: 0, // Start with zero opacity
    y: 50,      // Start 50px below its final position
    stagger: 0.2, // Delay each item by 0.2 seconds
    duration: 1.5, // Animation lasts 1.5 seconds
    ease: "power4.out", // Smooth easing effect
    scrollTrigger: {   // Trigger animation when the section comes into view
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
// Function to launch confetti animation when form is successfully submitted
function launchConfetti() {
    let end = Date.now() + (3 * 1000); // Confetti duration: 3 seconds

    // Confetti from different sides with color variations
    let colors = ['#bb0000', '#ffffff', '#00ff00'];

    // Recursive function to create confetti continuously until 3 seconds pass
    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },  // Left side
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },  // Right side
            colors: colors
        });

        // Continue confetti animation if 3 seconds have not passed
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Contact form submission event listener with confetti
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent default form submission

    let form = this;
    let formData = new FormData(form); // Capture form data

    // Send form data using fetch API
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(response) {
        if (response.ok) {
            document.getElementById('formResponse').style.display = 'block'; // Show success message
            form.reset(); // Reset the form

            // Trigger confetti effect
            launchConfetti();
        } else {
            alert('There was a problem sending the message.'); // Error message
        }
    }).catch(function(error) {
        alert('There was an error submitting the form.'); // Error message
    });
});

// Hamburger Menu ----------------------------------------------------------------
// Select the hamburger menu and the navigation links
const hamburger = document.querySelector('.hamburger');
const navHamLinks = document.querySelector('.nav-links');

// Toggle the 'active' class to open or close the hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navHamLinks.classList.toggle('active');
});
