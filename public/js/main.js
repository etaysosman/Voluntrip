/**
 * ============================================================
 * 1. JQUERY FOR HOMEPAGE ANIMATIONS
 * ============================================================
 */
$(document).ready(function() {
    // Animations for the main landing title and subtitle
    if ($('.main-title').length) {
        $('.main-title, .hero-subtitle').hide();
        $('.main-title').fadeIn(4000).slideDown(500);
        $('.hero-subtitle').delay(2000).fadeIn(1000);
    }

    /**
     * IMAGE SWAP ANIMATION (Volunteering Sections)
     * Handles image rotation on click 
     */
    $('.nature img').css('cursor', 'pointer');

    $('.nature img').on('click', function() {
        // 1. Store all 3 image elements based on their position
        let img1 = $('.nature img').eq(0);
        let img2 = $('.nature img').eq(1);
        let img3 = $('.nature img').eq(2);

        // 2. Store current image source paths
        let src1 = img1.attr('src');
        let src2 = img2.attr('src');
        let src3 = img3.attr('src');

        // 3. Hide images with a basic slide animation
        $('.nature img').slideUp(300, function() {

            // 4. Swap sources between elements (Simple rotation)
            img1.attr('src', src2);
            img2.attr('src', src3);
            img3.attr('src', src1);

            // 5. Reveal images again with slide down animation
            $(this).slideDown(300);
        });
    });
});

/**
 * ============================================================
 * 2. MAIN JAVASCRIPT LOGIC
 * Includes: Dark Mode, Statistics Section, Username Handling
 * ============================================================
 */
document.addEventListener('DOMContentLoaded', function() {

    // --- A. DARK AND LIGHT MODE MENU ---
    let btn = document.getElementById('darkModeBtn');
    let nav = document.getElementById('mainMenu');

    if (btn && nav) {
        // Check saved preference on load
        if (localStorage.getItem('isDarkMode') === 'true') {
            nav.classList.add('nav-dark-mode');
            btn.innerHTML = '<i class="bi bi-sun"></i> Light Menu';
            btn.style.color = '#ffc107';
        }

        // Handle theme toggle click
        btn.addEventListener('click', function() {
            nav.classList.toggle('nav-dark-mode');

            if (nav.classList.contains('nav-dark-mode')) {
                // Switched to Dark Mode
                this.innerHTML = '<i class="bi bi-sun"></i> Light Menu';
                this.style.color = '#ffc107';
                localStorage.setItem('isDarkMode', 'true');
            } else {
                // Switched back to Light Mode
                this.innerHTML = '<i class="bi bi-moon"></i> Dark Menu';
                this.style.color = '';
                localStorage.setItem('isDarkMode', 'false');
            }
        });
    }

    // --- B. IMPACT STATISTICS ANIMATION (HOMEPAGE) ---
    const impactSection = document.getElementById('impact');

    if (impactSection) {
        const counters = document.querySelectorAll('.counter');

        function animateCounter(el) {
            // Safety check if dataset is missing
            const target = Number(el.dataset.target || 0);
            const duration = 900;
            const start = 0;
            const startTime = performance.now();

            function tick(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const value = Math.floor(start + (target - start) * progress);

                // Check if target is large enough for '+' sign formatting
                el.textContent = (target >= 1000) ? value.toLocaleString() + '+' : value + '+';

                if (progress < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
        }

        // Trigger animation when the section enters the viewport
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(el => {
                        // Animation Logic execution inside the loop
                        const target = Number(el.dataset.target || 0);
                        const duration = 900;
                        const startTime = performance.now();

                        function tick(now) {
                            const progress = Math.min((now - startTime) / duration, 1);
                            const value = Math.floor(target * progress);
                            el.textContent = (target >= 1000) ? value.toLocaleString() + '+' : value + '+';
                            if (progress < 1) requestAnimationFrame(tick);
                        }
                        requestAnimationFrame(tick);
                    });

                    io.disconnect(); // Ensure animation runs only once
                }
            });
        }, {
            threshold: 0.3
        });

        io.observe(impactSection);
    }

    // --- C. DISPLAY USERNAME IN MENU ---
    const navUsername = document.getElementById('navUsername');
    const storedName = localStorage.getItem('vt_username');

    if (navUsername && storedName) {
        navUsername.textContent = `Hello, ${storedName}`;
        navUsername.style.display = 'block'; // Display it as it is hidden by default in CSS
    }

    // --- D. LOGOUT HANDLER (Clear Local Data) ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Remove the username from storage
            localStorage.removeItem('vt_username');
            // Also remove registration flag for safety
            localStorage.removeItem('registrationSuccess');
        });
    }

});