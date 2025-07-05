// import React from 'react';
import BlogPostItem from '../BlogPostItem/BlogPostItem';
import './BlogPostList.css';

import React from 'react';

const BlogPostList = ({ posts, noResults, searchQuery }) => {
  if (noResults) {
    return <p className="blog-post-empty">No posts found.</p>;
  }
  if (!posts || posts.length === 0) {
    return <p className="blog-post-empty">No blog posts available.</p>;
  }
  return (
    <div className="blog-post-list">
      {posts.map((post) => (
        <BlogPostItem
          key={post.id}
          id={post.id}
          title={post.title}
          summary={post.summary}
          date={post.date}
          url={post.url}
        />
      ))}
    </div>
  );
};

export default BlogPostList;