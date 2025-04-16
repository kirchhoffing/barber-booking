/**
 * App.tsx - Main Application Component
 * 
 * This file sets up the main routing structure of the application using React Router.
 * It includes protected routes that require authentication and specific roles.
 * 
 * Key Concepts:
 * - React Router for navigation
 * - Protected Routes with role-based access control
 * - Layout components for consistent UI
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated, hasRole } from './services/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
//import BarberDetail from './pages/BarberDetail';
import BarberDashboard from './pages/BarberDashboard';
import AdminPanel from './pages/AdminPanel';
import { MainLayout } from './components/layout/MainLayout';

/**
 * Interface for ProtectedRoute component props
 * @property {React.ReactNode} children - The content to be rendered if access is granted
 * @property {string[]} [roles] - Optional array of required roles for access
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

/**
 * ProtectedRoute Component
 * 
 * A higher-order component that:
 * 1. Checks if user is authenticated
 * 2. Verifies if user has required roles
 * 3. Renders children with MainLayout if access is granted
 * 4. Redirects to login or home if access is denied
 * 
 * @param {ProtectedRouteProps} props - Component props
 * @returns {JSX.Element} Protected route content or redirect
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  // Check authentication status
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  // Check role-based access
  if (roles && !roles.some(role => hasRole(role))) {
    return <Navigate to="/" />;
  }

  // Render protected content with layout
  return <MainLayout showLogout showHome={!roles?.some(role => ['ADMIN', 'BARBER'].includes(role))}>{children}</MainLayout>;
};

/**
 * Main App Component
 * 
 * Sets up the application's routing structure:
 * - Public routes (login, register, home)
 * - Protected routes (barber panel, admin panel)
 * 
 * @returns {JSX.Element} Application with routing configuration
 */
const App: React.FC = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      
      {/* Protected Routes */}
      <Route 
        path="/barber-dashboard" 
        element={
          <ProtectedRoute roles={['BARBER']}>
            <BarberDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminPanel />
          </ProtectedRoute>
        } 
      />
    </Routes>
  </Router>
);

export default App;
