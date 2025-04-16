'use strict';

class KlimawandelQuiz {
    constructor() {
        this.quizContainer = document.getElementById('quiz-container');
        this.quizResult = document.getElementById('quiz-result');
        this.currentQuestion = 0;
        this.correctAnswers = 0;

        this.questions = [
            {
                question: 'Was ist die Hauptursache des Klimawandels?',
                answers: [
                    {
                        text: 'Vulkanausbrüche',
                        correct: false,
                        explanation: 'Obwohl Vulkanausbrüche CO2 freisetzen, sind sie nur für etwa 1% der weltweiten CO2-Emissionen verantwortlich. Der menschengemachte CO2-Ausstoß ist deutlich höher.'
                    },
                    {
                        text: 'Treibhausgasemissionen durch menschliche Aktivitäten',
                        correct: true,
                        explanation: 'Richtig! Seit der industriellen Revolution hat sich der CO2-Gehalt in der Atmosphäre durch menschliche Aktivitäten um über 45% erhöht.'
                    },
                    {
                        text: 'Sonnenaktivität',
                        correct: false,
                        explanation: 'Die Sonnenaktivität hat zwar Einfluss auf unser Klima, aber die aktuell beobachtete Erwärmung kann damit nicht erklärt werden. Die Sonne zeigt sogar einen leicht abkühlenden Trend.'
                    },
                    {
                        text: 'Naturkatastrophen',
                        correct: false,
                        explanation: 'Naturkatastrophen sind eher eine Folge als eine Ursache des Klimawandels. Sie werden durch die globale Erwärmung sogar häufiger und intensiver.'
                    }
                ]
            },
            {
                question: 'Welche Maßnahme trägt NICHT zur Reduzierung des CO2-Ausstoßes bei?',
                answers: [
                    {
                        text: 'Nutzung öffentlicher Verkehrsmittel',
                        correct: false,
                        explanation: 'Öffentliche Verkehrsmittel reduzieren den CO2-Ausstoß deutlich. Ein Bus mit 40 Personen ersetzt bis zu 30 Autos!'
                    },
                    {
                        text: 'Pflanzung von Bäumen',
                        correct: false,
                        explanation: 'Bäume sind natürliche CO2-Speicher. Ein einzelner Baum kann in seinem Leben bis zu 1 Tonne CO2 aufnehmen.'
                    },
                    {
                        text: 'Verbrennung fossiler Brennstoffe',
                        correct: true,
                        explanation: 'Die Verbrennung fossiler Brennstoffe ist einer der Hauptgründe für den CO2-Anstieg. Allein der Verkehrssektor ist für etwa 20% der globalen CO2-Emissionen verantwortlich.'
                    },
                    {
                        text: 'Nutzung erneuerbarer Energien',
                        correct: false,
                        explanation: 'Erneuerbare Energien wie Wind und Solar produzieren während des Betriebs kein CO2 und sind damit klimafreundlich.'
                    }
                ]
            },
            {
                question: 'Was versteht man unter dem "Treibhauseffekt"?',
                answers: [
                    {
                        text: 'Ein Effekt, der nur in Gewächshäusern auftritt',
                        correct: false,
                        explanation: 'Der Treibhauseffekt ist ein natürliches Phänomen der Erdatmosphäre, nicht nur in Gewächshäusern. Ohne ihn wäre die Erde etwa 33°C kälter.'
                    },
                    {
                        text: 'Die Erwärmung der Erde durch Treibhausgase in der Atmosphäre',
                        correct: true,
                        explanation: 'Richtig! Treibhausgase wie CO2 lassen Sonnenlicht durch, halten aber die Wärmestrahlung der Erde zurück. Der verstärkte Treibhauseffekt durch menschliche Aktivitäten führt zur globalen Erwärmung.'
                    },
                    {
                        text: 'Die Abkühlung der Pole durch Eisschmelze',
                        correct: false,
                        explanation: 'Die Eisschmelze ist eine Folge der globalen Erwärmung, nicht ihre Ursache. Sie verstärkt den Klimawandel sogar noch, da helle Eisflächen mehr Sonnenlicht reflektieren als dunkles Wasser.'
                    },
                    {
                        text: 'Die Entstehung von Ozonlöchern',
                        correct: false,
                        explanation: 'Das Ozonloch ist ein separates Umweltproblem, das durch FCKW verursacht wird. Obwohl es auch klimarelevant ist, ist es nicht dasselbe wie der Treibhauseffekt.'
                    }
                ]
            },
            {
                question: 'Welche Auswirkung hat der Klimawandel auf die Ozeane?',
                answers: [
                    {
                        text: 'Versauerung durch CO2-Aufnahme',
                        correct: true,
                        explanation: 'Richtig! Die Ozeane nehmen etwa 25% des menschengemachten CO2 auf. Dies führt zu einer Versauerung des Wassers, was besonders Korallen und Schalentiere bedroht.'
                    },
                    {
                        text: 'Verringerung des Salzgehalts',
                        correct: false,
                        explanation: 'Der Salzgehalt verändert sich zwar regional durch die Eisschmelze, aber global gesehen ist dies nicht die Hauptauswirkung des Klimawandels auf die Ozeane.'
                    },
                    {
                        text: 'Abnahme der Wassertemperatur',
                        correct: false,
                        explanation: 'Die Ozeane werden wärmer, nicht kälter. Sie haben bereits über 90% der zusätzlichen Wärme durch den Klimawandel aufgenommen.'
                    },
                    {
                        text: 'Zunahme der Fischpopulationen',
                        correct: false,
                        explanation: 'Der Klimawandel führt eher zu einem Rückgang der Fischpopulationen durch Erwärmung, Versauerung und Veränderungen in den Nahrungsketten.'
                    }
                ]
            },
            {
                question: 'Was ist der "Kipppunkt" im Zusammenhang mit dem Klimawandel?',
                answers: [
                    {
                        text: 'Der Punkt, an dem Bäume aufhören CO2 aufzunehmen',
                        correct: false,
                        explanation: 'Bäume nehmen weiterhin CO2 auf, aber ihre Kapazität kann durch Stress (Hitze, Trockenheit) beeinträchtigt werden.'
                    },
                    {
                        text: 'Der Zeitpunkt der vollständigen Eisschmelze',
                        correct: false,
                        explanation: 'Die Eisschmelze ist ein Beispiel für einen Kipppunkt, aber nicht die Definition. Es gibt verschiedene Kipppunkte im Klimasystem.'
                    },
                    {
                        text: 'Ein Punkt, ab dem sich Klimaveränderungen selbst verstärken',
                        correct: true,
                        explanation: 'Richtig! Kipppunkte sind kritische Schwellen, ab denen sich Veränderungen im Klimasystem selbst verstärken und möglicherweise unumkehrbar werden. Beispiele sind das Auftauen des Permafrosts oder das Abschmelzen der Polkappen.'
                    },
                    {
                        text: 'Das Ende der fossilen Brennstoffe',
                        correct: false,
                        explanation: 'Das Ende fossiler Brennstoffe wäre ein wirtschaftlicher Wendepunkt, aber kein klimatischer Kipppunkt im wissenschaftlichen Sinne.'
                    }
                ]
            }
        ];

        if (this.quizContainer) {
            this.init();
        }
    }

    init() {
        this.showStartScreen();
    }

    showStartScreen() {
        const startScreen = document.createElement('div');
        startScreen.className = 'quiz-start-screen';
        startScreen.innerHTML = `
            <div class="quiz-header">
                <h3>🌍 Klimawandel-Quiz</h3>
                <p>Teste dein Wissen über den Klimawandel und seine Auswirkungen. 
                   Das Quiz enthält ${this.questions.length} Fragen mit ausführlichen Erklärungen.</p>
            </div>
            <div class="quiz-features">
                <div class="feature">
                    <span class="feature-icon">📚</span>
                    <span class="feature-text">Lerne interessante Fakten</span>
                </div>
                <div class="feature">
                    <span class="feature-icon">💡</span>
                    <span class="feature-text">Verstehe Zusammenhänge</span>
                </div>
                <div class="feature">
                    <span class="feature-icon">🎯</span>
                    <span class="feature-text">Teste dein Wissen</span>
                </div>
            </div>
            <button class="eco-btn quiz-start-btn" id="start-quiz">
                <span class="btn-content">
                    <span class="btn-icon">🚀</span>
                    <span class="btn-text">Quiz starten</span>
                </span>
            </button>
        `;

        startScreen.querySelector('#start-quiz').addEventListener('click', () => {
            this.loadQuestion();
        });

        this.animateElement(startScreen);
    }

    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const questionElement = document.createElement('div');
        questionElement.className = 'quiz-question';

        questionElement.innerHTML = `
            <div class="question-header">
                <div class="question-progress">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(this.currentQuestion / this.questions.length) * 100}%"></div>
                    </div>
                    <span class="progress-text">Frage ${this.currentQuestion + 1} von ${this.questions.length}</span>
                </div>
            </div>
            <div class="question-content">
                <p class="question-text">${question.question}</p>
                <div class="answers-grid">
                    ${question.answers.map((answer, index) => `
                        <button class="answer-btn" data-index="${index}">
                            <span class="answer-text">${answer.text}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        questionElement.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                const answerIndex = parseInt(button.dataset.index);
                this.checkAnswer(question.answers[answerIndex], button);
            });
        });

        this.animateElement(questionElement);
    }

    animateElement(element) {
        this.quizContainer.innerHTML = '';
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        this.quizContainer.appendChild(element);

        requestAnimationFrame(() => {
            element.style.transition = 'all 0.5s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    checkAnswer(answer, button) {
        // Verhindere weitere Klicks
        const allButtons = button.closest('.answers-grid').querySelectorAll('button');
        allButtons.forEach(btn => btn.disabled = true);

        // Zeige richtig/falsch an
        button.classList.add(answer.correct ? 'correct' : 'incorrect');

        // Zeige die richtige Antwort
        if (!answer.correct) {
            allButtons.forEach(btn => {
                const answerData = this.questions[this.currentQuestion].answers[btn.dataset.index];
                if (answerData.correct) {
                    btn.classList.add('correct');
                }
            });
        }

        if (answer.correct) this.correctAnswers++;

        // Füge Erklärung hinzu
        const explanationBox = document.createElement('div');
        explanationBox.className = `explanation-box ${answer.correct ? 'correct' : 'incorrect'}`;
        explanationBox.innerHTML = `
            <div class="explanation-header">
                <span class="explanation-icon">${answer.correct ? '✅' : '❌'}</span>
                <span class="explanation-title">${answer.correct ? 'Richtig!' : 'Leider falsch!'}</span>
            </div>
            <p class="explanation-text">${answer.explanation}</p>
            <button class="eco-btn continue-btn">
                <span class="btn-content">
                    <span class="btn-text">Weiter</span>
                    <span class="btn-icon">➡️</span>
                </span>
            </button>
        `;

        button.closest('.quiz-question').appendChild(explanationBox);

        // Animation für die Erklärungsbox
        requestAnimationFrame(() => {
            explanationBox.style.transform = 'translateY(0)';
            explanationBox.style.opacity = '1';
        });

        // Event-Listener für den Weiter-Button
        explanationBox.querySelector('.continue-btn').addEventListener('click', () => {
            this.currentQuestion++;
            this.loadQuestion();
        });
    }

    showResults() {
        const percentage = (this.correctAnswers / this.questions.length) * 100;
        const resultScreen = document.createElement('div');
        resultScreen.className = 'quiz-result-screen';

        let result;
        if (percentage === 100) {
            result = {
                title: 'Perfekt! Du bist ein Klimaexperte! 🏆',
                message: 'Du hast ein außergewöhnliches Verständnis für den Klimawandel. Teile dein Wissen mit anderen!',
                icon: '🎓'
            };
        } else if (percentage >= 80) {
            result = {
                title: 'Sehr gut! Fast perfekt! 🌟',
                message: 'Du kennst dich richtig gut mit dem Klimawandel aus. Nur noch ein paar Details zum Perfektionieren!',
                icon: '📚'
            };
        } else if (percentage >= 60) {
            result = {
                title: 'Gut gemacht! 👍',
                message: 'Du hast ein solides Grundwissen über den Klimawandel. Weiter so!',
                icon: '📖'
            };
        } else {
            result = {
                title: 'Ein guter Anfang! 🌱',
                message: 'Jede Reise beginnt mit dem ersten Schritt. Lerne weiter über den Klimawandel - es betrifft uns alle!',
                icon: '🌍'
            };
        }

        resultScreen.innerHTML = `
            <div class="result-header">
                <span class="result-icon">${result.icon}</span>
                <h3>${result.title}</h3>
            </div>
            
            <div class="result-stats">
                <div class="stats-circle">
                    <svg viewBox="0 0 36 36" class="circular-chart">
                        <path d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#eee"
                            stroke-width="3"
                        />
                        <path d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#4caf50"
                            stroke-width="3"
                            stroke-dasharray="${percentage}, 100"
                        />
                        <text x="18" y="20.35" class="percentage">${percentage}%</text>
                    </svg>
                </div>
                <p class="stats-text">
                    Du hast ${this.correctAnswers} von ${this.questions.length} 
                    Fragen richtig beantwortet
                </p>
            </div>
            
            <p class="result-message">${result.message}</p>
            
            <div class="result-actions">
                <button class="eco-btn quiz-restart-btn" id="restart-quiz">
                    <span class="btn-content">
                        <span class="btn-icon">🔄</span>
                        <span class="btn-text">Quiz neu starten</span>
                    </span>
                </button>
                <a href="#" class="learn-more-link">
                    Mehr über den Klimawandel lernen
                </a>
            </div>
        `;

        resultScreen.querySelector('#restart-quiz').addEventListener('click', () => {
            this.currentQuestion = 0;
            this.correctAnswers = 0;
            this.showStartScreen();
        });

        this.animateElement(resultScreen);
    }
}
// Am Ende von klimawandelQuiz.js hinzufügen:
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz-container')) {
        new KlimawandelQuiz();
    }
});