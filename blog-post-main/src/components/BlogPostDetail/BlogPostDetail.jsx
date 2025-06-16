import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import ConfirmationDialog from './ConfirmationDialog';
import styles from './BlogPostDetail.module.css';

const BlogPostDetail = ({ title, content, author, date, onDelete }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams ? useParams() : { id: undefined };

  if (!title || !content || !author || !date) {
    return <p className={styles.notFound}>Blog post not found.</p>;
  }
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setShowDialog(false);
      if (onDelete) onDelete();
    }, 800);
  };
  return (
    <div className={styles.blogPostDetail}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>By {author}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ') }}
      />
      {id && (
        <Link to={`/edit/${id}`} className={styles.editButton} style={{
          display: 'inline-block',
          background: '#007BFF',
          color: '#fff',
          borderRadius: 4,
          padding: '10px 20px',
          fontWeight: 600,
          fontSize: 16,
          marginRight: 16,
          textDecoration: 'none',
          marginTop: 20,
        }}>
          Edit
        </Link>
      )}
      <DeleteButton onClick={() => setShowDialog(true)} disabled={deleting} />
      <ConfirmationDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
};

export default BlogPostDetail;
