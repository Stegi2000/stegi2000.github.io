'use strict';

class EcoCookieConsent {
    constructor() {
        this.consentKey = 'eco_cookie_consent';
        this.consentLifetime = 365; // Tage
        this.necessaryCookies = {
            'session_cookie': 'Ermöglicht das sichere Surfen auf der Website',
            'csrf_token': 'Schützt dich vor Cross-Site-Request-Forgery Angriffen'
        };
        this.functionalCookies = {
            'form_data': 'Speichert deine Eingaben im Kontaktformular temporär',
            'preferences': 'Merkt sich deine Cookie-Einstellungen für 365 Tage'
        };

        this.init();
    }

    init() {
        // Bei jedem Seitenaufruf prüfen
        if (!this.hasValidConsent()) {
            this.showConsentBanner();
        }

        // Globale Consent-Check Funktion bereitstellen
        window.checkCookieConsent = (type) => this.checkConsentForType(type);

        // Alle existierenden Cookies prüfen und nicht erlaubte löschen
        this.enforceCookieConsent();
    }

    hasValidConsent() {
        const consent = localStorage.getItem(this.consentKey);
        if (!consent) return false;

        try {
            const { timestamp } = JSON.parse(consent);
            const consentDate = new Date(timestamp);
            const now = new Date();
            const daysSinceConsent = (now - consentDate) / (1000 * 60 * 60 * 24);

            return daysSinceConsent < this.consentLifetime;
        } catch {
            return false;
        }
    }

    showConsentBanner() {
        const banner = document.createElement('div');
        banner.className = 'eco-cookie-consent';
        banner.innerHTML = `
            <div class="eco-cookie-content">
                <div class="eco-cookie-header">
                    <h2>🌱 Wir respektieren deine Privatsphäre</h2>
       
                </div>
                
                <div class="eco-cookie-options">
                    <div class="eco-cookie-option">
                        <div class="option-header">
                            <input type="checkbox" id="necessary-cookies" checked disabled>
                            <label for="necessary-cookies">Technisch notwendige Cookies</label>
                        </div>
                        <p class="option-description">
                            Diese Cookies sind für den Betrieb der Website unerlässlich und können nicht 
                            deaktiviert werden. Sie speichern keine persönlichen Informationen.
                        </p>
                        <div class="cookie-details">
                            ${this.renderCookieDetails(this.necessaryCookies)}
                        </div>
                    </div>
                    
                    <div class="eco-cookie-option">
                        <div class="option-header">
                            <input type="checkbox" id="functional-cookies">
                            <label for="functional-cookies">Funktionale Cookies</label>
                        </div>
                        <p class="option-description">
                            Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung, 
                            wie das Speichern von Formulardaten und Einstellungen.
                        </p>
                        <div class="cookie-details">
                            ${this.renderCookieDetails(this.functionalCookies)}
                        </div>
                    </div>
                </div>
                
                <div class="eco-cookie-actions">
                    <button id="accept-all-cookies" class="eco-btn eco-btn-primary">
                        Alle akzeptieren
                    </button>
                    <button id="save-cookie-preferences" class="eco-btn eco-btn-secondary">
                        Auswahl speichern
                    </button>
                    <button id="show-cookie-details" class="eco-btn eco-btn-text">
                        Details anzeigen
                    </button>
                </div>
            </div>
        `;

        this.setupBannerEventListeners(banner);
        document.body.appendChild(banner);

        requestAnimationFrame(() => {
            banner.classList.add('visible');
        });
    }

    renderCookieDetails(cookies) {
        return `
            <table class="cookie-table">
                <thead>
                    <tr>
                        <th>Cookie</th>
                        <th>Zweck</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(cookies).map(([name, purpose]) => `
                        <tr>
                            <td>${name}</td>
                            <td>${purpose}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    setupBannerEventListeners(banner) {
        const acceptAllBtn = banner.querySelector('#accept-all-cookies');
        const savePreferencesBtn = banner.querySelector('#save-cookie-preferences');
        const showDetailsBtn = banner.querySelector('#show-cookie-details');
        const functionalCheckbox = banner.querySelector('#functional-cookies');

        acceptAllBtn.addEventListener('click', () => {
            functionalCheckbox.checked = true;
            this.saveConsent(banner);
        });

        savePreferencesBtn.addEventListener('click', () => {
            this.saveConsent(banner);
        });

        showDetailsBtn.addEventListener('click', () => {
            banner.querySelectorAll('.cookie-details').forEach(details => {
                details.classList.toggle('visible');
            });
            showDetailsBtn.textContent =
                showDetailsBtn.textContent.includes('anzeigen') ?
                    'Details ausblenden' : 'Details anzeigen';
        });
    }

    saveConsent(banner) {
        const functionalAllowed = banner.querySelector('#functional-cookies').checked;

        const consent = {
            necessary: true,
            functional: functionalAllowed,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem(this.consentKey, JSON.stringify(consent));
        this.hideBanner(banner);
        this.enforceCookieConsent();

        document.dispatchEvent(new CustomEvent('cookieConsentUpdate', {
            detail: consent
        }));
    }

    hideBanner(banner) {
        banner.classList.remove('visible');
        setTimeout(() => {
            banner.remove();
        }, 500);
    }

    checkConsentForType(type) {
        if (type === 'necessary') return true;

        const consent = localStorage.getItem(this.consentKey);
        if (!consent) return false;

        try {
            const preferences = JSON.parse(consent);
            return preferences[type] === true;
        } catch {
            return false;
        }
    }

    enforceCookieConsent() {
        const consent = localStorage.getItem(this.consentKey);
        if (!consent) return;

        try {
            const preferences = JSON.parse(consent);
            const cookies = document.cookie.split(';');

            cookies.forEach(cookie => {
                const [name] = cookie.split('=').map(c => c.trim());

                if (name in this.necessaryCookies) return;

                if (name in this.functionalCookies && !preferences.functional) {
                    this.deleteCookie(name);
                }
            });
        } catch (e) {
            console.error('Fehler beim Durchsetzen der Cookie-Einstellungen:', e);
        }
    }

    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }

    showBanner() {
        const existingBanner = document.querySelector('.eco-cookie-consent');
        if (existingBanner) {
            existingBanner.classList.add('visible');
        } else {
            this.showConsentBanner();
        }
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    new EcoCookieConsent();
});