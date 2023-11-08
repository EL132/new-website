import React from 'react';
import './styles/Projects.css';
import ProjectBox from '../components/ProjectBox';


function Projects () {
    return (
        <div className='project-page-container'>
            <div className='title-font-container'>
                <h1 className='title-font'>PROJECTS</h1>
            </div>
            <div className='projects-container'>
                <a className='project-link' href='https://el132.github.io/platformer/' rel='noreferrer' target='_blank'>
                    <ProjectBox source='./assets/projects/Platformer.png' title='Platformer' description='This is filler text because I am lazy and dont want to create a text file for these yet.'/>
                </a>
                <a className='project-link' href='https://memory-assistant-97ft.vercel.app/' rel='noreferrer' target='_blank'>
                    <ProjectBox source='./assets/projects/Memory-assistant.png' title='Memory Assistant' description='This is filler text because I am lazy and dont want to create a text file for these yet.'/>
                </a>
            </div>
        </div>
    );
}

export default Projects;