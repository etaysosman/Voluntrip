/**
 * ============================================================
 * 1. JQUERY FOR HOMEPAGE ANIMATIONS
 * ============================================================
 */
$(document).ready(function() {
    // Animations for the main landing title and subtitle
    if ($('.main-title').length) {
        $('.main-title, .hero-subtitle').hide();
        $('.main-title').fadeIn(2000).slideDown(1000);
        $('.hero-subtitle').delay(1500).fadeIn(1000);
    }

    /**
     * IMAGE SWAP ANIMATION (Volunteering Sections)
     * Handles image toggle between two sets on click 
     */
    
    // 1. Define the two sets of images
    const imageSet1 = ['images/animals.png', 'images/food.png', 'images/sea.png'];
    // Add the names of the 3 new images from your images folder here
    const imageSet2 = ['images/new1.png', 'images/new2.png', 'images/new3.png']; 

    // 2. Variable to track which set is currently displayed (starts with set 1)
    let isShowingSet1 = true;

    $('.nature img').css('cursor', 'pointer');

    $('.nature img').on('click', function() {
        let $images = $('.nature img');
        
        // 3. Hide the current images. 
        // Using promise().done() ensures the animation finishes before swapping sources.
        $images.slideUp(300).promise().done(function() {
            
            // 4. Toggle the state (switch between set 1 and set 2)
            isShowingSet1 = !isShowingSet1;
            
            // Determine which set to load next
            let currentSet = isShowingSet1 ? imageSet1 : imageSet2;
            
            // 5. Loop through all HTML images and update their source to the selected set
            $images.each(function(index) {
                $(this).attr('src', currentSet[index]);
            });
            
            // 6. Reveal the new images
            $images.slideDown(300);
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