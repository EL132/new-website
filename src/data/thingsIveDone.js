const thingsAsset = filename => `/assets/things-ive-done/${filename}`;
const writingAsset = filename => `/assets/writing/${filename}`;

export const thingsIveDoneItems = [
    {
        title: 'Simi talent show',
        kicker: 'performance - 2026',
        href: 'https://photos.app.goo.gl/7MZ8jpjwqFD8G7tEA',
        image: thingsAsset('simi_talent_show.jpg'),
        description: 'At this talent show, I sang.',
        background: '#e7efe9',
    },
    {
        title: 'Hiked in Guatemala',
        kicker: 'adventure - 2026',
        href: 'https://photos.app.goo.gl/3kTVWNGejmRhhivs7',
        image: thingsAsset('guatemala.jpg'),
        description: 'I did a 4km hike in Guatemala.',
        background: '#e5eadf',
    },
    {
        title: 'Flash mobbed at Google',
        kicker: 'google - 2025',
        href: 'https://photos.app.goo.gl/mQrU6i1hUWcXwDeo8',
        image: thingsAsset('flash_mob_google.jpg'),
        description: 'I did a flash mob at Google while working there.',
        background: '#ece4d6',
    },
    {
        title: 'Make a Man Out of You',
        kicker: 'club performance - 2024',
        href: 'https://photos.app.goo.gl/4chQFR3sr1HigNC3A',
        image: thingsAsset('make_a_man_out_of_you.jpg'),
        description: 'I acted and sang a performance of Make a Man Out of You from Mulan for a club.',
        background: '#dfe7ee',
    },
    {
        title: 'Co-founded a flash mob club',
        kicker: 'university - 2024',
        href: 'https://www.instagram.com/p/DGYFhEOOaqm/',
        image: thingsAsset('flash_mob_school.JPG'),
        description: 'More than 20 flash mobs completed, 30+ members, three different choreographies, and performances in lecture halls and events.',
        background: '#eee4df',
    },
    {
        title: 'Published poetry',
        kicker: 'literature - 2022',
        href: 'https://drive.google.com/drive/folders/1w9bFAqsEYTOsDa4AwcA8y-dICR0mCH-g',
        image: writingAsset('Selfishness.jpg'),
        description: 'I published poetry through the University of Georgia\'s Stillpoint Literary Magazine. The publication is no longer available online.',
        background: '#e8eadf',
    },
    {
        title: 'Taught English in Colombia',
        kicker: 'volunteer teaching - 2022',
        href: 'https://photos.app.goo.gl/urxekXCbGBhufuy77',
        image: thingsAsset('colombia.jpg'),
        description: 'After graduating high school, I worked as an English teacher in Colombia through a program called Workaway.',
        background: '#e4ebee',
    },
];
