import React from 'react';
import { Shield, LogOut, PlusCircle, LayoutDashboard, UserCheck, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ currentView, setCurrentView }) => {
  const { user, isAuthenticated, isStudent, isAdmin, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-logo" onClick={() => setCurrentView('landing')}>
          <Shield className="brand-icon" size={28} />
          <span>Secure Campus Helpdesk</span>
        </div>

        <nav>
          <ul className="nav-links">
            {isAuthenticated ? (
              <>
                {isStudent && (
                  <>
                    <li>
                      <button
                        className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setCurrentView('dashboard')}
                      >
                        <LayoutDashboard size={18} /> My Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        className={`nav-item ${currentView === 'create-request' ? 'active' : ''}`}
                        onClick={() => setCurrentView('create-request')}
                      >
                        <PlusCircle size={18} /> New Request
                      </button>
                    </li>
                  </>
                )}

                {isAdmin && (
                  <li>
                    <button
                      className={`nav-item ${currentView === 'admin-dashboard' ? 'active' : ''}`}
                      onClick={() => setCurrentView('admin-dashboard')}
                    >
                      <LayoutDashboard size={18} /> Admin Dashboard
                    </button>
                  </li>
                )}

                <li className="user-badge">
                  <UserCheck size={16} />
                  <span>{user?.name} ({user?.role})</span>
                </li>

                <li>
                  <button className="btn btn-secondary btn-sm" onClick={() => { logout(); setCurrentView('landing'); }}>
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    className={`nav-item ${currentView === 'login' ? 'active' : ''}`}
                    onClick={() => setCurrentView('login')}
                  >
                    Student Login
                  </button>
                </li>
                <li>
                  <button
                    className={`nav-item ${currentView === 'register' ? 'active' : ''}`}
                    onClick={() => setCurrentView('register')}
                  >
                    Student Register
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setCurrentView('admin-login')}
                  >
                    <KeyRound size={16} /> Admin Portal
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
