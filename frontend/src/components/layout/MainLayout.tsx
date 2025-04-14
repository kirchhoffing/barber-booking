import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../../services/auth';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface MainLayoutProps {
  children?: React.ReactNode;
  showLogout?: boolean;
  showHome?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, showLogout = false, showHome = true }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleHome = () => {
    if (!isAuthenticated()) {
      navigate('/');
    } else if (hasRole('BARBER')) {
      navigate('/barber-panel');
    } else if (hasRole('ADMIN')) {
      navigate('/admin-panel');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {showHome && (
        <div className="fixed top-4 left-4 z-50 flex items-center gap-4">
          <button
            onClick={handleHome}
            className="w-32 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t('home')}
          </button>
          <LanguageSwitcher />
        </div>
      )}
      {showLogout && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="w-32 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {t('logout')}
          </button>
        </div>
      )}
      {children}
    </div>
  );
}; 