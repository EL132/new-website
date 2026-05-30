import { useEffect } from 'react';
import styles from './styles/Education.module.css';

const rippleStages = [
    'person',
    'classroom',
    'community',
    'society',
    'nation',
];

const educationModules = [
    {
        number: '01',
        title: 'Private Tutor',
        period: '2021-2024',
        objective: 'Build confidence one learner at a time.',
        focus: 'origin story',
        body: 'I started as a private tutor and grew to love the patience of one-on-one teaching. For around three years, I worked with 15-20 students year-round across all subjects, from kindergarten through college.',
        lesson: 'The first lesson was that education is personal before it is scalable. A good explanation can change how someone sees themselves as a learner.',
        details: [
            '3 years',
            '15-20 students',
            'K-college',
            'All subjects',
            'One-on-one teaching',
        ],
    },
    {
        number: '02',
        title: 'Teaching English in Colombia',
        period: 'Summer 2022',
        objective: 'Use teaching as a way to connect across culture.',
        focus: 'exchange',
        body: 'I spent a month in Barbosa, Santander, Colombia teaching English. I loved the human texture of it: learning the culture, meeting people through the classroom, and realizing that teaching is also a way of being taught.',
        lesson: 'The second lesson was that education is never one-directional. When people bring different languages, places, and stories into a room, everyone leaves with a wider world.',
        details: [
            'Barbosa, Santander, Colombia',
            '1 month',
            'English teaching',
            'Culture',
            'Exchange',
        ],
    },
    {
        number: '03',
        title: 'CS2340 Teaching Assistant',
        period: 'Fall 2024-Spring 2026',
        objective: 'Design learning experiences that work at class scale.',
        focus: 'systems',
        body: 'As a TA for CS2340: Objects and Design, I loved being responsible for larger groups of students. I helped decide projects, gave lectures, and designed course material that shaped how students practiced building software.',
        lesson: 'The third lesson was scale. Teaching can become a product surface: lectures, projects, prompts, tools, and systems that help many students learn with more agency.',
        details: [
            'CS2340',
            'Objects and Design',
            'Fall 2024-Spring 2026',
            'Lectures',
            'Project design',
            'RAG-system project',
            'Teaching at scale',
        ],
        examples: [
            'Learning++: how to learn in the age of AI while keeping motivation and understanding',
            'Design principles',
            'Cloud computing',
            'Designed and created projects, including a RAG-system project for CS students',
        ],
    },
];

function ModuleArticle({ module }) {
    return (
        <article className={styles.module}>
            <div className={styles.moduleLead}>
                <p className={styles.moduleNumber}>Module {module.number}</p>
                <h3>{module.title}</h3>
                <p className={styles.modulePeriod}>{module.period}</p>
            </div>

            <div className={styles.moduleContent}>
                <div className={styles.moduleCopy}>
                    <p>{module.body}</p>
                    <p className={styles.lesson}>
                        <span>lesson</span>
                        {module.lesson}
                    </p>

                    {module.examples ? (
                        <div className={styles.exampleBlock}>
                            <p className={styles.noteLabel}>examples</p>
                            <ul>
                                {module.examples.map(example => (
                                    <li key={example}>{example}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </div>

                <aside className={styles.moduleNotes} aria-label={`${module.title} module notes`}>
                    <dl>
                        <div>
                            <dt>objective</dt>
                            <dd>{module.objective}</dd>
                        </div>
                        <div>
                            <dt>focus</dt>
                            <dd>{module.focus}</dd>
                        </div>
                    </dl>
                    <ul className={styles.detailChips} aria-label={`${module.title} details`}>
                        {module.details.map(detail => (
                            <li key={detail}>{detail}</li>
                        ))}
                    </ul>
                </aside>
            </div>
        </article>
    );
}

function Education() {
    useEffect(() => {
        document.title = 'Education';
    }, []);

    return (
        <main className={styles.educationPage}>
            <header className={styles.hero} aria-labelledby="education-title">
                <div className={styles.heroIntro}>
                    <div className={styles.manifestoCopy}>
                        <p className={styles.eyebrow}>education</p>
                        <h1 id="education-title">
                            the most powerful way I know to multiply impact.
                        </h1>
                        <p>
                            Teach one person, and you change the way they see the world.
                            Teach enough people, and those people shape communities,
                            societies, and nations.
                        </p>
                        <p>
                            I know I want to work in this space in the future. I also know
                            my background in technology gives me a way to build tools,
                            systems, and experiences that can reach further than I ever
                            could alone.
                        </p>
                    </div>

                    <div className={styles.progressPanel} aria-label="Education ripple progression">
                        <p className={styles.progressLabel}>ripple progression</p>
                        <ol className={styles.rippleProgress}>
                            {rippleStages.map((stage, index) => (
                                <li
                                    className={styles.rippleStep}
                                    key={stage}
                                    style={{ '--step-index': index }}
                                >
                                    <span className={styles.rippleDot} aria-hidden="true" />
                                    <span>{stage}</span>
                                </li>
                            ))}
                            <li
                                className={`${styles.rippleStep} ${styles.rippleStepFinal}`}
                                style={{ '--step-index': rippleStages.length }}
                            >
                                <span className={styles.rippleDot} aria-hidden="true" />
                                <span>difference</span>
                            </li>
                        </ol>
                    </div>
                </div>

                <div className={styles.differenceMoment}>
                    <div className={styles.rippleField} aria-hidden="true">
                        <span className={styles.ringOne} />
                        <span className={styles.ringTwo} />
                        <span className={styles.ringThree} />
                    </div>
                    <p className={styles.makeLine}>I can make a</p>
                    <p className={styles.differenceWord}>difference</p>
                </div>
            </header>

            <section className={styles.syllabusSection} aria-labelledby="syllabus-title">
                <div className={styles.syllabusHeader}>
                    <div>
                        <p className={styles.eyebrow}>course: education as impact</p>
                        <h2 id="syllabus-title">three lessons in teaching</h2>
                    </div>
                    <dl className={styles.courseMeta}>
                        <div>
                            <dt>objective</dt>
                            <dd>Learn how teaching scales from one person to many.</dd>
                        </div>
                        <div>
                            <dt>format</dt>
                            <dd>Tutoring, cultural exchange, course design.</dd>
                        </div>
                    </dl>
                </div>

                <div className={styles.moduleList}>
                    {educationModules.map(module => (
                        <ModuleArticle module={module} key={module.number} />
                    ))}
                </div>
            </section>

            <section className={styles.openQuestion} aria-labelledby="open-question-title">
                <p className={styles.eyebrow}>open question</p>
                <div className={styles.questionGrid}>
                    <h2 id="open-question-title">I&apos;m looking for what&apos;s next.</h2>
                    <div>
                        <p className={styles.questionText}>
                            "How do you think I can contribute best?"
                        </p>
                        <p>
                            I want to help build the systems, tools, and environments that
                            make people believe they can learn. I am still searching for the
                            shape of that contribution: product, research, teaching,
                            systems, tools, or something I have not seen yet.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Education;
