import './styles/Work.css';
import React, { useEffect } from 'react';
import WorkBox from '../components/WorkBox';

function Work () {
    useEffect(() => {
        document.title = 'Work';
    }, []);

    return (
        <div className='work-page-container'>
            <div className='title-font-container'>
                <h1 className='title-font'>WORK</h1>
            </div>
            <div className='work-container'>
                <WorkBox company='Deloitte' title='Business Technology Solutions Summer Scholar' time='June 2024 - August 2024' website='https://www2.deloitte.com/us/en.html'/>
                <WorkBox company='Google' title='Associate Product Management Intern' time='May 2025 - August 2025' website='https://www.google.com/'/>
                <WorkBox company='Amazon' title='Software Development Engineering Co-op' time='August 2025 - December 2025' website='https://www.amazon.com/'/>
                <WorkBox company='Toyota' title='Supply Chain Engineering Intern' time='August 2023 - December 2023' website='https://www.toyota.com/'/>
                <WorkBox company='KnowAthens' title='Web Developer' time='September 2022 - May 2023' website='https://www.instagram.com/knowathens/'/>
                <WorkBox company='Toyota Financial Services' title='Information & Digital Solutions Intern' time='May 2023 - August 2023' website='https://www.toyotafinancial.com/us/en.html'/>
            </div>
            <div className='resume-container'>
                <a className='resume-link' href='https://docs.google.com/document/d/1qoiHY1n2-SaAyJhQOBidZamSWndZPMlYDn8PtbBCMCo/edit?usp=sharing' target='_blank' rel='noreferrer'>
                    <button className='resume-button line'>Resume</button>
                </a>
            </div>

        </div>
    );
}

export default Work;
