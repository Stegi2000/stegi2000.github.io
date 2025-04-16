class CardCarousel {
    constructor() {
        this.currentIndex = 0;
        this.cards = document.querySelectorAll('.highlight-cards .card');
        this.totalCards = this.cards.length;
        this.isPlaying = false;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        // Container für die Carousel-Steuerung erstellen
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'carousel-controls';

        // Navigation Buttons
        this.prevBtn = document.createElement('button');
        this.nextBtn = document.createElement('button');
        this.prevBtn.className = 'carousel-btn prev';
        this.nextBtn.className = 'carousel-btn next';
        this.prevBtn.innerHTML = '←';
        this.nextBtn.innerHTML = '→';

        // Play/Pause Button
        this.playPauseBtn = document.createElement('button');
        this.playPauseBtn.className = 'carousel-btn play-pause';
        this.playPauseBtn.innerHTML = '⏸';

        // Reset Button
        this.resetBtn = document.createElement('button');
        this.resetBtn.className = 'carousel-btn reset';
        this.resetBtn.innerHTML = '⟳';

        // Indikator für aktuelle Position
        this.indicator = document.createElement('div');
        this.indicator.className = 'carousel-indicator';

        // Controls zusammenfügen
        controlsContainer.appendChild(this.prevBtn);
        controlsContainer.appendChild(this.indicator);
        controlsContainer.appendChild(this.nextBtn);
        controlsContainer.appendChild(this.playPauseBtn);
        controlsContainer.appendChild(this.resetBtn);

        // Controls einfügen
        const highlightSection = document.querySelector('.highlights');
        highlightSection.insertBefore(controlsContainer, document.querySelector('.highlight-cards'));

        // Event Listener
        this.setupEventListeners();

        // Initialer Zustand
        this.updateDisplay();
        this.startAutoPlay();
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.playPauseBtn.addEventListener('click', () => this.toggleAutoPlay());
        this.resetBtn.addEventListener('click', () => this.resetCarousel());

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    updateDisplay() {
        // Karten aktualisieren
        this.cards.forEach((card, index) => {
            if (index === this.currentIndex) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
            }
            card.style.position = 'absolute';
            card.style.transition = 'all 0.5s ease-in-out';
        });

        // Buttons aktualisieren
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.totalCards - 1;

        // Indikator aktualisieren
        this.indicator.textContent = `${this.currentIndex + 1} / ${this.totalCards}`;
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateDisplay();
        }
    }

    nextSlide() {
        if (this.currentIndex < this.totalCards - 1) {
            this.currentIndex++;
            this.updateDisplay();
        } else {
            this.pauseAutoPlay();
        }
    }

    startAutoPlay() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.playPauseBtn.innerHTML = '⏸';
            this.autoPlayInterval = setInterval(() => {
                if (this.currentIndex < this.totalCards - 1) {
                    this.nextSlide();
                } else {
                    this.pauseAutoPlay();
                }
            }, 3000);
        }
    }

    pauseAutoPlay() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.playPauseBtn.innerHTML = '▶';
            clearInterval(this.autoPlayInterval);
        }
    }

    toggleAutoPlay() {
        if (this.isPlaying) {
            this.pauseAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }

    resetCarousel() {
        this.currentIndex = 0;
        this.updateDisplay();
        this.startAutoPlay();
    }
}

// Initialisierung wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.highlight-cards')) {
        new CardCarousel();
    }
});