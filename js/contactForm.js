'use strict';

class EnhancedContactForm {
    constructor() {
        // DOM-Elemente
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.nameInput = this.form.querySelector('#name');
        this.emailInput = this.form.querySelector('#email');
        this.messageInput = this.form.querySelector('#message');
        this.ratingInputs = this.form.querySelectorAll('input[name="rating"]');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.characterCounter = this.form.querySelector('.character-counter');

        // Status
        this.hasChanges = false;
        this.isSubmitting = false;
        this.MAX_MESSAGE_LENGTH = 500;

        this.init();
    }

    init() {
        this.setupValidation();
        this.setupEventListeners();
        this.setupCharacterCount();
        this.addCustomStyles();
        this.loadSavedData();
    }

    setupValidation() {
        // Custom Methode für Name hinzufügen
        $.validator.addMethod("validName", function(value, element) {
            return /^[A-Za-zÄäÖöÜüß\s-]{2,50}$/.test(value);
        }, "Bitte gib einen gültigen Namen ein (nur Buchstaben, Leerzeichen und Bindestriche)");

        $(this.form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    validName: true
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 10,
                    maxlength: this.MAX_MESSAGE_LENGTH
                },
                rating: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "Bitte gib deinen Namen ein",
                    minlength: "Der Name sollte mindestens 2 Zeichen lang sein"
                },
                email: {
                    required: "Bitte gib deine E-Mail-Adresse ein",
                    email: "Bitte gib eine gültige E-Mail-Adresse ein"
                },
                message: {
                    required: "Bitte schreib uns eine Nachricht",
                    minlength: "Deine Nachricht sollte mindestens 10 Zeichen lang sein",
                    maxlength: `Deine Nachricht darf maximal ${this.MAX_MESSAGE_LENGTH} Zeichen lang sein`
                },
                rating: "Bitte wähle eine Bewertung aus"
            },
            errorPlacement: this.handleErrorPlacement.bind(this),
            highlight: this.highlightError.bind(this),
            unhighlight: this.unhighlightError.bind(this),
            submitHandler: (form, event) => {
                event.preventDefault();
                this.handleSubmit(event);
            }
        });
    }

    setupEventListeners() {
        // Form Änderungen
        this.form.addEventListener('input', () => {
            this.hasChanges = true;
            this.handleFormChange();
        });

        // Warnung vor ungespeicherten Änderungen
        window.addEventListener('beforeunload', (e) => this.handleBeforeUnload(e));

        // E-Mail-Domain Validierung
        this.emailInput.addEventListener('blur', () => this.validateEmailDomain());
    }

    setupCharacterCount() {
        if (!this.messageInput || !this.characterCounter) return;

        this.messageInput.addEventListener('input', () => {
            const count = this.messageInput.value.length;
            this.characterCounter.textContent = `${count}/${this.MAX_MESSAGE_LENGTH} Zeichen`;

            const remaining = this.MAX_MESSAGE_LENGTH - count;
            this.characterCounter.className = 'character-counter ' +
                (remaining < 0 ? 'error' : remaining < 50 ? 'warning' : '');
        });
    }

    handleFormChange() {
        if (window.checkCookieConsent?.('functional')) {
            this.saveFormData();
        }

        // Aktiviere Submit-Button nur wenn alle Pflichtfelder ausgefüllt sind
        const isComplete = this.checkFormCompletion();
        this.submitButton.disabled = !isComplete;
    }

    handleBeforeUnload(e) {
        if (this.hasChanges) {
            e.preventDefault();
            e.returnValue = 'Du hast ungespeicherte Änderungen. Möchtest du die Seite wirklich verlassen?';
            return e.returnValue;
        }
    }

    validateEmailDomain() {
        const email = this.emailInput.value;
        if (!email) return;

        const domain = email.split('@')[1];
        if (domain?.match(/\.(test|local)$/i)) {
            this.showError(this.emailInput, 'Diese E-Mail-Domain wird nicht akzeptiert');
            return false;
        }
        return true;
    }

    handleErrorPlacement(error, element) {
        error.addClass('error-message');

        if (element.attr('name') === 'rating') {
            error.insertAfter('.rating');
        } else {
            const container = $('<div>').addClass('error-container');
            error.appendTo(container);
            container.insertAfter(element);
        }
    }

    highlightError(element) {
        $(element)
            .addClass('error')
            .removeClass('valid')
            .attr('aria-invalid', 'true')
            .effect('shake', { times: 2, distance: 3 }, 200);
    }

    unhighlightError(element) {
        $(element)
            .removeClass('error')
            .addClass('valid')
            .attr('aria-invalid', 'false');
    }

    checkFormCompletion() {
        return (
            this.nameInput.value.trim() !== '' &&
            this.emailInput.value.trim() !== '' &&
            this.messageInput.value.trim() !== '' &&
            [...this.ratingInputs].some(input => input.checked)
        );
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.isSubmitting) return;

        if (!window.checkCookieConsent?.('functional')) {
            this.showConsentError();
            return;
        }

        if (!this.validateEmailDomain()) return;

        if ($(this.form).valid()) {
            this.isSubmitting = true;
            this.submitButton.disabled = true;
            this.showLoadingState();

            try {
                // Simuliere API-Call
                await new Promise(resolve => setTimeout(resolve, 1500));
                this.showSuccessMessage();
                this.resetForm();
            } catch (error) {
                this.showErrorMessage('Entschuldigung, es gab einen Fehler beim Senden. Bitte versuche es später erneut.');
            } finally {
                this.hideLoadingState();
                this.isSubmitting = false;
                this.submitButton.disabled = false;
            }
        }
    }

    showLoadingState() {
        this.submitButton.innerHTML = '<div class="spinner"></div> Wird gesendet...';
    }

    hideLoadingState() {
        this.submitButton.innerHTML = 'Nachricht senden';
    }

    showSuccessMessage() {
        const dialog = $('<div>').dialog({
            title: 'Erfolgreich gesendet!',
            modal: true,
            width: 400,
            classes: {
                "ui-dialog": "eco-dialog success-dialog"
            },
            buttons: [{
                text: "OK",
                class: "eco-btn",
                click: function() {
                    $(this).dialog("close");
                }
            }],
            open: function() {
                setTimeout(() => $(this).dialog("close"), 5000);
            }
        }).html(`
            <div class="success-content">
                <div class="success-icon">✓</div>
                <p>Vielen Dank für deine Nachricht! Wir werden uns bald bei dir melden.</p>
            </div>
        `);
    }

    showErrorMessage(message) {
        $('<div>').dialog({
            title: 'Fehler',
            modal: true,
            width: 400,
            classes: {
                "ui-dialog": "eco-dialog error-dialog"
            },
            buttons: [{
                text: "OK",
                class: "eco-btn",
                click: function() {
                    $(this).dialog("close");
                }
            }]
        }).html(`<p>${message}</p>`);
    }

    showConsentError() {
        $('<div>').dialog({
            title: 'Cookie-Zustimmung benötigt',
            modal: true,
            width: 400,
            classes: {
                "ui-dialog": "eco-dialog"
            },
            buttons: [{
                text: "Einstellungen öffnen",
                class: "eco-btn",
                click: function() {
                    if (window.EcoCookieConsent) {
                        new EcoCookieConsent().showBanner();
                    }
                    $(this).dialog("close");
                }
            }]
        }).html('<p>Um das Formular zu nutzen, benötigen wir deine Zustimmung zu funktionalen Cookies.</p>');
    }

    resetForm() {
        this.form.reset();
        this.hasChanges = false;
        $('.error-container').remove();
        $(this.form).find('input, textarea').removeClass('error valid');
        if (this.characterCounter) {
            this.characterCounter.textContent = `0/${this.MAX_MESSAGE_LENGTH} Zeichen`;
            this.characterCounter.className = 'character-counter';
        }
    }

    saveFormData() {
        const data = {
            name: this.nameInput.value,
            email: this.emailInput.value,
            timestamp: new Date().toISOString()
        };
        try {
            localStorage.setItem('contactFormData', JSON.stringify(data));
        } catch (e) {
            console.error('Fehler beim Speichern der Formulardaten:', e);
        }
    }

    loadSavedData() {
        if (!window.checkCookieConsent?.('functional')) return;

        try {
            const savedData = localStorage.getItem('contactFormData');
            if (savedData) {
                const data = JSON.parse(savedData);
                const timestamp = new Date(data.timestamp);
                const now = new Date();

                // Daten nur laden, wenn sie nicht älter als 24 Stunden sind
                if ((now - timestamp) < 24 * 60 * 60 * 1000) {
                    this.nameInput.value = data.name || '';
                    this.emailInput.value = data.email || '';
                } else {
                    localStorage.removeItem('contactFormData');
                }
            }
        } catch (e) {
            console.error('Fehler beim Laden der Formulardaten:', e);
            localStorage.removeItem('contactFormData');
        }
    }

    addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .character-counter {
                color: #666;
                font-size: 0.9em;
                margin-top: 0.5em;
                text-align: right;
            }
            .character-counter.warning {
                color: #e6a23c;
            }
            .character-counter.error {
                color: #f56c6c;
            }
            .spinner {
                width: 20px;
                height: 20px;
                border: 3px solid rgba(255,255,255,.3);
                border-top-color: #fff;
                border-radius: 50%;
                animation: spinner .6s linear infinite;
                display: inline-block;
                vertical-align: middle;
                margin-right: 8px;
            }
            @keyframes spinner {
                to { transform: rotate(360deg); }
            }
            .success-dialog .success-icon {
                color: #67c23a;
                font-size: 2em;
                text-align: center;
                margin-bottom: 0.5em;
            }
            .error-dialog {
                border-color: #f56c6c;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('contact-form')) {
        new EnhancedContactForm();
    }
});