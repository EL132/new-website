import './styles/Writing.css';
import { useEffect } from 'react';
import BlogList from '../components/BlogList';
import WritingBlock from '../components/WritingBlock';

function Writing() {
    useEffect(() => {
        document.title = 'Writing';
    }, []);

    return (
            <div className="writing-main-container">
                <div className='title-font-container'>
                    <h1 className='title-font mobile-change-title-font'>WRITING</h1>
                </div>

                {/* Blogs Section */}
                <div className='blogs-section styled-section custom-section-spacing'>
                    <h2 className='section-header styled-header'>Blogs</h2>
                    <div className="blog-section styled-content">
                        <BlogList /> 
                    </div>
                </div>

                {/* Poems Section */}
                <div className='poems-section styled-section custom-section-spacing'>
                    <h2 className='section-header styled-header'>Poems</h2>
                    <div className='writing-container styled-content poems-grid'>
                        <a href="https://stillpointliterarymagazine.com/2022/10/10/selfishness-by-elias-lind/" rel='noreferrer' target='_blank' className='poem-item'>
                            <WritingBlock source='/assets/writing/Selfishness.jpg' title='Selfishness'/>
                        </a>
                        <a href="https://stillpointliterarymagazine.com/2022/10/10/mothers-sadness-by-elias-lind/" rel='noreferrer' target='_blank' className='poem-item'>
                            <WritingBlock source='/assets/writing/mother-sadness.jpg' title="mother's sadness"/>
                        </a>
                        <a href='https://stillpointliterarymagazine.com/2022/10/10/i-dont-have-depression-by-elias-lind/' rel='noreferrer' target='_blank' className='poem-item'>
                            <WritingBlock source='/assets/writing/no-depression.jpg' title="i don't have depression"/>
                        </a>
                        <div className='poem-item'>
                            <WritingBlock source='/assets/writing/more-to-come.jpg' title='More to come!'/>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Writing;