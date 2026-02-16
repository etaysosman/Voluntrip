document.addEventListener('DOMContentLoaded', function() {

    let btn = document.getElementById('darkModeBtn');
    let nav = document.getElementById('mainMenu');

    if (btn && nav) {
        if (localStorage.getItem('isDarkMode') === 'true') {
            nav.classList.add('nav-dark-mode');
            btn.innerHTML = '<i class="bi bi-sun"></i> Light Menu';
            btn.style.color = '#ffc107';
        }

        btn.addEventListener('click', function() {
            nav.classList.toggle('nav-dark-mode');

            if (nav.classList.contains('nav-dark-mode')) {
                this.innerHTML = '<i class="bi bi-sun"></i> Light Menu';
                this.style.color = '#ffc107';
                localStorage.setItem('isDarkMode', 'true');
            } else {
                this.innerHTML = '<i class="bi bi-moon"></i> Dark Menu';
                this.style.color = '';
                localStorage.setItem('isDarkMode', 'false');
            }
        });
    }

    const impactSection = document.getElementById('impact');

    if (impactSection) {
        const counters = document.querySelectorAll('.counter');

        function animateCounter(el) {
            const target = Number(el.dataset.target || 0);
            const duration = 900;
            const start = 0;
            const startTime = performance.now();

            function tick(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const value = Math.floor(start + (target - start) * progress);

                el.textContent = (target >= 1000) ? value.toLocaleString() + '+' : value + '+';

                if (progress < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
        }

        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(animateCounter);
                    io.disconnect();
                }
            });
        }, { threshold: 0.3 });

        io.observe(impactSection);
    }
});

$(document).ready(function() {
    if ($('.main-title').length) {
        $('.main-title, .hero-subtitle').hide();
        $('.main-title').fadeIn(4000).slideDown(500);
        $('.hero-subtitle').delay(2000).fadeIn(1000);
    }
});