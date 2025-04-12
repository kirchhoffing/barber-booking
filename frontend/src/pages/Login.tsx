// /src/pages/Login.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // Token'ı localStorage'a kaydet
      localStorage.setItem('token', response.data.token);
      
      // Kullanıcı rolüne göre yönlendir
      if (response.data.user.role === 'BARBER') {
        navigate('/barber-panel');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Giriş yapılırken bir hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)]"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Giriş Yap</h2>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-600 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-700"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-700"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl mt-8 transition-colors duration-200 font-semibold text-base shadow-lg shadow-blue-500/30"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
