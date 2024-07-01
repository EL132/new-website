import React from 'react';
import './component-styles/WorkBox.css';


function WorkBox ({ company, title, time, website }) {
    return (
        <div className='workbox'>
            <a href={website} target='_blank' rel="noreferror noreferrer">
                <h2 className='work-title'>{title}</h2>
                <h3 className='work-company'>{company}</h3>
                <h4 className='work-time'>{time}</h4>
            </a>
        </div>
    );

    
}

export default WorkBox;