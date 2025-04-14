// /src/pages/Register.tsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../lib/axios'
import { useTranslation } from 'react-i18next'

const Register = () => {
  const { t } = useTranslation();
  // 📌 Form state'leri
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [isBarber, setIsBarber] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  // 🚀 Register işlemi
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basit doğrulama
    if (password !== confirmPassword) {
      setError(t('passwordsDontMatch'))
      return
    }

    try {
      if (isBarber) {
        // Berber kaydı
        const response = await axios.post('/api/barber/register', {
          name,
          email,
          password,
          phone
        })
        console.log('✅ Berber kaydı başarılı:', response.data)
      } else {
        // Normal kullanıcı kaydı
        const response = await axios.post('/api/auth/register', {
          email,
          password,
          name,
          phone
        })
        console.log('✅ Kayıt başarılı:', response.data)
      }

      // Kayıt başarılıysa login sayfasına gönder
      navigate('/login')
    } catch (err: any) {
      console.error('❌ Hata:', err)
      setError(err.response?.data?.message || t('errorOccurred'))
    }
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center p-4">
      <form onSubmit={handleRegister} className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)]">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">{t('register')}</h2>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-600 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="flex items-center text-gray-700 select-none cursor-pointer hover:text-gray-900 transition-colors">
            <input
              type="checkbox"
              checked={isBarber}
              onChange={(e) => setIsBarber(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 shadow-sm focus:ring-blue-500 transition-all"
            />
            <span className="ml-2 text-sm font-medium">{t('registerAsBarber')}</span>
          </label>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('fullName')}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder={t('email')}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <input
              type="tel"
              placeholder={t('phone')}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-700"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder={t('password')}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder={t('confirmPassword')}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400 text-gray-700"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl mt-8 transition-colors duration-200 font-semibold text-base shadow-lg shadow-blue-500/30"
        >
          {t('register')}
        </button>
      </form>
    </div>
  )
}

export default Register
