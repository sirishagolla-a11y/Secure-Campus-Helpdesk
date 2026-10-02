import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { StudentLogin } from './pages/StudentLogin';
import { StudentRegister } from './pages/StudentRegister';
import { AdminLogin } from './pages/AdminLogin';
import { StudentDashboard } from './pages/StudentDashboard';
import { CreateRequest } from './pages/CreateRequest';
import { StudentRequestDetail } from './pages/StudentRequestDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminRequestDetail } from './pages/AdminRequestDetail';
import './styles/main.css';

const MainApp = () => {
  const { isAuthenticated, isStudent, isAdmin } = useAuth();
  const [currentView, setCurrentView] = useState('landing');
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const renderContent = () => {
    switch (currentView) {
      case 'register':
        return <StudentRegister setCurrentView={setCurrentView} />;
      case 'login':
        return <StudentLogin setCurrentView={setCurrentView} />;
      case 'admin-login':
        return <AdminLogin setCurrentView={setCurrentView} />;
      case 'dashboard':
        return isAuthenticated && isStudent ? (
          <StudentDashboard setCurrentView={setCurrentView} setSelectedRequestId={setSelectedRequestId} />
        ) : (
          <StudentLogin setCurrentView={setCurrentView} />
        );
      case 'create-request':
        return isAuthenticated && isStudent ? (
          <CreateRequest setCurrentView={setCurrentView} setSelectedRequestId={setSelectedRequestId} />
        ) : (
          <StudentLogin setCurrentView={setCurrentView} />
        );
      case 'request-detail':
        return isAuthenticated ? (
          <StudentRequestDetail requestId={selectedRequestId} setCurrentView={setCurrentView} />
        ) : (
          <StudentLogin setCurrentView={setCurrentView} />
        );
      case 'admin-dashboard':
        return isAuthenticated && isAdmin ? (
          <AdminDashboard setCurrentView={setCurrentView} setSelectedRequestId={setSelectedRequestId} />
        ) : (
          <AdminLogin setCurrentView={setCurrentView} />
        );
      case 'admin-request-detail':
        return isAuthenticated && isAdmin ? (
          <AdminRequestDetail requestId={selectedRequestId} setCurrentView={setCurrentView} />
        ) : (
          <AdminLogin setCurrentView={setCurrentView} />
        );
      case 'landing':
      default:
        return <LandingPage setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="main-content">{renderContent()}</main>
      <footer style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', borderTop: '1px solid var(--border-light)' }}>
        Secure Campus Helpdesk System &copy; {new Date().getFullYear()} — Enterprise Student & Admin Portal
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
