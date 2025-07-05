import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <a href="/" style={{
          fontWeight: 700,
          fontSize: 22,
          color: '#1976d2',
          textDecoration: 'none',
          letterSpacing: 1,
        }}>
          Flexi Blog
        </a>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {/* SearchBar will be rendered here by App.jsx, but now we render it directly via props */}
          {typeof window !== 'undefined' && typeof window.renderSearchBar === 'function' && window.renderSearchBar()}
        </div>
      </nav>
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
