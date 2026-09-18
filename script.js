/* ========================================
   SHAWERMA EL SHAMI — SCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // PRELOADER
    // ========================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 600);
    });
    setTimeout(() => preloader.classList.add('hidden'), 2500);

    // ========================================
    // HERO VIDEO — autoplay fallback
    // ========================================
    const heroBgVideo = document.getElementById('heroBgVideo');
    if (heroBgVideo) {
        // Try to play; if browser blocks it, the poster image shows instead
        const playPromise = heroBgVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked — poster image is already showing, nothing to do
            });
        }

        // On first user interaction, try again (common on mobile)
        const tryPlay = () => {
            heroBgVideo.play().catch(() => {});
            document.removeEventListener('touchstart', tryPlay);
            document.removeEventListener('click', tryPlay);
        };
        document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
        document.addEventListener('click', tryPlay, { once: true });
    }

    // ========================================
    // THEME TOGGLE (Dark / Light)
    // ========================================
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'light') {
            htmlEl.setAttribute('data-theme', 'light');
            if (themeToggle) {
                themeToggle.innerHTML = '<span class="theme-icon">🌙</span>';
                themeToggle.setAttribute('aria-label', 'Switch to dark theme');
                themeToggle.setAttribute('title', 'Switch to dark theme');
            }
        } else {
            htmlEl.removeAttribute('data-theme');
            if (themeToggle) {
                themeToggle.innerHTML = '<span class="theme-icon">☀️</span>';
                themeToggle.setAttribute('aria-label', 'Switch to light theme');
                themeToggle.setAttribute('title', 'Switch to light theme');
            }
        }
        try {
            localStorage.setItem('shami-theme', theme);
        } catch (e) {}
    }

    // Initialize from saved preference or system preference
    const savedTheme = localStorage.getItem('shami-theme') || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(nextTheme);
        });
    }

    // ========================================
    // NAVBAR
    // ========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isActive = navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close nav on link click
        navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close nav on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close nav if window resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 900 && navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }, { passive: true });
    }

    // Active nav highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.pageYOffset + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinkEls.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ========================================
    // STICKY CALL BAR
    // ========================================
    const stickyBar = document.getElementById('stickyCallBar');
    let lastScrollY = 0;
    let ticking = false;

    function updateStickyBar() {
        const currentScroll = window.pageYOffset;
        if (stickyBar) {
            if (currentScroll > lastScrollY && currentScroll > 400) {
                stickyBar.style.transform = 'translateY(100%)';
            } else {
                stickyBar.style.transform = 'translateY(0)';
            }
            stickyBar.style.transition = 'transform 0.3s ease';
        }
        lastScrollY = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateStickyBar);
            ticking = true;
        }
    }, { passive: true });

    // ========================================
    // MENU FILTER
    // ========================================
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCards = document.querySelectorAll('.menu-card');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            menuCards.forEach((card, index) => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 40);
                } else {
                    card.classList.add('hidden');
                }
            });

            tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    // ========================================
    // COMBO SIZE TOGGLES
    // ========================================
    document.querySelectorAll('.combo-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const panel = document.getElementById(targetId);
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Close all other open panels first
            document.querySelectorAll('.combo-sizes.open').forEach(p => {
                if (p !== panel) {
                    p.classList.remove('open');
                    const siblingBtn = document.querySelector(`[data-target="${p.id}"]`);
                    if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle this one
            panel.classList.toggle('open', !isOpen);
            btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        });
    });

    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    // Inject reveal CSS
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    const revealElements = document.querySelectorAll(
        '.menu-card, .contact-info, .contact-map, .section-header, .cta-content, .contact-item'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 50);
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // SMOOTH SCROLL for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = navbar.offsetHeight + 10;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // DYNAMIC YEAR
    // ========================================
    const yearEl = document.querySelector('.footer-bottom p');
    if (yearEl) {
        const currentYear = new Date().getFullYear();
        yearEl.textContent = yearEl.textContent.replace('2026', currentYear);
    }
});
