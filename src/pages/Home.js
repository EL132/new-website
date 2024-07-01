import React, { useEffect } from 'react';
import './styles/Home.css';
import { text_blurbs } from '../text/homeText';

function Home () {
    useEffect(() => {
        document.title = 'Home';
    }, []);

    return (
        <div className='home-container'>
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
                <img className='photo desktop-photo' src="./assets/home/chicago.jpg" alt="not work"></img>
                <img className='photo desktop-photo' src="./assets/home/walton.jpg" alt="not work"></img>
                <img className='photo desktop-photo' src="./assets/home/ann-arbor.jpg" alt="not work"></img>
                <img className='photo desktop-photo' src="./assets/home/toyota.jpg" alt="not work"></img>
                <img className='photo desktop-photo' src="./assets/home/detroit.jpg" alt="not work"></img>
                <img className='photo desktop-photo' src="./assets/home/soccer.jpg" alt="not work"></img>
                <img className='photo desktop-photo' src="./assets/home/marietta.jpg" alt="not work"></img>
                <img className='photo mac-photo' src="./assets/home/mac-photo-1.jpg" alt="not work"></img>
                <img className='photo mac-photo' src="./assets/home/mac-photo-2.jpg" alt="not work"></img>
            </div>
        </div>
    );
}

export default Home;