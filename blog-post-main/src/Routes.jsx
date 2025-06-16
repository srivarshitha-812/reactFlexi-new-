import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogPostDetail from './components/BlogPostDetail/BlogPostDetail';
import BlogPostList from './components/BlogPostList/BlogPostList';
import BlogPostForm from './components/BlogPostDetail/BlogPostForm';

const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: `<p>Welcome to your first React blog post! <a href="https://react.dev" target="_blank" rel="noopener noreferrer">Learn more</a> about React.</p><ul><li>JSX</li><li>Components</li><li>Props & State</li></ul>`,
    summary: 'Learn the basics of React and build your first application.',
    author: 'Jane Doe',
    date: '2023-01-01',
    url: '/posts/1',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    content: `<p>Explore the differences between <strong>CSS Grid</strong> and <strong>Flexbox</strong> for modern layouts.</p>`,
    summary: 'A comparison of two powerful layout systems in CSS.',
    author: 'John Smith',
    date: '2023-02-15',
    url: '/posts/2',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    content: `<p>Tips for making your web applications more accessible to everyone.</p>`,
    summary: 'Tips for making your web applications more accessible.',
    author: 'Alex Lee',
    date: '2023-03-10',
    url: '/posts/3',
  }
];

function BlogPostDetailPage({ posts, onDelete }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  return (
    <div>
      <Link to="/">← Back to Blog List</Link>
      <BlogPostDetail {...(post || {})} onDelete={() => onDelete(id)} />
    </div>
  );
}

function HomePage({ posts }) {
  return <BlogPostList posts={posts} />;
}

function BlogPostCreatePage({ onSubmit }) {
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(data);
    }, 800);
  };
  return (
    <div>
      <Link to="/">← Back to Blog List</Link>
      <h2>Create New Blog Post</h2>
      <BlogPostForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

function BlogPostEditPage({ posts, onSubmit }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(id, data);
    }, 800);
  };
  return (
    <div>
      <Link to={`/posts/${id}`}>← Back to Post</Link>
      <h2>Edit Blog Post</h2>
      <BlogPostForm post={post} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

export { BlogPostDetailPage, HomePage, BlogPostCreatePage, BlogPostEditPage };
