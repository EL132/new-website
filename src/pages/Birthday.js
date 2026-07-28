import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GameCanvas from '../components/game/GameCanvas';
import { journeyStops } from '../game/journeyContent';
import styles from './styles/Birthday.module.css';

function Birthday() {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [encounter, setEncounter] = useState(null);
    const [joke, setJoke] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answerStatus, setAnswerStatus] = useState('');

    useEffect(() => {
        document.title = 'Birthday?';
    }, []);

    useEffect(() => {
        if (isPlaying) return undefined;

        const handleEnter = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                setIsPlaying(true);
                setShowInstructions(true);
            }
        };

        window.addEventListener('keydown', handleEnter);
        return () => window.removeEventListener('keydown', handleEnter);
    }, [isPlaying]);

    const startGame = () => {
        setIsPlaying(true);
        setShowInstructions(true);
    };

    const exitGame = () => {
        setIsPlaying(false);
        setShowInstructions(false);
        setEncounter(null);
        setJoke('');
        setIsComplete(false);
    };

    const completeStop = () => {
        const nextStep = activeStep + 1;
        setEncounter(null);
        setSelectedAnswer('');
        setAnswerStatus('');
        setActiveStep(nextStep);

        if (nextStep === journeyStops.length) {
            setIsComplete(true);
        }
    };

    const openEncounter = (stop) => {
        setSelectedAnswer('');
        setAnswerStatus('');
        setEncounter(stop);
    };

    const closeEncounter = () => {
        setEncounter(null);
        setSelectedAnswer('');
        setAnswerStatus('');
    };

    const checkAnswer = (event) => {
        event.preventDefault();
        if (!selectedAnswer || !encounter) return;
        setAnswerStatus(selectedAnswer === encounter.answer ? 'correct' : 'wrong');
    };

    const gameIsPaused = showInstructions || Boolean(encounter) || Boolean(joke) || isComplete;

    if (!isPlaying) {
        return (
            <main className={styles.landing}>
                <Link
                    className={styles.landingExit}
                    to="/"
                    aria-label="Exit Birthday experience"
                    data-umami-event="navigation-click"
                    data-umami-event-destination="/"
                    data-umami-event-element="birthday-landing-exit"
                >
                    ×
                </Link>

                <p className={styles.letter}>
                    I’ve been thinking about doing this since the moment we traveled together. You’ve helped us explore the world, and now it’s my turn.
                </p>

                <button
                    className={styles.riverCard}
                    type="button"
                    onClick={startGame}
                    data-umami-event="birthday-game-start"
                    data-umami-event-method="river-card"
                >
                    <span className={styles.riverPortrait} aria-hidden="true">
                        <span
                            className={styles.riverSprite}
                            style={{
                                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/mason-gift-assets/Spritesheet/roguelikeChar_transparent.png)`
                            }}
                        />
                    </span>
                    <span className={styles.riverCopy}>
                        <span className={styles.riverLabel}>Play as</span>
                        <strong>River</strong>
                    </span>
                    <span className={styles.arrow} aria-hidden="true">→</span>
                </button>

                <p className={styles.enterHint}>Click River or press Enter</p>
            </main>
        );
    }

    return (
        <main className={styles.gamePage}>
            <GameCanvas
                activeStep={activeStep}
                paused={gameIsPaused}
                onEncounter={openEncounter}
                onJoke={setJoke}
            />

            <div className={styles.progress} aria-label={`${activeStep} of ${journeyStops.length} steps completed`}>
                <span aria-hidden="true">👣</span>
                <strong>{activeStep}/{journeyStops.length}</strong>
            </div>

            <button
                className={styles.gameExit}
                type="button"
                onClick={exitGame}
                aria-label="Exit game"
                data-umami-event="birthday-game-exit"
                data-umami-event-step={activeStep + 1}
            >
                ×
            </button>

            {showInstructions && (
                <div className={styles.modalBackdrop}>
                    <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="river-intro-title">
                        <button
                            className={styles.modalClose}
                            type="button"
                            onClick={() => setShowInstructions(false)}
                            aria-label="Begin playing"
                            data-umami-event="birthday-instructions-close"
                        >
                            ×
                        </button>
                        <p className={styles.modalEyebrow}>Entering the map</p>
                        <h1 id="river-intro-title">You’re playing as River.</h1>
                        <p>Follow the glowing marker. Get close to each home to uncover the next stop, and try not to wander somewhere stupid.</p>
                        <p className={styles.keyHint}>Move with the arrow keys or WASD.</p>
                    </section>
                </div>
            )}

            {encounter && (
                <div className={styles.modalBackdrop}>
                    <section className={`${styles.modal} ${styles.questionModal}`} role="dialog" aria-modal="true" aria-labelledby="checkpoint-title">
                        <button
                            className={styles.modalClose}
                            type="button"
                            onClick={closeEncounter}
                            aria-label="Close checkpoint"
                            data-umami-event="birthday-checkpoint-close"
                            data-umami-event-checkpoint={encounter.id}
                        >
                            ×
                        </button>
                        <p className={styles.modalEyebrow}>Stop {activeStep + 1} of {journeyStops.length}</p>
                        <h2 id="checkpoint-title">{encounter.title}</h2>
                        <p className={styles.question}>{encounter.question}</p>

                        <form onSubmit={checkAnswer}>
                            <fieldset className={styles.answers}>
                                <legend>Choose one answer</legend>
                                {encounter.options.map((option, optionIndex) => (
                                    <label
                                        className={`${styles.answerOption} ${selectedAnswer === option ? styles.answerOptionSelected : ''}`}
                                        key={option}
                                    >
                                        <input
                                            type="radio"
                                            name={`answer-${encounter.id}`}
                                            value={option}
                                            checked={selectedAnswer === option}
                                            onChange={() => {
                                                setSelectedAnswer(option);
                                                setAnswerStatus('');
                                            }}
                                            data-umami-event="birthday-answer-select"
                                            data-umami-event-checkpoint={encounter.id}
                                            data-umami-event-option={optionIndex + 1}
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </fieldset>

                            {answerStatus === 'wrong' && (
                                <p className={`${styles.answerFeedback} ${styles.answerWrong}`} role="alert">
                                    Nope. River isn’t moving until you get this right.
                                </p>
                            )}

                            {answerStatus === 'correct' && (
                                <p className={`${styles.answerFeedback} ${styles.answerCorrect}`} role="status">
                                    Correct. The next part of the path is open.
                                </p>
                            )}

                            {answerStatus === 'correct' ? (
                                <button
                                    className={styles.continueButton}
                                    type="button"
                                    onClick={completeStop}
                                    data-umami-event="birthday-checkpoint-continue"
                                    data-umami-event-checkpoint={encounter.id}
                                >
                                    Continue the journey
                                </button>
                            ) : (
                                <button
                                    className={styles.continueButton}
                                    type="submit"
                                    disabled={!selectedAnswer}
                                    data-umami-event="birthday-answer-submit"
                                    data-umami-event-checkpoint={encounter.id}
                                >
                                    Lock it in
                                </button>
                            )}
                        </form>
                    </section>
                </div>
            )}

            {joke && (
                <div className={styles.modalBackdrop}>
                    <section className={`${styles.modal} ${styles.jokeModal}`} role="alertdialog" aria-modal="true">
                        <button
                            className={styles.modalClose}
                            type="button"
                            onClick={() => setJoke('')}
                            aria-label="Close message"
                            data-umami-event="birthday-joke-close"
                            data-umami-event-element="close-button"
                        >
                            ×
                        </button>
                        <p className={styles.joke}>{joke}</p>
                        <button
                            className={styles.continueButton}
                            type="button"
                            onClick={() => setJoke('')}
                            data-umami-event="birthday-joke-close"
                            data-umami-event-element="continue-button"
                        >
                            Fine.
                        </button>
                    </section>
                </div>
            )}

            {isComplete && (
                <div className={styles.modalBackdrop}>
                    <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="complete-title">
                        <p className={styles.modalEyebrow}>All four stops complete</p>
                        <h2 id="complete-title">well loooook at you. you made it. let’s take a peek at what i got you</h2>
                        <button
                            className={styles.continueButton}
                            type="button"
                            onClick={() => navigate('/birthday/options')}
                            data-umami-event="navigation-click"
                            data-umami-event-destination="/birthday/options"
                            data-umami-event-element="birthday-complete"
                        >
                            Continue
                        </button>
                    </section>
                </div>
            )}
        </main>
    );
}

export default Birthday;
