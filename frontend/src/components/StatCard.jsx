import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color, bgColor }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon-wrapper" style={{ backgroundColor: bgColor, color: color }}>
        {Icon && <Icon size={24} />}
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
      </div>
    </div>
  );
};
