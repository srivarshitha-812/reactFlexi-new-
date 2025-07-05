import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { BlogPostDetailPage, HomePage, BlogPostCreatePage, BlogPostEditPage } from './Routes';
import Layout from '../../src/components/Layout';
import SearchBar from './components/SearchBar';
import highlightText from './components/highlightText';

const initialPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React and build your first application.',
    content: `<p>Welcome to your first React blog post! <a href="https://react.dev" target="_blank" rel="noopener noreferrer">Learn more</a> about React.</p><ul><li>JSX</li><li>Components</li><li>Props & State</li></ul>`,
    author: 'Jane Doe',
    date: '2023-01-01',
    url: '/posts/1',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    summary: 'A comparison of two powerful layout systems in CSS.',
    content: `<p>Explore the differences between <strong>CSS Grid</strong> and <strong>Flexbox</strong> for modern layouts.</p>`,
    author: 'John Smith',
    date: '2023-02-15',
    url: '/posts/2',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    summary: 'Tips for making your web applications more accessible.',
    content: `<p>Tips for making your web applications more accessible to everyone.</p>`,
    author: 'Alex Lee',
    date: '2023-03-10',
    url: '/posts/3',
  }
];


const App = () => {
  const [posts, setPosts] = React.useState(initialPosts);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState(posts);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!searchQuery) {
      setFilteredPosts(posts);
    } else {
      const q = searchQuery.trim().toLowerCase();
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(q) ||
        (post.content && post.content.toLowerCase().includes(q))
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  const handleCreate = (data) => {
    const newId = (posts.length + 1).toString();
    setPosts([
      ...posts,
      {
        ...data,
        id: newId,
        url: `/posts/${newId}`,
        summary: data.content.slice(0, 80) + '...',
      },
    ]);
    navigate('/');
  };

  const handleEdit = (id, data) => {
    setPosts(posts.map(post => post.id === id ? { ...post, ...data } : post));
    navigate(`/posts/${id}`);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    navigate('/');
  };

  // Search handler for SearchBar
  const handleSearch = (query, announceResults) => {
    setSearchQuery(query);
    if (announceResults) announceResults(
      query.trim() ? posts.filter(post =>
        post.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(query.trim().toLowerCase()))
      ).length : posts.length
    );
  };


  // Provide a function for Layout to render the SearchBar
  if (typeof window !== 'undefined') {
    window.renderSearchBar = () => <SearchBar onSearch={handleSearch} />;
  }

  // Highlight search term in title and summary
  const postsToShow = filteredPosts.map(post => ({
    ...post,
    title: searchQuery ? highlightText(post.title, searchQuery) : post.title,
    summary: searchQuery ? highlightText(post.summary || '', searchQuery) : post.summary,
  }));

  return (
    <Layout>
      <SearchBar onSearch={handleSearch} />
      <h1 style={{ textAlign: 'center' }}>Blog Posts</h1>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <a href="/create" style={{
          display: 'inline-block',
          background: '#007BFF',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: 4,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 16,
        }}>+ New Post</a>
      </div>
      <Routes>
        <Route path="/" element={<HomePage posts={postsToShow} noResults={postsToShow.length === 0} searchQuery={searchQuery} />} />
        <Route path="/posts/:id" element={<BlogPostDetailPage posts={posts} onDelete={handleDelete} />} />
        <Route path="/create" element={<BlogPostCreatePage onSubmit={handleCreate} />} />
        <Route path="/edit/:id" element={<BlogPostEditPage posts={posts} onSubmit={handleEdit} />} />
      </Routes>
    </Layout>
  );
};

export default App;