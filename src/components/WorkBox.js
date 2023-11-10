import React from 'react';
import './component-styles/WorkBox.css';


function WorkBox ({ company, title, time }) {
    if (company === 'Toyota Motor North America') {
        return (
            <a href='https://www.toyota.com/' target='_blank' rel="noreferror noreferrer">
                <div className='workbox-toyota'>
                    <h2 className='work-title'>{title}</h2>
                    <h3 className='work-company'>{company}</h3>
                    <h4 className='work-time'>{time}</h4>
                </div>
            </a>
        );
    } else if (company === 'KnowAthens') {
        return (
            <a href='https://www.instagram.com/knowathens/' target='_blank' rel="noreferror noreferrer">
                <div className='workbox-ka'>
                    <h2 className='work-title'>{title}</h2>
                    <h3 className='work-company'>{company}</h3>
                    <h4 className='work-time'>{time}</h4>
                </div>
            </a>
        );
    } else if (company === 'Toyota Financial Services') {
        return (
            <a href='https://www.toyotafinancial.com/us/en.html' target='_blank' rel="noreferror noreferrer">
                <div className='workbox-tfs'>
                    <h2 className='work-title'>{title}</h2>
                    <h3 className='work-company'>{company}</h3>
                    <h4 className='work-time'>{time}</h4>
                </div>
            </a>
        );
    }

    
}

export default WorkBox;