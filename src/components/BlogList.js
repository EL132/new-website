import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BlogList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://new-website-backend-j4bh.onrender.com/api/blog-posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <div className="blog-list">
            <h2>Blog Posts</h2>
            {posts.map(post => (
                <div key={post._id} className="blog-preview">
                    <Link to={`/writing/blog/${post._id}`}>
                        <h3>{post.title}</h3>
                    </Link>
                    <p>{new Date(post.date).toLocaleDateString()}</p>
                    <p>{post.content[0].slice(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
}

export default BlogList;
