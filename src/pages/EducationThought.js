import { useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { educationThoughts } from '../data/educationThoughts';
import { trackUmamiEvent } from '../utils/analytics';
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

const k12ShowcaseSources = {
    brianJohnsrud: 'https://www.linkedin.com/in/brianjohnsrud/',
    patrickGittisriboongul: 'https://www.linkedin.com/in/pgittis/',
    gautamSethi: 'https://www.linkedin.com/in/educio/',
    superintendentGender: 'https://www.aasa.org/resources/resource/salary-gender-2024',
    teacherGender: 'https://nces.ed.gov/programs/coe/indicator/clr/public-school-teachers?tid=4',
    educationForCountries: 'https://openai.com/index/edu-for-countries/',
};

function EducationCitationLink({ href, thoughtSlug, citation, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackUmamiEvent('education-citation-open', {
                slug: thoughtSlug,
                citation,
            })}
        >
            {children}
        </a>
    );
}

function ReddingSourceLink({ href, destination, children }) {
    return (
        <EducationCitationLink
            href={href}
            thoughtSlug="college-student-loneliness"
            citation={destination}
        >
            {children}
        </EducationCitationLink>
    );
}

function K12ShowcaseSourceLink({ href, destination, children }) {
    return (
        <EducationCitationLink
            href={href}
            thoughtSlug="k12-showcase-lessons-from-teachers-and-administrators"
            citation={destination}
        >
            {children}
        </EducationCitationLink>
    );
}

function K12ShowcaseEssay() {
    return (
        <>
            <p>
                Worth the watch because it gave me hope.{' '}
                <K12ShowcaseSourceLink
                    href={k12ShowcaseSources.brianJohnsrud}
                    destination="brian-johnsrud-linkedin"
                >
                    Brian Johnsrud
                </K12ShowcaseSourceLink>
                ,{' '}
                <K12ShowcaseSourceLink
                    href={k12ShowcaseSources.patrickGittisriboongul}
                    destination="patrick-gittisriboongul-linkedin"
                >
                    Patrick Gittisriboongul
                </K12ShowcaseSourceLink>
                ,{' '}
                <K12ShowcaseSourceLink
                    href={k12ShowcaseSources.gautamSethi}
                    destination="gautam-sethi-linkedin"
                >
                    Gautam Sethi
                </K12ShowcaseSourceLink>
                , and Francesca Summers (couldn’t find LinkedIn) were the primary speakers, and each
                brought some neat slices of thought. Before I dive into their thoughts, I want to
                share my miscellaneous thoughts that came up while watching:
            </p>

            <ol className={styles.introList}>
                <li>
                    The two superintendents were male and the teacher was female. An almost absurdly
                    clear example of gender imbalance in an industry that made me look up the numbers:
                    <ol className={styles.introSublist}>
                        <li>
                            <K12ShowcaseSourceLink
                                href={k12ShowcaseSources.superintendentGender}
                                destination="aasa-superintendent-gender-2024"
                            >
                                Men hold approximately 71% to 73% of K-12 school superintendent
                                positions in America, while women hold roughly 27% to 29%
                            </K12ShowcaseSourceLink>
                        </li>
                        <li>
                            <K12ShowcaseSourceLink
                                href={k12ShowcaseSources.teacherGender}
                                destination="nces-public-school-teacher-gender"
                            >
                                Women make up about 77% of K-12 public school teachers, while men
                                account for about 23%
                            </K12ShowcaseSourceLink>
                        </li>
                    </ol>
                </li>
                <li>
                    The superintendent and district CITO were from Lynwood (CA) and Fairfax County
                    (VA), respectively. Fairfax (as you may know if you’re either from America or
                    familiar with wealthy districts) is an incredibly privileged area (median
                    household income is $153,637) and Lynwood is below the national median household
                    income average at $74,844. OpenAI did a good job diversifying their selection
                    here; I’m curious what their actual distribution is across all the schools they
                    work with (i.e how many school districts do they work with where their median
                    income is lower than the US average?).
                </li>
                <li>
                    When I saw this talk, my first thought was a connection to an age-old question
                    (to me): is it a better use of resources to pioneer education in a developed
                    country or invest in establishing equal infrastructure in developing countries?
                    Which produces a larger positive impact? I’m curious on how they’re tracking
                    success on their{' '}
                    <K12ShowcaseSourceLink
                        href={k12ShowcaseSources.educationForCountries}
                        destination="openai-education-for-countries"
                    >
                        Education for Countries
                    </K12ShowcaseSourceLink>
                    {' '}project; it might just produce the answer.
                </li>
            </ol>

            <p>
                As with any panel discussion, there were a couple truly interesting ideas: one from
                Patrick/Gautam and one from Francesca. Try to see if you reach the same connection as
                I did while you read through.
            </p>

            <p>
                Patrick mentioned that he pushes teachers to break their workflows up into steps,
                identify the specific problems that consume time, and then take time to redesign
                those problems using AI. The available drop-in steps have now expanded; imagine it’s
                a Scratch drag-and-drop library of options, but the options just doubled. Teachers
                can now redesign their workflows with these new and enhanced options, making their
                final flow optimized and efficient.
            </p>

            <figure className={styles.articleFigure}>
                <img
                    src="/assets/education/k12-ai-workflow.png"
                    alt="Side-by-side block-based workflows: before AI has fewer options and a repetitive bottleneck, while with AI has an expanded library and a shorter path to completion."
                    loading="lazy"
                    decoding="async"
                />
            </figure>

            <p>
                Gautum built off this point and mentioned how these problem/time-consuming areas are
                different for every teacher and often teachers don’t have ways to solve their
                issues. They do, however, have time to articulate what the issues are. Fairfax has
                created an “idea catcher” tool (effectively a customer intake form) that allows
                teachers to submit their desires/needs/problems. They have then hired forward
                deployed interns to build these solutions. What an opportunity–I’d be{' '}
                <strong>
                    <em>THROUGH THE MOON</em>
                </strong>{' '}
                if I’d had the opportunity to do this as a college student :( Then again maybe I
                just didn’t look hard enough…
            </p>

            <p>
                All right, connection time! Isn’t education starting to sound a bitttt like corporate?
                Having a user requests backlog, forward deployed engineers, and breaking work into
                steps then applying AI to specific steps of that workflow. Let’s say that education
                (and government at large) operates how corporations operated ~10 years ago. I’d then
                say AI has closed that gap to be ~3 years (or less). AI is leveling the playing
                field. That’s very exciting.
            </p>

            <p>Now for Francesca’s point, she shared her workflow:</p>

            <figure className={styles.articleFigure}>
                <img
                    src="/assets/education/k12-actual-workflow.png"
                    alt="Flowchart titled My Actual Workflow: Standard, Learning Target, Success Criteria, Student Writing, Identify the Need, Use OpenAI for Support, Teacher Decision, and Student Growth."
                    loading="lazy"
                    decoding="async"
                />
            </figure>

            <p>
                Let’s take a moment to look at it. I think it’s pretty interesting to wonder about
                what would change if she instead used AI for identifying the need and then she
                generates the solution. How do we establish which step of this process would be best
                (and worst) handled by AI?
            </p>

            <p>
                Here’s my take: AI is worst suited for the task it has the least context in. I’d
                argue that a solution requires more personal context than the identification of a
                need. Put another way: I think it would have been better suited for identifying the
                need and she can think about the solution for each group of kids. Regardless, I
                really enjoy that they seem to be driving home the key point of “identify where AI
                should be used, then apply it; don’t simply apply it broadly/for the whole process”
                to a broader audience of school teachers.
            </p>

            <p>
                A small post-credit thought: they mentioned CER (claim, evidence, reasoning) and tied
                it to how parents need to be filled with confidence that students are still thinking.
                While that’s true, I think the biggest priority should be making students - not
                parents - feel like they’re still thinking.
            </p>
        </>
    );
}

function AffordableNewEducationalInstitutionEssay() {
    const thoughtSlug = 'affordable-new-educational-institution';

    return (
        <>
            <p>
                I originally discovered NEI because of one of my professors,{' '}
                <EducationCitationLink
                    href="https://en.wikipedia.org/wiki/Aaron_Hillegass"
                    thoughtSlug={thoughtSlug}
                    citation="aaron-hillegass"
                >
                    Aaron Hillegass
                </EducationCitationLink>
                . Aaron is a colleague of the professor I worked with in Fall 2026 ({' '}
                <EducationCitationLink
                    href="https://www.pfeijoo.com/"
                    thoughtSlug={thoughtSlug}
                    citation="dr-feijoo-garcia"
                >
                    Dr. Feijoo-Garcia
                </EducationCitationLink>
                ) and the three of us had a conversation in the elevator about the work that
                Aaron was about to pursue at MIT working with NEI. Naturally, it piqued my interest,
                so I began doing some research.
            </p>

            <h2>So, what is NEI and why did it pique my interest?</h2>

            <p>
                NEI is pretty neat. It’s essentially an experiment that MIT is running to identify a
                successful, alternative university structure. It is based on a white paper written
                in 2022 that only recently received sufficient funding to be realized, and Aaron is
                a part of that process as the Director of Curriculum and Instruction. Some key parts
                of this initiative are microcredentials that are stacked, flipped classrooms,
                teachers focused purely on teaching, team teaching, a focus on interpersonal
                character development, guaranteed co-ops, and designed extracurricular options. I
                got the chance to grab lunch and speak with Aaron about some of my questions on the
                project and am very glad I did.
            </p>

            <p>
                As for why it piqued my interest, NEI is a prime example of what I’d want people with
                lots of money to do: use it to experiment on how we can make society a better place.
                Experiments involve risk and designing what our education system will look like in
                the future isn’t exactly a risk-free venture. In fact, it’s quite the opposite:
                there’s very little hope that this “investment” turns out to be anything more than
                data for what we shouldn’t do. Despite that, money has been poured into NEI and
                everyone in society will benefit from that in some way, shape, or form.
            </p>

            <h2>Why does NEI matter to me?</h2>

            <p>
                NEI matters to me because it’s what every dreamer and theorist wants. NEI’s white
                paper is the culmination of decades of thought, research, and intentional effort put
                forth towards education. NEI being realized is hope distilled. It makes me believe
                that the thought I want to put into improving and developing educational systems has
                a chance of being realized, too.
            </p>

            <p>
                I sometimes get concerned when I read people’s research that discusses important,
                interpersonal ideas (i.e. instead of scientific discoveries and facts); e.g.,
                research that focuses on how people <em>should</em> behave in the future is hard.
                Someone might reach an epiphany for how people should behave to create a euphoria in
                a thought experiment, but the thoughts are too far removed from implementation and
                instead focus too much on ideal scenarios. If I would’ve read the white paper when
                it came out in 2022, I would’ve been concerned about exactly that: these thoughts are
                good, but what will come of it? Now, that fear is gone and it’s been replaced with
                hope that thoughts can amount to something more. Something that really impacts
                people.
            </p>

            <h2>Random thoughts from the paper</h2>

            <p>
                This will be a sort of stream of consciousness of thoughts I had while reading the
                paper.
            </p>

            <p>
                I like the idea that microcredentials are offered by the university; normally,
                they’re always online sources.
            </p>

            <p>
                “The coaching should also develop generosity, kindness, and social aptitude.” → What
                does this mean?
            </p>

            <p>
                “Team teaching will help alleviate another persistent tension: competitive dynamics
                between fields (i.e., ‘My field is more important than your field’).” Since I’m not
                in the field, I’ve never stopped to think about these dynamics, but I can easily
                believe that they exist. Always refreshing to hear about problems you’ve never
                thought of.
            </p>

            <p>
                “Runs the risk of ignoring the intangible benefits of college—unless colleges make
                those benefits more directly visible.” → Veryyyyyy interesting. To provide a bit
                more context: this paragraph is discussing how ROI rankings of universities devalues
                the parts of a degree that are intangible. Essentially: the more we lean towards
                ROI-favored rankings, the farther we get from valuing the intangibles. Reminds me of{' '}
                <em>Oryx and Crake</em>. I don’t think we can fault our society for wanting proof that
                something is valuable to keep it alive and well—that’s a natural desire. What I can
                fault our society for is for not striving to better articulate and measure the
                benefits of intangibles like well-being, sociability, etc. We’re faulting a system
                for not believing the statement of “trust me, bro”; instead, we should be faulting a
                system for not fighting to establish metrics.
            </p>

            <p>
                “Dropout rates in higher education over six years hover in the 40 percent range.”
                Yeah, that’s a staggering number. I did a research deep dive on how US News makes
                their rankings of universities since I was curious. Was a pretty interesting system
                and, fun fact, US News changed how they do their rankings in September 2023, causing
                many universities to rapidly drop and rise. That being said, retention rates were a
                large part of this, which I found to be an interesting connection to this quote.
            </p>

            <p>
                Australia liberal arts degrees cost twice as much as STEM. Woah. Policy and
                legislation really can define what a country’s culture is like.
            </p>

            <p>
                WEL → World Education Lab → the lab that the NEI exists in. Comprises of educators,
                technologists, policymakers, societal leaders, employers, and employees.
            </p>
        </>
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
                <EducationCitationLink
                    href={reddingSources.wCurveImage}
                    thoughtSlug="college-student-loneliness"
                    citation="university-of-minnesota-w-curve"
                >
                    <img
                        src="/assets/education/w-curve.png"
                        alt="W-curve diagram showing five stages of the college transition: honeymoon, culture shock, initial adjustment, mental isolation, and acceptance and integration."
                        loading="lazy"
                        decoding="async"
                    />
                </EducationCitationLink>
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
                <EducationCitationLink
                    href="https://www.education.gouv.fr/reussir-au-lycee/la-voie-generale-au-lycee-9749"
                    thoughtSlug="college-system-collapse"
                    citation="france-lycee-specialization"
                >
                    France
                </EducationCitationLink>
                ,{' '}
                <EducationCitationLink
                    href="https://www.skillsforcareers.education.gov.uk/pages/training-choice/a-levels"
                    thoughtSlug="college-system-collapse"
                    citation="england-a-levels"
                >
                    England
                </EducationCitationLink>
                , and{' '}
                <EducationCitationLink
                    href="https://www.government.nl/themes/education/secondary-education/different-types-of-secondary-education/senior-general-secondary-education-havo-and-pre-university-education-vwo"
                    thoughtSlug="college-system-collapse"
                    citation="netherlands-havo-vwo-profiles"
                >
                    the Netherlands
                </EducationCitationLink>{' '}
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
                <EducationCitationLink
                    href="https://www.gov.uk/government/news/south-asian-method-of-teaching-maths-to-be-rolled-out-in-schools"
                    thoughtSlug="college-system-collapse"
                    citation="england-maths-mastery-investment"
                >
                    England invested
                </EducationCitationLink>{' '}
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
    const articleBodyRef = useRef(null);

    useEffect(() => {
        document.title = thought ? `${thought.title} · Education` : 'Education';
    }, [thought]);

    useEffect(() => {
        const publishedEssaySlugs = [
            'k12-showcase-lessons-from-teachers-and-administrators',
            'affordable-new-educational-institution',
            'college-student-loneliness',
            'college-system-collapse',
        ];

        if (!thought || !publishedEssaySlugs.includes(thought.slug)) {
            return undefined;
        }

        const sentMilestones = new Set();
        const milestones = [50, 90];

        const trackReadingProgress = () => {
            const articleBody = articleBodyRef.current;

            if (!articleBody) {
                return;
            }

            const articleBounds = articleBody.getBoundingClientRect();
            const visibleArticleHeight = window.innerHeight - articleBounds.top;
            const progress = Math.max(
                0,
                Math.min(100, (visibleArticleHeight / articleBounds.height) * 100)
            );

            milestones.forEach(milestone => {
                if (progress >= milestone && !sentMilestones.has(milestone)) {
                    sentMilestones.add(milestone);
                    trackUmamiEvent('education-thought-progress', {
                        slug: thought.slug,
                        milestone,
                    });
                }
            });
        };

        trackReadingProgress();
        window.addEventListener('scroll', trackReadingProgress, { passive: true });
        window.addEventListener('resize', trackReadingProgress);

        return () => {
            window.removeEventListener('scroll', trackReadingProgress);
            window.removeEventListener('resize', trackReadingProgress);
        };
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
                    onClick={() => trackUmamiEvent('education-back', {
                        slug: thought.slug,
                    })}
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
                        onClick={() => trackUmamiEvent('education-source-open', {
                            slug: thought.slug,
                            source: thought.sourceDestination,
                            mediaType: thought.type,
                        })}
                    >
                        {thought.sourceLabel}
                    </a>
                ) : null}

                <div className={styles.articleBody} ref={articleBodyRef}>
                    {thought.slug === 'k12-showcase-lessons-from-teachers-and-administrators' ? (
                        <K12ShowcaseEssay />
                    ) : thought.slug === 'college-student-loneliness' ? (
                        <CollegeStudentLonelinessEssay />
                    ) : thought.slug === 'college-system-collapse' ? (
                        <CollegeSystemCollapseEssay />
                    ) : thought.slug === 'affordable-new-educational-institution' ? (
                        <AffordableNewEducationalInstitutionEssay />
                    ) : (
                        <p>Essay coming soon.</p>
                    )}
                </div>
            </article>
        </main>
    );
}

export default EducationThought;
