import React from 'react';
import Comment from './Comment';
import styles from './CommentList.module.css';

const CommentList = ({ comments }) => (
  <div className={styles.commentList} aria-live="polite">
    {comments.length === 0 ? (
      <div className={styles.noComments}>No comments yet.</div>
    ) : (
      comments.map((comment, idx) => (
        <Comment key={idx} {...comment} />
      ))
    )}
  </div>
);

export default CommentList;
