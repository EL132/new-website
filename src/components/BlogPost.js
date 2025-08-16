import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BlogPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://new-website-backend-j4bh.onrender.com/api/blog-posts/${id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data);
                setComments(data.comments || []);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://new-website-backend-j4bh.onrender.com/api/blog-posts/${id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, text })
        })
        .then(res => res.json())
        .then(newComments => {
            setComments(newComments);
            setName('');
            setText('');
        });
    };

    if (loading) return <div>Loading...</div>;
    if (!post) return <div>Post not found.</div>;

    return (
        <div className="blog-post">
            <h2>{post.title}</h2>
            <p>{new Date(post.date).toLocaleDateString()}</p>
            {post.content.map((para, idx) => <p key={idx}>{para}</p>)}

            <div className="comments-section">
                <h3>Comments</h3>
                {comments.map((c, idx) => (
                    <div key={idx} className="comment">
                        <strong>{c.name}</strong> ({new Date(c.date).toLocaleDateString()}):<br />
                        {c.text}
                    </div>
                ))}
                <form onSubmit={handleSubmit} className="comment-form">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your comment"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BlogPost;
