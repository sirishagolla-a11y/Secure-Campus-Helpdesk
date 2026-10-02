import React from 'react';

export const PriorityBadge = ({ priority }) => {
  const normalized = priority ? priority.toLowerCase() : 'low';
  return (
    <span className={`badge badge-priority-${normalized}`}>
      {priority}
    </span>
  );
};
