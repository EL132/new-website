import React from 'react';
import './component-styles/ProjectBox.css';

function ProjectBox ({ techs, cover, title, description }) {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img className="flip-card-image" src={cover} alt="Cover" />
                </div>
                <div className="flip-card-back">
                    <h1 className='project-title'>
                        {title}
                    </h1>
                    <p className='project-description'>
                        {description}
                    </p>
                    <div className='tech-container'>
                        {techs.map((tech, index) => {
                            return (
                                <img key={index} className='tech-image' src={tech} alt='Tech'/>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectBox;
