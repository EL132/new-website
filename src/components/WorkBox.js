import React from 'react';
import './component-styles/WorkBox.css';


function WorkBox ({ company, title, time }) {
    return (
        <div className='work-box-container'>
            <h2 className='work-title'>{title}</h2>
            <h3 className='work-company'>{company}</h3>
            <h4 className='work-time'>{time}</h4>
        </div>
    );
}

export default WorkBox;