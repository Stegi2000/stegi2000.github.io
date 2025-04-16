'use strict';

class GardenPlanner {
    constructor() {
        this.gardenKey = 'saved_garden';
        this.plants = {
            tomato: {
                name: 'Tomaten',
                emoji: '🍅',
                plantingTime: 'April - Mai',
                waterNeeds: 'Regelmäßig, aber nicht zu viel',
                harvestTime: 'Juli - Oktober',
                tips: 'Ideal für sonnige Standorte. Gut kombinierbar mit Basilikum.'
            },
            lettuce: {
                name: 'Salat',
                emoji: '🥬',
                plantingTime: 'März - September',
                waterNeeds: 'Gleichmäßig feucht halten',
                harvestTime: '4-6 Wochen nach Pflanzung',
                tips: 'Perfekt für Anfänger. Kann mehrmals geerntet werden.'
            },
            carrot: {
                name: 'Karotten',
                emoji: '🥕',
                plantingTime: 'März - Juli',
                waterNeeds: 'Moderat',
                harvestTime: '3-4 Monate nach Aussaat',
                tips: 'Lockerer Boden wichtig für gerades Wachstum.'
            },
            herbs: {
                name: 'Kräuter',
                emoji: '🌿',
                plantingTime: 'Ganzjährig möglich',
                waterNeeds: 'Je nach Kraut unterschiedlich',
                harvestTime: 'Fortlaufend',
                tips: 'Ideal für die Fensterbank oder den Balkon.'
            },
            berries: {
                name: 'Beeren',
                emoji: '🫐',
                plantingTime: 'Oktober - November',
                waterNeeds: 'Regelmäßig gießen',
                harvestTime: 'Juni - August',
                tips: 'Mehrjährige Pflanze, braucht viel Sonne.'
            }
        };

        this.init();
    }

    init() {
        this.createPlannerUI();
        this.initializeDragAndDrop();
        this.setupEventListeners();
        this.loadSavedGarden();
    }

    createPlannerUI() {
        const plannerContainer = document.createElement('div');
        plannerContainer.className = 'garden-planner';
        plannerContainer.innerHTML = `
            <h2>🌱 Garten-Planer</h2>
            <p>Plane deinen nachhaltigen Garten durch Drag & Drop</p>
            
            <div class="planner-interface">
                <div class="plant-palette">
                    <h3>Pflanzen</h3>
                    <div class="plant-items">
                        ${Object.entries(this.plants).map(([key, plant]) => `
                            <div class="plant-item" data-plant="${key}" draggable="true">
                                ${plant.emoji} ${plant.name}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="garden-grid">
                    ${this.createGardenGrid(4, 4)}
                </div>
                
                <div class="planner-info">
                    <h3>Info</h3>
                    <div id="plant-info"></div>
                    <div class="planner-actions">
                        <button id="reset-garden" class="eco-btn">Garten zurücksetzen</button>
                        <button id="save-garden" class="eco-btn">Garten speichern</button>
                    </div>
                </div>
            </div>
        `;

        const targetSection = document.querySelector('.about') || document.querySelector('main');
        if (targetSection) {
            targetSection.appendChild(plannerContainer);
        }
    }

    createGardenGrid(rows, cols) {
        let grid = '<div class="grid-container">';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid += `
                    <div class="grid-cell" data-row="${i}" data-col="${j}">
                        <div class="drop-zone"></div>
                    </div>
                `;
            }
        }
        grid += '</div>';
        return grid;
    }

    initializeDragAndDrop() {
        const plantItems = document.querySelectorAll('.plant-item');
        const dropZones = document.querySelectorAll('.drop-zone');

        plantItems.forEach(item => {
            item.addEventListener('dragstart', (e) => this.handleDragStart(e));
            item.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => this.handleDragOver(e));
            zone.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            zone.addEventListener('drop', (e) => this.handleDrop(e));
        });
    }

    setupEventListeners() {
        document.getElementById('reset-garden')?.addEventListener('click', () => this.resetGarden());
        document.getElementById('save-garden')?.addEventListener('click', () => this.saveGarden());

        // Cookie Consent Listener
        document.addEventListener('cookieConsentUpdate', (e) => {
            if (!e.detail.functional) {
                localStorage.removeItem(this.gardenKey);
                this.resetGarden();
            }
        });
    }

    handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.dataset.plant);
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.target.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        const zone = e.target;
        zone.classList.remove('drag-over');

        const plantType = e.dataTransfer.getData('text/plain');
        this.plantInZone(zone, plantType);
    }

    plantInZone(zone, plantType) {
        const plant = this.plants[plantType];
        if (!plant) return;

        zone.innerHTML = '';
        const plantElement = document.createElement('div');
        plantElement.className = 'planted-item';
        plantElement.dataset.plant = plantType;

        plantElement.innerHTML = `
            <span class="plant-emoji">${plant.emoji}</span>
            <span class="plant-name">${plant.name}</span>
        `;

        zone.appendChild(plantElement);
        this.showPlantInfo(plantType);
        plantElement.style.animation = 'plantGrow 0.5s ease-out';
    }

    showPlantInfo(plantType) {
        const plant = this.plants[plantType];
        if (!plant) return;

        const infoDiv = document.getElementById('plant-info');
        if (!infoDiv) return;

        infoDiv.innerHTML = `
            <div class="plant-info-card">
                <h4>${plant.name}</h4>
                <p><strong>Pflanzzeit:</strong> ${plant.plantingTime}</p>
                <p><strong>Wasserbedarf:</strong> ${plant.waterNeeds}</p>
                <p><strong>Erntezeit:</strong> ${plant.harvestTime}</p>
                <p><strong>Tipp:</strong> ${plant.tips}</p>
            </div>
        `;
    }

    saveGarden() {
        if (!window.checkCookieConsent?.('functional')) {
            this.showDialog(
                'Cookie-Einwilligung erforderlich',
                'Um deinen Garten-Plan zu speichern, benötigen wir deine Zustimmung für funktionale Cookies.',
                [
                    {
                        text: "Einstellungen öffnen",
                        primary: true,
                        action: () => {
                            if (window.EcoCookieConsent) {
                                new EcoCookieConsent().showBanner();
                            }
                        }
                    },
                    {
                        text: "Abbrechen",
                        primary: false
                    }
                ]
            );
            return;
        }

        const garden = this.captureGardenState();
        try {
            localStorage.setItem(this.gardenKey, JSON.stringify({
                data: garden,
                timestamp: new Date().toISOString()
            }));

            this.showDialog(
                'Garten gespeichert',
                'Dein Garten-Plan wurde erfolgreich gespeichert! 🌱'
            );
        } catch (e) {
            console.error('Fehler beim Speichern:', e);
            this.showDialog(
                'Fehler beim Speichern',
                'Entschuldigung, dein Garten-Plan konnte nicht gespeichert werden. Bitte versuche es später erneut.'
            );
        }
    }

    loadSavedGarden() {
        if (!window.checkCookieConsent?.('functional')) {
            localStorage.removeItem(this.gardenKey);
            return;
        }

        try {
            const saved = localStorage.getItem(this.gardenKey);
            if (!saved) return;

            const { data, timestamp } = JSON.parse(saved);
            const savedDate = new Date(timestamp);
            const now = new Date();

            // Nur Daten der letzten 24 Stunden laden
            if ((now - savedDate) > 24 * 60 * 60 * 1000) {
                localStorage.removeItem(this.gardenKey);
                return;
            }

            data.forEach(cell => {
                if (cell.plant) {
                    const gridCell = document.querySelector(
                        `.grid-cell[data-row="${cell.row}"][data-col="${cell.col}"]`
                    );
                    if (gridCell) {
                        const dropZone = gridCell.querySelector('.drop-zone');
                        this.plantInZone(dropZone, cell.plant);
                    }
                }
            });
        } catch (e) {
            console.error('Fehler beim Laden:', e);
            localStorage.removeItem(this.gardenKey);
        }
    }

    captureGardenState() {
        const garden = [];
        const cells = document.querySelectorAll('.grid-cell');

        cells.forEach(cell => {
            const planted = cell.querySelector('.planted-item');
            garden.push({
                row: parseInt(cell.dataset.row),
                col: parseInt(cell.dataset.col),
                plant: planted ? planted.dataset.plant : null
            });
        });

        return garden;
    }

    resetGarden() {
        this.showDialog(
            'Garten zurücksetzen',
            'Möchtest du wirklich deinen gesamten Garten-Plan löschen?',
            [
                {
                    text: "Ja, zurücksetzen",
                    primary: true,
                    action: () => {
                        const plantedItems = document.querySelectorAll('.planted-item');
                        plantedItems.forEach(item => {
                            item.style.animation = 'plantShrink 0.3s ease-out';
                            setTimeout(() => item.remove(), 300);
                        });

                        document.getElementById('plant-info').innerHTML = '';
                        localStorage.removeItem(this.gardenKey);

                        this.showDialog(
                            'Garten zurückgesetzt',
                            'Dein Garten wurde erfolgreich zurückgesetzt. Zeit für neue Ideen! 🌱'
                        );
                    }
                },
                {
                    text: "Abbrechen",
                    primary: false
                }
            ]
        );
    }

    showDialog(title, message, buttons = [{text: "OK", primary: true}]) {
        const dialog = document.createElement('div');
        dialog.className = 'eco-dialog';

        const content = `
            <div class="dialog-content">
                <h3>${title}</h3>
                <p>${message}</p>
                <div class="dialog-actions">
                    ${buttons.map(btn => `
                        <button class="eco-btn ${btn.primary ? 'primary' : 'secondary'}">
                            ${btn.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        dialog.innerHTML = content;

        const buttonElements = dialog.querySelectorAll('button');
        buttonElements.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (buttons[index].action) {
                    buttons[index].action();
                }
                dialog.remove();
            });
        });

        document.body.appendChild(dialog);
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    new GardenPlanner();
});