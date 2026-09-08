import { trackUmamiEvent } from '../../utils/analytics';
import styles from '../styles/EducationThought.module.css';

const thoughtSlug = 'americas-education-crisis';

const sources = {
    video: 'https://www.youtube.com/watch?v=72dc8VxyoqE&list=WL&index=11',
    factoryModel: 'https://medium.com/the-history-of-the-future-of-education/the-invented-history-of-the-factory-model-of-education-a069ae3d1e99',
    historicalEnrollment: 'https://nces.ed.gov/programs/digest/d22/tables/dt22_105.30.asp',
    currentEnrollment: 'https://nces.ed.gov/programs/digest/d22/tables/dt22_105.30.asp',
    highSchoolEnrollment: 'https://nces.ed.gov/programs/digest/d19/tables/dt19_201.20.asp',
    quincyGrammarSchool: 'https://www.nps.gov/places/quincy-grammar-school.htm',
    carnegieUnit: 'https://www.carnegiefoundation.org/what-is-the-carnegie-unit/',
    civicEducation: 'https://plato.stanford.edu/entries/civic-education/',
    generationAlpha: 'https://generationalpha.com/wp-content/uploads/2020/02/Understanding-Generation-Alpha-McCrindle.pdf',
    neiPost: '/engineer/education/thoughts/affordable-new-educational-institution',
    winnetkaPlan: 'https://www.winnetkahistory.org/gazette/carleton-washburne/',
    eightYearStudy: 'https://files.eric.ed.gov/fulltext/ED119341.pdf',
    openClassrooms: 'https://www.educationnext.org/theopenclassroom/',
};

function CrisisSourceLink({ href, citation, children }) {
    const isExternal = href.startsWith('http');

    return (
        <a
            href={href}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onClick={() => trackUmamiEvent('education-citation-open', {
                slug: thoughtSlug,
                citation,
            })}
        >
            {children}
        </a>
    );
}

function AmericasEducationCrisisEssay() {
    return (
        <>
            <p>
                What started as a blog quickly became an argumentative research essay. I began with{' '}
                <CrisisSourceLink href={sources.video} citation="opening-video">
                    this video
                </CrisisSourceLink>, but was pretty unsatisfied with the ideas he was presenting. While they were good in
                concept, they felt lackluster and without sufficient context or research. So, I dove head first into
                research around how the education system we know today was built, why it is structured the way
                it is, how many times did it try to change, and what was the result of those changes? Here’s what
                I found:
            </p>

            <p>
                <strong>Thesis:</strong> If we change how universities structure and think about admissions, K-12 education will
                follow.
            </p>

            <figure className={styles.crisisFigure}>
                <img
                    src="/assets/education/education-crisis-path.png"
                    alt="Past, hopeful present, and future paths between a dinosaur and a star"
                    loading="eager"
                    decoding="async"
                />
            </figure>

            <h2>HISTORY! What are the key problems that our education system was built to solve?</h2>

            <p>
                There’s a{' '}
                <CrisisSourceLink href={sources.factoryModel} citation="factory-model-history">
                    popular idea
                </CrisisSourceLink>
                {' '}that America copied the Prussian school system during the Industrial
                Revolution because factory owners needed obedient workers, so schools built their structure with
                that in mind. While it’s true that <strong>order and discipline</strong> remained a key tenant, this rationale is not
                true. The nuances of why it’s not true we’ll dive into throughout this evidence section, but the
                short of it is: American reformers borrowed certain ideas from Prussia, but the American system
                developed piecemeal to solve problems of scale, standardization, mobility, and civic education,
                not to manufacture obedient factory workers.
            </p>

            <p>
                The fundamental question in education is: how can we <strong>educate the masses?</strong> “Educate” as used
                is another piece of the question - i.e. does it mean to teach discipline, instill democracy, enable
                proficiency in math, increase literacy, etc.? Regardless of the definition, the consistent truth is
                that we, when education began becoming universal across America (circa 1870), had to educate
                {' '}
                <CrisisSourceLink href={sources.historicalEnrollment} citation="1870-school-enrollment">
                    6.872 million public elementary and secondary students in 1869–70
                </CrisisSourceLink>
                . By fall 2021, public elementary and secondary enrollment had gone up to{' '}
                <CrisisSourceLink href={sources.currentEnrollment} citation="current-k12-enrollment">
                    49.433 million students
                </CrisisSourceLink>
                .
            </p>

            <p>
                “Across America” are key words that highlight another fundamental design constraint of
                education: how can we interpret the “same” results from different education systems? If a student
                has a 4 in Advanced Math, but another has an 18 in Math 3, which is doing better and which is
                learning what material? To enable a flow of citizens across the nation and uniform analysis of
                students, the system needed a way to 1) let institutions (e.g. corporations, universities)
                understand student’s results and 2) let students move within the country and continue their
                education.
            </p>

            <p>
                As education (i.e. population) began growing at unparalleled rates (
                <CrisisSourceLink href={sources.highSchoolEnrollment} citation="historical-high-school-enrollment">
                    In 1889–90, enrollment in grades 9–12 was 5.6% of the population aged 14–17. By 1919–20,
                    that ratio was 31.2%
                </CrisisSourceLink>
                ), the
                leading educational practice was to have one teacher moderating hundreds of students across
                different ages, proficiencies, and subjects. To solve this issue,{' '}
                <CrisisSourceLink href={sources.quincyGrammarSchool} citation="quincy-grammar-school">
                    Boston’s Quincy Grammar School
                    (BQGS)
                </CrisisSourceLink>
                {' '}introduced the first graded school structure in 1848. Put simply: BQGS said “If you are
                13 years old, you are in 7th grade. If you are 12 years old, you are in 6th grade…” This radically
                changed how educational organization was viewed.
            </p>

            <p>
                To address the <strong>interoperability</strong> problem, The{' '}
                <CrisisSourceLink href={sources.carnegieUnit} citation="carnegie-unit">
                    Carnegie Foundation introduced the Carnegie Unit
                </CrisisSourceLink>
                {' '}which assigned a standardization of classes based on time allocated. The Carnegie Unit is
                equivalent to 120 hours of class time. The Carnegie Unit became wildly popular as it enabled
                interpretability across the nation.
            </p>

            <p>
                Now, let’s return back to the question of what it means to educate and how America’s history
                explains why certain parts of the education system exist as they do. America’s core definition is
                an immigrant population and while that brought countless benefits to America, it posed an
                interesting education problem: how can the system unify these distinct populations, AKA
                assimilate all these unique people? The coercion of people into a heterogeneous democracy was
                done by choosing to instill shared values.{' '}
                <CrisisSourceLink href={sources.civicEducation} citation="civic-education-history">
                    Teaching <strong>citizenship, democracy, and individualism</strong>
                </CrisisSourceLink>
                {' '}thus became key tenants of what the system was built to teach.
            </p>

            <p>
                And now, let’s take a look at the words that were bolded throughout this section: order,
                discipline, educate the masses, interoperability, citizenship, democracy, and individualism. I’ve
                omitted the pieces of our education system’s history that revolve around how teaching math,
                science, and literacy came about because those are, frankly, less interesting. Yadda yadda
                yadda…let’s just say that they were important because the Greeks said so. Bottom line is that
                these are the main constraints that our educational system had to be built around.
            </p>

            <h2>Back to the video. Let’s discuss these points :)</h2>

            <p>
                Knowing what we do know, we are now equipped to answer a lot of modern-day concerns that
                relate to AI - and all it took was a little history ;) Like I mentioned, I started writing this as I
                listened to{' '}
                <CrisisSourceLink href={sources.video} citation="video-url">
                    this video
                </CrisisSourceLink>.
                Here are the few interesting ideas/facts that he brought up in the video:
            </p>

            <ul className={styles.crisisBulletList}>
                <li>
                    65% of those entering primary school today are predicted to work in entirely new job types
                    that don’t yet exist (source:{' '}
                    <CrisisSourceLink href={sources.generationAlpha} citation="generation-alpha-future-work">
                        generationalalpha.com
                    </CrisisSourceLink>
                    )
                    <ul>
                        <li>Requires us to align our curriculum with what we teach</li>
                    </ul>
                </li>
                <li>
                    Giving kids more of a say of their learning path
                    <ul>
                        <li>
                            Student-selected subjects → it’s similar to NEI’s proposed curriculum structure
                            with micro-credentials and optionality (
                            <CrisisSourceLink href={sources.neiPost} citation="nei-blog-post">
                                link to my other blog about NEI&apos;s white paper
                            </CrisisSourceLink>
                            )
                        </li>
                        <li>
                            Choice-based reading → students select the book they want within limits (I
                            actually did this for AP lit when I took it!)
                        </li>
                        <li>
                            Flexible math pathways: students learn math concepts that align with their
                            interests &amp; applications → game design, data analysis, financial planning, etc.
                        </li>
                    </ul>
                </li>
                <li>
                    “Tying concepts into the mental spaces they’re already occupying” → connecting kids to
                    social media algorithms and explaining how they work gives them an understanding into
                    the current world
                </li>
            </ul>

            <p>
                The first point is simply a striking statistic/prediction, no comment. For the second/third points
                about giving kids more of a say in their learning path. It sounds awesome: students learning what
                they want to, therefore instilling more desire and lust for learning into their daily lives at school.
                But, let’s go back to our history - what is the concern here? Is it…
            </p>

            <ol className={styles.crisisChoiceList} type="A">
                <li>Order &amp; discipline</li>
                <li>Interoperability</li>
                <li>Democracy</li>
                <li>Educating masses</li>
            </ol>

            <p>
                Yeah yeah I know I’m lame for doing a multiple choice question. Couldn’t help myself. If you
                said D, you’re correct! I suppose you could make an argument for any, B being the second
                closest answer.
            </p>

            <p>
                Let’s think about the interoperability angle: if student X in Virginia takes Calculus, but their
                calculus has him writing video game code and exploring 3D vector space and student Y in
                Wyoming takes Calculus and focuses purely on analyzing the math inside art paintings, who has
                mastered which material? Well, it’d be the baseline agreed-upon set of curriculum that is
                required nationally (or by state), and then the teaching method of those topics could be done
                based on the student’s interest. Each student learns the same material, but there are tailored ways
                to do it for each student. That’s possible, but very time consuming.
            </p>

            <p>
                Now, let’s talk about option D: educating masses. We already said it: having to create a
                customized learning journey for each student is extremely time consuming. “Let’s use AI”. Okay,
                fair enough. Now, we’ve got AI generating a personalized pathway for each student based on
                their interests, sweet! They’re all in algebra 1. Let’s then say that a student, Sahil, has a question
                about his urban planning-specific learning route and he goes to his teacher, Mr. F, who then
                needs to ramp himself up in the context to provide adequate support, but he does it after 5
                minutes. Shortly after, another student, Dani, asks a question about her hiking-based learning
                route, and Mr. F has to, again, provide support specific to that scenario. These scenarios keep
                happening and class runs out before Mr. F can provide support. Mr. F lacks the ability to provide
                quick support, lacks context on his student’s learning material (he simply can’t be intimately
                familiar with it all), and students aren’t as readily able to help one another. That makes D the
                most compelling concern with this potentially beautiful suggestion. It’s a wonderful idea, but
                we’ve got work to do before it becomes feasible.
            </p>

            <p>
                This brings us back to the question of: “How much common knowledge should society guarantee
                every child, while allowing far more variation in how, when, and through what applications they
                acquire it?” i.e. with the flexible pathways, how can we guarantee knowledge while still
                empowering individuality and support from teachers?
            </p>

            <h2>Did this guy forget about the thesis?</h2>

            <p>
                While it might seem like I did, I didn’t. My intent is less so a thorough argumentative essay and
                more so presentation of all the media I got to arrive at my conclusion. Now, the most compelling
                piece of the argument: more history :)
            </p>

            <p>
                The idea of personalizing a student&apos;s education is not new. In fact, in Winnetka, Illinois (fun fact:
                I lived here when I was younger!), beginning in 1919, superintendent Carleton Washburne
                created a system in which students worked through core material at individual rates, teachers
                developed individualized learning materials, conventional grades were eventually replaced by
                individual goals, and substantial space was reserved for creative interests, projects, and group
                activities.
            </p>

            <p>
                This experiment resulted in a highly influential proof of concept: Winnetka’s schools gained
                international recognition, educators across the country copied their materials and methods, and
                several of the plan’s child-centered practices endured for decades (
                <CrisisSourceLink href={sources.winnetkaPlan} citation="winnetka-plan">
                    link
                </CrisisSourceLink>
                ).
            </p>

            <p>
                A similar study conducted from 1932–40, (The Eight-Year Study), was done to research how changing
                high school education would alter student outcomes. Setup: universities selected a group of high
                schools that they would assess differently in their admissions process. With that empowerment,
                the high schools invested into personalization with great success: researchers followed 1,475
                matched pairs of students into college and found that graduates of the experimental schools
                earned slightly higher grades and more honors, demonstrated greater intellectual curiosity and
                resourcefulness, and participated more actively in campus life. Graduates of the most
                experimental schools were “strikingly more successful” than their matched peers (
                <CrisisSourceLink href={sources.eightYearStudy} citation="eight-year-study">
                    link
                </CrisisSourceLink>
                ).
            </p>

            <p>
                Then, in the late 1960s and 1970s, there was another wave:{' '}
                <CrisisSourceLink href={sources.openClassrooms} citation="open-classroom-movement">
                    open classrooms
                </CrisisSourceLink>
                , multi-age groups,
                learning centers, flexible spaces and student-centered instruction. Thousands of American
                classrooms experimented with variations of this model. Unfortunately, by the end of the 1970s,
                the movement had largely receded amid implementation problems and a broader political turn
                toward standards, testing, and “back to basics.”
            </p>

            <p>Throughout these examples, you should see a clear pattern start to emerge:</p>

            <p className={styles.crisisPattern}>
                Standardization → dissatisfaction → personalization → difficulty demonstrating
                consistency/rigor → public anxiety → re-standardization
            </p>

            <p>
                Basicallllllly, the question is how do we prevent ourselves from going back to the comfort of
                guaranteed admissions results while pursuing this new change? How can we ensure that we
                remain steadfast as high schools make change? We need two things:
            </p>

            <ol className={styles.crisisNumberList}>
                <li>
                    Brave schools with strong results. Be the first to take the plunge. We need high schools
                    to be bold enough to experiment and researched enough to succeed amidst an unclear
                    admissions landscape.
                </li>
                <li>
                    Universities must allow the change. If universities consistently reject students from
                    non-traditional schooling system backgrounds, change will never come. We will never
                    grow.
                </li>
            </ol>

            <p>
                As such, I believe that if we are to hope for any change in this system, it must come from
                universities that are curious and creative enough to pursue what education can mean.
            </p>
        </>
    );
}

export default AmericasEducationCrisisEssay;
