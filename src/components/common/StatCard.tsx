import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconVariant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
  trend?: {
    text: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconVariant = 'primary',
  trend,
  onClick,
}) => {
  return (
    <div
      className={`card card-hover-effect h-100 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="stat-card">
        <div className="stat-info">
          <div className="stat-label">{label}</div>
          <div className="stat-value">{value}</div>
          {trend && (
            <div className={`stat-trend ${trend.type}`}>
              <span>{trend.text}</span>
            </div>
          )}
        </div>
        <div className={`stat-icon-wrapper ${iconVariant}`}>{icon}</div>
      </div>
    </div>
  );
};

