import React from 'react';
import { Clock, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  switch (status) {
    case 'PENDING':
      return (
        <span className="badge badge-pending">
          <Clock size={12} /> Pending
        </span>
      );
    case 'IN_PROGRESS':
      return (
        <span className="badge badge-in_progress">
          <RefreshCw size={12} /> In Progress
        </span>
      );
    case 'RESOLVED':
      return (
        <span className="badge badge-resolved">
          <CheckCircle2 size={12} /> Resolved
        </span>
      );
    case 'REJECTED':
      return (
        <span className="badge badge-rejected">
          <XCircle size={12} /> Rejected
        </span>
      );
    default:
      return <span className="badge">{status}</span>;
  }
};
