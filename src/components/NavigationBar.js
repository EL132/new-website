import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './component-styles/NavigationBar.css';

function NavigationBar() {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div className='nav-container'>
            <div className='left-side' onClick={toggleOptions}>
                <div className='rectangle'></div>
            </div>
            <div className='right-side'>
                <Link to='/new-website/' className='link home-link'>
                    Home
                </Link>
                <Link to='/new-website/work' className='link'>
                    Work
                </Link>
                <Link to='/new-website/writing' className='link'>
                    Writing
                </Link>
                <Link to='/new-website/projects' className='link'>
                    Projects
                </Link>
                <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className='link'
                    href='https://www.linkedin.com/in/elias-lind-431546221/'
                >
                    Contact
                </a>
            </div>
        </div>
    );
}

export default NavigationBar;
