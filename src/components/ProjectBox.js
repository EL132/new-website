import React from 'react';
import './component-styles/ProjectBox.css';

function ProjectBox ({ techs, cover, title, description }) {
    if (title === 'Platformer') {
        return (
            <div class="card-platformer">
                <h2 className='card-title'>
                    {title}
                </h2>
                <p className='card-description'>
                    {description}
                </p>
                <div className='project-tools'>
                    {techs.map((tech, index) => (
                        <img key={index} className='tech-image' src={tech} alt='Technology used'></img>
                    ))}
                </div>
            </div>
        );        
    } else if (title === 'Memory Assistant') {
        return (
            <div class="card-mem">
                <h2 className='card-title'>
                    {title}
                </h2>
                <p className='card-description'>
                    {description}
                </p>
                <div className='project-tools'>
                    {techs.map((tech, index) => (
                        <img key={index} className='tech-image' src={tech} alt='Technology used'></img>
                    ))}
                </div>
            </div>
        );
    } else if (title === 'KnowAthens') {
        return (
            <div class="card-ka">
                <h2 className='card-title'>
                    {title}
                </h2>
                <p className='card-description'>
                    {description}
                </p>
                <div className='project-tools'>
                    {techs.map((tech, index) => (
                        <img key={index} className='tech-image' src={tech} alt='Technology used'></img>
                    ))}
                </div>
            </div>
        );
    }
}

export default ProjectBox;