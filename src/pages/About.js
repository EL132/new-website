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
                    I care about conversation, travel, music, writing, sports, and the small moments that make people feel known. A lot of what I make starts from curiosity about how people live, connect, remember, and change.
                </p>
            </section>

            <section className={styles.aboutSection}>
                <h2 className={styles.aboutSubheader}>professional</h2>
                <p>
                    <a href="https://www.linkedin.com/in/elias-lind/" target="_blank" rel="noopener noreferrer">LinkedIn</a>. My overall goal throughout college was to explore different types of work, different companies, and different parts of the world when possible. I wanted to learn what kind of work gave me energy, what kind of problems I cared about, and where I could have a meaningful breadth of impact.
                </p>

                <div className={styles.professionalList}>
                    <article className={styles.professionalItem}>
                        <h3>Head Teaching Assistant, Georgia Institute of Technology</h3>
                        <p className={styles.professionalDate}>Aug 2024 - Present</p>
                        <p>
                            I moved from section lead to Head TA for CS 2340, helping scale mentorship and course operations for roughly 250 students while developing lectures on learning with AI, SOLID, cloud computing, and test driven development. In 2026, I received the <a href="https://www.cc.gatech.edu/news/college-honors-excellence-sci-35th-annual-awards-celebration-0" target="_blank" rel="noopener noreferrer">Outstanding Undergraduate Head Teaching Assistant Award</a>. I also gave a <a href="https://docs.google.com/presentation/d/1CEUZE5kkTMOjXTteAYCwNuLRoGVvO8sN6_Xg2qut4sM/edit?usp=sharing" target="_blank" rel="noopener noreferrer">lecture and panel presentation</a> on learning in the age of AI.
                        </p>
                    </article>

                    <article className={styles.professionalItem}>
                        <h3>Software Development Engineer Co-op, Amazon Fulfillment Technologies & Robotics</h3>
                        <p className={styles.professionalDate}>Aug 2025 - Dec 2025</p>
                        <p>
                            I gave SWE work a serious try (to prove, <em>mainly to myself</em>, that I <em><b>could</b></em> do it), building AWS tools and a RAG-based retrieval system with Bedrock and Kendra, and left with a clearer sense that I care most about the problem and impact, not just the function.
                        </p>
                    </article>

                    <article className={styles.professionalItem}>
                        <h3>Associate Product Manager Intern, Google</h3>
                        <p className={styles.professionalDate}>May 2025 - Aug 2025</p>
                        <p>
                            I drove product requirements and roadmap work for travel ad formats, getting an early taste of how much influence product work can have when strategy, design, engineering, and user benefit all meet.
                        </p>
                    </article>

                    <article className={styles.professionalItem}>
                        <h3>Business Technology Solutions Summer Scholar, Deloitte</h3>
                        <p className={styles.professionalDate}>Jun 2024 - Aug 2024</p>
                        <p>
                            I tried consulting through enterprise transformation work, building software solution plans, KPI registries, and process flows, but learned that culture and connection to impact matter deeply to me.
                        </p>
                    </article>

                    <article className={styles.professionalItem}>
                        <h3>Supply Chain Engineering Intern, Toyota North America</h3>
                        <p className={styles.professionalDate}>Aug 2023 - Dec 2023</p>
                        <p>
                            I did almost the antithesis of CS work: traveling to supplier plant floors, running part trials and quality checks, and learning how manufacturing, corporate systems, and a different part of America operate.
                        </p>
                    </article>

                    <article className={styles.professionalItem}>
                        <h3>Information & Digital Solutions Intern, Toyota Financial Services</h3>
                        <p className={styles.professionalDate}>May 2023 - Aug 2023</p>
                        <p>
                            My first internship was in RPA and regional KPI standardization, where I built automations estimated to save about 2,500 work hours annually and left wanting more challenge and broader impact.
                        </p>
                    </article>

                    <article className={styles.professionalItem}>
                        <h3>Founder, Lind Tutoring</h3>
                        <p className={styles.professionalDate}>Sep 2021 - Aug 2023</p>
                        <p>
                            I worked year-round with 10-20 students across biology, chemistry, math, computer science, Spanish, and English, building my patience, communication, and love for education.
                        </p>
                    </article>

                    <article className={styles.professionalItem}>
                        <h3>Full Stack Developer, KnowAthens</h3>
                        <p className={styles.professionalDate}>Oct 2022 - May 2023</p>
                        <p>
                            KnowAthens started with the ask, "build us a website," when I knew almost nothing; I took a Udemy course, learned Vue, Express, Google Cloud SQL, AWS S3, and MySQL, and figured it out.
                        </p>
                    </article>
                </div>
            </section>
        </main>
    );
}

export default About;
