document.addEventListener('DOMContentLoaded', () => {
    
    /* Mobile Navigation Toggle */
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileNavToggle.classList.toggle('active'); // Optional: for hamburger animation
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });

    /* Smooth Scrolling for Anchor Links */
    // Note: CSS scroll-behavior: smooth handles most cases, 
    // but this ensures cross-browser support and offset handling for fixed header.
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // height of fixed header + some breathing room
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* Scroll Animation (Fade In Elements) */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in styles dynamically or via CSS class.
    // For simplicity, we just add a class that could be styled.
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
    
    // Inject CSS for fade-in
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
