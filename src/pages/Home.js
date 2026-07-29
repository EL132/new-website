// Home.js
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleName from '../components/home/ParticleName';
import styles from './styles/Home.module.css';

function Home() {
    const [isParticleNameReady, setIsParticleNameReady] = useState(false);

    useEffect(() => {
        document.title = 'Home';
    }, []);

    const handleParticleNameReady = useCallback(() => {
        setIsParticleNameReady(true);
    }, []);

    const handleParticleNameUnavailable = useCallback(() => {
        setIsParticleNameReady(false);
    }, []);

    // pick random image from public folder
    const randomImage = useMemo(() => {
        const images = [
            {
                src: '/assets/home/option_two.jpg',
                alt: 'Close-up mirror selfie of Elias with curly hair.',
            },
            {
                src: '/assets/home/option_three.jpg',
                alt: 'Elias smiling in round tortoiseshell glasses.',
            },
            {
                src: '/assets/home/amor.JPG',
                alt: 'Elias and Simi smiling together in formal clothes.',
            },
            {
                src: '/assets/home/elias-thomas.jpg',
                alt: 'Elias and Thomas grinning with their arms around each other.',
            },
            {
                src: '/assets/home/grad.jpg',
                alt: 'Elias smiling outdoors in glasses and a graduation gown.',
            },
            {
                src: '/assets/home/lecture.jpg',
                alt: 'Elias speaking into a microphone during a lecture hall presentation.',
            },
            {
                src: '/assets/home/mason-elias.jpg',
                alt: 'Mason and Elias wearing bandanas over their faces in a desert.',
            },
            {
                src: '/assets/home/mason-simi-elias.JPG',
                alt: 'Elias, Simi, and Mason smiling together at graduation.',
            },
        ];
        return images[Math.floor(Math.random() * images.length)];
    }, []);

    return (
        <div className={styles.homeContainer}>
            <div className={styles.headerWrapper}>

                <img 
                    src={randomImage.src}
                    alt={randomImage.alt}
                    className={styles.headerImage}
                    width="180"
                    height="180"
                    decoding="async"
                />

                <div className={styles.headerSection}>
                    <h1
                        className={`${styles.headerTitle} ${styles.particleHeaderTitle} ${
                            isParticleNameReady ? styles.particleHeaderTitleReady : ''
                        }`}
                        aria-label="Elias"
                    >
                        <span className={styles.headerTitleFallback}>Elias</span>
                        <ParticleName
                            text="Elias"
                            className={styles.particleNameCanvas}
                            onReady={handleParticleNameReady}
                            onError={handleParticleNameUnavailable}
                        />
                    </h1>
                    <div className={styles.headerMeta}>
                        <div className={styles.pronunciationGroup}>
                            <p className={styles.pronunciation}>ih-LY-s</p>
                            <Link
                                className={styles.readAboutLink}
                                to="/about"
                                data-umami-event="navigation-click"
                                data-umami-event-destination="/about"
                                data-umami-event-element="definition"
                            >
                                definition
                            </Link>
                        </div>
                        <p className={styles.noun}>noun</p>
                    </div>
                </div>
            </div>

            <hr className={styles.divider}/>

            {/* definitions (three column design) */}
            <div className={styles.definitionsRow}>
                <div className={styles.definitionCol}>
                    <p>1. an <em> artist </em> set on discovering, capturing, and sharing his definition of the human experience.</p>
                    <ul className={styles.definitionLinks}>
                        <li>
                            <Link
                                to="/artist/photography"
                                data-umami-event="navigation-click"
                                data-umami-event-destination="/artist/photography"
                                data-umami-event-element="photography"
                            >
                                photography
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/artist/travel"
                                data-umami-event="navigation-click"
                                data-umami-event-destination="/artist/travel"
                                data-umami-event-element="travel"
                            >
                                travel
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.definitionCol}>
                    <p>2. an <em> engineer </em> with a cartoonish curiosity, fueled by admiration for those who create to satiate their temptation.</p>
                    <ul className={styles.definitionLinks}>
                        <li>
                            <Link
                                to="/engineer/making-things"
                                data-umami-event="navigation-click"
                                data-umami-event-destination="/engineer/making-things"
                                data-umami-event-element="making-things"
                            >
                                i like to make things
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/engineer/education"
                                data-umami-event="navigation-click"
                                data-umami-event-destination="/engineer/education"
                                data-umami-event-element="education"
                            >
                                education
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.definitionCol}>
                    <p>3. a <em> friend </em> who cares for the people and communities in his life.</p>
                    <ul className={styles.definitionLinks}>
                        <li>
                            <Link
                                to="/friend/things-ive-done"
                                data-umami-event="navigation-click"
                                data-umami-event-destination="/friend/things-ive-done"
                                data-umami-event-element="things-ive-done"
                            >
                                things i've done
                            </Link>
                        </li>
                    </ul>
                    <Link
                        className={styles.birthdayButton}
                        to="/birthday"
                        data-umami-event="navigation-click"
                        data-umami-event-destination="/birthday"
                        data-umami-event-element="birthday"
                    >
                        mason? birthday?
                    </Link>
                </div>
            </div>

            {/* positive impact section */}
            <div id="about" className={styles.impactSection}>
                <h4 className={styles.impactHeader}>I want to make a positive impact on the world.</h4>
            </div>
        </div>
    );
}

export default Home;
