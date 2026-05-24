const photoAsset = filename => `/assets/photography/${filename}`;
const projectAsset = (project, filename) => `/assets/projects/${project}/${filename}`;
const writingAsset = filename => `/assets/writing/${filename}`;

export const thingsIveDoneItems = [
    {
        title: 'Mapped my flights',
        kicker: 'travel log',
        href: '/artist/travel',
        image: photoAsset('Spain 2.jpg'),
        description: 'A living map of the routes, airports, and places that have shaped my recent travel.',
        background: '#e7efe9',
    },
    {
        title: 'Built a memory assistant',
        kicker: 'project',
        href: '/engineer/making-things',
        image: projectAsset('memory-assistant', 'cover.png'),
        description: 'An AI-powered search tool for finding answers inside my own notes and writing.',
        background: '#dfe7ee',
    },
    {
        title: 'Made a platformer',
        kicker: 'game',
        href: '/engineer/making-things',
        image: projectAsset('platformer', 'cover.png'),
        description: 'A Python and Pygame platformer built through a long cycle of design, testing, and iteration.',
        background: '#ece4d6',
    },
    {
        title: 'Documented people and places',
        kicker: 'photography',
        href: '/artist/photography',
        image: photoAsset('Korean - embrace.jpg'),
        description: 'Portraits and travel photographs that try to hold onto the feeling of a moment.',
        background: '#eee4df',
    },
    {
        title: 'Created Know Athens',
        kicker: 'full stack',
        href: '/engineer/making-things',
        image: projectAsset('know-athens', 'cover.png'),
        description: 'A full-stack web app for exploring events, artists, and people around Athens, Georgia.',
        background: '#e8eadf',
    },
    {
        title: 'Built a Spotify Wrapped app',
        kicker: 'mobile',
        href: '/engineer/making-things',
        image: projectAsset('spotify-wrapped', 'cover.png'),
        description: 'A mobile app concept for revisiting listening stats and music memories outside year-end recaps.',
        background: '#dfe8df',
    },
    {
        title: 'Studied how things work',
        kicker: 'education',
        href: '/engineer/education',
        image: '/assets/home/option_two.jpg',
        description: 'Coursework, experiments, and engineering questions that keep pushing me toward better systems.',
        background: '#e6e2ef',
    },
    {
        title: 'Wrote through questions',
        kicker: 'writing',
        image: writingAsset('Selfishness.jpg'),
        description: 'Short essays and personal notes on responsibility, ambition, family, and the shape of a good life.',
        background: '#eee7dc',
    },
    {
        title: 'Collected community moments',
        kicker: 'friendship',
        image: photoAsset('Pappas.JPG'),
        description: 'Small records of the people, gatherings, and communities I am lucky to be part of.',
        background: '#e4edf0',
    },
    {
        title: 'Kept making the website',
        kicker: 'ongoing',
        href: '/about',
        image: '/assets/home/option_one.jpg',
        description: 'This site is a place to connect projects, photographs, travel, writing, and the people behind them.',
        background: '#ece6df',
    },
];
