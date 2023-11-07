import React from 'react';
import './styles/Home.css';
import Photo from '../components/Photo';
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
                <Photo source='../../public/assets/ann-arbor.jpg'/>
            </div>
        </div>
    );
}

export default Home;