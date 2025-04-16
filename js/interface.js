$(document).ready(function() {
    // Accordion für FAQs
    $("#faq-accordion").accordion({
        heightStyle: "content",
        collapsible: true,
        active: false,
        animate: {
            easing: 'easeInOutQuart',
            duration: 400
        },
        icons: {
            header: "ui-icon-triangle-1-e",
            activeHeader: "ui-icon-triangle-1-s"
        }
    });

    // Tooltips für alle Info-Icons, Navigation und Garten-Elemente
    $('[data-tooltip]').tooltip({
        position: {
            my: "left+15 center",
            at: "right center"
        },
        show: {
            effect: "fadeIn",
            duration: 200
        },
        hide: {
            effect: "fadeOut",
            duration: 200
        },
        classes: {
            "ui-tooltip": "eco-tooltip"
        }
    });

    // Navigation Tooltips
    $('nav a').each(function() {
        let tooltipText = '';
        switch($(this).text().trim()) {
            case 'Home':
                tooltipText = 'Zurück zur Startseite';
                break;
            case 'Klimawandel':
                tooltipText = 'Erfahre mehr über Klimawandel und seine Auswirkungen';
                break;
            case 'Gardening':
                tooltipText = 'Tipps und Tricks für deinen Garten';
                break;
            case 'Resteverwertung':
                tooltipText = 'Nachhaltig kochen und Lebensmittel verwerten';
                break;
            case 'Organisationen':
                tooltipText = 'Organisationen für Nachhaltigkeit';
                break;
            case 'Gartenbewässerung':
                tooltipText = 'Nachhaltige Bewässerungsmethoden';
                break;
            case 'Kontakt':
                tooltipText = 'Schreib uns eine Nachricht';
                break;
        }
        $(this).tooltip({
            content: tooltipText,
            position: { my: "left top+15", at: "left bottom", collision: "flipfit" },
            classes: {
                "ui-tooltip": "eco-tooltip"
            }
        });
    });

    // Garten-Tooltips
    $('.plant-item').tooltip({
        content: function() {
            const plant = $(this).data('plant');
            const tooltips = {
                tomato: "Ideal für sonnige Standorte, regelmäßig gießen",
                lettuce: "Schnell wachsend, ideal für Anfänger",
                carrot: "Benötigt lockeren Boden, geduldig sein",
                herbs: "Perfekt für die Fensterbank",
                berries: "Mehrjährig, braucht viel Sonne"
            };
            return tooltips[plant] || "Ziehe mich in deinen Garten!";
        },
        position: { my: "left+15 center", at: "right center" }
    });

    // Dialog für wichtige Meldungen
    function showEcoDialog(title, content) {
        const dialog = $('<div>').attr('title', title).html(content);

        dialog.dialog({
            modal: true,
            width: 400,
            classes: {
                "ui-dialog": "eco-dialog"
            },
            buttons: [
                {
                    text: "Verstanden",
                    class: "eco-button",
                    click: function() {
                        $(this).dialog("close");
                    }
                }
            ],
            show: {
                effect: "fade",
                duration: 300
            },
            hide: {
                effect: "fade",
                duration: 300
            }
        });
    }

    // Globale Dialog-Funktion verfügbar machen
    window.showEcoDialog = showEcoDialog;
});