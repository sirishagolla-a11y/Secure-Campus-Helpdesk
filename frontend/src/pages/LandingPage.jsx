import React from 'react';
import { ShieldCheck, LifeBuoy, Zap, Lock, ArrowRight, UserPlus, LogIn, ShieldAlert } from 'lucide-react';

export const LandingPage = ({ setCurrentView }) => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1 className="hero-title">
          Fast, Transparent & <span className="hero-gradient">Secure Helpdesk</span> for Your Campus
        </h1>
        <p className="hero-subtitle">
          Submit complaints, track support tickets in real-time, and get swift resolutions from campus administrators. Built with enterprise-grade security.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => setCurrentView('register')}>
            <UserPlus size={18} /> Student Register <ArrowRight size={16} />
          </button>
          <button className="btn btn-secondary" onClick={() => setCurrentView('login')}>
            <LogIn size={18} /> Student Login
          </button>
        </div>
      </section>

      <section className="stats-grid" style={{ marginTop: '2rem' }}>
        <div className="card">
          <LifeBuoy className="brand-icon" size={32} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Category Classification</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Report issues in Academic, Hostel, Facilities, IT, Transport, and other campus services easily.
          </p>
        </div>
        <div className="card">
          <Zap className="brand-icon" size={32} style={{ marginBottom: '1rem', color: '#06b6d4' }} />
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Real-time Status Tracking</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Monitor request progress from PENDING to IN_PROGRESS and RESOLVED with admin notes.
          </p>
        </div>
        <div className="card">
          <Lock className="brand-icon" size={32} style={{ marginBottom: '1rem', color: '#34d399' }} />
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Role-Based Access</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            BCrypt hashed passwords and JWT session protection ensure campus data stays confidential.
          </p>
        </div>
      </section>
    </div>
  );
};
