import React from 'react';
import { PriorityLevel } from '@/types';

interface PriorityBadgeProps {
  priority: PriorityLevel;
  label?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, label }) => {
  const map: Record<PriorityLevel, { text: string; className: string }> = {
    P1: { text: label || 'P1 - Critical', className: 'badge-priority-p1' },
    P2: { text: label || 'P2 - High', className: 'badge-priority-p2' },
    P3: { text: label || 'P3 - Medium', className: 'badge-priority-p3' },
    P4: { text: label || 'P4 - Low', className: 'badge-priority-p4' },
  };

  const current = map[priority] || map.P3;

  return (
    <span className={`badge px-2 py-1 rounded-pill ${current.className}`}>
      {current.text}
    </span>
  );
};

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let badgeClass = 'badge-status-draft';
  const s = status.toLowerCase();

  if (s.includes('active') || s.includes('occupied') || s.includes('resolved') || s.includes('paid') || s.includes('confirmed') || s.includes('operational')) {
    badgeClass = 'badge-status-active';
  } else if (s.includes('progress') || s.includes('pending') || s.includes('rented') || s.includes('scheduled')) {
    badgeClass = 'badge-status-pending';
  } else if (s.includes('overdue') || s.includes('critical') || s.includes('expired') || s.includes('rejected') || s.includes('delay') || s.includes('mismatch')) {
    badgeClass = 'badge-status-overdue';
  } else if (s.includes('vacant') || s.includes('closed') || s.includes('draft') || s.includes('off duty')) {
    badgeClass = 'badge-status-vacant';
  }

  return (
    <span className={`badge px-2 py-1 rounded-pill ${badgeClass}`}>
      {status}
    </span>
  );
};

