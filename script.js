/*=============== SCRIPT.JS - NGERTIDATA ===============*/

// Menjalankan semua fungsi setelah konten halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * FUNGSI 1: Animasi Scroll Reveal
     * Menggunakan Intersection Observer untuk efisiensi
     */
    const initScrollReveal = () => {
        const hiddenElements = document.querySelectorAll('.hidden');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    // Opsional: berhenti mengamati setelah elemen terlihat
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Elemen dianggap terlihat jika 10% areanya masuk viewport
        });

        hiddenElements.forEach(el => observer.observe(el));
    };

    /**
     * FUNGSI 2: Toggle Dark Mode dengan LocalStorage
     */
    const initDarkMode = () => {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const body = document.body;
        const themeKey = 'theme_preference';

        // Fungsi untuk menerapkan tema
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                darkModeToggle.textContent = '☀️'; // Ganti ikon ke matahari
            } else {
                body.classList.remove('dark-mode');
                darkModeToggle.textContent = '🌙'; // Ganti ikon ke bulan
            }
        };

        // Memeriksa preferensi saat halaman dimuat
        const savedTheme = localStorage.getItem(themeKey);
        if (savedTheme) {
            applyTheme(savedTheme);
        }

        // Event listener untuk tombol toggle
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.toggle('dark-mode');
            const newTheme = isDarkMode ? 'dark' : 'light';
            localStorage.setItem(themeKey, newTheme);
            applyTheme(newTheme);
        });
    };
    
    /**
     * FUNGSI 3: Navigasi Mobile Responsif (Hamburger Menu)
     * Tambahkan CSS untuk class .show-menu agar fungsi ini bekerja
     */
    const initMobileNav = () => {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show-menu');
            });
        }

        // Menutup menu saat link di-klik (untuk navigasi satu halaman)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('show-menu')) {
                    navMenu.classList.remove('show-menu');
                }
            });
        });
    };

    /**
     * FUNGSI 4: Tombol "Back to Top" (Scroll Up)
     */
    const initScrollUpButton = () => {
        const scrollUpButton = document.getElementById('scroll-up');
        
        window.addEventListener('scroll', () => {
            // Tampilkan tombol jika scroll lebih dari 500px
            if (window.scrollY >= 500) {
                scrollUpButton.classList.add('show-scroll');
            } else {
                scrollUpButton.classList.remove('show-scroll');
            }
        });
    };
    
    /**
     * FUNGSI 5: Memperbarui Tahun di Footer
     */
    const updateCopyrightYear = () => {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    };


    // Inisialisasi semua fungsi
    initScrollReveal();
    initDarkMode();
    initMobileNav();
    initScrollUpButton();
    updateCopyrightYear();
});