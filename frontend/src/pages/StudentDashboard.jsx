import React, { useState, useEffect } from 'react';
import { PlusCircle, Clock, RefreshCw, CheckCircle2, FileText, ChevronRight, AlertCircle } from 'lucide-react';
import apiClient from '../api/client';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const StudentDashboard = ({ setCurrentView, setSelectedRequestId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiClient.get('/api/requests/my');
      if (res.success) {
        setRequests(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch your help requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const inProgressCount = requests.filter((r) => r.status === 'IN_PROGRESS').length;
  const resolvedCount = requests.filter((r) => r.status === 'RESOLVED').length;

  return (
    <div>
      <div className="card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Student Helpdesk Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Submit, view, and monitor your campus help requests
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setCurrentView('create-request')}>
          <PlusCircle size={18} /> Submit New Request
        </button>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Clock size={24} />
          </div>
          <div>
            <div className="stat-value">{pendingCount}</div>
            <div className="stat-label">Pending Review</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
            <RefreshCw size={24} />
          </div>
          <div>
            <div className="stat-value">{inProgressCount}</div>
            <div className="stat-label">In Progress</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="stat-value">{resolvedCount}</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>
      </div>

      {/* Request Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">My Submitted Requests</h2>
          <button className="btn btn-secondary btn-sm" onClick={fetchMyRequests}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <LoadingSpinner message="Fetching your campus help requests..." />
        ) : requests.length === 0 ? (
          <div className="empty-state">
            <FileText className="empty-icon" />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>No Help Requests Found</h3>
            <p style={{ marginBottom: '1.25rem' }}>You have not submitted any complaints or help requests yet.</p>
            <button className="btn btn-primary" onClick={() => setCurrentView('create-request')}>
              <PlusCircle size={16} /> Create First Request
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Date Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td>#{req.id}</td>
                    <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{req.title}</td>
                    <td>
                      <span className="badge" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
                        {req.category}
                      </span>
                    </td>
                    <td><PriorityBadge priority={req.priority} /></td>
                    <td><StatusBadge status={req.status} /></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {new Date(req.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSelectedRequestId(req.id);
                          setCurrentView('request-detail');
                        }}
                      >
                        View <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
