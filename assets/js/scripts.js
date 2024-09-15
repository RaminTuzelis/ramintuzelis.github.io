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