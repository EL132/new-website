import { useEffect, useMemo, useState } from 'react';
import styles from './styles/MakingThings.module.css';

const projectAsset = filename => `/assets/projects/${filename}`;

const categories = [
    'screen things',
    'in between',
    'hand things',
];

const projects = [
    {
        id: 'know-athens',
        title: 'Know Athens',
        year: '2022',
        category: 'screen things',
        status: 'archived app',
        objectType: 'folder',
        layout: 'wideObject',
        description: 'A full-stack web application for exploring events, artists, and people in Athens, GA. It was the project that taught me I could learn an unfamiliar stack by building through it.',
        toolsMaterials: ['Vue', 'Google Cloud', 'Figma', 'full-stack web'],
        assets: [
            { type: 'image', src: projectAsset('know-athens/cover.png'), alt: 'Know Athens cover' },
            { type: 'image', src: projectAsset('know-athens/figma.png'), alt: 'Figma asset for Know Athens' },
            { type: 'image', src: projectAsset('know-athens/Google-cloud.png'), alt: 'Google Cloud asset for Know Athens' },
            { type: 'image', src: projectAsset('know-athens/Vue.png'), alt: 'Vue asset for Know Athens' },
        ],
        links: [],
    },
    {
        id: 'memory-assistant',
        title: 'Memory Assistant',
        year: '2023',
        category: 'screen things',
        status: 'search tool',
        objectType: 'window',
        layout: 'tallObject',
        description: 'An AI-powered search tool I built to study technical interviews using my own notes. It turned a scattered study archive into something I could query and revisit.',
        toolsMaterials: ['React', 'Express', 'AI search', 'notes'],
        assets: [
            { type: 'image', src: projectAsset('memory-assistant/cover.png'), alt: 'Memory Assistant cover' },
            { type: 'image', src: projectAsset('memory-assistant/Vercel.png'), alt: 'Vercel asset for Memory Assistant' },
            { type: 'image', src: projectAsset('memory-assistant/react.png'), alt: 'React asset for Memory Assistant' },
            { type: 'image', src: projectAsset('memory-assistant/express.png'), alt: 'Express asset for Memory Assistant' },
        ],
        links: [],
    },
    {
        id: 'platformer',
        title: 'Platformer',
        year: '2023',
        category: 'screen things',
        status: 'game file',
        objectType: 'program',
        layout: 'standardObject',
        description: 'A 2D platformer built in Python with Pygame. It was a long-form exercise in mechanics, level design, iteration, and the patience required to make a small world feel responsive.',
        toolsMaterials: ['Python', 'Pygame', 'game design', 'GitHub'],
        assets: [
            { type: 'image', src: projectAsset('platformer/cover.png'), alt: 'Platformer cover' },
            { type: 'image', src: projectAsset('platformer/console.png'), alt: 'Platformer console screenshot' },
            { type: 'image', src: projectAsset('platformer/python.png'), alt: 'Python asset for Platformer' },
            { type: 'image', src: projectAsset('platformer/github.png'), alt: 'GitHub asset for Platformer' },
        ],
        links: [],
    },
    {
        id: 'velox',
        title: 'Velox',
        year: '2026',
        category: 'in between',
        status: 'build record',
        objectType: 'media report',
        layout: 'wideObject',
        description: 'A project that sits between software thinking, documentation, and physical build work. The archive is a video and final report rather than a clean app screen.',
        toolsMaterials: ['video', 'report', 'prototyping', 'systems'],
        assets: [
            { type: 'video', src: projectAsset('velox_video.MOV'), label: 'Velox video' },
            { type: 'document', src: projectAsset('Final_Report__Velox.pdf'), label: 'Velox final report' },
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
    {
        id: 'pigeon-post',
        title: 'Pigeon Post',
        year: '2026',
        category: 'in between',
        status: 'object study',
        objectType: 'field file',
        layout: 'standardObject',
        description: 'A making project documented as an object record. It belongs in the middle of the archive: part concept, part documentation, part physical experiment.',
        toolsMaterials: ['documentation', 'object design', 'photography', 'materials'],
        assets: [
            { type: 'image', src: projectAsset('pigeon-post.jpg'), alt: 'Pigeon Post' },
        ],
        links: [
            {
                label: 'final documentation',
                href: 'https://drive.google.com/file/d/1jDcoOPaP98gOT9CqE4Pj40CSy33AShXL/view?ths=true',
            },
            { label: 'image', href: projectAsset('pigeon-post.jpg') },
        ],
    },
    {
        id: 'embroidered-sweatshirt',
        title: 'Embroidered Sweatshirt',
        year: '2026',
        category: 'hand things',
        status: 'material study',
        objectType: 'scanned object',
        layout: 'tallObject',
        description: 'A hands-on embroidery experiment and part of my growing interest in physical making: thread, fabric, slower decisions, and visible iteration.',
        toolsMaterials: ['thread', 'fabric', 'embroidery', 'patience'],
        assets: [
            { type: 'image', src: projectAsset('embroidered_sweatshirt.jpg'), alt: 'Embroidered sweatshirt' },
        ],
        links: [
            { label: 'image', href: projectAsset('embroidered_sweatshirt.jpg') },
        ],
    },
    {
        id: 'embroidered-kitchen-towels',
        title: 'Embroidered Kitchen Towels',
        year: '2026',
        category: 'hand things',
        status: 'material study',
        objectType: 'scanned object',
        layout: 'standardObject',
        description: 'Another small step into making with my hands. Useful objects, simple materials, and the kind of project that rewards care more than speed.',
        toolsMaterials: ['thread', 'textiles', 'embroidery', 'household objects'],
        assets: [
            { type: 'image', src: projectAsset('kitchen_towels.jpeg'), alt: 'Embroidered kitchen towels' },
        ],
        links: [
            { label: 'image', href: projectAsset('kitchen_towels.jpeg') },
        ],
    },
];

function getPrimaryAsset(project) {
    return project.assets.find(asset => asset.type !== 'document') ?? project.assets[0];
}

function AssetPreview({ asset, className = '', controls = false }) {
    if (!asset) {
        return (
            <div className={`${styles.emptyPreview} ${className}`}>
                <span>no preview</span>
            </div>
        );
    }

    if (asset.type === 'video') {
        return (
            <video
                className={`${styles.assetPreview} ${className}`}
                src={asset.src}
                controls={controls}
                muted
                playsInline
                preload="metadata"
            />
        );
    }

    if (asset.type === 'document') {
        return (
            <div className={`${styles.documentPreview} ${className}`}>
                <span>PDF</span>
                <strong>{asset.label}</strong>
            </div>
        );
    }

    return (
        <img
            className={`${styles.assetPreview} ${className}`}
            src={asset.src}
            alt={asset.alt}
            loading="lazy"
        />
    );
}

function ProjectLinks({ links }) {
    if (!links.length) {
        return <p className={styles.noLinks}>No public link in the archive.</p>;
    }

    return (
        <ul className={styles.projectLinks}>
            {links.map(link => (
                <li key={`${link.label}-${link.href}`}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}

function ArchiveObject({ project, isSelected, onSelect }) {
    const primaryAsset = getPrimaryAsset(project);
    const layoutClass = project.layout ? styles[project.layout] : '';

    return (
        <button
            type="button"
            className={`${styles.archiveObject} ${layoutClass} ${isSelected ? styles.archiveObjectSelected : ''}`}
            onClick={onSelect}
            aria-pressed={isSelected}
        >
            <span className={styles.objectChrome} aria-hidden="true">
                <span />
                <span />
                <span />
            </span>
            <span className={styles.objectMedia}>
                <AssetPreview asset={primaryAsset} />
            </span>
            <span className={styles.objectMeta}>
                <span className={styles.objectType}>{project.objectType} / {project.status}</span>
                <span className={styles.objectTitle}>{project.title}</span>
                <span className={styles.objectYear}>{project.year}</span>
            </span>
        </button>
    );
}

function Inspector({ project }) {
    const primaryAsset = getPrimaryAsset(project);
    const fileLinks = project.assets.map(asset => ({
        label: asset.label || asset.alt || 'open file',
        href: asset.src,
    }));

    return (
        <aside className={styles.inspector} aria-label={`${project.title} inspection panel`}>
            <div className={styles.inspectorTop}>
                <p className={styles.panelLabel}>selected object</p>
                <p className={styles.inspectorPath}>/archive/{project.category}/{project.id}</p>
            </div>

            <div className={styles.inspectorMedia}>
                <AssetPreview asset={primaryAsset} controls />
            </div>

            <div className={styles.inspectorHeader}>
                <p>{project.year} / {project.category} / {project.status}</p>
                <h2>{project.title}</h2>
            </div>

            <p className={styles.projectDescription}>{project.description}</p>

            <div className={styles.inspectorSection}>
                <p className={styles.panelLabel}>tools / materials</p>
                <ul className={styles.materialList}>
                    {project.toolsMaterials.map(tool => (
                        <li key={tool}>{tool}</li>
                    ))}
                </ul>
            </div>

            <div className={styles.inspectorSection}>
                <p className={styles.panelLabel}>project links</p>
                <ProjectLinks links={project.links} />
            </div>

            <div className={styles.inspectorSection}>
                <p className={styles.panelLabel}>archive files</p>
                <ul className={styles.fileLinks}>
                    {fileLinks.map(link => (
                        <li key={`${project.id}-${link.href}`}>
                            <a href={link.href} target="_blank" rel="noreferrer">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

function MakingThings() {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);

    useEffect(() => {
        document.title = 'I Like To Make Things';
    }, []);

    const visibleProjects = useMemo(
        () => projects.filter(project => project.category === activeCategory),
        [activeCategory]
    );
    const selectedProject = projects.find(project => project.id === selectedProjectId) ?? visibleProjects[0] ?? projects[0];

    const handleCategoryChange = category => {
        const firstProject = projects.find(project => project.category === category);

        setActiveCategory(category);
        if (firstProject) {
            setSelectedProjectId(firstProject.id);
        }
    };

    return (
        <main className={styles.makingThingsPage}>
            <header className={styles.hero}>
                <div>
                    <p className={styles.eyebrow}>personal archive / making system</p>
                    <h1>i like to make things</h1>
                </div>
                <div className={styles.heroCopy}>
                    <p>Mostly with code.</p>
                    <p>More and more with my hands.</p>
                    <span>A working archive of screen things, hand things, and the experiments somewhere between.</span>
                </div>
            </header>

            <section className={styles.archiveSection} aria-labelledby="archive-title">
                <div className={styles.archiveWindow}>
                    <div className={styles.windowBar}>
                        <p id="archive-title">making archive</p>
                        <span>{projects.length} objects</span>
                    </div>

                    <div className={styles.archiveLayout}>
                        <nav className={styles.directory} aria-label="Project categories">
                            <p className={styles.panelLabel}>directory</p>
                            <div className={styles.categoryControls}>
                                {categories.map(category => {
                                    const count = projects.filter(project => project.category === category).length;
                                    const isActive = activeCategory === category;

                                    return (
                                        <button
                                            key={category}
                                            type="button"
                                            className={`${styles.categoryButton} ${isActive ? styles.categoryButtonActive : ''}`}
                                            onClick={() => handleCategoryChange(category)}
                                            aria-pressed={isActive}
                                        >
                                            <span>{category}</span>
                                            <span>{String(count).padStart(2, '0')}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </nav>

                        <div className={styles.objectShelf}>
                            <div className={styles.shelfHeader}>
                                <p className={styles.panelLabel}>open folder</p>
                                <h2>{activeCategory}</h2>
                            </div>

                            <div className={styles.archiveObjects}>
                                {visibleProjects.map(project => (
                                    <ArchiveObject
                                        key={project.id}
                                        project={project}
                                        isSelected={selectedProject.id === project.id}
                                        onSelect={() => setSelectedProjectId(project.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        <Inspector project={selectedProject} />
                    </div>
                </div>
            </section>

            <section className={styles.closingSection}>
                <p className={styles.eyebrow}>next folder</p>
                <h2>The next things I want to make probably won&apos;t live entirely on a screen.</h2>
                <p>
                    Lately, the most fulfilling projects are the ones that make me slower,
                    more patient, and more connected to materials. I want to keep learning
                    how to build with my hands.
                </p>
            </section>
        </main>
    );
}

export default MakingThings;
