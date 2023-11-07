import React from 'react';
import './component-styles/WritingBlock.css';


function WritingBlock ({ source, title }) {
    return (
        <div className='writing-block-container'>
            <img className='writing-image' src={source} alt="Writing cover"></img>
            <h2 className='writing-title'>{title}</h2>
        </div>
    );
}

export default WritingBlock;