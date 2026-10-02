import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, MessageSquare, CheckCircle2, AlertCircle, User, Calendar, Tag } from 'lucide-react';
import apiClient from '../api/client';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const AdminRequestDetail = ({ requestId, setCurrentView }) => {
  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState('IN_PROGRESS');
  const [adminNote, setAdminNote] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiClient.get(`/api/admin/requests/${requestId}`);
        if (res.success && res.data) {
          setRequest(res.data);
          setStatus(res.data.status);
          setAdminNote(res.data.adminNote || '');
        }
      } catch (err) {
        setError(err.message || 'Failed to load request for admin management');
      } finally {
        setLoading(false);
      }
    };

    if (requestId) {
      fetchDetail();
    }
  }, [requestId]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await apiClient.put(`/api/admin/requests/${requestId}/status`, {
        status,
        adminNote,
      });

      if (res.success && res.data) {
        setRequest(res.data);
        setSuccess('Status and admin response updated successfully!');
      }
    } catch (err) {
      setError(err.message || 'Failed to update request status');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Fetching ticket details..." />;
  }

  if (error && !request) {
    return (
      <div style={{ maxWidth: '680px', margin: '2rem auto' }}>
        <button className="btn btn-secondary btn-sm" style={{ marginBottom: '1rem' }} onClick={() => setCurrentView('admin-dashboard')}>
          <ArrowLeft size={16} /> Back to Admin Dashboard
        </button>
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '820px', margin: '1rem auto' }}>
      <button className="btn btn-secondary btn-sm" style={{ marginBottom: '1.25rem' }} onClick={() => setCurrentView('admin-dashboard')}>
        <ArrowLeft size={16} /> Back to Admin Dashboard
      </button>

      <div className="card">
        <div className="card-header" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Ticket #{request.id}</span>
              <StatusBadge status={request.status} />
              <PriorityBadge priority={request.priority} />
            </div>
            <h1 className="card-title" style={{ fontSize: '1.6rem' }}>{request.title}</h1>
          </div>
        </div>

        {/* Student & Meta Info Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', padding: '1.25rem 0', borderBottom: '1px solid var(--border-light)' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={14} /> Student Info
            </div>
            <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>{request.studentName}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{request.studentEmail}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Tag size={14} /> Category
            </div>
            <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>{request.category}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={14} /> Date Submitted
            </div>
            <div style={{ color: 'var(--text-main)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              {new Date(request.createdAt).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </div>
          </div>
        </div>

        {/* Description Body */}
        <div style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
            Student Issue Description
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
            {request.description}
          </div>
        </div>

        {/* Admin Management & Status Update Form */}
        <div style={{ padding: '1.5rem 0 0 0' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>
            Manage & Resolve Ticket
          </h3>

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <CheckCircle2 size={18} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleUpdateStatus}>
            <div className="form-group">
              <label className="form-label">Update Status</label>
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="PENDING">PENDING (Awaiting Review)</option>
                <option value="IN_PROGRESS">IN_PROGRESS (Under Investigation)</option>
                <option value="RESOLVED">RESOLVED (Issue Fixed)</option>
                <option value="REJECTED">REJECTED (Declined / Duplicate)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Admin Resolution Note / Response</label>
              <textarea
                className="form-control"
                placeholder="Provide feedback or actions taken (e.g. Technician dispatched to Room 204, bulb replaced)."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                rows={4}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.25rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCurrentView('admin-dashboard')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? <span className="spinner" /> : <><Save size={18} /> Save Update</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
