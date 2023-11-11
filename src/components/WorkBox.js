import React from 'react';
import './component-styles/WorkBox.css';


function WorkBox ({ company, title, time }) {
    return (
        <a href='https://www.toyota.com/' target='_blank' rel="noreferror noreferrer">
            <div className='workbox'>
                <h2 className='work-title'>{title}</h2>
                <h3 className='work-company'>{company}</h3>
                <h4 className='work-time'>{time}</h4>
            </div>
        </a>
    );

    
}

export default WorkBox;