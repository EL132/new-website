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

    if (loading) return <div className="blog-post styled-blog-post">Loading...</div>;
    if (!post) return <div className="blog-post styled-blog-post">Post not found.</div>;

    return (
        <div className="blog-post styled-blog-post">
            <h2 className="blog-title styled-blog-title">{post.title}</h2>
            <p className="blog-date styled-blog-date">{new Date(post.date).toLocaleDateString()}</p>
            <div className="blog-content styled-blog-content">
                {post.content.map((para, idx) => <p key={idx} className="blog-paragraph styled-blog-paragraph">{para}</p>)}
            </div>

            <div className="comments-section styled-comments-section">
                <h3 className="comments-header styled-comments-header">Comments</h3>
                {comments.map((c, idx) => (
                    <div key={idx} className="comment styled-comment">
                        <strong className="comment-name styled-comment-name">{c.name}</strong> <span className="comment-date styled-comment-date">({new Date(c.date).toLocaleDateString()}):</span><br />
                        <span className="comment-text styled-comment-text">{c.text}</span>
                    </div>
                ))}
                <form onSubmit={handleSubmit} className="comment-form styled-comment-form">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="comment-input styled-comment-input"
                    />
                    <textarea
                        placeholder="Your comment"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        required
                        className="comment-textarea styled-comment-textarea"
                    />
                    <button type="submit" className="comment-submit styled-comment-submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default BlogPost;
