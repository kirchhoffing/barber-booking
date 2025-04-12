import { useState, useEffect } from 'react';
import axios from '../lib/axios';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: number;
  date: string;
  status: string;
  user: {
    name: string;
    phone: string;
  };
  service: {
    name: string;
    duration: number;
  };
}

interface TimeSlot {
  id: number;
  date: string;
  status: 'EMPTY' | 'FULL' | 'CLOSED';
}

export default function BarberPanel() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const [barberId, setBarberId] = useState<number | null>(null);

  useEffect(() => {
    // Token kontrolü ve kullanıcı bilgilerini al
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Token'dan user bilgisini çek
    const getUserInfo = async () => {
      try {
        const response = await axios.get('/api/auth/me');
        if (response.data.user.role !== 'BARBER') {
          navigate('/');
          return;
        }
        // Berber ID'sini kaydet
        const barberResponse = await axios.get(`/api/barber/by-user/${response.data.user.id}`);
        setBarberId(barberResponse.data.id);
      } catch (error) {
        console.error('Kullanıcı bilgileri alınamadı:', error);
        navigate('/login');
      }
    };

    getUserInfo();
  }, [navigate]);

  // Randevuları getir
  const fetchAppointments = async () => {
    if (!barberId) return;
    
    try {
      const response = await axios.get(`/api/barber/${barberId}/appointments`);
      setAppointments(response.data);
    } catch (error: any) {
      console.error('Randevular yüklenirken hata oluştu:', error);
      setError(error.response?.data?.message || 'Randevular yüklenirken bir hata oluştu');
    }
  };

  // Randevu iptal et
  const cancelAppointment = async (appointmentId: number) => {
    if (!barberId) return;

    try {
      await axios.put(`/api/barber/${barberId}/appointments/${appointmentId}/cancel`);
      fetchAppointments();
    } catch (error: any) {
      console.error('Randevu iptal edilirken hata oluştu:', error);
      setError(error.response?.data?.message || 'Randevu iptal edilirken bir hata oluştu');
    }
  };

  // Zaman dilimi durumunu güncelle
  const updateTimeSlotStatus = async (timeSlotId: number, status: 'EMPTY' | 'FULL' | 'CLOSED') => {
    if (!barberId) return;

    try {
      await axios.put(`/api/barber/${barberId}/time-slots/${timeSlotId}`, { status });
      fetchTimeSlots();
    } catch (error: any) {
      console.error('Zaman dilimi güncellenirken hata oluştu:', error);
      setError(error.response?.data?.message || 'Zaman dilimi güncellenirken bir hata oluştu');
    }
  };

  // Zaman dilimlerini getir
  const fetchTimeSlots = async () => {
    if (!barberId) return;

    try {
      const response = await axios.get(`/api/barber/${barberId}/time-slots`);
      setTimeSlots(response.data);
    } catch (error: any) {
      console.error('Zaman dilimleri yüklenirken hata oluştu:', error);
      setError(error.response?.data?.message || 'Zaman dilimleri yüklenirken bir hata oluştu');
    }
  };

  useEffect(() => {
    if (barberId) {
      fetchAppointments();
      fetchTimeSlots();
    }
  }, [barberId]);

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Berber Paneli</h1>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* Takvim ve Zaman Dilimleri */}
        <div className="bg-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Çalışma Saatleri</h2>
          <div className="grid grid-cols-7 gap-2">
            {timeSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  slot.status === 'EMPTY'
                    ? 'bg-green-500 hover:bg-green-600'
                    : slot.status === 'FULL'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gray-500 hover:bg-gray-600'
                }`}
                onClick={() => {
                  const newStatus =
                    slot.status === 'EMPTY'
                      ? 'FULL'
                      : slot.status === 'FULL'
                      ? 'CLOSED'
                      : 'EMPTY';
                  updateTimeSlotStatus(slot.id, newStatus);
                }}
              >
                {new Date(slot.date).toLocaleTimeString('tr-TR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Randevu Listesi */}
        <div className="bg-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Randevular</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left">Tarih</th>
                  <th className="px-4 py-3 text-left">Müşteri</th>
                  <th className="px-4 py-3 text-left">Telefon</th>
                  <th className="px-4 py-3 text-left">Hizmet</th>
                  <th className="px-4 py-3 text-left">Durum</th>
                  <th className="px-4 py-3 text-left">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-700">
                    <td className="px-4 py-3">
                      {new Date(appointment.date).toLocaleString('tr-TR')}
                    </td>
                    <td className="px-4 py-3">{appointment.user.name}</td>
                    <td className="px-4 py-3">{appointment.user.phone}</td>
                    <td className="px-4 py-3">{appointment.service.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded ${
                        appointment.status === 'PENDING' ? 'bg-yellow-500' :
                        appointment.status === 'CONFIRMED' ? 'bg-green-500' :
                        appointment.status === 'CANCELLED' ? 'bg-red-500' :
                        'bg-gray-500'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {appointment.status !== 'CANCELLED' && (
                        <button
                          onClick={() => cancelAppointment(appointment.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          İptal Et
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 