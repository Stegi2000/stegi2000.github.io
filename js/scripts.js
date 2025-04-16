'use strict';
document.addEventListener('DOMContentLoaded', () => {

    // Debug bei DOM bereit
    console.log('DOMContentLoaded: script.js');

    // Globaler Error Handler
    window.onerror = (msg, url, line) => {
        console.error(`Fehler: ${msg} in ${url}:${line}`);
    };

    class SiteManager {
        constructor() {
            this.scrollTopBtn = document.getElementById('scrollTopBtn');
            this.init();
        }

        init() {
            this.initLazyLoading();
            this.setupScrollHandlers();
            // Modal NICHT mehr hier initialisieren,
            // das macht jetzt modal.js
        }

        initLazyLoading() {
            const observer = lozad('.lazyload', {
                loaded: (el) => el.classList.add('loaded')
            });
            observer.observe();
        }

        setupScrollHandlers() {
            // Sticky Header
            window.addEventListener('scroll', () => {
                document.querySelector('header')
                    ?.classList.toggle('sticky', window.scrollY > 0);

                // Scroll to Top Button
                if (this.scrollTopBtn) {
                    this.scrollTopBtn.style.display =
                        (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
                            ? 'block'
                            : 'none';
                }
            });

            // Scroll to Top Button Click
            this.scrollTopBtn?.addEventListener('click', () => {
                document.body.scrollTop = 0; // Für Safari
                document.documentElement.scrollTop = 0; // Für andere Browser
            });
        }
    }

    // Initialisierung der SiteManager-Klasse
    new SiteManager();
});
