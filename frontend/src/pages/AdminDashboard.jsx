import React, { useState, useEffect } from 'react';
import { RefreshCw, Filter, ShieldCheck, Clock, CheckCircle2, XCircle, ChevronRight, AlertCircle, Search } from 'lucide-react';
import apiClient from '../api/client';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { StatCard } from '../components/StatCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const AdminDashboard = ({ setCurrentView, setSelectedRequestId }) => {
  const [stats, setStats] = useState({ totalRequests: 0, pendingRequests: 0, inProgressRequests: 0, resolvedRequests: 0, rejectedRequests: 0 });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const statsRes = await apiClient.get('/api/admin/stats');
      if (statsRes.success) {
        setStats(statsRes.data);
      }

      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (categoryFilter) params.category = categoryFilter;
      if (priorityFilter) params.priority = priorityFilter;

      const requestsRes = await apiClient.get('/api/admin/requests', { params });
      if (requestsRes.success) {
        setRequests(requestsRes.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load administrator dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [statusFilter, categoryFilter, priorityFilter]);

  const filteredRequests = requests.filter((r) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.title.toLowerCase().includes(term) ||
      r.studentName?.toLowerCase().includes(term) ||
      r.studentEmail?.toLowerCase().includes(term) ||
      r.description?.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="card-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck className="brand-icon" size={28} /> Campus Helpdesk Administrator Panel
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Overview of campus requests, status updates, and support queue management
          </p>
        </div>
        <button className="btn btn-secondary" onClick={fetchDashboardData}>
          <RefreshCw size={16} /> Refresh Data
        </button>
      </div>

      {/* Admin Statistics Row */}
      <div className="stats-grid">
        <StatCard
          title="Total Requests"
          value={stats.totalRequests}
          icon={ShieldCheck}
          color="#818cf8"
          bgColor="rgba(99, 102, 241, 0.15)"
        />
        <StatCard
          title="Pending Review"
          value={stats.pendingRequests}
          icon={Clock}
          color="#fbbf24"
          bgColor="rgba(245, 158, 11, 0.15)"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgressRequests}
          icon={RefreshCw}
          color="#60a5fa"
          bgColor="rgba(59, 130, 246, 0.15)"
        />
        <StatCard
          title="Resolved"
          value={stats.resolvedRequests}
          icon={CheckCircle2}
          color="#34d399"
          bgColor="rgba(16, 185, 129, 0.15)"
        />
      </div>

      {/* Main Admin Panel Table Card */}
      <div className="card">
        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1.25rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center', background: 'rgba(15, 23, 42, 0.5)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <Filter size={16} /> Filters:
          </div>

          <input
            type="text"
            className="form-control"
            style={{ width: '220px' }}
            placeholder="Search student or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="form-control"
            style={{ width: '150px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>

          <select
            className="form-control"
            style={{ width: '150px' }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="ACADEMIC">ACADEMIC</option>
            <option value="HOSTEL">HOSTEL</option>
            <option value="TRANSPORT">TRANSPORT</option>
            <option value="FACILITIES">FACILITIES</option>
            <option value="IT">IT</option>
            <option value="OTHER">OTHER</option>
          </select>

          <select
            className="form-control"
            style={{ width: '140px' }}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          {(statusFilter || categoryFilter || priorityFilter || searchTerm) && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setStatusFilter('');
                setCategoryFilter('');
                setPriorityFilter('');
                setSearchTerm('');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching campus requests queue..." />
        ) : filteredRequests.length === 0 ? (
          <div className="empty-state">
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Requests Match Filter Criteria</h3>
            <p>Try adjusting your search terms or status filters above.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td>#{req.id}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{req.studentName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{req.studentEmail}</div>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--text-main)', maxWidth: '220px' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {req.title}
                      </div>
                    </td>
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
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setSelectedRequestId(req.id);
                          setCurrentView('admin-request-detail');
                        }}
                      >
                        Manage & Update <ChevronRight size={14} />
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
