import React, { useState } from 'react';
import { ShieldAlert, KeyRound, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLogin = ({ setCurrentView }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.user.role !== 'ADMIN') {
        throw new Error('Access denied: You do not have administrator permissions.');
      }
      setCurrentView('admin-dashboard');
    } catch (err) {
      setError(err.message || 'Admin login failed. Verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '3rem auto 0 auto' }}>
      <div className="card" style={{ borderColor: 'rgba(99, 102, 241, 0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <ShieldAlert size={36} color="var(--primary)" style={{ margin: '0 auto 0.5rem auto' }} />
          <h2 className="card-title">Admin Portal Login</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Restricted to authorized campus administrators
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@campus.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Admin Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className="spinner" /> : <><KeyRound size={18} /> Login as Administrator</>}
          </button>
        </form>
      </div>
    </div>
  );
};
