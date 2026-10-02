import React, { useState } from 'react';
import { Send, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import apiClient from '../api/client';

export const CreateRequest = ({ setCurrentView, setSelectedRequestId }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('FACILITIES');
  const [priority, setPriority] = useState('MEDIUM');
  const [description, setDescription] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const res = await apiClient.post('/api/requests', {
        title,
        category,
        priority,
        description,
      });

      if (res.success && res.data) {
        setSuccess('Help request submitted successfully!');
        setTimeout(() => {
          setSelectedRequestId(res.data.id);
          setCurrentView('request-detail');
        }, 1200);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit help request. Please check inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '1rem auto 0 auto' }}>
      <button
        className="btn btn-secondary btn-sm"
        style={{ marginBottom: '1.25rem' }}
        onClick={() => setCurrentView('dashboard')}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="card">
        <div className="card-header" style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
          <div>
            <h2 className="card-title">Create Campus Help Request</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Fill in the details below to notify campus administration
            </p>
          </div>
        </div>

        {error && (
          <div className="alert alert-error" style={{ marginTop: '1.25rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success" style={{ marginTop: '1.25rem' }}>
            <CheckCircle2 size={18} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Issue Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Projector not working in classroom 204"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={5}
              maxLength={100}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="ACADEMIC">Academic</option>
                <option value="HOSTEL">Hostel</option>
                <option value="TRANSPORT">Transport</option>
                <option value="FACILITIES">Facilities</option>
                <option value="IT">IT Support</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority Level</label>
              <select
                className="form-control"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="LOW">Low (Routine)</option>
                <option value="MEDIUM">Medium (Normal)</option>
                <option value="HIGH">High (Urgent)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Description</label>
            <textarea
              className="form-control"
              placeholder="Describe the issue in detail, including specific location, room number, or time observed..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minLength={10}
              maxLength={2000}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setCurrentView('dashboard')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <span className="spinner" /> : <><Send size={18} /> Submit Help Request</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
