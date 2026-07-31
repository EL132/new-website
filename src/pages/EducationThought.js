import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { educationThoughts } from '../data/educationThoughts';
import styles from './styles/EducationThought.module.css';

const reddingSources = {
    dissertation: 'https://dash.harvard.edu/server/api/core/bitstreams/fd7fab1a-5634-4bd4-a197-5ca5366e6e5c/content',
    facultyProfile: 'https://www.gse.harvard.edu/directory/faculty/alexis-redding',
    presidentialScholarship: 'https://osa.gse.harvard.edu/resource/handbookfinalversionpdf',
    fieldWork: 'https://www.gse.harvard.edu/ideas/ed-magazine/25/05/faculty-take-field',
    lonelinessSurvey: 'https://www.acha.org/news/statement-on-the-elimination-of-campus-dei-offices/',
    belongingResearch: 'https://digitalcommons.sacredheart.edu/psych_fac/183/',
    wCurveResearch: 'https://doi.org/10.1111/j.1540-4560.1963.tb00447.x',
    wCurveImage: 'https://gopherguide.umn.edu/your-transition',
};

function ReddingSourceLink({ href, destination, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="outbound-link-click"
            data-umami-event-destination={destination}
            data-umami-event-context="education-thought-college-student-loneliness"
        >
            {children}
        </a>
    );
}

function CollegeStudentLonelinessEssay() {
    return (
        <>
            <p>
                HGSE has a podcast channel that I try to listen to regularly and,
                unfortunately, doesn&apos;t always have content that I find applicable or
                interesting. This time, however, I found this topic not only interesting, but
                also incredibly well delivered. I hadn&apos;t heard of Alexis Redding before,
                but throughout this podcast she was very articulate and verbalized her research
                in a very digestible way. In particular, there were three topics that I found
                interesting: interpersonal and large-scale changes, the hat expression, and the
                W-curve.
            </p>

            <h2>Interpersonal and large-scale change</h2>

            <p>
                When I think about educational changes that need to be made, I most often think
                about how we are going to measure the success of those changes. Metrics are a
                recurring thought in my mind; they are often key to the longevity of a solution.
                Clear metrics mean clear indicators of success, which mean clear allocation and
                justification for funding. All of which, hopefully, ultimately results in more
                success for students.
            </p>

            <p>
                I say this because this is exactly what Dr. Redding&apos;s work lacks. Her work is
                not clearly measurable (or, at least, it wasn&apos;t mentioned in the episode). Or
                so I thought before doing some research. I don&apos;t know much about research, so
                this is news to me, but I&apos;ve come to learn that measurement is defined based
                on the claim; and there are a lot of types of claims. A prevalence claim needs a
                representative survey. A mechanism claim may need interviews. An intervention
                claim needs outcome evaluation. A reach claim needs adoption and participation
                data. Etc.
            </p>

            <p>
                For Dr. Redding&apos;s work, she instead mentioned that success means more people
                at various places all over America and the world adopting her key concepts and
                slightly tweaking their approach in conversations. In other words: dissemination
                of the learnings that spawn from her work. Spreading ideas by placing strong
                distributors across the world. HGSE&apos;s account of her field work gives this
                idea some scale: it reports alumni in student-affairs roles at{' '}
                <ReddingSourceLink
                    href={reddingSources.fieldWork}
                    destination="redding-field-work"
                >
                    more than 150 institutions around the world
                </ReddingSourceLink>
                . It&apos;s an interesting, almost idealistic, approach to justifying education
                work.
            </p>

            <p
                className={styles.theoryOfChange}
                aria-label="Research leads to practitioner translation, which leads to local policy and conversations, which leads to student impact."
            >
                Research <span aria-hidden="true">→</span> practitioner translation{' '}
                <span aria-hidden="true">→</span> local policy and conversations{' '}
                <span aria-hidden="true">→</span> student impact
            </p>

            <p>
                Because this journey is a bit convoluted, I naturally wanted to research how she
                justifies her research and who supplies her funding.
            </p>

            <p>
                Don&apos;t get me wrong, I&apos;m woefully ignorant about how research funding works.
                I know the basics about grants, foundations, scholarships, etc., but I don&apos;t
                know the nuances of how lump-sum funds get allocated to which programs, how often
                check-ins happen, how often funding revolves around contracts, etc. That being
                said, two publicly verifiable sources of support are the{' '}
                <ReddingSourceLink
                    href={reddingSources.dissertation}
                    destination="redding-dissertation"
                >
                    Germanacos Foundation, which supported her dissertation travel
                </ReddingSourceLink>
                , and the Presidential Scholarship that{' '}
                <ReddingSourceLink
                    href={reddingSources.facultyProfile}
                    destination="redding-faculty-profile"
                >
                    Harvard says she received
                </ReddingSourceLink>
                . The relevant{' '}
                <ReddingSourceLink
                    href={reddingSources.presidentialScholarship}
                    destination="hgse-presidential-scholarship"
                >
                    HGSE handbook describes that scholarship as doctoral tuition, fee, and stipend
                    support
                </ReddingSourceLink>
                . I couldn&apos;t find a public source naming the sponsor or terms for her current{' '}
                <ReddingSourceLink
                    href={reddingSources.facultyProfile}
                    destination="redding-transition-to-adulthood-lab"
                >
                    Transition to Adulthood research
                </ReddingSourceLink>
                .
            </p>

            <p>
                Getting back to how she justifies her work, what might be some useful metrics for
                her work? Naturally, there are different metrics based on the aspect of success of
                her work you&apos;re trying to gauge: reach, impact, accessibility, etc. are all
                going to have different metrics (e.g.{' '}
                <ReddingSourceLink
                    href={reddingSources.lonelinessSurvey}
                    destination="acha-loneliness-survey"
                >
                    self-identification of loneliness
                </ReddingSourceLink>
                , rating of a current support system, how college is perceived by a student upon
                entry, etc.). I&apos;m curious if she has plans for implementing specific policies
                at select universities and monitoring the impact on faculty verbiage, students&apos;
                felt support, and overall success of the initiative. It&apos;d be neat to implement
                policies and have a control group; there is already a growing body of{' '}
                <ReddingSourceLink
                    href={reddingSources.belongingResearch}
                    destination="college-belonging-interventions"
                >
                    controlled research on college-belonging interventions
                </ReddingSourceLink>
                . I&apos;d bet that the biggest difference would be the quantity of participation
                in mental-wellness resources; after which, all other indicators would improve.
            </p>

            <h2>Hat, haircut, or a tattoo</h2>

            <p>
                This point is very simple; I just thought this was an interesting way to think
                about things. Is a change, decision, path, etc. a hat (something you can just take
                off), a haircut (something you can grow into), or a tattoo (something permanent)?
                Nothing crazy to say here, I just found it interesting.
            </p>

            <h2>W-curve</h2>

            <p>
                Also a simple point: Dr. Redding mentions that she has introduced her graduate
                students to the idea of a W-curve that explains how undergraduate students
                experience college and their sense of belonging. The model{' '}
                <ReddingSourceLink
                    href={reddingSources.wCurveResearch}
                    destination="w-curve-original-research"
                >
                    predates Dr. Redding&apos;s work
                </ReddingSourceLink>{' '}
                and grew out of research on cultural adjustment.
            </p>

            <figure className={styles.articleFigure}>
                <a
                    href={reddingSources.wCurveImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="outbound-link-click"
                    data-umami-event-destination="university-of-minnesota-w-curve"
                    data-umami-event-context="education-thought-college-student-loneliness"
                >
                    <img
                        src="/assets/education/w-curve.png"
                        alt="W-curve diagram showing five stages of the college transition: honeymoon, culture shock, initial adjustment, mental isolation, and acceptance and integration."
                        loading="lazy"
                        decoding="async"
                    />
                </a>
                <figcaption>
                    W-curve model of college transition. Source:{' '}
                    <ReddingSourceLink
                        href={reddingSources.wCurveImage}
                        destination="university-of-minnesota-w-curve-caption"
                    >
                        University of Minnesota Gopher Guide
                    </ReddingSourceLink>
                    .
                </figcaption>
            </figure>

            <p>
                The initial peak of novelty when you come to a new location, the feeling of
                loneliness that comes from not having anyone, the resurgence of finding friends, a
                loss of self, and a rediscovery of purpose. Dr. Redding mentioned that, after
                sharing the idea with her graduate students, it gave them the opportunity to say,
                “wait, me too.” Doing so gave them the vocabulary to discuss these topics and a lack
                of belonging in new spaces. They quickly found that this curve applies with any new
                experience in life: a new career, moving cities, etc. It&apos;ll be fun to be another
                “disciple” of this information.
            </p>
        </>
    );
}

function CollegeSystemCollapseEssay() {
    return (
        <>
            <p>
                First and foremost: this guy is awesome. Modern-day media on YouTube brings a lot of
                short-form content tendencies: neat visuals, pleasant sound-bites, strong colors,
                etc. This guy says to hell with that. He just talks and, if you give him time, often
                produces some really high quality thoughts.
            </p>

            <p>
                This video was no different. Ade (Asian Dad Energy for short) mentions a lot of
                extremely interesting thoughts that have truly resonated with me; specifically, I’d
                like to discuss three topics: the monolithic model of universities &amp; why it won’t
                work in the future, university fragmentation, and when science fiction will become
                reality.
            </p>

            <h2>Monolithic university model</h2>

            <p>
                Ade mentions that universities are 4 things: research institutions, credentialing
                centers, socialization hubs, and job/vocational training programs. He hypothesizes
                that these universities will split in the near future into hubs focused on one of the
                aforementioned topics. I will go into that in the next section, but, for now, I’d like
                to discuss why I also believe that monolithic universities won’t work very well in
                the future.
            </p>

            <p>
                I spent time working as a supply chain engineer and I quickly came to realize the
                benefit of specialization. Henry Ford might’ve been right. I saw just how quickly
                parts could be produced if everyone found their focus. That being said, this
                optimization from generalists into experts was able to be achieved so readily because
                1) the benefit of change was immediately evident and 2) the system the change had to
                be enacted on was (relatively) small.
            </p>

            <p>
                If we pivot our focus to universities, we can see that a similar structure could be
                followed. Right now, our universities teach students on research, vocational
                training, critical thinking, and socialization skills. This is, in essence, a luxury.
                I believe that AI is taking away this luxury. That is, if we continue on our current
                path. No longer will students be able to explore as they once did because they can’t
                afford it. In the same way that{' '}
                <a
                    href="https://www.education.gouv.fr/reussir-au-lycee/la-voie-generale-au-lycee-9749"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="outbound-link-click"
                    data-umami-event-destination="france-lycee-specialization"
                    data-umami-event-context="education-thought-college-system-collapse"
                >
                    France
                </a>
                ,{' '}
                <a
                    href="https://www.skillsforcareers.education.gov.uk/pages/training-choice/a-levels"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="outbound-link-click"
                    data-umami-event-destination="england-a-levels"
                    data-umami-event-context="education-thought-college-system-collapse"
                >
                    England
                </a>
                , and{' '}
                <a
                    href="https://www.government.nl/themes/education/secondary-education/different-types-of-secondary-education/senior-general-secondary-education-havo-and-pre-university-education-vwo"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="outbound-link-click"
                    data-umami-event-destination="netherlands-havo-vwo-profiles"
                    data-umami-event-context="education-thought-college-system-collapse"
                >
                    the Netherlands
                </a>{' '}
                narrow their studies through subject specialties or academic profiles, our
                university programs might similarly demand the same in the future.
            </p>

            <p>
                The benefit of this change isn’t immediately evident, but it’s becoming clearer and
                clearer as the data from these
                education systems prove the case without question. As the data clarifies what works
                and what doesn’t, the changes will become widespread. There are, of course, a million
                considerations that prevent one system’s structure from being broadly applied to
                another country. Still, successful practices often travel: after Shanghai, Singapore,
                and Hong Kong achieved world-leading mathematics results,{' '}
                <a
                    href="https://www.gov.uk/government/news/south-asian-method-of-teaching-maths-to-be-rolled-out-in-schools"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="outbound-link-click"
                    data-umami-event-destination="england-maths-mastery-investment"
                    data-umami-event-context="education-thought-college-system-collapse"
                >
                    England invested
                </a>{' '}
                £41 million to help more than 8,000 primary schools adopt an East Asian-style “maths
                mastery” approach.
            </p>

            <p>
                This optimization (purely of productivity given that this logic largely ignores
                emotional and mental well-being) would be in line with commonly-known research that
                specializing too young is not good for long-term success. Instead, this system would
                encourage students to specialize later on such that they can contribute into their
                specific role within society (more on science fiction roles later on).
            </p>

            <p>
                Put succinctly: monolithic universities won’t work in the future because
                generalization is a luxury AI won’t afford us.
            </p>

            <h2>University fragmentation</h2>

            <p>
                Let’s ignore the question of whether university fragmentation is good or bad and
                simply discuss it in concept. Put clearly: university fragmentation, in this context,
                means that universities will choose a focus. They will either be research
                institutions, vocational programs, or critical thinking schools. All will have a
                social element by nature of us being social animals (a friend of mine, Diya, once
                said “we’re all just little animals at the end of the day”).
            </p>

            <p>
                What I’d like to discuss with this is the more clear creation of a social caste (as Ade
                briefly mentioned). The existing 1% in today’s world certainly exist, but they don’t
                have crystal-clear identifiers. Sure, they tend to have similar characteristics, but
                they don’t all have a degree from X or a job at Y. They vary at least a little. With
                the proposed system, the 1% will be much more clear cut. They will be the individuals
                who attended these critical thinking schools.
            </p>

            <p>
                That is concerning to me. Having these schools would introduce another layer of
                systemic inequality by creating more rigid pathways for who can and cannot succeed.
                Society already produces these barriers through income inequality, unequal funding
                across school districts, housing segregation, and discriminatory hiring and
                promotion practices, but there are, thankfully, always people who rise above to
                become exceptions. I believe that the idea of university fragmentation would make the
                exceptions fewer and further in between; in essence, this university fragmentation
                would restart the progression towards equality that we’ve been trending towards as a
                society.
            </p>

            <h2>When science fiction will become reality</h2>

            <p>
                As we know, the growth of technology happens at an exponential rate and, seeing as
                we’re well into the exponential growth phase, thus my question becomes: at what point
                will we see key indicators of our society being a science fiction novel. Say, for
                example, that we lay out a graph with time on the X axis and the technological development on
                the Y-axis. Let’s plot the earliest references in media (i.e. novels, films, drawings,
                etc.) of a telephone, robotic surgery, satellites, and space travel. Now, let’s plot
                the year when those discoveries came to pass in real life.
            </p>

            <figure className={styles.articleFigure}>
                <img
                    src="/assets/education/imagined-vs-reality.png"
                    alt="Timeline comparing early media depictions of space travel, the telephone, satellites, and robotic surgery with the years they became real."
                    loading="lazy"
                    decoding="async"
                />
            </figure>

            <p>
                As we continue down this graph, we will see that the time between the creation of an
                idea in media and the realization of that discovery is decreasing. That being said,
                the caste-like assignment of individuals to predetermined social roles—later seen in
                novels such as <em>Brave New World</em>, <em>Red Rising</em>, and{' '}
                <em>Divergent</em>—has an early science-fiction precedent in H. G. Wells’s 1901 novel{' '}
                <em>The First Men in the Moon</em>, whose Selenite society physically molds
                individuals for specialized occupations. I predict that the real-life equivalent of
                this will come to pass sooner rather than later. Granted, the rules we stated earlier
                don’t apply all that well for this example since it’s a systemic change instead of a
                discovery, but I believe that the principle holds. So the question then becomes: how can we curb the
                negative effects of this? How can we prevent discrimination, inequality, the
                silencing of voices, consolidation of power, etc.?
            </p>
        </>
    );
}

function EducationThought() {
    const { slug } = useParams();
    const thought = educationThoughts.find(entry => entry.slug === slug);

    useEffect(() => {
        document.title = thought ? `${thought.title} · Education` : 'Education';
    }, [thought]);

    if (!thought) {
        return <Navigate to="/engineer/education" replace />;
    }

    return (
        <main className={styles.thoughtPage}>
            <article>
                <Link
                    className={styles.backLink}
                    to="/engineer/education"
                    data-umami-event="navigation-click"
                    data-umami-event-destination="/engineer/education"
                    data-umami-event-element="education-thought-back"
                >
                    ← Education
                </Link>

                <p className={styles.detail}>{thought.type} · {thought.date}</p>
                <h1>{thought.title}</h1>

                {thought.sourceUrl ? (
                    <a
                        className={styles.sourceLink}
                        href={thought.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-umami-event="outbound-link-click"
                        data-umami-event-destination={thought.sourceDestination}
                        data-umami-event-context={`education-thought-${thought.slug}`}
                    >
                        {thought.sourceLabel}
                    </a>
                ) : null}

                <div className={styles.articleBody}>
                    {thought.slug === 'college-student-loneliness' ? (
                        <CollegeStudentLonelinessEssay />
                    ) : thought.slug === 'college-system-collapse' ? (
                        <CollegeSystemCollapseEssay />
                    ) : (
                        <p>Essay coming soon.</p>
                    )}
                </div>
            </article>
        </main>
    );
}

export default EducationThought;
