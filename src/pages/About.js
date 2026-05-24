import { useEffect } from 'react';
import styles from './styles/About.module.css';

function About() {
    useEffect(() => {
        document.title = 'Who Am I?';
    }, []);

    return (
        <main className={styles.aboutContainer}>
            <h1 className={styles.aboutTitle}>who am i?</h1>

            <p className={styles.aboutIntro}>
                I am Elias, a product manager, builder, writer, and friend trying to understand the world through the things I make and the people I meet.
            </p>

            <section className={styles.aboutSection}>
                <h2 className={styles.aboutSubheader}>personal</h2>
                <p>
                    I care about conversation, travel, music, writing, playing sports, and the small moments that make people feel known. A lot of what I make starts from curiosity about how people live, connect, remember, and change.
                </p>
            </section>

            <section className={styles.aboutSection}>
                <h2 className={styles.aboutSubheader}>professional</h2>
                <p>
                    <a href="https://www.linkedin.com/in/elias-lind/" target="_blank" rel="noopener noreferrer">LinkedIn</a>. My overall goal throughout college was to explore different types of work, different companies, and different parts of the world when possible. I wanted to learn what kind of work gave me energy, what kind of problems I cared about, and where I could have a meaningful breadth of impact.
                </p>
            </section>
        </main>
    );
}

export default About;
