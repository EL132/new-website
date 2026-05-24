import { useEffect } from 'react';
import styles from './styles/MakingThings.module.css';

const projectAsset = filename => `/assets/projects/${filename}`;

const softwareProjects = [
    {
        title: 'Know Athens',
        year: '2022',
        media: [
            { type: 'image', src: projectAsset('know-athens/cover.png'), alt: 'Know Athens cover' },
            { type: 'image', src: projectAsset('know-athens/figma.png'), alt: 'Figma asset for Know Athens' },
            { type: 'image', src: projectAsset('know-athens/Google-cloud.png'), alt: 'Google Cloud asset for Know Athens' },
            { type: 'image', src: projectAsset('know-athens/Vue.png'), alt: 'Vue asset for Know Athens' },
        ],
    },
    {
        title: 'Memory Assistant',
        year: '2023',
        media: [
            { type: 'image', src: projectAsset('memory-assistant/cover.png'), alt: 'Memory Assistant cover' },
            { type: 'image', src: projectAsset('memory-assistant/Vercel.png'), alt: 'Vercel asset for Memory Assistant' },
            { type: 'image', src: projectAsset('memory-assistant/react.png'), alt: 'React asset for Memory Assistant' },
            { type: 'image', src: projectAsset('memory-assistant/express.png'), alt: 'Express asset for Memory Assistant' },
        ],
    },
    {
        title: 'Platformer',
        year: '2023',
        media: [
            { type: 'image', src: projectAsset('platformer/cover.png'), alt: 'Platformer cover' },
            { type: 'image', src: projectAsset('platformer/console.png'), alt: 'Platformer console screenshot' },
            { type: 'image', src: projectAsset('platformer/python.png'), alt: 'Python asset for Platformer' },
            { type: 'image', src: projectAsset('platformer/github.png'), alt: 'GitHub asset for Platformer' },
        ],
    },
    {
        title: 'Velox',
        year: '2026',
        media: [
            { type: 'video', src: projectAsset('velox_video.MOV'), label: 'Velox video' },
        ],
        links: [
            {
                label: 'final documentation',
                href: 'https://drive.google.com/file/d/1mgLgtn-AYqSbxKcQG4RzeNMTVyQoo-So/view?usp=sharing',
            },
            { label: 'local report', href: projectAsset('Final_Report__Velox.pdf') },
            { label: 'video', href: projectAsset('velox_video.MOV') },
        ],
    },
];

const hardwareProjects = [
    {
        title: 'Pigeon Post',
        year: '2026',
        media: [
            { type: 'image', src: projectAsset('pigeon-post.heic'), alt: 'Pigeon Post' },
        ],
        links: [
            {
                label: 'final documentation',
                href: 'https://drive.google.com/file/d/1jDcoOPaP98gOT9CqE4Pj40CSy33AShXL/view?ths=true',
            },
            { label: 'image', href: projectAsset('pigeon-post.heic') },
        ],
    },
    {
        title: 'Embroidered Sweatshirt',
        year: '2026',
        media: [
            { type: 'image', src: projectAsset('embroidered_sweatshirt.jpg'), alt: 'Embroidered sweatshirt' },
        ],
    },
    {
        title: 'Embroidered Kitchen Towels',
        year: '2026',
        media: [
            { type: 'image', src: projectAsset('kitchen_towels.jpeg'), alt: 'Embroidered kitchen towels' },
        ],
    },
];

function ProjectMedia({ item }) {
    if (!item.media?.length) {
        return null;
    }

    return (
        <div className={styles.assetGrid}>
            {item.media.map(media => (
                <a
                    className={styles.assetTile}
                    href={media.src}
                    key={media.src}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={media.alt || media.label || item.title}
                >
                    {media.type === 'video' ? (
                        <video
                            className={styles.asset}
                            src={media.src}
                            controls
                            muted
                            playsInline
                            preload="metadata"
                        />
                    ) : (
                        <img className={styles.asset} src={media.src} alt={media.alt} loading="lazy" />
                    )}
                </a>
            ))}
        </div>
    );
}

function ProjectLinks({ links }) {
    if (!links?.length) {
        return null;
    }

    return (
        <ul className={styles.projectLinks}>
            {links.map(link => (
                <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}

function ProjectSection({ title, items }) {
    return (
        <section className={styles.projectSection}>
            <h2>{title}</h2>
            <div className={styles.projectList}>
                {items.map(item => (
                    <article className={styles.projectItem} key={item.title}>
                        <div className={styles.projectHeader}>
                            <h3>{item.title}</h3>
                            <p>{item.year}</p>
                        </div>
                        <ProjectLinks links={item.links} />
                        <ProjectMedia item={item} />
                    </article>
                ))}
            </div>
        </section>
    );
}

function MakingThings() {
    useEffect(() => {
        document.title = 'I Like To Make Things';
    }, []);

    return (
        <main className={styles.makingThingsPage}>
            <header className={styles.pageHeader}>
                <h1>i like to make things</h1>
            </header>

            <ProjectSection title="software" items={softwareProjects} />
            <ProjectSection title="hardware" items={hardwareProjects} />
        </main>
    );
}

export default MakingThings;
