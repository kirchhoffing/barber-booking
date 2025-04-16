import React, { useState } from 'react';

interface Service {
  name: string;
  price: string;
  duration: string;
}

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

const BarberDetail: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedService, setSelectedService] = useState<string>('');

  // Örnek veriler (gerçek uygulamada API'den gelecek)
  const barber = {
    name: 'Ahmet Yılmaz',
    experience: '10 yıl',
    specialty: 'Saç Kesimi & Sakal Tıraşı',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: 4.8,
    reviews: 124,
  };

  const services: Service[] = [
    { name: 'Saç Kesimi', price: '150 TL', duration: '30 dk' },
    { name: 'Sakal Tıraşı', price: '100 TL', duration: '20 dk' },
    { name: 'Saç & Sakal', price: '200 TL', duration: '45 dk' },
  ];

  const reviews: Review[] = [
    {
      user: 'Mehmet K.',
      rating: 5,
      comment: 'Çok profesyonel ve titiz bir berber. Kesinlikle tavsiye ederim.',
      date: '2024-03-15',
    },
    {
      user: 'Ali Y.',
      rating: 4,
      comment: 'İyi bir deneyimdi, fiyat/performans açısından uygun.',
      date: '2024-03-10',
    },
  ];

  const timeSlots: TimeSlot[] = [
    { time: '09:00', isAvailable: true },
    { time: '09:30', isAvailable: false },
    { time: '10:00', isAvailable: true },
    { time: '10:30', isAvailable: true },
    { time: '11:00', isAvailable: false },
    { time: '11:30', isAvailable: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Berber Profil Bilgileri */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center">
              <img
                className="h-32 w-32 rounded-full object-cover"
                src={barber.image}
                alt={barber.name}
              />
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-gray-900">{barber.name}</h1>
                <p className="mt-1 text-gray-500">{barber.experience} deneyim</p>
                <p className="mt-2 text-indigo-600">{barber.specialty}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-900">{barber.rating}</span>
                  <span className="ml-2 text-gray-500">({barber.reviews} değerlendirme)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon - Hizmetler */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hizmetler</h2>
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className={`p-4 rounded-lg border ${
                      selectedService === service.name
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedService(service.name)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {service.name}
                        </h3>
                        <p className="text-gray-500">{service.duration}</p>
                      </div>
                      <p className="text-xl font-bold text-indigo-600">
                        {service.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Değerlendirmeler */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Değerlendirmeler
              </h2>
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-900">{review.user}</h3>
                      <span className="text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Randevu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Randevu Al
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tarih
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saat
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.isAvailable}
                        className={`px-4 py-2 rounded-md text-center ${
                          slot.isAvailable
                            ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={!selectedService}
                >
                  Randevu Oluştur
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberDetail; 