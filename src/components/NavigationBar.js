import './component-styles/NavigationBar.css'
import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <div className='nav-container'>
            <div className='left-side'>
                <Link to='/' className='home'>
                    <div className='rectangle'></div>
                </Link>
            </div>
            <div className='right-side'>
                <Link to='/work' className='link'>
                    Work
                </Link>
                <Link to='/writing' className='link'>
                    Writing
                </Link>
                <Link to='/projects' className='link'>
                    Projects
                </Link>
                <a target='_blank' rel='noopener noreferrer' className='link' href="https://www.linkedin.com/in/elias-lind-431546221/">
                    Contact
                </a>
            </div>
        </div>
    );
}

export default NavigationBar;