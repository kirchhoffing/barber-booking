import React, { useState, useEffect } from 'react';
import { WorkingHours } from '../components/barber/WorkingHours';
import { Services } from '../components/barber/Services';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function BarberDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'hours' | 'services'>('hours');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        console.log('Debug - Auth failed: Missing token or user');
        navigate('/login', { replace: true });
        return;
      }

      try {
        const userData = JSON.parse(user);
        if (userData.role !== 'BARBER') {
          console.log('Debug - Auth failed: Not a barber role');
          navigate('/login', { replace: true });
          return;
        }
      } catch (e) {
        console.log('Debug - Auth failed:', e);
        navigate('/login', { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  const tabs = [
    { id: 'hours', label: t('workingHours') },
    { id: 'services', label: t('services') }
  ] as const;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-red-500 text-white p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{t('barberDashboard')}</h1>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900 rounded-lg">
          {activeTab === 'services' && <Services />}
          {activeTab === 'hours' && <WorkingHours />}
        </div>
      </div>
    </div>
  );
} 