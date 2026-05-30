import { useEffect, useRef, useState } from 'react';
import styles from './styles/Education.module.css';

const rippleStages = [
    { label: 'person', position: { '--x': '50%', '--y': '49%' } },
    { label: 'classroom', position: { '--x': '69%', '--y': '36%' } },
    { label: 'community', position: { '--x': '27%', '--y': '38%' } },
    { label: 'society', position: { '--x': '24%', '--y': '68%' } },
    { label: 'nation', position: { '--x': '74%', '--y': '70%' } },
];

const courseInfo = [
    ['Course', 'Education as Impact'],
    ['Student / Instructor', 'Elias'],
    ['Objective', 'Learn how teaching scales from one person to many.'],
    ['Focus', 'Tutoring, cultural exchange, computer science education, technology for learning.'],
];

const teachingRecords = [
    {
        title: 'Private Tutor',
        term: '2021-2024',
        metadata: [
            ['Format', 'one-on-one instruction'],
            ['Scale', '15-20 students year-round'],
            ['Range', 'K-college, all subjects'],
        ],
        description: 'I started as a private tutor and grew to love it. For around three years, I worked with 15-20 students year-round across subjects from kindergarten through college. This was where I learned the patience and clarity required to help someone move from confusion to confidence.',
    },
    {
        title: 'Teaching English in Colombia',
        term: 'Summer 2022',
        metadata: [
            ['Location', 'Barbosa, Santander, Colombia'],
            ['Format', 'English instruction / cultural exchange'],
            ['Duration', 'one month'],
        ],
        description: 'I spent a month in Barbosa, Santander, Colombia teaching English. I loved the classroom, the culture, and the exchange. It reminded me that teaching is never one-directional; it is one of the best ways to understand people, place, and perspective.',
    },
    {
        title: 'CS2340 Teaching Assistant',
        term: 'Fall 2024-Spring 2026',
        metadata: [
            ['Course', 'CS2340 Objects and Design'],
            ['Format', 'teaching assistant / project design / lectures'],
            ['Scale', 'larger groups of students'],
        ],
        description: 'As a TA for CS2340: Objects and Design, I got to think about education at a larger scale. I helped guide groups of students, shape projects, give lectures, and design learning experiences.',
        details: [
            'Learning++: how to learn in the age of AI while retaining motivation and understanding',
            'Design principles',
            'Cloud computing',
            'Designed and helped create projects, including a RAG-system project for CS students',
        ],
    },
];

const selectedTopics = [
    'one-on-one teaching',
    'motivation and confidence',
    'learning in the age of AI',
    'project-based learning',
    'technology for education',
    'systems that help people learn',
];

function useInView() {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return [ref, isInView];
}

function MetadataList({ items }) {
    return (
        <dl className={styles.metadataList}>
            {items.map(([label, value]) => (
                <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                </div>
            ))}
        </dl>
    );
}

function SyllabusSection({ number, title, children }) {
    return (
        <section className={styles.syllabusBlock}>
            <div className={styles.blockLabel}>
                <span>{number}</span>
                <h3>{title}</h3>
            </div>
            <div className={styles.blockBody}>
                {children}
            </div>
        </section>
    );
}

function TeachingRecord({ record, index }) {
    return (
        <article className={styles.recordRow}>
            <div className={styles.recordHeading}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                    <h4>{record.title}</h4>
                    <p>{record.term}</p>
                </div>
            </div>

            <div className={styles.recordContent}>
                <MetadataList items={record.metadata} />
                <p>{record.description}</p>

                {record.details ? (
                    <div className={styles.detailSection}>
                        <p>Lecture / project notes</p>
                        <ul>
                            {record.details.map(detail => (
                                <li key={detail}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        </article>
    );
}

function RippleProgression() {
    const [sectionRef, isActive] = useInView();

    return (
        <section
            ref={sectionRef}
            className={`${styles.rippleSection} ${isActive ? styles.rippleSectionActive : ''}`}
            aria-labelledby="ripple-title"
        >
            <div className={styles.rippleCopy}>
                <p className={styles.eyebrow}>impact expands outward</p>
                <h2 id="ripple-title">Teach one person, and the circle grows.</h2>
                <p>
                    Teach enough people, and those people shape communities,
                    societies, and nations.
                </p>
            </div>

            <div className={styles.rippleStage} aria-label="person to difference ripple progression">
                <div className={styles.rippleRings} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>

                <ol className={styles.rippleWords}>
                    {rippleStages.map((stage, index) => (
                        <li
                            key={stage.label}
                            className={styles.rippleWord}
                            style={{
                                ...stage.position,
                                '--stage-index': index,
                            }}
                        >
                            {stage.label}
                        </li>
                    ))}
                </ol>

                <p className={styles.differenceWord}>difference</p>
            </div>
        </section>
    );
}

function Education() {
    useEffect(() => {
        document.title = 'Education';
    }, []);

    return (
        <main className={styles.educationPage}>

            <RippleProgression />

            <section className={styles.syllabusSection} aria-labelledby="syllabus-title">
                <article className={styles.syllabusDocument}>
                    <header className={styles.syllabusHeader}>
                        <p>SYLLABUS</p>
                        <div>
                            <h2 id="syllabus-title">Education as Impact</h2>
                            <p>A personal syllabus for teaching, technology, and scale.</p>
                        </div>
                    </header>

                    <div className={styles.courseInfo}>
                        <MetadataList items={courseInfo} />
                    </div>

                    <SyllabusSection number="01" title="Course Objective">
                        <p>
                            I love education because it multiplies impact. I am interested
                            in how teaching, technology, and well-designed systems can help
                            people believe they can learn.
                        </p>
                    </SyllabusSection>

                    <SyllabusSection number="02" title="Teaching Record">
                        <div className={styles.recordList}>
                            {teachingRecords.map((record, index) => (
                                <TeachingRecord
                                    key={record.title}
                                    record={record}
                                    index={index}
                                />
                            ))}
                        </div>
                    </SyllabusSection>

                    <SyllabusSection number="03" title="Selected Topics">
                        <ul className={styles.topicList}>
                            {selectedTopics.map(topic => (
                                <li key={topic}>{topic}</li>
                            ))}
                        </ul>
                    </SyllabusSection>

                    <SyllabusSection number="04" title="Open Question">
                        <div className={styles.openQuestion}>
                            <p className={styles.questionText}>
                                I&apos;m looking for what&apos;s next - how do you think I can contribute best?
                            </p>
                            <p>
                                I know education is where I want to spend more of my life.
                                I am still searching for the shape of that contribution:
                                product, research, teaching, systems, tools, or something I
                                have not seen yet.
                            </p>
                            <p>
                                I want to help build the systems, tools, and environments
                                that make people believe they can learn.
                            </p>
                        </div>
                    </SyllabusSection>
                </article>
            </section>
        </main>
    );
}

export default Education;
