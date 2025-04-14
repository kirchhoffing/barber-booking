// /backend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated, hasRole } from './services/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BarberDetail from './pages/BarberDetail';
import BarberPanel from './pages/BarberPanel';
import AdminPanel from './pages/AdminPanel';
import { MainLayout } from './components/layout/MainLayout';

// Protected Route bileşeni
const ProtectedRoute = ({ children, roles }: { children: React.ReactNode; roles?: string[] }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (roles) {
    const hasRequiredRole = roles.some(role => hasRole(role));
    if (!hasRequiredRole) {
      return <Navigate to="/" />;
    }
  }

  return <MainLayout showLogout showHome={!roles?.includes('BARBER')}>{children}</MainLayout>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        
        <Route
          path="/barber-panel"
          element={
            <ProtectedRoute roles={['BARBER']}>
              <BarberPanel />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
