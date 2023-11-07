import React from 'react';
import './styles/Home.css';
import { text_blurbs } from '../text/homeText';

function Home () {
    return (
        <div className='home-container'>
            <div className='top'>
                <h2 className='title-word'>EXPLORER</h2>
                <p className='dot'></p>
                <h2 className='title-word'>DEVELOPER</h2>
            </div>
            <div className='middle'>
                <p className='text-blurb'>{text_blurbs.first_blurb}</p>
                <p className='text-blurb'>{text_blurbs.second_blurb}</p>
            </div>
            <div className='bottom'>
                <img className='photo' src="./assets/chicago.jpg" alt="not work"></img>
                <img className='photo' src="./assets/walton.jpg" alt="not work"></img>
                <img className='photo' src="./assets/blue-checker.jpg" alt="not work"></img>
                <img className='photo' src="./assets/ann-arbor.jpg" alt="not work"></img>
                <img className='photo' src="./assets/detroit.jpg" alt="not work"></img>
                <img className='photo' src="./assets/soccer.jpg" alt="not work"></img>
                <img className='photo' src="./assets/orange-fit.jpg" alt="not work"></img>
            </div>
        </div>
    );
}

export default Home;