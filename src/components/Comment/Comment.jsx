import React from 'react';
import styles from './Comment.module.css';

function formatDate(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const Comment = ({ name, date, text, avatar }) => (
  <div className={styles.comment}>
    {avatar && (
      <img src={avatar} alt={name + " avatar"} className={styles.avatar} />
    )}
    <div className={styles.content}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={styles.date}>{formatDate(date)}</span>
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  </div>
);

export default Comment;
