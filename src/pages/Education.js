import { useEffect, useRef, useState } from 'react';
import styles from './styles/Education.module.css';

const rippleStages = [
    { label: 'person', position: { '--x': '50%', '--y': '49%' } },
    { label: 'classroom', position: { '--x': '69%', '--y': '36%' } },
    { label: 'community', position: { '--x': '27%', '--y': '38%' } },
    { label: 'society', position: { '--x': '24%', '--y': '68%' } },
    { label: 'nation', position: { '--x': '74%', '--y': '70%' } },
];

const teachingClaims = [
    {
        number: '01',
        claim: 'Confidence precedes mastery.',
        scale: 'one person',
        evidence: 'Private Tutor',
        title: 'Private Tutor',
        term: '2021-2024',
        metadata: [
            ['Format', 'one-on-one instruction'],
            ['Scale', '15-20 students year-round'],
            ['Range', 'K-college, all subjects'],
        ],
        writing: [
            'I started as a private tutor and grew to love it. For around three years, I worked with 15-20 students year-round across subjects from kindergarten through college.',
            'Tutoring taught me that a student usually does not just need the next step in a problem. They need someone to slow the room down, notice where the confusion started, and help them believe they are capable of getting unstuck. This was where I learned the patience and clarity required to help someone move from confusion to confidence.',
        ],
        annotation: {
            start: 'confusion',
            bridge: ['patience', 'clarity'],
            end: 'confidence',
        },
    },
    {
        number: '02',
        claim: 'Teaching is exchange.',
        scale: 'one classroom',
        evidence: 'Teaching English in Colombia',
        title: 'Teaching English in Colombia',
        term: 'Summer 2022',
        metadata: [
            ['Location', 'Barbosa, Santander, Colombia'],
            ['Format', 'English instruction / cultural exchange'],
            ['Duration', 'one month'],
        ],
        writing: [
            'I spent a month in Barbosa, Santander, Colombia teaching English. I loved the classroom, the culture, and the exchange.',
            'The experience made teaching feel less like delivering information and more like building a shared language with people. I was there to help students practice English, but I was also learning constantly: how people communicate, what they value, how humor travels, and how culture shapes the way a classroom feels. It reminded me that teaching is never one-directional; it is one of the best ways to understand people, place, and perspective.',
        ],
        pairs: [
            ['teacher', 'student'],
            ['language', 'culture'],
            ['helping', 'learning'],
        ],
    },
    {
        number: '03',
        claim: 'Systems can teach, too.',
        scale: 'many students',
        evidence: 'CS2340 Teaching Assistant',
        title: 'CS2340 Teaching Assistant',
        term: 'Fall 2024-Spring 2026',
        metadata: [
            ['Course', 'CS2340 Objects and Design'],
            ['Format', 'teaching assistant / project design / lectures'],
            ['Scale', 'larger groups of students'],
        ],
        writing: [
            'As a TA for CS2340: Objects and Design, I got to think about education at a larger scale. I loved being responsible for larger groups of students, helping shape projects, giving lectures, and designing learning experiences.',
            'This was different from tutoring because the teaching was not only in the explanation. It was in the structure of the assignment, the clarity of the requirements, the lecture framing, the feedback loops, and the systems students used to collaborate.',
            'I gave lectures on Learning++ - how to learn in the age of AI while retaining motivation and understanding - as well as design principles and cloud computing. I also helped design and create projects, including a RAG-system project for CS students. CS2340 taught me that educational systems can either make students feel lost or make learning feel possible.',
        ],
        notes: [
            'Learning++: how to learn in the age of AI while retaining motivation and understanding',
            'Design principles',
            'Cloud computing',
            'Designed and helped create projects, including a RAG-system project for CS students',
        ],
        systemInputs: ['lecture', 'project', 'feedback', 'collaboration', 'tools'],
        systemOutput: 'learning system',
    },
    {
        number: '04',
        claim: 'Open problem: how can I contribute best?',
        scale: 'what comes next',
        evidence: 'Future work in education',
        title: 'Future work in education',
        term: 'what comes next',
        metadata: [
            ['Given', 'I care about education.'],
            ['Given', 'I understand technology.'],
            ['Given', 'I want to build systems that help people learn.'],
        ],
        writing: [
            'I know education is where I want to spend more of my life. I am still searching for the shape of that contribution: product, research, teaching, systems, tools, or something I have not seen yet.',
            'I want to help build the systems, tools, and environments that make people believe they can learn.',
        ],
        openQuestion: 'I’m looking for what’s next — how do you think I can contribute best?',
        proofPrompt: {
            given: [
                'I care about education.',
                'I understand technology.',
                'I want to build systems that help people learn.',
            ],
            find: 'where I can contribute best.',
        },
    },
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
                <div key={`${label}-${value}`}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                </div>
            ))}
        </dl>
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

function useActiveClaim(count) {
    const claimRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const nodes = claimRefs.current.slice(0, count).filter(Boolean);
        if (!nodes.length) return undefined;

        const observer = new IntersectionObserver(
            entries => {
                const visibleEntries = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleEntries[0]) {
                    setActiveIndex(Number(visibleEntries[0].target.dataset.index));
                }
            },
            {
                rootMargin: '-24% 0px -38% 0px',
                threshold: [0.25, 0.45, 0.65],
            }
        );

        nodes.forEach(node => observer.observe(node));

        return () => observer.disconnect();
    }, [count]);

    return [claimRefs, activeIndex];
}

function ArrowAnnotation({ annotation }) {
    return (
        <div className={styles.arrowAnnotation} aria-label={`${annotation.start} plus ${annotation.bridge.join(' and ')} leads to ${annotation.end}`}>
            <span>{annotation.start}</span>
            <div className={styles.annotationArrow}>
                {annotation.bridge.map(item => (
                    <em key={item}>{item}</em>
                ))}
            </div>
            <span>{annotation.end}</span>
        </div>
    );
}

function ExchangeAnnotation({ pairs }) {
    return (
        <div className={styles.exchangeAnnotation}>
            {pairs.map(([left, right]) => (
                <div key={`${left}-${right}`}>
                    <span>{left}</span>
                    <b aria-hidden="true" />
                    <span>{right}</span>
                </div>
            ))}
        </div>
    );
}

function SystemAnnotation({ inputs, output }) {
    return (
        <div className={styles.systemAnnotation}>
            <div>
                {inputs.map(input => (
                    <span key={input}>{input}</span>
                ))}
            </div>
            <b aria-hidden="true" />
            <strong>{output}</strong>
        </div>
    );
}

function ProofPrompt({ prompt }) {
    return (
        <div className={styles.proofPrompt}>
            <div>
                <p>Given</p>
                <ul>
                    {prompt.given.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p>Find</p>
                <strong>{prompt.find}</strong>
            </div>
        </div>
    );
}

function BlackboardAnnotation({ claim }) {
    if (claim.annotation) {
        return <ArrowAnnotation annotation={claim.annotation} />;
    }

    if (claim.pairs) {
        return <ExchangeAnnotation pairs={claim.pairs} />;
    }

    if (claim.systemInputs) {
        return <SystemAnnotation inputs={claim.systemInputs} output={claim.systemOutput} />;
    }

    if (claim.proofPrompt) {
        return <ProofPrompt prompt={claim.proofPrompt} />;
    }

    return null;
}

function ClaimArticle({ claim, index, isActive, claimRefs }) {
    return (
        <article
            ref={node => {
                claimRefs.current[index] = node;
            }}
            data-index={index}
            className={`${styles.claimArticle} ${isActive ? styles.claimArticleActive : ''}`}
        >
            <div className={styles.claimHeader}>
                <p>CLAIM {claim.number}</p>
                <span>{claim.scale}</span>
            </div>

            <h3>{claim.claim}</h3>

            <div className={styles.evidenceBlock}>
                <p>EVIDENCE</p>
                <div>
                    <h4>{claim.evidence}</h4>
                    <span>{claim.term}</span>
                </div>
            </div>

            <MetadataList items={claim.metadata} />

            <div className={styles.claimWriting}>
                {claim.openQuestion ? (
                    <p className={styles.openProblemText}>{claim.openQuestion}</p>
                ) : null}
                {claim.writing.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </div>

            {claim.notes ? (
                <div className={styles.claimNotes}>
                    <p>Lecture / project notes</p>
                    <ul>
                        {claim.notes.map(note => (
                            <li key={note}>{note}</li>
                        ))}
                    </ul>
                </div>
            ) : null}

            <div className={styles.mobileAnnotation}>
                <BlackboardAnnotation claim={claim} />
            </div>
        </article>
    );
}

function BlackboardClaims() {
    const [claimRefs, activeIndex] = useActiveClaim(teachingClaims.length);
    const activeClaim = teachingClaims[activeIndex] ?? teachingClaims[0];

    return (
        <section className={styles.blackboardSection} aria-labelledby="blackboard-title">
            <header className={styles.blackboardIntro}>
                <p className={styles.eyebrow}>claims, evidence, and one open question</p>
                <h2 id="blackboard-title">three scales of teaching</h2>
            </header>

            <div className={styles.blackboardGrid}>
                <aside className={styles.stickyBoard} aria-live="polite">
                    <div className={styles.boardProgress}>
                        <span>{activeClaim.number} / {String(teachingClaims.length).padStart(2, '0')}</span>
                        <span>{activeClaim.scale}</span>
                    </div>

                    <p className={styles.boardLabel}>CLAIM</p>
                    <h3>{activeClaim.claim}</h3>

                    <div className={styles.boardRule} aria-hidden="true" />

                    <BlackboardAnnotation claim={activeClaim} />
                </aside>

                <div className={styles.claimStack}>
                    {teachingClaims.map((claim, index) => (
                        <ClaimArticle
                            key={claim.number}
                            claim={claim}
                            index={index}
                            isActive={index === activeIndex}
                            claimRefs={claimRefs}
                        />
                    ))}
                </div>
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

            <BlackboardClaims />
        </main>
    );
}

export default Education;
