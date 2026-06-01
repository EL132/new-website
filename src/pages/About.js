import { useEffect, useState } from 'react';
import styles from './styles/About.module.css';

const workExperiences = [
    {
        id: 'knowathens',
        year: 'Fall 2022',
        role: 'Full Stack Developer',
        company: 'KnowAthens',
        lens: 'code',
    },
    {
        id: 'toyota-financial-services',
        year: 'Summer 2023',
        role: 'Business Analyst Intern',
        company: 'Toyota Financial Services',
        lens: 'business',
    },
    {
        id: 'toyota',
        year: 'Fall 2023',
        role: 'Supply Chain Intern',
        company: 'Toyota',
        lens: 'operations',
    },
    {
        id: 'deloitte',
        year: 'Summer 2024',
        role: 'Consulting Intern',
        company: 'Deloitte',
        lens: 'strategy',
    },
    {
        id: 'google',
        year: 'Summer 2025',
        role: 'Product Manager Intern',
        company: 'Google',
        lens: 'product',
    },
    {
        id: 'amazon-robotics',
        year: 'Fall 2025',
        role: 'Software Engineer Intern',
        company: 'Amazon Robotics',
        lens: 'engineering',
    },
    {
        id: 'google-apm',
        year: 'Fall 2026 - Present',
        role: 'Associate Product Manager',
        company: 'Google',
        lens: 'product',
    },
];

function WorkTimeline() {
    const [activeId, setActiveId] = useState('google-apm');
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
                heyo :) i'd be smiling if i knew you were here (maybe i do...) - that's so cool that you are! anywho, 
                my name is elias and i'm an artist, engineer, and friend - as the home page says ;)
                i'm just starting out life - i'll be in the bay area starting sept 2026 as an associate product manager with google. 
                there's so much i could say, but i'll leave it at that for now - please reach out to me via <a href="https://www.linkedin.com/in/elias-lind/overlay/contact-info/">email</a> if you want to chat :D
            </p>

            <section className={styles.aboutSection}>
                <h2 className={styles.aboutSubheader}>personal</h2>
                <p>
                    i live for conversation and i adore learning about what the <a href="https://www.instagram.com/p/DSsSo11j-VB/" target="_blank" rel="noopener noreferrer">human experience</a> means to people. 
                    <br></br>
                    <br></br>
                    i love to write, play sports, explore cultures, dance, and sing. 
                    <br></br>
                    <br></br>
                    i am half swedish and half american, born in mexico. i speak fluent spanish and english, but unfortunately my nephew's (born in 2024) swedish is better than mine :0
                    <br></br>
                    <br></br>
                    i have been fully financially independent since i was 18 (since moving to college). i covered all non-essential expenses while living with my parents in high-school by working part time jobs almost every weekend of high school. I then secured internships early in college and managed my finances carefully to get where i am today. 
                    <br></br>
                    <br></br>
                    i try never to accept "good" as an answer to "how are you?" and 
                    always make an effort to write down things about people so they feel heard. 
                </p>
            </section>

            <section className={styles.aboutSection}>
                <h2 className={styles.aboutSubheader}>professional</h2>
                <p>
                    <a href="https://www.linkedin.com/in/elias-lind/" target="_blank" rel="noopener noreferrer">LinkedIn</a>. 
                    I want to make a positive impact on spaces I care about: education and public transporation. To do so, I explored different types of work, companies, and parts of the world when possible. I found that I care less about the type of work and more about what I'm working towards. 
                    <br></br>
                    <br></br>
                    I graduated from Georgia Tech in 2026 with a Bachelor's degree in Computer Science. 
                </p>

                <WorkTimeline />
            </section>
        </main>
    );
}

export default About;
