import React, { useEffect } from 'react';
import './styles/Writing.css';
import WritingBlock from '../components/WritingBlock';

function Writing () {
    useEffect(() => {
        document.title = 'Writing';
    }, []);

    return (
        <div>
            <div className='title-font-container'>
                <h1 className='title-font mobile-change-title-font'>WRITING</h1>
            </div>
            <div className='writing-container'>
                <a href="https://stillpointliterarymagazine.com/2022/10/10/selfishness-by-elias-lind/" rel='noreferrer' target='_blank'>
                    <WritingBlock source='./assets/writing/Selfishness.jpg' title='Selfishness'/>
                </a>
                <a href="https://stillpointliterarymagazine.com/2022/10/10/mothers-sadness-by-elias-lind/" rel='noreferrer' target='_blank'>
                    <WritingBlock source='./assets/writing/mother-sadness.jpg' title="mother's sadness"/>
                </a>
                <a href='https://stillpointliterarymagazine.com/2022/10/10/i-dont-have-depression-by-elias-lind/' rel='noreferrer' target='_blank'>
                    <WritingBlock source='./assets/writing/no-depression.jpg' title="i don't have depression"/>
                </a>
                <WritingBlock source='./assets/writing/more-to-come.jpg' title='More to come!'/>
            </div>
        </div>
        
    );
}

export default Writing;