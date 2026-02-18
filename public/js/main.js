// ============================================================
// 1. JQUERY FOR HOMEPAGE ANIMATIONS
// ============================================================
$(document).ready(function() {
    if ($('.main-title').length) {
        $('.main-title, .hero-subtitle').hide();
        $('.main-title').fadeIn(4000).slideDown(500);
        $('.hero-subtitle').delay(2000).fadeIn(1000);
    }
});

// ============================================================
// 2. MAIN JAVASCRIPT LOGIC (Dark Mode, Statistics, User Name)
// ============================================================
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

        // Handle toggle click
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
            // הוספתי הגנה למקרה שאין dataset
            const target = Number(el.dataset.target || 0);
            const duration = 900;
            const start = 0;
            const startTime = performance.now();

            function tick(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const value = Math.floor(start + (target - start) * progress);

                // Check if target is large enough for '+' sign
                el.textContent = (target >= 1000) ? value.toLocaleString() + '+' : value + '+';

                if (progress < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
        }

        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(el => {
                        // הוספנו את ה-Animation Logic כאן בתוך ה-loop
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
                    
                    io.disconnect(); // Run once
                }
            });
        }, { threshold: 0.3 });

        io.observe(impactSection);
    }

    // --- C. DISPLAY USERNAME IN MENU (NEW) ---
    const navUsername = document.getElementById('navUsername');
    const storedName = localStorage.getItem('vt_username');

    if (navUsername && storedName) {
        navUsername.textContent = `Hello, ${storedName}`;
        navUsername.style.display = 'block'; // מציג כי ב-CSS זה hidden
    }

    // --- D. LOGOUT HANDLER (Clear Username) (NEW) ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // מוחקים את השם מהזיכרון
            localStorage.removeItem('vt_username');
            // מוחקים גם את ה-flag של ההרשמה ליתר ביטחון
            localStorage.removeItem('registrationSuccess');
        });
    }

});