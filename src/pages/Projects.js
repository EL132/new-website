import React, { useState, useEffect } from 'react';
import './styles/Projects.css';
import { text_blurbs } from '../text/projectText';
import ProjectBox from '../components/ProjectBox';


function Projects () {
    useEffect(() => {
        document.title = 'Projects';
    }, []);

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <div className='project-page-container'>
            <div className='title-font-container'>
                <h1 className='title-font mobile-change-title-font'>PROJECTS</h1>
            </div>
            <div className='projects-container'>
                <a className='project-link' href='https://el132.github.io/platformer/' rel='noreferrer' target='_blank'>
                    <ProjectBox 
                        techs={[ './assets/projects/platformer/github.png', 
                                './assets/projects/platformer/python.png', 
                                './assets/projects/platformer/console.png']}
                        cover='./assets/projects/platformer/cover.png'
                        title='Platformer' 
                        description={text_blurbs.platformer}
                    />
                </a>
                <a className='project-link' href='https://memory-assistant-97ft.vercel.app/' rel='noreferrer' target='_blank'>
                    <ProjectBox 
                        techs={['./assets/projects/memory-assistant/express.png', 
                                './assets/projects/memory-assistant/react.png', 
                                './assets/projects/memory-assistant/Vercel.png']}
                        cover='./assets/projects/memory-assistant/cover.png'
                        title='Memory Assistant' 
                        description={text_blurbs.memory_assistant}
                    />
                </a>
                <a className='project-link' href='https://mewkat36.wixstudio.io/spotifywrapped' rel='noreferrer' target='_blank'>
                    <ProjectBox 
                        techs={['./assets/projects/spotify-wrapped/spotify.png', 
                                './assets/projects/spotify-wrapped/android_studio.png', 
                                './assets/projects/spotify-wrapped/open_ai.png']}
                        cover='./assets/projects/spotify-wrapped/cover.png'
                        title='Spotify Wrapped' 
                        description={text_blurbs.spotifyWrapped}
                    />
                </a>
                <div className='project-link' onClick={openModal}>
                    <ProjectBox
                        techs={['./assets/projects/know-athens/figma.png', './assets/projects/know-athens/Google-cloud.png', './assets/projects/know-athens/Vue.png']}
                        cover='./assets/projects/know-athens/cover.png'
                        title='KnowAthens'
                        description={text_blurbs.KnowAthens}
                    />
                </div>
                {isModalOpen && (
                    <div className='modal' onClick={closeModal}>
                        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                            <button className='close-button' onClick={closeModal}>
                                <img className='close-x' src='./assets/projects/x.png' alt='close button'/>
                            </button>
                            <h2 className='modal-title'>KnowAthens</h2>
                            <p className='modal-body'>{text_blurbs.KnowAthensModal}</p>
                            <div className='modal-image-container'>
                                <img className='modal-image' src='./assets/projects/know-athens/cover.png' alt='KnowAthens cover'/>                                
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Projects;