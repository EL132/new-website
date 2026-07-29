import { useEffect, useMemo, useState } from 'react';
import styles from './styles/MakingThings.module.css';

const projectAsset = filename => `/assets/projects/${filename}`;

const locations = [
    { id: 'all', label: 'All projects', path: 'This PC > Elias > Projects' },
    { id: 'screen things', label: 'screen things', path: 'This PC > Elias > Projects > screen things' },
    { id: 'in between', label: 'in between', path: 'This PC > Elias > Projects > in between' },
    { id: 'hand things', label: 'hand things', path: 'This PC > Elias > Projects > hand things' },
];

const projects = [
    {
        id: 'know-athens',
        title: 'Know Athens',
        year: '2022',
        category: 'screen things',
        status: 'archived app',
        objectType: 'folder',
        description: 'A startup contracted me to build their website from scratch: a full-stack web application for exploring events, artists, and people in Athens, GA. I had no web development knowledge when I started, so I taught myself by building through it and taking a Udemy web development course.',
        toolsMaterials: ['contract work', 'full-stack web', 'self-taught', 'Udemy course'],
        assets: [
            {
                type: 'image',
                src: projectAsset('know-athens/cover.png'),
                alt: 'A Know Athens graphic announcing a weekly music update for March 27 through April 2.',
            },
        ],
        links: [
            {
                label: 'Udemy course',
                href: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
            },
        ],
    },
    {
        id: 'memory-assistant',
        title: 'Memory Assistant',
        year: '2023',
        category: 'screen things',
        status: 'search tool',
        objectType: 'app window',
        description: 'An AI-powered search tool I built with one friend to study technical interviews using our own notes. We made our own vector database from those notes and had an LLM query it for relevant chunks.',
        toolsMaterials: ['vector database', 'LLM retrieval', 'notes', 'React'],
        assets: [
            {
                type: 'image',
                src: projectAsset('memory-assistant/cover.png'),
                alt: 'An orange presentation slide introducing Memory Assistant as an AI-powered search tool built from personal notes.',
            },
        ],
        links: [
            { label: 'website', href: 'https://memory-assistant-97ft.vercel.app/' },
            { label: 'GitHub repo', href: 'https://github.com/EL132/Memory-Assistant' },
        ],
    },
    {
        id: 'platformer',
        title: 'Platformer',
        year: '2023',
        category: 'screen things',
        status: 'game file',
        objectType: 'program',
        description: 'A 2D platformer built in Python with Pygame. It was a long-form exercise in mechanics, level design, iteration, and the patience required to make a small world feel responsive.',
        toolsMaterials: ['Python', 'Pygame', 'game design', 'GitHub'],
        assets: [
            {
                type: 'image',
                src: projectAsset('platformer/cover.png'),
                alt: 'Illustrated Platformer title art showing a red-haired character holding an axe in a dark forest.',
            },
        ],
        links: [
            { label: 'website', href: 'https://el132.github.io/platformer/' },
            { label: 'GitHub repo', href: 'https://github.com/EL132/platformer' },
        ],
    },
    {
        id: 'velox',
        title: 'Velox',
        year: '2026',
        category: 'in between',
        status: 'build record',
        objectType: 'media report',
        description: 'A project that sits between software thinking, documentation, and physical build work. The archive is a final documentation record and presentation rather than a clean app screen.',
        toolsMaterials: ['documentation', 'presentation', 'prototyping', 'systems'],
        assets: [
            {
                type: 'image',
                src: projectAsset('velox.png'),
                alt: 'A Velox mobile timer screen over a bicycle camera view, showing total time, lap times, and workout controls.',
            },
        ],
        links: [
            {
                label: 'final documentation',
                href: 'https://drive.google.com/file/d/1mgLgtn-AYqSbxKcQG4RzeNMTVyQoo-So/view?usp=sharing',
            },
            {
                label: 'final presentation',
                href: 'https://docs.google.com/presentation/d/10zGGX9PskK93Dc0x3y_quYG82D4PlT6WuavwXX2TNPE/edit?usp=sharing',
            },
            {
                label: 'video - skip to 1:00',
                href: 'https://drive.google.com/file/d/1hw9Fc-DkTIH28F99Bg1OGOJVw5I0fcbp/view?resourcekey',
            },
        ],
    },
    {
        id: 'pigeon-post',
        title: 'Pigeon Post',
        year: '2026',
        category: 'in between',
        status: 'object study',
        objectType: 'field file',
        description: 'A 2-way communication device made for my partner to help us introduce novelty into our relationship at distance.',
        toolsMaterials: ['Design', 'CAD', 'embedded systems', 'laser cutting'],
        assets: [
            {
                type: 'image',
                src: projectAsset('pigeon-post.jpg'),
                alt: 'Two laser-cut wooden Pigeon Post devices, one with a green screen reading “Something to share!”',
            },
        ],
        links: [
            {
                label: 'final documentation',
                href: 'https://drive.google.com/file/d/1jDcoOPaP98gOT9CqE4Pj40CSy33AShXL/view?ths=true',
            },
            { label: 'GitHub repo', href: 'https://github.com/EL132/pigeon-post' },
        ],
    },
    {
        id: 'embroidered-sweatshirt',
        title: 'Embroidered Sweatshirt',
        year: '2026',
        category: 'hand things',
        status: 'material study',
        objectType: 'scanned object',
        description: 'A hands-on embroidery experiment and a gift for my partner. It was part of my growing interest in physical making: thread, fabric, slower decisions, and visible iteration.',
        toolsMaterials: ['thread', 'fabric', 'embroidery', 'patience'],
        assets: [
            {
                type: 'image',
                src: projectAsset('embroidered_sweatshirt.jpg'),
                alt: 'A burgundy sweatshirt on a workbench with three yellow embroidered patches, chalk guide lines, and a ruler.',
            },
        ],
        links: [],
    },
    {
        id: 'embroidered-kitchen-towels',
        title: 'Embroidered Kitchen Towels',
        year: '2026',
        category: 'hand things',
        status: 'material study',
        objectType: 'scanned object',
        description: 'Another small step into making with my hands. I messed up a good bit, which made it a useful lesson in patience, repetition, and working with simple materials.',
        toolsMaterials: ['thread', 'textiles', 'embroidery', 'household objects'],
        assets: [
            {
                type: 'image',
                src: projectAsset('kitchen_towels.jpeg'),
                alt: 'Four white kitchen towels embroidered with geese, footprints, and the words “Happy birthday Divya.”',
            },
        ],
        links: [],
    },
];

function getPrimaryAsset(project) {
    return project.assets.find(asset => asset.type !== 'document') ?? project.assets[0];
}

function getItemCountLabel(project) {
    const count = project.assets.length + project.links.length;
    return `${count} item${count === 1 ? '' : 's'}`;
}

function getProjectIcon(project) {
    if (project.category === 'screen things') return 'screen';
    if (project.category === 'hand things') return 'hand';
    return 'hybrid';
}

function PixelIcon({ type }) {
    const className = `${styles.pixelIcon} ${styles[`${type}Icon`] || ''}`;

    return (
        <span className={className} aria-hidden="true">
            <span />
        </span>
    );
}

function AssetPreview({ asset, controls = false }) {
    if (!asset) {
        return (
            <div className={styles.emptyPreview}>
                <span>no preview</span>
            </div>
        );
    }

    if (asset.type === 'video') {
        return (
            <video
                className={styles.assetPreview}
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
            <div className={styles.documentPreview}>
                <span>PDF</span>
                <strong>{asset.label}</strong>
            </div>
        );
    }

    return (
        <img
            className={styles.assetPreview}
            src={asset.src}
            alt={asset.alt}
            loading="lazy"
        />
    );
}

function ProjectLinks({ links, projectId, context }) {
    if (!links.length) {
        return <p className={styles.noLinks}>No public link in this folder.</p>;
    }

    return (
        <ul className={styles.linkList}>
            {links.map(link => (
                <li key={`${link.label}-${link.href}`}>
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        data-umami-event="project-link-open"
                        data-umami-event-project={projectId}
                        data-umami-event-link={link.label}
                        data-umami-event-context={context}
                    >
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}

function TitleBar() {
    return (
        <div className={styles.titleBar}>
            <div className={styles.tabStrip}>
                <div className={styles.activeTab}>
                    <PixelIcon type="folder" />
                    <span>Projects</span>
                </div>
                <button
                    type="button"
                    aria-label="New tab"
                    className={styles.newTabButton}
                    data-umami-event="project-browser-control"
                    data-umami-event-control="new-tab"
                >
                    +
                </button>
            </div>
            <div className={styles.windowControls} aria-hidden="true">
                <span />
                <span />
                <span />
            </div>
        </div>
    );
}

function AddressBar({ activeLocation, searchTerm, onSearchChange }) {
    return (
        <div className={styles.addressRow}>
            <div className={styles.navigationButtons} aria-label="Explorer navigation controls">
                <button
                    type="button"
                    aria-label="Back"
                    data-umami-event="project-browser-control"
                    data-umami-event-control="back"
                >
                    &lt;
                </button>
                <button
                    type="button"
                    aria-label="Forward"
                    data-umami-event="project-browser-control"
                    data-umami-event-control="forward"
                >
                    &gt;
                </button>
                <button
                    type="button"
                    aria-label="Up one level"
                    data-umami-event="project-browser-control"
                    data-umami-event-control="up-one-level"
                >
                    ^
                </button>
                <button
                    type="button"
                    aria-label="Refresh"
                    data-umami-event="project-browser-control"
                    data-umami-event-control="refresh"
                >
                    R
                </button>
            </div>

            <div className={styles.addressBar} aria-label="Current folder path">
                {activeLocation.path.split(' > ').map((part, index, parts) => (
                    <span key={`${part}-${index}`}>
                        {part}
                        {index < parts.length - 1 ? <b aria-hidden="true">&gt;</b> : null}
                    </span>
                ))}
            </div>

            <label className={styles.searchBox}>
                <span className={styles.visuallyHidden}>Search projects</span>
                <input
                    type="search"
                    placeholder="Search Projects"
                    value={searchTerm}
                    onChange={event => onSearchChange(event.target.value)}
                    data-umami-event="project-search-click"
                    data-umami-event-layout="desktop"
                />
            </label>
        </div>
    );
}

function CommandBar({ selectedProject }) {
    const firstLink = selectedProject.links[0] ?? selectedProject.assets[0];

    return (
        <div className={styles.commandBar} aria-label="Project commands">
            <a
                className={`${styles.commandButton} ${!firstLink ? styles.commandButtonDisabled : ''}`}
                href={firstLink?.href || firstLink?.src || '#'}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!firstLink}
                onClick={event => {
                    if (!firstLink) event.preventDefault();
                }}
                data-umami-event="project-command"
                data-umami-event-project={selectedProject.id}
                data-umami-event-command="open"
            >
                <span aria-hidden="true">[ ]</span>
                Open
            </a>
            <a
                className={styles.commandButton}
                href={getPrimaryAsset(selectedProject)?.src || '#'}
                target="_blank"
                rel="noreferrer"
                data-umami-event="project-command"
                data-umami-event-project={selectedProject.id}
                data-umami-event-command="preview"
            >
                <span aria-hidden="true">[]</span>
                Preview
            </a>
            <button
                type="button"
                className={styles.commandButton}
                data-umami-event="project-command"
                data-umami-event-project={selectedProject.id}
                data-umami-event-command="sort"
            >
                <span aria-hidden="true">A-Z</span>
                Sort
            </button>
            <button
                type="button"
                className={styles.commandButton}
                data-umami-event="project-command"
                data-umami-event-project={selectedProject.id}
                data-umami-event-command="details"
            >
                <span aria-hidden="true">list</span>
                Details
            </button>
            <span className={styles.commandSpacer} />
            <span className={styles.itemCount}>{selectedProject.title} selected</span>
        </div>
    );
}

function Sidebar({ activeLocationId, onSelectLocation }) {
    return (
        <aside className={styles.sidebar} aria-label="Project folders">
            <div className={styles.sidebarGroup}>
                <p>Quick access</p>
                {locations.map(location => {
                    const count = location.id === 'all'
                        ? projects.length
                        : projects.filter(project => project.category === location.id).length;
                    const isActive = activeLocationId === location.id;

                    return (
                        <button
                            key={location.id}
                            type="button"
                            className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ''}`}
                            onClick={() => onSelectLocation(location.id)}
                            aria-pressed={isActive}
                            data-umami-event="project-folder-select"
                            data-umami-event-folder={location.id}
                            data-umami-event-layout="desktop"
                        >
                            <PixelIcon type={location.id === 'all' ? 'folder' : getProjectIcon({ category: location.id })} />
                            <span>{location.label}</span>
                            <small>{count}</small>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}

function ProjectRows({ projectsToShow, selectedProjectId, onSelectProject }) {
    return (
        <div className={styles.detailsViewport}>
            <table className={styles.detailsTable}>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date modified</th>
                        <th scope="col">Type</th>
                        <th scope="col">Size</th>
                    </tr>
                </thead>
                <tbody>
                    {projectsToShow.map(project => {
                        const isSelected = project.id === selectedProjectId;

                        return (
                            <tr
                                key={project.id}
                                className={isSelected ? styles.selectedRow : ''}
                                onClick={() => onSelectProject(project.id)}
                                onKeyDown={event => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        onSelectProject(project.id);
                                    }
                                }}
                                tabIndex={0}
                                aria-selected={isSelected}
                                data-umami-event="project-select"
                                data-umami-event-project={project.id}
                                data-umami-event-layout="desktop"
                            >
                                <td>
                                    <span className={styles.fileName}>
                                        <PixelIcon type={getProjectIcon(project)} />
                                        <span className={styles.fileNameText}>{project.title}</span>
                                    </span>
                                </td>
                                <td>{project.status}</td>
                                <td>{project.year}</td>
                                <td>{project.category}</td>
                                <td>{getItemCountLabel(project)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

function DetailsPane({ project }) {
    const primaryAsset = getPrimaryAsset(project);
    const fileLinks = project.assets.map(asset => ({
        label: asset.label || asset.alt || 'open file',
        href: asset.src,
    }));

    return (
        <aside className={styles.detailsPane} aria-label={`${project.title} details`}>
            <div className={styles.previewBox}>
                <AssetPreview asset={primaryAsset} controls />
            </div>

            <div className={styles.detailsHeader}>
                <PixelIcon type={getProjectIcon(project)} />
                <div>
                    <h2>{project.title}</h2>
                    <p>{project.objectType}</p>
                </div>
            </div>

            <dl className={styles.propertyList}>
                <div>
                    <dt>Year</dt>
                    <dd>{project.year}</dd>
                </div>
                <div>
                    <dt>Type</dt>
                    <dd>{project.category}</dd>
                </div>
                <div>
                    <dt>Status</dt>
                    <dd>{project.status}</dd>
                </div>
                <div>
                    <dt>Tools / materials</dt>
                    <dd>{project.toolsMaterials.join(', ')}</dd>
                </div>
            </dl>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.paneSection}>
                <p>Project links</p>
                <ProjectLinks
                    links={project.links}
                    projectId={project.id}
                    context="desktop-details"
                />
            </div>

            <div className={styles.paneSection}>
                <p>Files</p>
                <ul className={styles.linkList}>
                    {fileLinks.map(link => (
                        <li key={`${project.id}-${link.href}`}>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                data-umami-event="project-file-open"
                                data-umami-event-project={project.id}
                                data-umami-event-file={link.label}
                                data-umami-event-context="desktop-details"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

function MobileProjectDetails({ project }) {
    const primaryAsset = getPrimaryAsset(project);
    const primaryLink = project.links[0];

    return (
        <div className={styles.mobileProjectDetails} aria-label={`${project.title} project details`}>
            <div className={styles.mobilePreviewBox}>
                <AssetPreview asset={primaryAsset} controls />
            </div>

            <p className={styles.mobileDescription}>{project.description}</p>

            <dl className={styles.mobileProjectMeta}>
                <div>
                    <dt>made</dt>
                    <dd>{project.year}</dd>
                </div>
                <div>
                    <dt>with</dt>
                    <dd>{project.toolsMaterials.join(', ')}</dd>
                </div>
            </dl>

            <div className={styles.mobileProjectActions}>
                {primaryLink ? (
                    <a
                        className={styles.mobilePrimaryAction}
                        href={primaryLink.href}
                        target="_blank"
                        rel="noreferrer"
                        data-umami-event="project-link-open"
                        data-umami-event-project={project.id}
                        data-umami-event-link={primaryLink.label}
                        data-umami-event-context="mobile-primary-action"
                    >
                        open project <span aria-hidden="true">↗</span>
                    </a>
                ) : null}
                <a
                    className={primaryLink ? styles.mobileSecondaryAction : styles.mobilePrimaryAction}
                    href={primaryAsset?.src || '#'}
                    target="_blank"
                    rel="noreferrer"
                    data-umami-event="project-file-open"
                    data-umami-event-project={project.id}
                    data-umami-event-file={primaryAsset?.alt || primaryAsset?.label || 'primary-asset'}
                    data-umami-event-context="mobile-primary-action"
                >
                    view file <span aria-hidden="true">↗</span>
                </a>
            </div>

            {project.links.length > 1 ? (
                <div className={styles.mobileMoreLinks}>
                    <p>more from this project</p>
                    <ProjectLinks
                        links={project.links.slice(1)}
                        projectId={project.id}
                        context="mobile-more-links"
                    />
                </div>
            ) : null}
        </div>
    );
}

function MobileProjectBrowser({
    activeLocationId,
    expandedProjectId,
    searchTerm,
    visibleProjects,
    onSelectLocation,
    onSearchChange,
    onToggleProject,
}) {
    return (
        <div className={styles.mobileExplorer}>
            <header className={styles.mobileExplorerHeader}>
                <div>
                    <p>elias / projects</p>
                    <h2>Things I&apos;ve made</h2>
                </div>
                <span>{visibleProjects.length}</span>
            </header>

            <label className={styles.mobileSearchBox}>
                <span className={styles.visuallyHidden}>Search projects</span>
                <span aria-hidden="true">⌕</span>
                <input
                    type="search"
                    placeholder="Search projects"
                    value={searchTerm}
                    onChange={event => onSearchChange(event.target.value)}
                    data-umami-event="project-search-click"
                    data-umami-event-layout="mobile"
                />
            </label>

            <div className={styles.mobileLocationTabs} aria-label="Project categories">
                {locations.map(location => {
                    const count = location.id === 'all'
                        ? projects.length
                        : projects.filter(project => project.category === location.id).length;
                    const isActive = location.id === activeLocationId;

                    return (
                        <button
                            key={`mobile-${location.id}`}
                            type="button"
                            className={isActive ? styles.mobileLocationTabActive : ''}
                            onClick={() => onSelectLocation(location.id)}
                            aria-pressed={isActive}
                            data-umami-event="project-folder-select"
                            data-umami-event-folder={location.id}
                            data-umami-event-layout="mobile"
                        >
                            <span>{location.label}</span>
                            <small>{count}</small>
                        </button>
                    );
                })}
            </div>

            {visibleProjects.length ? (
                <ul className={styles.mobileProjectList}>
                    {visibleProjects.map(project => {
                        const isSelected = project.id === expandedProjectId;

                        return (
                            <li
                                key={`mobile-${project.id}`}
                                className={isSelected ? styles.mobileProjectItemActive : ''}
                            >
                                <button
                                    type="button"
                                    className={styles.mobileProjectButton}
                                    onClick={() => onToggleProject(project.id)}
                                    aria-expanded={isSelected}
                                    data-umami-event="project-toggle"
                                    data-umami-event-project={project.id}
                                    data-umami-event-action={isSelected ? 'collapse' : 'expand'}
                                    data-umami-event-layout="mobile"
                                >
                                    <PixelIcon type={getProjectIcon(project)} />
                                    <span className={styles.mobileProjectName}>
                                        <strong>{project.title}</strong>
                                        <small>{project.status} · {project.year}</small>
                                    </span>
                                    <span className={styles.mobileProjectToggle} aria-hidden="true">
                                        {isSelected ? '−' : '+'}
                                    </span>
                                </button>

                                {isSelected ? <MobileProjectDetails project={project} /> : null}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className={styles.mobileEmptyFolder}>
                    <PixelIcon type="folder" />
                    <p>No projects match this search.</p>
                    <button
                        type="button"
                        onClick={() => onSearchChange('')}
                        data-umami-event="project-search-clear"
                        data-umami-event-layout="mobile"
                    >
                        clear search
                    </button>
                </div>
            )}
        </div>
    );
}

function ExplorerWindow() {
    const [activeLocationId, setActiveLocationId] = useState('all');
    const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
    const [expandedProjectId, setExpandedProjectId] = useState(projects[0].id);
    const [searchTerm, setSearchTerm] = useState('');

    const activeLocation = locations.find(location => location.id === activeLocationId) ?? locations[0];
    const visibleProjects = useMemo(() => {
        const locationProjects = activeLocationId === 'all'
            ? projects
            : projects.filter(project => project.category === activeLocationId);
        const normalizedSearch = searchTerm.trim().toLowerCase();

        if (!normalizedSearch) return locationProjects;

        return locationProjects.filter(project => {
            const searchableText = [
                project.title,
                project.year,
                project.category,
                project.status,
                project.objectType,
                project.description,
                ...project.toolsMaterials,
            ].join(' ').toLowerCase();

            return searchableText.includes(normalizedSearch);
        });
    }, [activeLocationId, searchTerm]);
    const selectedProject = visibleProjects.find(project => project.id === selectedProjectId) ?? visibleProjects[0] ?? projects.find(project => project.id === selectedProjectId) ?? projects[0];

    const handleSelectLocation = locationId => {
        const nextProjects = locationId === 'all'
            ? projects
            : projects.filter(project => project.category === locationId);

        setActiveLocationId(locationId);
        if (!nextProjects.some(project => project.id === selectedProjectId)) {
            const nextProjectId = nextProjects[0]?.id ?? projects[0].id;
            setSelectedProjectId(nextProjectId);
            setExpandedProjectId(nextProjectId);
        }
    };

    const handleSelectProject = projectId => {
        setSelectedProjectId(projectId);
        setExpandedProjectId(projectId);
    };

    const handleToggleMobileProject = projectId => {
        setSelectedProjectId(projectId);
        setExpandedProjectId(currentProjectId => (
            currentProjectId === projectId ? null : projectId
        ));
    };

    return (
        <section className={styles.explorerWindow} aria-label="Projects file explorer">
            <div className={styles.desktopExplorer}>
                <TitleBar />
                <AddressBar
                    activeLocation={activeLocation}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />
                <CommandBar selectedProject={selectedProject} />

                <div className={styles.explorerBody}>
                    <Sidebar activeLocationId={activeLocationId} onSelectLocation={handleSelectLocation} />
                    <section className={styles.filePane} aria-label="Project files">
                        <div className={styles.filePaneHeader}>
                            <div>
                                <p>{activeLocation.label}</p>
                                <h2>Projects</h2>
                            </div>
                            <span>{visibleProjects.length} item{visibleProjects.length === 1 ? '' : 's'}</span>
                        </div>

                        {visibleProjects.length ? (
                            <ProjectRows
                                projectsToShow={visibleProjects}
                                selectedProjectId={selectedProject.id}
                                onSelectProject={handleSelectProject}
                            />
                        ) : (
                            <div className={styles.emptyFolder}>
                                <PixelIcon type="folder" />
                                <p>No projects match this search.</p>
                            </div>
                        )}
                    </section>
                    <DetailsPane project={selectedProject} />
                </div>
            </div>

            <MobileProjectBrowser
                activeLocationId={activeLocationId}
                expandedProjectId={expandedProjectId}
                searchTerm={searchTerm}
                visibleProjects={visibleProjects}
                onSelectLocation={handleSelectLocation}
                onSearchChange={setSearchTerm}
                onToggleProject={handleToggleMobileProject}
            />
        </section>
    );
}

function MakingThings() {
    useEffect(() => {
        document.title = 'I Like To Make Things';
    }, []);

    return (
        <main className={styles.makingThingsPage}>
            <ExplorerWindow />

            <section className={styles.closingSection}>
                <p className={styles.eyebrow}>next folder</p>
                <h2>The next things I want to make probably won&apos;t live entirely on a screen.</h2>
                <p>
                    Lately, the most fulfilling projects are the ones that make me work slower,
                    more patient, and more connected to materials. I want to keep learning
                    how to build with my hands.
                </p>
            </section>
        </main>
    );
}

export default MakingThings;
