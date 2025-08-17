import './styles/Writing.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WritingBlock from '../components/WritingBlock';

function BlogList({ posts }) {
    return (
        <div className="blog-list styled-blog-list">
            {posts.map(post => (
                <div key={post._id} className="blog-preview styled-blog-preview">
                    <Link to={`/writing/blog/${post._id}`} className="blog-link">
                        <h3 className="blog-title">{post.title}</h3>
                    </Link>
                    <p className="blog-date">{new Date(post.date).toLocaleDateString()}</p>
                    <p className="blog-snippet">{post.content[0].slice(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
}

function Writing() {
    const [posts, setPosts] = useState([]);
    const [blogsLoaded, setBlogsLoaded] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [displayedText, setDisplayedText] = useState("");

    const loadingMessage =
        "Soooo...TLDR: I'm broke. Not really, but the tech I'm using to support this functionality is on a free tier, which means that it takes some time to \"wake up\" once the first request (that's you!) happens. Shouldn't be too long now :)";

    // Fetch blogs
    useEffect(() => {
        document.title = 'Writing';
        fetch('https://new-website-backend-j4bh.onrender.com/api/blog-posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setBlogsLoaded(true);
            })
            .catch(() => {
                // optional: handle error state here
                setBlogsLoaded(true);
            });
    }, []);

    // Delay showing the message by 1s if blogs not loaded
    useEffect(() => {
        if (blogsLoaded) return;
        const timer = setTimeout(() => setShowMessage(true), 1000);
        return () => clearTimeout(timer);
    }, [blogsLoaded]);

    // Typewriter effect
    useEffect(() => {
        if (!showMessage) return;

        let wordIndex = 0;
        let words = loadingMessage.split(" ");
        setDisplayedText("");

        const typewriter = setInterval(() => {
            if (wordIndex < words.length) {
                setDisplayedText(prev => prev + (wordIndex === 0 ? "" : " ") + words[wordIndex]);
                wordIndex++;
            } else {
                clearInterval(typewriter);
            }
        }, 90);

        return () => clearInterval(typewriter);
    }, [showMessage]);

    return (
        <div className="writing-main-container">
            <div className='title-font-container'>
                <h1 className='title-font mobile-change-title-font'>WRITING</h1>
            </div>

            {/* Blogs Section */}
            <div className='blogs-section styled-section custom-section-spacing'>
                <h2 className='section-header styled-header'>Blogs</h2>
                <div className="blog-section styled-content">
                    {blogsLoaded ? (
                        <BlogList posts={posts} />
                    ) : showMessage ? (
                        <div style={{ padding: '18px 0', color: '#2a3a5e', fontSize: '1.1rem', textAlign: 'left', minHeight: '4.5em' }}>
                            {displayedText}
                        </div>
                    ) : null}
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