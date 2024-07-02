import React from 'react';
import './component-styles/ProjectBox.css';

function ProjectBox ({ techs, cover, title, description }) {
    return (
        <div className='project-box'>
            <h2 className='title'>{title}</h2>
            <hr className='hr-rule'></hr>
            <p>{description}</p>
            <div className='techs-container'>
                {techs.map((tech, index) => {
                    return <img className="tech-image" key={index} src={tech} alt='tech'></img>
                })}
            </div>
        </div>
    );
}

export default ProjectBox;
