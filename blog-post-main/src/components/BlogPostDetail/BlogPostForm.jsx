import React, { useState, useEffect } from 'react';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit, loading }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [date, setDate] = useState(post?.date ? post.date.slice(0, 10) : '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(post?.title || '');
    setContent(post?.content || '');
    setAuthor(post?.author || '');
    setDate(post?.date ? post.date.slice(0, 10) : '');
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = 'Required';
    if (!content) newErrors.content = 'Required';
    if (!author) newErrors.author = 'Required';
    if (!date) newErrors.date = 'Required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ title, content, author, date });
    }
  };

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? styles.inputError : ''}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={errors.content ? styles.inputError : ''}
          rows={8}
        />
        {errors.content && <p className={styles.error}>{errors.content}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={errors.author ? styles.inputError : ''}
        />
        {errors.author && <p className={styles.error}>{errors.author}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="date">Publication Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={errors.date ? styles.inputError : ''}
        />
        {errors.date && <p className={styles.error}>{errors.date}</p>}
      </div>
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? 'Submitting...' : post ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default BlogPostForm;
