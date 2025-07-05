import React, { useState, useRef } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [resultsCount, setResultsCount] = useState(null);
  const inputRef = useRef(null);

  // For accessibility: announce results count
  const announceResults = (count) => {
    setResultsCount(count);
    setTimeout(() => setResultsCount(null), 2000);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value, announceResults);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, announceResults);
    }
  };

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setQuery('');
    if (onSearch) {
      onSearch('', announceResults);
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      {/* Mobile: show icon if not expanded */}
      <form className={expanded ? styles.expanded : styles.form} onSubmit={handleSubmit} role="search" aria-label="Search blog posts">
        <label htmlFor="search-input" className={styles.label}>
          Search posts:
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="search-input"
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setExpanded(true)}
            aria-label="Search posts"
            autoComplete="off"
          />
          <button
            type="submit"
            className={styles.searchButton}
            aria-label="Search"
            tabIndex={0}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7" stroke="#333" strokeWidth="2" />
              <line x1="14.5" y1="14.5" x2="19" y2="19" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {/* Mobile: show cancel button */}
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCollapse}
            aria-label="Cancel search"
            tabIndex={expanded ? 0 : -1}
          >
            Cancel
          </button>
        </div>
      </form>
      {/* Mobile: show icon if not expanded */}
      {!expanded && (
        <button
          className={styles.iconButton}
          onClick={handleExpand}
          aria-label="Open search"
        >
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="7" stroke="#333" strokeWidth="2" />
            <line x1="14.5" y1="14.5" x2="19" y2="19" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {/* ARIA live region for announcing results */}
      <div className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {resultsCount !== null && `${resultsCount} result${resultsCount === 1 ? '' : 's'} found.`}
      </div>
    </div>
  );
};

export default SearchBar;
