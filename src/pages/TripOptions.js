import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GiftGlobe from '../components/game/GiftGlobe';
import { tripOptions } from '../game/tripOptions';
import styles from './styles/TripOptions.module.css';

function TripOptions() {
    const [activeIndex, setActiveIndex] = useState(0);
    const trip = tripOptions[activeIndex];

    const showPrevious = useCallback(() => {
        setActiveIndex(current => (current - 1 + tripOptions.length) % tripOptions.length);
    }, []);

    const showNext = useCallback(() => {
        setActiveIndex(current => (current + 1) % tripOptions.length);
    }, []);

    useEffect(() => {
        document.title = 'Mason’s Gift';
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') showPrevious();
            if (event.key === 'ArrowRight') showNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showNext, showPrevious]);

    return (
        <main className={styles.optionsPage}>
            <Link
                className={styles.exit}
                to="/"
                aria-label="Close gift options"
                data-umami-event="navigation-click"
                data-umami-event-destination="/"
                data-umami-event-element="trip-options-exit"
            >
                ×
            </Link>

            <header className={styles.intro}>
                <h1>Pick where we go next.</h1>
                <p>Your choice... and I’ll cover every expense except the flight. I’ll be flying business class - you enjoy that 65F seat to Milan though xD</p>
            </header>

            <section className={styles.revealStage} aria-label="Trip options">
                <div className={styles.globePanel}>
                    <GiftGlobe trip={trip} />
                    <div className={styles.globeCaption} aria-live="polite">
                        <span>Now looking at</span>
                        <strong>{trip.displayCountry || trip.country}</strong>
                    </div>
                </div>

                <article className={styles.tripCard} key={trip.id} aria-live="polite">
                    <div className={styles.imageFrame}>
                        <img src={trip.image} alt={trip.imageAlt} />
                        <p className={styles.counter}>{String(activeIndex + 1).padStart(2, '0')} / {String(tripOptions.length).padStart(2, '0')}</p>
                    </div>

                    <div className={styles.cardBody}>
                        <div className={styles.tripMeta}>
                            <span>{trip.duration}</span>
                            <span>{trip.route}</span>
                        </div>

                        <p className={styles.country}>{trip.displayCountry || trip.country}</p>
                        <h2>{trip.title}</h2>
                        <p className={styles.summary}>{trip.summary}</p>

                        <div className={styles.itinerary}>
                            <h3>The shape of the trip</h3>
                            <ol>
                                {trip.itinerary.map((stop) => (
                                    <li key={stop.label}>
                                        <strong>{stop.label}</strong>
                                        <span>{stop.detail}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </article>
            </section>

            <nav className={styles.tripNavigation} aria-label="Choose a trip">
                <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous trip"
                    data-umami-event="trip-option-navigation"
                    data-umami-event-direction="previous"
                    data-umami-event-from={trip.id}
                >
                    <span aria-hidden="true">←</span>
                    Previous
                </button>

                <div className={styles.dots}>
                    {tripOptions.map((option, index) => (
                        <button
                            className={index === activeIndex ? styles.activeDot : ''}
                            key={option.id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Show ${option.displayCountry || option.country}: ${option.title}`}
                            aria-current={index === activeIndex ? 'true' : undefined}
                            data-umami-event="trip-option-select"
                            data-umami-event-trip={option.id}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next trip"
                    data-umami-event="trip-option-navigation"
                    data-umami-event-direction="next"
                    data-umami-event-from={trip.id}
                >
                    Next
                    <span aria-hidden="true">→</span>
                </button>
            </nav>

            <p className={styles.promise}>You tell me which and we’ll find dates that work for us both in 2027.</p>
        </main>
    );
}

export default TripOptions;
