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
                <WorkBox company='Toyota' title='Supply Chain Engineering Intern' time='August 2023 - December 2023' website='https://www.toyota.com/'/>
                <WorkBox company='Deloitte' title='Business Technology Solutions Summer Scholar' time='June 2024 - August 2024' website='https://www2.deloitte.com/us/en.html'/>
                <WorkBox company='KnowAthens' title='Web Developer' time='September 2022 - May 2023' website='https://www.instagram.com/knowathens/'/>
                <WorkBox company='Toyota Financial Services' title='Information & Digital Solutions Intern' time='May 2023 - August 2023' website='https://www.toyotafinancial.com/us/en.html'/>
            </div>
            <div className='resume-container'>
                <a className='resume-link' href='https://drive.google.com/file/d/1uNNRL1tMZOL4wY7hmnljo-AtGf59oZmH/view?usp=sharing' target='_blank' rel='noreferrer'>
                    <button className='resume-button line'>Resume</button>
                </a>
            </div>

        </div>
    );
}

export default Work;