import React from 'react';

export const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="empty-state">
      <div className="spinner" style={{ margin: '0 auto 1rem auto' }}></div>
      <p style={{ color: 'var(--text-muted)' }}>{message}</p>
    </div>
  );
};
