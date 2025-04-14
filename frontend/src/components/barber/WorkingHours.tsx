import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { updateWorkingHours, getWorkingHours, WorkingHour } from '../../services/barber';

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

interface TimeSlot {
  time: string;
  status: 'empty' | 'full' | 'closed';
}

interface DaySchedule {
  dayOfWeek: number;
  slots: TimeSlot[];
}

export const WorkingHours: React.FC = () => {
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(21);
  const [schedule, setSchedule] = useState<DaySchedule[]>(() => {
    // Schedule'ı başlangıçta initialize et
    return DAYS.map((_, index) => ({
      dayOfWeek: index,
      slots: Array.from({ length: 12 }, (_, i) => ({
        time: `${(startHour + i).toString().padStart(2, '0')}:00`,
        status: 'empty'
      }))
    }));
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['workingHours'],
    queryFn: getWorkingHours,
    retry: false
  });

  useEffect(() => {
    if (data) {
      setWorkingHours(data);
      initializeSchedule(data);
    }
  }, [data]);

  const initializeSchedule = (hours: WorkingHour[]) => {
    const newSchedule = DAYS.map((_, index) => {
      const dayNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
      const dayHours = hours.find(h => h.dayOfWeek === dayNames[index]);
      const slots: TimeSlot[] = [];
      
      for (let hour = startHour; hour <= endHour; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        slots.push({
          time,
          status: dayHours?.isOpen ? 'empty' : 'closed'
        });
      }

      return {
        dayOfWeek: index,
        slots
      };
    });

    setSchedule(newSchedule);
  };

  const handleTimeRangeChange = (type: 'start' | 'end', value: number) => {
    if (type === 'start') {
      if (value >= endHour) return; // Başlangıç saati bitiş saatinden büyük olamaz
      setStartHour(value);
    } else {
      if (value <= startHour) return; // Bitiş saati başlangıç saatinden küçük olamaz
      setEndHour(value);
    }
    
    // Yeni saat aralığına göre schedule'ı güncelle
    const newSchedule = DAYS.map((_, dayIndex) => {
      const slots: TimeSlot[] = [];
      const start = type === 'start' ? value : startHour;
      const end = type === 'end' ? value : endHour;
      
      for (let hour = start; hour <= end; hour++) {
        slots.push({
          time: `${hour.toString().padStart(2, '0')}:00`,
          status: schedule[dayIndex]?.slots.find(s => s.time === `${hour.toString().padStart(2, '0')}:00`)?.status || 'empty'
        });
      }

      return {
        dayOfWeek: dayIndex,
        slots
      };
    });
    
    setSchedule(newSchedule);
  };

  const handleSlotClick = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...schedule];
    const currentStatus = newSchedule[dayIndex].slots[slotIndex].status;
    
    let nextStatus: 'empty' | 'full' | 'closed';
    if (currentStatus === 'empty') nextStatus = 'full';
    else if (currentStatus === 'full') nextStatus = 'closed';
    else nextStatus = 'empty';

    newSchedule[dayIndex].slots[slotIndex].status = nextStatus;
    setSchedule(newSchedule);
  };

  const updateMutation = useMutation({
    mutationFn: updateWorkingHours,
    onSuccess: () => {
      alert('Çalışma saatleri başarıyla güncellendi!');
    },
    onError: (error: Error) => {
      console.error('Çalışma saatleri güncellenirken hata:', error);
      alert('Çalışma saatleri güncellenirken bir hata oluştu: ' + error.message);
    }
  });

  const handleSave = () => {
    const dayNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] as const;
    const updatedHours = schedule.map((day, index) => ({
      dayOfWeek: dayNames[index],
      startTime: `${startHour.toString().padStart(2, '0')}:00`,
      endTime: `${endHour.toString().padStart(2, '0')}:00`,
      isOpen: day.slots.some(slot => slot.status !== 'closed')
    }));

    console.log('Sending working hours:', updatedHours);
    updateMutation.mutate(updatedHours);
  };

  if (isLoading) return <div>Yükleniyor...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Çalışma Saatleri</h2>
      
      {/* Saat Aralığı Ayarları */}
      <div className="mb-6 bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Çalışma Saatleri Aralığı</h3>
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm mb-1">Başlangıç Saati</label>
            <input
              type="number"
              min="0"
              max="23"
              value={startHour}
              onChange={(e) => handleTimeRangeChange('start', parseInt(e.target.value))}
              className="bg-gray-700 text-white p-2 rounded w-20"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Bitiş Saati</label>
            <input
              type="number"
              min="0"
              max="23"
              value={endHour}
              onChange={(e) => handleTimeRangeChange('end', parseInt(e.target.value))}
              className="bg-gray-700 text-white p-2 rounded w-20"
            />
          </div>
        </div>
      </div>

      {/* Çalışma Saatleri Tablosu */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded">
          <thead>
            <tr>
              <th className="p-2 w-24 text-left">Saat</th>
              {DAYS.map((day, index) => (
                <th key={index} className="p-2 text-center w-32">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule[0]?.slots.map((slot, slotIndex) => (
              <tr key={slotIndex} className="border-t border-gray-700">
                <td className="p-2 text-center w-24">
                  {slot.time}
                </td>
                {DAYS.map((_, dayIndex) => (
                  <td key={dayIndex} className="p-2 w-32">
                    <button
                      onClick={() => handleSlotClick(dayIndex, slotIndex)}
                      className={`w-full h-12 flex items-center justify-center rounded text-sm text-white ${
                        schedule[dayIndex]?.slots[slotIndex]?.status === 'full' ? 'bg-red-500' :
                        schedule[dayIndex]?.slots[slotIndex]?.status === 'empty' ? 'bg-green-500' :
                        'bg-gray-500'
                      }`}
                    >
                      {slot.time}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSave}
        disabled={updateMutation.isPending}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-500"
      >
        {updateMutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}
      </button>
    </div>
  );
}; 