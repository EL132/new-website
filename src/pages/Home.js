import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import { text_blurbs } from '../text/homeText';

function Home () {
    useEffect(() => {
        document.title = 'Home';
    }, []);

    return (
        <div className='home-container'>
            <Link to="/bridge-quiz" className="bridge-student-link">
                Are you a 2.11 Bridge-building student?
            </Link>
            <div className='top'>
                <h2 className='title-word'>EXPLORER</h2>
                <p className='dot'></p>
                <h2 className='title-word disappear'>DEVELOPER</h2>
            </div>
            <div className='middle'>
                <p className='text-blurb'>{text_blurbs.first_blurb}</p>
                <p className='text-blurb'>{text_blurbs.second_blurb}</p>
            </div>
            <div className='bottom'>
                    <img className='photo desktop-photo' src="./assets/home/chicago.jpg" alt="not work" />
                    <img className='photo mobile-main' src="./assets/home/chicago.jpg" alt="not work" />
            </div>
        </div>
    );
}

export default Home;