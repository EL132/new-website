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
                <WorkBox company='KnowAthens' title='Web Developer' time='September 2022 - May 2023' website='https://www.instagram.com/knowathens/'/>
                <WorkBox company='Toyota Financial Services' title='RPA Developer' time='May 2023 - August 2023' website='https://www.toyotafinancial.com/us/en.html'/>
                <WorkBox company='Toyota Motor North America' title='Supply Chain Engineer' time='August 2023 - December 2023' website='https://www.toyota.com/'/>
            </div>
            <div className='resume-container'>
                <a className='resume-link' href='https://drive.google.com/file/d/1NdEyEVinNChIxnBodFEeq4E_2_rjHBgK/view?usp=sharing' target='_blank' rel='noreferrer'>
                    <button className='resume-button line'>Resume</button>
                </a>
            </div>

        </div>
    );
}

export default Work;