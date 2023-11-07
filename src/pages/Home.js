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
                <img className='photo' src="./assets/home/chicago.jpg" alt="not work"></img>
                <img className='photo' src="./assets/home/walton.jpg" alt="not work"></img>
                <img className='photo' src="./assets/home/blue-checker.jpg" alt="not work"></img>
                <img className='photo' src="./assets/home/ann-arbor.jpg" alt="not work"></img>
                <img className='photo' src="./assets/home/detroit.jpg" alt="not work"></img>
                <img className='photo' src="./assets/home/soccer.jpg" alt="not work"></img>
                <img className='photo' src="./assets/home/orange-fit.jpg" alt="not work"></img>
            </div>
        </div>
    );
}

export default Home;