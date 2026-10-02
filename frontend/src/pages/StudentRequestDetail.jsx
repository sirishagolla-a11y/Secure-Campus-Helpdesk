import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, MessageSquare, AlertCircle, FileText } from 'lucide-react';
import apiClient from '../api/client';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const StudentRequestDetail = ({ requestId, setCurrentView }) => {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiClient.get(`/api/requests/${requestId}`);
        if (res.success) {
          setRequest(res.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch request details');
      } finally {
        setLoading(false);
      }
    };

    if (requestId) {
      fetchDetail();
    }
  }, [requestId]);

  if (loading) {
    return <LoadingSpinner message="Loading request details..." />;
  }

  if (error || !request) {
    return (
      <div style={{ maxWidth: '680px', margin: '2rem auto' }}>
        <button className="btn btn-secondary btn-sm" style={{ marginBottom: '1rem' }} onClick={() => setCurrentView('dashboard')}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error || 'Request not found.'}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '780px', margin: '1rem auto' }}>
      <button className="btn btn-secondary btn-sm" style={{ marginBottom: '1.25rem' }} onClick={() => setCurrentView('dashboard')}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="card">
        <div className="card-header" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Ticket #{request.id}</span>
              <StatusBadge status={request.status} />
              <PriorityBadge priority={request.priority} />
            </div>
            <h1 className="card-title" style={{ fontSize: '1.6rem' }}>{request.title}</h1>
          </div>
        </div>

        <div style={{ padding: '1.5rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Category</div>
            <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>{request.category}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Submitted On</div>
            <div style={{ color: 'var(--text-main)', marginTop: '0.25rem' }}>
              {new Date(request.createdAt).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </div>
          </div>
        </div>

        <div style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={16} /> Description
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
            {request.description}
          </div>
        </div>

        {/* Admin Note / Resolution Section */}
        <div style={{ padding: '1.5rem 0 0 0' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={16} /> Admin Response & Notes
          </div>

          {request.adminNote ? (
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--border-active)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: '#a5b4fc', marginBottom: '0.5rem' }}>Administrator Note:</div>
              <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-main)' }}>{request.adminNote}</p>
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>
              No resolution comments added by administrator yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
