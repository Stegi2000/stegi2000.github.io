class DynamicContent {
    constructor() {
        // Tägliche Garten-Tipps
        this.gardenTips = [
            {
                title: "Frühlingszwiebeln",
                content: "Schneide deine Frühlingszwiebeln 2cm über der Wurzel ab und pflanze sie in Wasser - sie wachsen nach!",
                image: "media/img/dynamic_content/fruehlingszwiebeln.jpg"
            },
            {
                title: "Kompostierung",
                content: "Verwende Kaffeesatz als natürlichen Dünger für deine Pflanzen. Reich an Stickstoff und super für Tomaten!",
                image: "media/img/dynamic_content/Komposthaufen.jpg"
            },
            {
                title: "Wassersparen",
                content: "Gieße deine Pflanzen früh morgens oder spät abends, um Verdunstung zu minimieren.",
                image: "media/img/dynamic_content/wassersparen.jpg"
            },
            {
                title: "Companion Planting",
                content: "Pflanze Basilikum neben deinen Tomaten - das verbessert den Geschmack und hält Schädlinge fern!",
                image: "media/img/dynamic_content/companion_planting_garden.jpg"
            },
            {
                title: "Zero Waste",
                content: "Aus Gemüseresten wie Salat, Kohl oder Lauch kannst du neue Pflanzen ziehen.",
                image: "media/img/dynamic_content/zero_waste.jpg"
            }
        ];

        // Hero Images für verschiedene Jahreszeiten
        this.seasonalHeros = {
            spring: "media/img/index/spring-garden.jpg",
            summer: "media/img/index/summer-garden.jpg",
            autumn: "media/img/index/autumn-garden.jpg",
            winter: "media/img/index/winter-garden.jpg"
        };

        this.init();
    }

    init() {
        this.updateDailyTip();
        this.updateSeasonalContent();
        this.scheduleMidnightUpdate(); // Aufruf der neuen Funktion
    }
    scheduleMidnightUpdate() {
        const now = new Date();
        const nextMidnight = new Date(now);
        nextMidnight.setHours(24, 0, 0, 0); // Setze auf Mitternacht des nächsten Tages
        const timeUntilMidnight = nextMidnight - now;
            setTimeout(() => {
                this.updateDailyTip();
                this.scheduleMidnightUpdate();
            }, timeUntilMidnight);
    }


    updateDailyTip() {
        // Zufälligen Index auswählen
        const tipIndex = Math.floor(Math.random() * this.gardenTips.length);
        const tip = this.gardenTips[tipIndex];



        // Erstelle oder aktualisiere Tipp des Tages
        const tipContainer = document.createElement('div');
        tipContainer.className = 'daily-tip';
        tipContainer.innerHTML = `
            <h3>🌱 Tipp des Tages</h3>
            <div class="tip-content">
                <img src="${tip.image}" alt="${tip.title}" class="tip-image">
                <div class="tip-text">
                    <h4>${tip.title}</h4>
                    <p>${tip.content}</p>
                </div>
            </div>
        `;

        // Füge den Tipp zur Seite hinzu
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            aboutSection.insertBefore(tipContainer, aboutSection.firstChild);
        }

        // Animation hinzufügen
        setTimeout(() => {
            tipContainer.classList.add('visible');
        }, 100);
    }

    updateSeasonalContent() {
        const today = new Date();
        const month = today.getMonth();

        // Bestimme Jahreszeit
        const seasons = ['winter', 'spring', 'summer', 'autumn'];
        const season = seasons[Math.floor((month / 3) % 4)];

        // Update Hero Image
        const heroImage = document.querySelector('.hero img');
        if (heroImage) {
            heroImage.src = this.seasonalHeros[season];
            heroImage.alt = `Garten im ${this.getSeasonName(season)}`;
        }

        // Update Hero Text
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            heroTitle.textContent = this.getSeasonalTitle(season);
        }
    }

    getSeasonName(season) {
        const names = {
            spring: 'Frühling',
            summer: 'Sommer',
            autumn: 'Herbst',
            winter: 'Winter'
        };
        return names[season];
    }

    getSeasonalTitle(season) {
        const titles = {
            spring: 'Zeit zum Säen und Wachsen!',
            summer: 'Ernte die Früchte deiner Arbeit!',
            autumn: 'Vorbereitung auf die Ruhephase',
            winter: 'Plane deinen Frühlingsgarten!'
        };
        return titles[season];
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    new DynamicContent();
});