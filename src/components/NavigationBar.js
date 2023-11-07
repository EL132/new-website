import './styles/NavigationBar.css'
import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <div className='container'>
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
                <Link to='/contact' className='link'>
                    Contact
                </Link>
            </div>
        </div>
    );
}

export default NavigationBar;