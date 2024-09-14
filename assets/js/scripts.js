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