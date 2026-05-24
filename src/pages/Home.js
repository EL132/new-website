// Home.js
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Home.module.css';

function Home() {
    useEffect(() => {
        document.title = 'Home';
    }, []);

    // pick random image from public folder
    const randomImage = useMemo(() => {
        const images = [
            "/assets/home/option_one.jpg",
            "/assets/home/option_two.jpg",
            "/assets/home/option_three.jpg"
        ];
        return images[Math.floor(Math.random() * images.length)];
    }, []);

    return (
        <div className={styles.homeContainer}>
            <div className={styles.headerWrapper}>

                <img 
                    src={randomImage}
                    alt="Elias portrait"
                    className={styles.headerImage}
                />

                <div className={styles.headerSection}>
                    <h1 className={styles.headerTitle}>Elias</h1>
                    <div className={styles.headerMeta}>
                        <div className={styles.pronunciationGroup}>
                            <p className={styles.pronunciation}>ih-LY-s</p>
                            <Link className={styles.readAboutLink} to="/about">
                                read about me
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
                        <li><Link to="/artist/photography">photography</Link></li>
                        <li><Link to="/artist/travel">travel</Link></li>
                    </ul>
                </div>
                <div className={styles.definitionCol}>
                    <p>2. an <em> engineer </em> with a cartoonish curiosity, fueled by admiration for those who create to satiate their temptation.</p>
                    <ul className={styles.definitionLinks}>
                        <li><Link to="/engineer/making-things">i like to make things</Link></li>
                        <li><Link to="/engineer/education">education</Link></li>
                    </ul>
                </div>
                <div className={styles.definitionCol}>
                    <p>3. a <em> friend </em> who cares for the people and communities in his life.</p>
                    <ul className={styles.definitionLinks}>
                        <li><Link to="/friend/things-ive-done">things i've done</Link></li>
                    </ul>
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
