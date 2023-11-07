import React from 'react';
import './component-styles/Photo.css';

function Photo (source) {
    return (
        <div>
            <img className='photo' src={source} alt=''></img>
        </div>
    );
}

export default Photo;