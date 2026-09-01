import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { educationThoughts } from '../data/educationThoughts';
import { trackUmamiEvent } from '../utils/analytics';
import styles from './styles/Education.module.css';

const tutoringPostUrl = 'https://nextdoor.com/p/LzK5hQZhJz3x?utm_source=share&extras=Njc0MTIyMDQ%3D&utm_campaign=1780235089240&share_action_id=1a0d2c3d-db80-41d7-97e6-56c3cd0b2fc6';
const learningPlusLectureUrl = 'https://docs.google.com/presentation/d/1CEUZE5kkTMOjXTteAYCwNuLRoGVvO8sN6_Xg2qut4sM/edit?usp=sharing';
const cloudComputingLectureUrl = 'https://docs.google.com/presentation/d/13xCLsz5bCdRvmOiBrKQW3ttaI7W90Yi7IE7BwSDDmWk/edit?usp=sharing';
const teachingAwardUrl = 'https://www.cc.gatech.edu/news/college-honors-excellence-sci-35th-annual-awards-celebration-0';
const learningLinkedInPostUrl = 'https://www.linkedin.com/feed/update/urn:li:activity:7462312361572470784/';
const conceptLearningGraphUrl = 'https://docs.google.com/document/d/1uiXGrpnbJpg5JNJB2gat7x8T5anvRnFS44efFaX9yDk/edit?usp=sharing';
const canvasUrl = 'https://site.instructure.com/login/canvas';
const contactUrl = 'https://www.linkedin.com/in/elias-lind/overlay/contact-info/';
const academicAiPlaybookUrl = 'https://c14750.wpmucdn.com/5843/files/2026/08/Georgia-Tech-Academic-AI-Playbook-2026-Edition.pdf';
const academicAiStrategyArticleUrl = 'https://news.gatech.edu/news/2026/08/31/academic-ai-strategy-establishes-shared-vision-teaching-and-learning-georgia-tech';
const lockdownDesmosUrl = 'https://lockdown-desmos.vercel.app/';
const openAiEducationUrl = 'https://openai.com/education/';
const edexiaUrl = 'https://edexia.com/';
const googleLearnUrl = 'https://learning.google/';

const backgroundExperiences = [
    {
        title: 'Head teaching assistant',
        detail: '2024–2026 · Georgia Tech',
        description: 'I grew from TA to section lead to head TA for CS2340 and helped guide roughly 1,000 students. I gave lectures, built a RAG-system project, and launched a course hackathon. The work taught me how curriculum, motivation, and feedback operate at course scale.',
        links: [
            {
                label: 'Learning++ lecture',
                description: 'A panel I presented and moderated on how students can use AI without sacrificing the learning habits that matter throughout a software engineering career.',
                href: learningPlusLectureUrl,
                destination: 'learning-plus-lecture',
            },
            {
                label: 'Cloud computing lecture',
                description: 'A lecture I presented on cloud service models, providers, and production architecture before introducing the course’s RAG-system project.',
                href: cloudComputingLectureUrl,
                destination: 'cloud-computing-lecture',
            },
            {
                label: 'Teaching award',
                description: 'Georgia Tech’s announcement naming me the Outstanding Undergraduate Head Teaching Assistant.',
                href: teachingAwardUrl,
                destination: 'teaching-award',
            },
        ],
    },
    {
        title: 'English as a second language teacher · Workaway',
        detail: 'Summer 2022 · Barbosa, Colombia',
        description: 'After graduating high school, I spent a month teaching English through a program called Workaway. I designed activities, updated learning materials, practiced my Spanish, and learned the skills of patience and rephrasing. Information is no use if I cannot find a way to share it with others in a way that connects with them. ',
        links: [],
    },
    {
        title: 'Freelance private tutor',
        detail: '2021–2024 · Atlanta and remote',
        description: 'I worked year-round with 15–20 students, from kindergarten through college, tutoring calculus, literature, Spanish, chemistry, biology, and physics. Tutoring taught me to recognize when someone is lost and to keep finding new ways to explain an idea until it clicks.',
        links: [
            { label: 'tutoring post', href: tutoringPostUrl, destination: 'tutoring-post' },
        ],
    },
];

function OutboundLink({ href, destination, context, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="outbound-link-click"
            data-umami-event-destination={destination}
            data-umami-event-context={context}
        >
            {children}
        </a>
    );
}

function Education() {
    useEffect(() => {
        document.title = 'Education';
    }, []);

    return (
        <main className={styles.educationPage}>
            <section className={styles.educationSection} aria-labelledby="why-education-title">
                <h1 id="why-education-title">Why I care about education</h1>
                <p>
                    I care about education because I earnestly believe that for any problem we see in
                    society, we can fix it with education. It is the single most powerful system we
                    have to combat inequality, prevent ignorance, and enable people to make positive
                    change in the world.
                </p>
                <p>
                    Education also has incredibly complicated problems.
                </p>
                <ul className={styles.questionList}>
                    <li>How do we measure the success of an education system?</li>
                    <li>
                        What angle should we focus on for fixing the education system (e.g.
                        government, teacher training programs, etc.)?
                    </li>
                    <li>
                        How much should the education structure differ based on the culture?
                    </li>
                    <li>Does culture shape the education system?</li>
                    <li>
                        How can we identify the ideal education system for a school given culture,
                        income levels, student demographic, etc.?
                    </li>
                </ul>
                <p>
                    The list goes on. Bottom line is that there are countless unanswered questions, I
                    know I can't answer them all, and yet I'll still try ᵕ̈ There&apos;s also the little
                    things. The &quot;aha&quot; moments students have,
                    the joy students get when they find a career for them or a subject they love, the
                    relationships students form with their teachers, the learnings beyond curriculum,
                    etc.
                </p>
                <p>
                    So that&apos;s a bit of the why, but what about the how? How do I want to contribute
                    to education? I&apos;m a CS graduate working in product management with strong
                    experience in and around education. I get excited when I see tech being directly
                    applied in education:{' '}
                    <OutboundLink
                        href={openAiEducationUrl}
                        destination="openai-education"
                        context="education-motivation"
                    >
                        OpenAI&apos;s education initiatives
                    </OutboundLink>
                    ,{' '}
                    <OutboundLink
                        href={edexiaUrl}
                        destination="edexia"
                        context="education-motivation"
                    >
                        Edexia
                    </OutboundLink>
                    ,{' '}
                    <OutboundLink
                        href={googleLearnUrl}
                        destination="google-learn"
                        context="education-motivation"
                    >
                        Google Learn
                    </OutboundLink>
                    , etc. There are real application where people take their understanding of tech
                    and apply it uniquely to education. I see those people and just sit in admiration;
                    I want to be that one day. Whether it&apos;s a software engineer working on those
                    products, managing product roll outs to students, helping write policy, or
                    anything else, I know that I want to be in this space one day.
                </p>
            </section>

            <section className={styles.educationSection} aria-labelledby="education-background-title">
                <h2 id="education-background-title">My education background</h2>
                <p>
                    Most of what I know about education has come from doing the work: explaining,
                    listening, designing, revising, and watching where learners get stuck.
                </p>

                <div className={styles.experienceList}>
                    {backgroundExperiences.map(experience => (
                        <article className={styles.experience} key={experience.title}>
                            <h3>{experience.title}</h3>
                            <p className={styles.detail}>{experience.detail}</p>
                            <p>{experience.description}</p>
                            {experience.links.some(link => link.description) ? (
                                <ul className={styles.resourceList}>
                                    {experience.links.map(link => (
                                        <li key={link.label}>
                                            <OutboundLink
                                                href={link.href}
                                                destination={link.destination}
                                                context="education-background"
                                            >
                                                {link.label}
                                            </OutboundLink>
                                            {' — '}{link.description}
                                        </li>
                                    ))}
                                </ul>
                            ) : experience.links.length ? (
                                <p className={styles.linkList}>
                                    {experience.links.map((link, index) => (
                                        <span key={link.label}>
                                            {index > 0 ? ' · ' : ''}
                                            <OutboundLink
                                                href={link.href}
                                                destination={link.destination}
                                                context="education-background"
                                            >
                                                {link.label}
                                            </OutboundLink>
                                        </span>
                                    ))}
                                </p>
                            ) : null}
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.educationSection} aria-labelledby="education-notes-title">
                <h2 id="education-notes-title">Education thoughts and involvement</h2>
                <p>
                    This is a collection of media that I try and update regularly. It&apos;s all media
                    I&apos;ve consumed that has been important enough to influence the way I think
                    about education. Along with each piece of media is a little blog post of my
                    thoughts on the content.
                </p>

                <div className={styles.noteList}>
                    {educationThoughts.map(note => (
                        <Link
                            className={styles.noteCard}
                            key={note.slug}
                            to={`/engineer/education/thoughts/${note.slug}`}
                            onClick={() => trackUmamiEvent('education-thought-open', {
                                slug: note.slug,
                                title: note.title,
                                mediaType: note.type,
                            })}
                        >
                            <div className={styles.noteCardCopy}>
                                <p className={styles.detail}>{note.type} · {note.date}</p>
                                <h3>{note.title}</h3>
                            </div>
                            <img
                                className={styles.notePreview}
                                src={note.previewImage}
                                alt={note.previewAlt}
                                loading="lazy"
                                decoding="async"
                            />
                        </Link>
                    ))}
                </div>

                <div className={styles.involvement}>
                    <h3>Other involvement</h3>
                    <ul>
                        <li>
                            <strong>August 2026:</strong> I co-authored &quot;From AI Users to AI Designers: Teaching Software
                            Design and Engineering Through Progressive AI Design Experiences,&quot; a
                            paper featured in{' '}
                            <OutboundLink
                                href={academicAiPlaybookUrl}
                                destination="georgia-tech-academic-ai-playbook-2026"
                                context="education-involvement"
                            >
                                Georgia Tech&apos;s Academic AI Playbook
                            </OutboundLink>
                            . Georgia Tech&apos;s{' '}
                            <OutboundLink
                                href={academicAiStrategyArticleUrl}
                                destination="georgia-tech-academic-ai-strategy-announcement"
                                context="education-involvement"
                            >
                                announcement article
                            </OutboundLink>
                            {' '}shares more about the larger initiative, and I also wrote about the
                            experience on my LinkedIn. That being said, I&apos;m very proud of this one;
                            it feels like such a natural culmination of the work we did in that class.
                            I&apos;m happy that it manifested in something that others can benefit from as
                            well, we had some meaningful learnings in the class. Pedro
                            (Dr. Feijoo-Garcia) made this possible—I owe him a million thanks.
                        </li>
                        <li>
                            <strong>August 2026:</strong> I&apos;ve been working with my high-school
                            alma mater to solve a problem teachers actually face. I reached out to a
                            former club sponsor—a math teacher—and asked whether she had any needs I
                            could help with, especially through software. She told me that students
                            use Desmos during assessments, but she had no way to proctor their
                            behavior inside it, leaving room for cheating. So I built{' '}
                            <OutboundLink
                                href={lockdownDesmosUrl}
                                destination="lockdown-desmos"
                                context="education-involvement"
                            >
                                a tool
                            </OutboundLink>
                            {' '}that lets students use Desmos while giving her visibility into their
                            actions.
                        </li>
                        <li>
                            <strong>May 2026:</strong> I wrote about choosing meaningful learning over
                            easy, hedonistic defaults.{' '}
                            <OutboundLink
                                href={learningLinkedInPostUrl}
                                destination="learning-linkedin-post"
                                context="education-involvement"
                            >
                                Read the LinkedIn post
                            </OutboundLink>.
                        </li>
                        <li>
                            <strong>Spring 2026:</strong>{' '}
                            <OutboundLink
                                href={conceptLearningGraphUrl}
                                destination="concept-based-learning-graph"
                                context="education-involvement"
                            >
                                I built a concept-based learning graph with a friend for a class.
                            </OutboundLink>{' '}
                            {' '}
                            The tool is similar to {' '}
                            <OutboundLink
                                href={canvasUrl}
                                destination="canvas"
                                context="education-involvement"
                            >
                                Canvas
                            </OutboundLink>{' '}
                            as it has both a student and teacher-facing portion of the application. For the student-facing portion, it enables students to learn using node-based learning. A single topic
                            (e.g. photosynthesis) is broken down into sub-topics (e.g. chlorophyll,
                            carbon cycle, etc.), the user is prompted based on those sub-topics, and
                            only allowed progression only if they&apos;ve mastered each sub-topic. We
                            researched the best learning strategies and applied them (e.g. focusing on transfer-based
                            learning, misconception detection, and having students explain topics to demonstrate mastery) to ensure that our tool was building mastery, not memorization.
                        </li>
                        <li>
                            <strong>February 2026:</strong> I talked with my cousin, who has worked
                            across ed-tech sales and relationship management, about how education
                            companies operate in practice.
                        </li>
                        <li>
                            <strong>July 2025:</strong> I attended an education picnic in the Bay Area
                            and listened to how people across the space describe the problems they are
                            trying to solve.
                        </li>
                    </ul>
                    <p>
                        <OutboundLink
                            href={contactUrl}
                            destination="linkedin-contact"
                            context="education-involvement"
                        >
                            Talk education with me
                        </OutboundLink>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Education;
