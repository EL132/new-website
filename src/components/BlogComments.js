import { useEffect, useState } from 'react';
import { getBlogComments, publishBlogComment } from '../services/blogApi';

const emptyForm = {
    name: '',
    body: '',
    website: '',
};

function formatCommentDate(value) {
    if (!value) {
        return '';
    }

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(value));
}

function BlogComments({ slug, styles }) {
    const [comments, setComments] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        let isActive = true;

        getBlogComments(slug)
            .then(nextComments => {
                if (isActive) {
                    setComments(nextComments);
                }
            })
            .catch(() => {
                if (isActive) {
                    setComments([]);
                }
            });

        return () => {
            isActive = false;
        };
    }, [slug]);

    const handleChange = event => {
        const { name, value } = event.target;
        setForm(current => ({ ...current, [name]: value }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus('');

        try {
            const comment = await publishBlogComment(slug, form);
            setComments(current => [comment, ...current]);
            setForm(emptyForm);
            setStatus('Your comment is published. Thank you!');
        } catch (error) {
            setStatus(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={styles.commentsSection} aria-labelledby="comments-title">
            <h2 id="comments-title">Comments</h2>
            <p>
                Although it&apos;s not required, it&apos;s fun! It&apos;s always fun to see who has read
                and cares enough to comment on the post ᵕ̈
            </p>

            <form className={styles.commentForm} onSubmit={handleSubmit}>
                <div className={styles.commentField}>
                    <label htmlFor={`comment-name-${slug}`}>Name</label>
                    <input
                        id={`comment-name-${slug}`}
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        maxLength={80}
                        autoComplete="name"
                        required
                    />
                </div>

                <div className={styles.commentHoneypot} aria-hidden="true">
                    <label htmlFor={`comment-website-${slug}`}>Website</label>
                    <input
                        id={`comment-website-${slug}`}
                        name="website"
                        type="text"
                        value={form.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </div>

                <div className={styles.commentField}>
                    <label htmlFor={`comment-body-${slug}`}>Comment</label>
                    <textarea
                        id={`comment-body-${slug}`}
                        name="body"
                        value={form.body}
                        onChange={handleChange}
                        maxLength={2000}
                        rows={5}
                        required
                    />
                    <span className={styles.characterCount}>{form.body.length}/2,000</span>
                </div>

                <button className={styles.commentButton} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Publishing…' : 'Publish comment'}
                </button>
                <p className={styles.commentStatus} aria-live="polite">{status}</p>
            </form>

            {comments.length ? (
                <ul className={styles.commentList}>
                    {comments.map(comment => (
                        <li key={comment.id}>
                            <div className={styles.commentMeta}>
                                <strong>{comment.name}</strong>
                                <time dateTime={comment.createdAt}>
                                    {formatCommentDate(comment.createdAt)}
                                </time>
                            </div>
                            <p>{comment.body}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noComments}>No comments yet.</p>
            )}
        </section>
    );
}

export default BlogComments;
