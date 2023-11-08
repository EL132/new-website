import React from 'react';
import './component-styles/ProjectBox.css';


function ProjectBox ({ source, title, description }) {
    if (title === 'Platformer') {
        return (
            <div className='project-block-container platformer-container'>
                <h2 className='project-title'>{title}</h2>
                <p className='project-description'>{description} </p>
                <div className='project-image-group'>
                    <div className='image-dotted-circle'></div>
                    <img className='project-image' src={source} alt="Writing cover"></img>
                </div>
            </div>
        );        
    } else if (title === 'Memory Assistant') {
        return (
            <div className='project-block-container memory-assistant-container'>
                <h2 className='project-title'>{title}</h2>
                <p className='project-description'>{description} </p>
                <div className='project-image-group'>
                    <div className='image-dotted-circle'></div>
                    <img className='project-image' src={source} alt="Writing cover"></img>
                </div>
            </div>
        );
    } else {
        return (
            <div className='project-block-container'>
                <h2 className='project-title'>{title}</h2>
                <p className='project-description'>{description} </p>
                <div className='project-image-group'>
                    <div className='image-dotted-circle'></div>
                    <img className='project-image' src={source} alt="Writing cover"></img>
                </div>
            </div>
        );
    }
}

export default ProjectBox;