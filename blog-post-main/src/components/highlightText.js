// Utility to highlight search terms in a string (case-insensitive)
import React from 'react';
export default function highlightText(text, term) {
  if (!term) return text;
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part)
      ? React.createElement('mark', { key: i, style: { background: '#fff59d', padding: 0 } }, part)
      : part
  );
}
