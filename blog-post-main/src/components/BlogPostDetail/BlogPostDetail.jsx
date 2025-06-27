import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import ConfirmationDialog from './ConfirmationDialog';
import CommentList from '../../../../src/components/Comment/CommentList';
import CommentForm from '../../../../src/components/Comment/CommentForm';
import styles from './BlogPostDetail.module.css';

const BlogPostDetail = ({ title, content, author, date, onDelete }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [comments, setComments] = useState([]);
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
  const handleAddComment = (comment) => {
    setComments((prev) => [
      ...prev,
      {
        ...comment,
        date: new Date(),
        avatar: undefined, // or provide a default avatar URL if desired
      },
    ]);
  };
  return (
    <div className={styles.blogPostDetail}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>By {author}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: content.replace(
            /<a /g,
            '<a target="_blank" rel="noopener noreferrer" '
          ),
        }}
      />
      {id && (
        <Link
          to={`/edit/${id}`}
          className={styles.editButton}
          style={{
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
          }}
        >
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
      {/* Comment Section */}
      <section style={{ marginTop: 40 }}>
        <h2
          style={{
            fontSize: '1.3em',
            color: '#003366',
            marginBottom: 12,
          }}
        >
          Comments
        </h2>
        <CommentList comments={comments} />
        <CommentForm onSubmit={handleAddComment} isLoggedIn={false} />
      </section>
    </div>
  );
};

export default BlogPostDetail;
