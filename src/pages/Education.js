import { useCallback, useEffect, useRef, useState } from 'react';
import { trackUmamiEvent } from '../utils/analytics';
import styles from './styles/Education.module.css';

const rippleStages = [
    { label: 'person', position: { '--x': '50%', '--y': '49%' } },
    { label: 'classroom', position: { '--x': '69%', '--y': '36%' } },
    { label: 'community', position: { '--x': '27%', '--y': '38%' } },
    { label: 'society', position: { '--x': '24%', '--y': '68%' } },
    { label: 'nation', position: { '--x': '74%', '--y': '70%' } },
];

const mobileRippleQuery = '(max-width: 640px)';

const tutoringPostUrl = 'https://nextdoor.com/p/LzK5hQZhJz3x?utm_source=share&extras=Njc0MTIyMDQ%3D&utm_campaign=1780235089240&share_action_id=1a0d2c3d-db80-41d7-97e6-56c3cd0b2fc6';
const learningPlusLectureUrl = 'https://docs.google.com/presentation/d/1CEUZE5kkTMOjXTteAYCwNuLRoGVvO8sN6_Xg2qut4sM/edit?usp=sharing';
const cloudComputingLectureUrl = 'https://docs.google.com/presentation/d/13xCLsz5bCdRvmOiBrKQW3ttaI7W90Yi7IE7BwSDDmWk/edit?usp=sharing';
const teachingAwardUrl = 'https://www.cc.gatech.edu/news/college-honors-excellence-sci-35th-annual-awards-celebration-0';
const contactUrl = 'https://www.linkedin.com/in/elias-lind/overlay/contact-info/';

const contributionPaths = [
    {
        label: 'product',
        description: 'Build learning products that make it easier for students to start, stay motivated, and see progress.',
        orbit: { '--orbit-y': '0deg', '--orbit-x': '-8deg', '--orbit-depth': '188px', '--chip-scale': 1.04, '--chip-opacity': 0.98 },
    },
    {
        label: 'research',
        description: 'Study what actually helps people learn, persist, and believe they are capable.',
        orbit: { '--orbit-y': '42deg', '--orbit-x': '19deg', '--orbit-depth': '164px', '--chip-scale': 0.92, '--chip-opacity': 0.74 },
    },
    {
        label: 'teaching',
        description: 'Keep creating rooms where students feel capable of learning difficult things.',
        orbit: { '--orbit-y': '86deg', '--orbit-x': '-16deg', '--orbit-depth': '150px', '--chip-scale': 0.82, '--chip-opacity': 0.58 },
    },
    {
        label: 'systems',
        description: 'Design structures, feedback loops, and workflows that help people learn at scale.',
        orbit: { '--orbit-y': '128deg', '--orbit-x': '13deg', '--orbit-depth': '170px', '--chip-scale': 0.9, '--chip-opacity': 0.66 },
    },
    {
        label: 'tools',
        description: 'Build practical tools that reduce friction between confusion and clarity.',
        orbit: { '--orbit-y': '177deg', '--orbit-x': '-10deg', '--orbit-depth': '156px', '--chip-scale': 0.78, '--chip-opacity': 0.48 },
    },
    {
        label: 'AI for education',
        description: 'Use AI carefully as a way to enhance understanding, not to enable students to be lazy.',
        orbit: { '--orbit-y': '218deg', '--orbit-x': '22deg', '--orbit-depth': '160px', '--chip-scale': 0.86, '--chip-opacity': 0.62 },
    },
    {
        label: 'student motivation',
        description: 'Explore how students keep caring when learning gets difficult.',
        orbit: { '--orbit-y': '263deg', '--orbit-x': '-24deg', '--orbit-depth': '176px', '--chip-scale': 0.96, '--chip-opacity': 0.78 },
    },
    {
        label: 'project-based learning',
        description: 'Create learning experiences where students build real things and learn by doing.',
        orbit: { '--orbit-y': '304deg', '--orbit-x': '12deg', '--orbit-depth': '184px', '--chip-scale': 1, '--chip-opacity': 0.92 },
    },
    {
        label: 'confidence',
        description: 'Focus on the emotional layer of learning: helping people believe they can get unstuck.',
        orbit: { '--orbit-y': '68deg', '--orbit-x': '-42deg', '--orbit-depth': '122px', '--chip-scale': 0.88, '--chip-opacity': 0.64 },
    },
    {
        label: 'access',
        description: 'Make strong learning experiences easier to reach for more people.',
        orbit: { '--orbit-y': '247deg', '--orbit-x': '-43deg', '--orbit-depth': '126px', '--chip-scale': 0.84, '--chip-opacity': 0.56 },
    },
];

const educationExperiences = [
    {
        id: 'private-tutor',
        number: '01',
        title: 'Private Tutor',
        date: '2021-2024',
        location: 'Atlanta / remote / private instruction',
        accent: '#b78a55',
        shortText: 'I started as a private tutor and grew to love helping students move from confusion to confidence.',
        themes: [
            'one-on-one instruction',
            'confidence',
            'patience',
            'clarity',
            'K-college',
            '15-20 students year-round',
        ],
        metadata: [
            ['Format', 'one-on-one instruction'],
            ['Scale', '15-20 students year-round'],
            ['Range', 'K-college, all subjects'],
        ],
        narrative: [
            <>
                I started as a private tutor and grew to love it. For around three years, I worked with 15-20 students year-round across subjects from kindergarten through college. I found my own <a
                    href={tutoringPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="outbound-link-click"
                    data-umami-event-destination="tutoring-post"
                    data-umami-event-context="education-private-tutoring"
                >clients</a>, tutored through various honor societies (English, Math, Science, Spanish), and worked with a tutoring company for staffing.
            </>,
            'It was during these experiences that I felt like I was immediately impacting people; I learned what it meant to truly touch a life.',
            'I learned two fundamental abilities: how to understand when the person you are speaking to does not understand something and how to rephrase the same ideas again and again and again.',
        ],
    },
    {
        id: 'colombia',
        number: '02',
        title: 'Teaching English in Colombia',
        date: 'Summer 2022',
        location: 'Barbosa, Santander, Colombia',
        accent: '#8a725d',
        shortText: 'I spent a month in Barbosa, Santander, Colombia teaching English and learning through cultural exchange.',
        themes: [
            'English instruction',
            'cultural exchange',
            'language',
            'classroom',
            'perspective',
            'teaching as learning',
        ],
        metadata: [
            ['Location', 'Barbosa, Santander, Colombia'],
            ['Format', 'English instruction / cultural exchange'],
            ['Duration', 'one month'],
        ],
        narrative: [
            'I spent a month in Barbosa, Santander, Colombia teaching English through a program called Workaway. I loved the responsibility of having a classroom, learning a new culture, and practicing my Spanish. It reminded me that teaching is never one-directional; it is one of the best ways to understand people, place, and perspective.',
            'I designed curriculum, made activities, updated some textbooks, and sometimes struggled with teaching.',
            'This experience was most valuable because it expanded my breadth of focus to outside the US. I began to understand how I could contribute beyond my state and country.',
        ],
    },
    {
        id: 'cs2340',
        number: '03',
        title: 'Head Teaching Assistant',
        date: 'Fall 2024-Spring 2026',
        location: 'Georgia Tech',
        accent: '#6e7763',
        shortText: 'As the head TA for CS2340 (Objects and Design), I helped guide students, give lectures, shape projects, and design learning experiences at scale.',
        themes: [
            'teaching assistant',
            'project design',
            'lectures',
            'learning at scale',
            'design principles',
            'cloud computing',
            'RAG-system project',
        ],
        metadata: [
            ['Course', 'CS2340 Objects and Design'],
            ['Format', 'teaching assistant / project design / lectures'],
            ['Scale', 'larger groups of students'],
        ],
        lectures: [
            {
                title: 'Learning++',
                href: learningPlusLectureUrl,
            },
            {
                title: 'Cloud Computing',
                href: cloudComputingLectureUrl,
            },
            {
                title: 'Design Principles',
            },
        ],
        narrative: [
            'As a TA for CS2340: Objects and Design, I got to think about education at a larger scale. I helped guide ~1000 students throughout my time as a TA: first as a TA, then section lead, then head TA. I built new projects based on my industry experience, gave lectures, and designed learning experiences. ',
            'As for the projects, I built from scratch a RAG-system project for CS students to learn leading industry technologies first-hand.',
            'In my last semester as head TA, I also introduced, for the first time in GT history, a hackathon for students for our class. A hackathon is a weekend-long (often 48 hours) event where students build a project based on a prompt. We focused on building a website to teach design principles. It was a wonderful success: ~25 students participated, 3 teams won an exemption from the final, and we plan to use those student submissions as a tool to help us teach curriculum in the future. ',
            <>
                In my tenure as head TA, I was privileged to receive the <a
                    href={teachingAwardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="outbound-link-click"
                    data-umami-event-destination="teaching-award"
                    data-umami-event-context="education-head-ta"
                >College of Computing&apos;s Outstanding Undergraduate Head Teaching Assistant Award</a>.
            </>,
        ],
    },
];

function useMobileRippleLayout() {
    const [isMobile, setIsMobile] = useState(() => (
        typeof window !== 'undefined'
        && typeof window.matchMedia === 'function'
        && window.matchMedia(mobileRippleQuery).matches
    ));

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return undefined;
        }

        const mediaQuery = window.matchMedia(mobileRippleQuery);
        const handleChange = event => setIsMobile(event.matches);

        setIsMobile(mediaQuery.matches);
        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }

        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

    return isMobile;
}

function useInView(observationTarget) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        if (typeof IntersectionObserver !== 'function') {
            setIsInView(true);
            return undefined;
        }

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
    }, [observationTarget]);

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
    const isMobileLayout = useMobileRippleLayout();
    const [triggerRef, isActive] = useInView(isMobileLayout ? 'stage' : 'section');

    return (
        <section
            ref={isMobileLayout ? undefined : triggerRef}
            className={`${styles.rippleSection} ${isActive ? styles.rippleSectionActive : ''}`}
            aria-labelledby="ripple-title"
        >
            <div className={styles.rippleCopy}>
                <p className={styles.eyebrow}>why do i care about education?</p>
                <h2 id="ripple-title">Teach one person, and the circle grows.</h2>
                <p>
                    Teach enough people, and those people shape communities,
                    societies, and nations. Education is the greatest mechanism
                    for change - for difference - that we have.
                </p>
            </div>

            <div
                ref={isMobileLayout ? triggerRef : undefined}
                className={styles.rippleStage}
                aria-label="person to difference ripple progression"
            >
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

function EducationExperienceCard({ experience, onOpen }) {
    return (
        <article
            className={styles.experienceCard}
            style={{ '--experience-accent': experience.accent }}
        >
            <span className={styles.cardNumber}>{experience.number}</span>
            <div className={styles.cardTitleGroup}>
                <h3>{experience.title}</h3>
                <p>{experience.date}</p>
                <p>{experience.location}</p>
            </div>
            <p className={styles.cardSummary}>{experience.shortText}</p>
            <ul className={styles.cardThemes} aria-label={`${experience.title} themes`}>
                {experience.themes.slice(0, 4).map(theme => (
                    <li key={theme}>{theme}</li>
                ))}
            </ul>
            <span className={styles.cardAction}>open story</span>
            <button
                type="button"
                className={styles.cardHitArea}
                onClick={() => onOpen(experience)}
                aria-haspopup="dialog"
                aria-label={`Open story for ${experience.title}`}
                data-umami-event="education-story-open"
                data-umami-event-story={experience.id}
            />
        </article>
    );
}

function EducationStoryModal({ experience, onClose, modalRef }) {
    if (!experience) return null;

    return (
        <div className={styles.modalBackdrop} onMouseDown={event => {
            if (event.target === event.currentTarget) {
                trackUmamiEvent('education-story-close', {
                    story: experience.id,
                    element: 'backdrop',
                });
                onClose();
            }
        }}>
            <article
                ref={modalRef}
                className={styles.storyModal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="education-modal-title"
                aria-describedby="education-modal-summary"
                tabIndex={-1}
            >
                <button
                    type="button"
                    className={styles.modalClose}
                    onClick={onClose}
                    aria-label="Close education story"
                    data-umami-event="education-story-close"
                    data-umami-event-story={experience.id}
                    data-umami-event-element="close-button"
                >
                    close
                </button>

                <header className={styles.modalHeader}>
                    <p className={styles.eyebrow}>education record</p>
                    <h2 id="education-modal-title">{experience.title}</h2>
                    <div className={styles.modalMetaLine}>
                        <span>{experience.date}</span>
                        <span>{experience.location}</span>
                    </div>
                    <p id="education-modal-summary">{experience.shortText}</p>
                </header>

                <ul className={styles.modalThemes} aria-label="Key themes">
                    {experience.themes.map(theme => (
                        <li key={theme}>{theme}</li>
                    ))}
                </ul>

                <div className={styles.modalLayout}>
                    <div className={styles.modalNarrative}>
                        {experience.narrative.map((paragraph, index) => (
                            <div key={`${experience.id}-narrative-${index}`}>
                                <p>{paragraph}</p>
                                {index === 0 && experience.lectures ? (
                                    <div className={styles.lectureList}>
                                        <p>The lectures I gave:</p>
                                        <ul>
                                            {experience.lectures.map(lecture => (
                                                <li key={lecture.title}>
                                                    {lecture.href ? (
                                                        <a
                                                            href={lecture.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            data-umami-event="outbound-link-click"
                                                            data-umami-event-destination={lecture.title}
                                                            data-umami-event-context={experience.id}
                                                        >
                                                            {lecture.title}
                                                        </a>
                                                    ) : (
                                                        lecture.title
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <aside className={styles.modalFacts} aria-label="Experience facts">
                        <p>details</p>
                        <MetadataList items={experience.metadata} />
                    </aside>
                </div>
            </article>
        </div>
    );
}

function EducationWorkSection() {
    const [activeExperience, setActiveExperience] = useState(null);
    const modalRef = useRef(null);
    const previousFocusRef = useRef(null);

    const closeModal = useCallback(() => {
        setActiveExperience(null);
    }, []);

    const openModal = useCallback((experience) => {
        setActiveExperience(experience);
    }, []);

    useEffect(() => {
        if (!activeExperience) return undefined;

        previousFocusRef.current = document.activeElement;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                closeModal();
                return;
            }

            if (event.key !== 'Tab' || !modalRef.current) return;

            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const focusable = Array.from(focusableElements);

            if (!focusable.length) {
                event.preventDefault();
                return;
            }

            const firstElement = focusable[0];
            const lastElement = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        const focusTimer = window.setTimeout(() => {
            modalRef.current?.focus();
        }, 0);

        return () => {
            window.clearTimeout(focusTimer);
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow;

            if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
                previousFocusRef.current.focus();
            }
        };
    }, [activeExperience, closeModal]);

    return (
        <section className={styles.experienceSection} aria-labelledby="education-work-title">
            <header className={styles.experienceHeader}>
                <p className={styles.eyebrow}>what have i done inside education?</p>
                <div>
                    <h2 id="education-work-title">three ways i learned education</h2>
                    <p>
                        Each experience changed the scale of the work: <br></br>
                        one student &#8594; one classroom &#8594; one course.
                    </p>
                </div>
            </header>

            <div className={styles.experienceGrid}>
                {educationExperiences.map(experience => (
                    <EducationExperienceCard
                        key={experience.id}
                        experience={experience}
                        onOpen={openModal}
                    />
                ))}
            </div>

            <EducationStoryModal
                experience={activeExperience}
                onClose={closeModal}
                modalRef={modalRef}
            />
        </section>
    );
}

function OrbitingContributionSphere({
    paths,
    activeIndex,
    selectedIndex,
    onPreview,
    onClearPreview,
    onSelect,
}) {
    return (
        <div
            className={styles.orbitSphere}
            aria-label="Possible future education contribution paths"
            onMouseLeave={onClearPreview}
        >
            <div className={styles.orbitCore} aria-hidden="true">
                ?
            </div>
            <div className={styles.orbitShell}>
                <span className={styles.orbitRing} aria-hidden="true" />
                <span className={styles.orbitRing} aria-hidden="true" />
                <span className={styles.orbitRing} aria-hidden="true" />

                {paths.map((path, index) => (
                    <div
                        key={path.label}
                        className={styles.orbitChip}
                        style={path.orbit}
                    >
                        <button
                            type="button"
                            className={`${styles.orbitChipButton} ${index === activeIndex ? styles.orbitChipButtonActive : ''}`}
                            onMouseEnter={() => onPreview(index)}
                            onFocus={() => onPreview(index)}
                            onBlur={onClearPreview}
                            onClick={() => onSelect(index)}
                            aria-label={`${path.label}: ${path.description}. Click to ${selectedIndex === index ? 'deselect' : 'select'}.`}
                            aria-pressed={selectedIndex === index}
                            data-umami-event="education-contribution-toggle"
                            data-umami-event-contribution={path.label}
                            data-umami-event-action={selectedIndex === index ? 'deselect' : 'select'}
                        >
                            {path.label}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ActiveContributionDetails({ path, isPinned, onDeselect }) {
    if (!path) return null;

    return (
        <aside
            className={`${styles.orbitDetails} ${isPinned ? styles.orbitDetailsPinned : ''}`}
            aria-live="polite"
        >
            <p>currently orbiting</p>
            <h3>{path.label}</h3>
            <span>{path.description}</span>
            {isPinned ? (
                <button
                    type="button"
                    onClick={onDeselect}
                    data-umami-event="education-contribution-toggle"
                    data-umami-event-contribution={path.label}
                    data-umami-event-action="deselect"
                >
                    deselect
                </button>
            ) : null}
        </aside>
    );
}

function EducationNextSection() {
    const [hoveredContributionIndex, setHoveredContributionIndex] = useState(null);
    const [selectedContributionIndex, setSelectedContributionIndex] = useState(null);
    const activeContributionIndex = selectedContributionIndex ?? hoveredContributionIndex;
    const activeContribution = activeContributionIndex === null ? null : contributionPaths[activeContributionIndex];
    const isContributionPinned = selectedContributionIndex !== null;

    const handleClearPreview = useCallback(() => {
        if (selectedContributionIndex === null) {
            setHoveredContributionIndex(null);
        }
    }, [selectedContributionIndex]);

    const handleSelectContribution = useCallback((index) => {
        setSelectedContributionIndex(currentIndex => (currentIndex === index ? null : index));
        setHoveredContributionIndex(index);
    }, []);

    const handleDeselectContribution = useCallback(() => {
        setSelectedContributionIndex(null);
        setHoveredContributionIndex(null);
    }, []);

    return (
        <section className={styles.nextEducationSection} aria-labelledby="education-next-title">
            <header className={styles.nextEducationHeader}>
                <p className={styles.eyebrow}>what do i want to do next in education?</p>
            </header>

            <div className={styles.nextEducationLayout}>
                <div className={styles.nextEducationCopy}>
                    <h2 id="education-next-title" className={styles.nextQuestion}>
                        how do you think I can contribute best?
                    </h2>
                    <a
                        className={styles.contactLink}
                        href={contactUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-umami-event="outbound-link-click"
                        data-umami-event-destination="linkedin-contact"
                        data-umami-event-context="education-next"
                    >
                        tell me what you think
                    </a>
                </div>

                <div className={styles.orbitColumn}>
                    <div className={styles.orbitShowcase}>
                        <OrbitingContributionSphere
                            paths={contributionPaths}
                            activeIndex={activeContributionIndex}
                            selectedIndex={selectedContributionIndex}
                            onPreview={setHoveredContributionIndex}
                            onClearPreview={handleClearPreview}
                            onSelect={handleSelectContribution}
                        />
                        <ActiveContributionDetails
                            path={activeContribution}
                            isPinned={isContributionPinned}
                            onDeselect={handleDeselectContribution}
                        />
                    </div>
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
            <EducationWorkSection />
            <EducationNextSection />
        </main>
    );
}

export default Education;
