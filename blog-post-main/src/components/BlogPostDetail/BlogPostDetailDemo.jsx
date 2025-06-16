import React from 'react';
import BlogPostDetail from '../BlogPostDetail/BlogPostDetail';

const samplePost = {
  title: 'Getting Started with React',
  content: `<p>Welcome to your first React blog post! <a href="https://react.dev" target="_blank" rel="noopener noreferrer">Learn more</a> about React.</p><ul><li>JSX</li><li>Components</li><li>Props & State</li></ul>`,
  author: 'Jane Doe',
  date: '2023-01-01',
};

const BlogPostDetailDemo = () => (
  <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '20px 0' }}>
    <BlogPostDetail {...samplePost} />
  </div>
);

export default BlogPostDetailDemo;
