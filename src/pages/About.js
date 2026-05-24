import { useEffect, useState } from 'react';
import styles from './styles/About.module.css';

const workExperiences = [
    {
        id: 'knowathens',
        year: '2022',
        role: 'Full Stack Developer',
        company: 'KnowAthens',
        lens: 'code',
    },
    {
        id: 'toyota-financial-services',
        year: '2023',
        role: 'Business Analyst Intern',
        company: 'Toyota Financial Services',
        lens: 'business',
    },
    {
        id: 'toyota',
        year: '2023',
        role: 'Supply Chain Intern',
        company: 'Toyota',
        lens: 'operations',
    },
    {
        id: 'deloitte',
        year: '2024',
        role: 'Consulting Intern',
        company: 'Deloitte',
        lens: 'strategy',
    },
    {
        id: 'google',
        year: '2025',
        role: 'Product Manager Intern',
        company: 'Google',
        lens: 'product',
    },
    {
        id: 'amazon-robotics',
        year: '2025',
        role: 'Software Engineer Intern',
        company: 'Amazon Robotics',
        lens: 'engineering',
    },
];

function WorkTimeline() {
    const [activeId, setActiveId] = useState('amazon-robotics');
    const activeExperience = workExperiences.find(experience => experience.id === activeId) ?? workExperiences[workExperiences.length - 1];

    return (
        <div className={styles.workTimeline}>
            <div className={styles.timelineRail} aria-label="Work experience timeline">
                {workExperiences.map(experience => {
                    const isActive = activeExperience.id === experience.id;

                    return (
                        <button
                            key={experience.id}
                            type="button"
                            className={`${styles.timelinePoint} ${isActive ? styles.timelinePointActive : ''}`}
                            onMouseEnter={() => setActiveId(experience.id)}
                            onFocus={() => setActiveId(experience.id)}
                            onClick={() => setActiveId(experience.id)}
                            aria-label={`${experience.role} at ${experience.company}, ${experience.year}`}
                            aria-pressed={isActive}
                        >
                            <span className={styles.timelineYear}>{experience.year}</span>
                            <span className={styles.timelineDot} aria-hidden="true" />
                            <span className={styles.timelinePointLens}>{experience.lens}</span>
                        </button>
                    );
                })}
            </div>

            <div className={styles.timelineCard} aria-live="polite">
                <p className={styles.timelineLens}>{activeExperience.lens}</p>
                <h3>{activeExperience.role}</h3>
                <p className={styles.timelineMeta}>
                    {activeExperience.company} &middot; {activeExperience.year}
                </p>
            </div>
        </div>
    );
}

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

                <WorkTimeline />
            </section>
        </main>
    );
}

export default About;
