import React from 'react';
import './styles/Writing.css';
import WritingBlock from '../components/WritingBlock';

function Writing () {
    return (
        <div>
            <h1 className='title-font'>WRITING</h1>
            <div className='writing-container'>
                <WritingBlock source='./assets/writing/Selfishness.jpg' title='Selfishness'/>
                <WritingBlock source='./assets/writing/mother-sadness.jpg' title='mother sadness'/>
                <WritingBlock source='./assets/writing/no-depression.jpg' title='i dont have depression'/>
                <WritingBlock source='./assets/writing/more-to-come.jpg' title='More to come!'/>
            </div>
        </div>
        
    );
}

export default Writing;