import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { updateWorkingHours, getWorkingHours } from '../../services/barber';

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

interface TimeSlot {
  time: string;
  status: 'empty' | 'full' | 'closed';
}

interface DaySchedule {
  dayOfWeek: number;
  slots: TimeSlot[];
}

interface WorkingHour {
  barberId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isOpen: boolean;
  slots: Record<string, 'empty' | 'full' | 'closed'>;
  slotStatus?: Record<string, 'empty' | 'full' | 'closed'>;
}

export const WorkingHours: React.FC = () => {
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(21);
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [holidayDays, setHolidayDays] = useState<boolean[]>(new Array(7).fill(false));

  // 07:00'dan başlayan 24 saatlik zaman dilimlerini oluştur
  const ALL_HOURS = Array.from({ length: 24 }, (_, i) => {
    const hour = (i + 7) % 24;
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      status: 'closed' as 'empty' | 'full' | 'closed'
    };
  });

  const { data: workingHours, isLoading } = useQuery({
    queryKey: ['workingHours'],
    queryFn: getWorkingHours,
    retry: false
  });

  // Backend'den gelen verileri ayarla
  useEffect(() => {
    if (workingHours && workingHours.length > 0) {
      console.log('Backend\'den gelen veriler:', workingHours);
      
      // İlk günün başlangıç ve bitiş saatlerini al (tüm günler için aynı olmalı)
      const firstDay = workingHours[0];
      if (firstDay.startTime && firstDay.endTime) {
        const startHourFromBackend = parseInt(firstDay.startTime.split(':')[0]);
        const endHourFromBackend = parseInt(firstDay.endTime.split(':')[0]);
        setStartHour(startHourFromBackend);
        setEndHour(endHourFromBackend);
      }

      // Tatil günlerini ayarla
      const newHolidayDays = DAYS.map((_, index) => {
        const dayNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
        const dayHours = workingHours.find(h => h.dayOfWeek === dayNames[index]);
        console.log(`Gün ${dayNames[index]} için veriler:`, dayHours);
        
        return dayHours?.isOpen === false || 
          (dayHours?.slots ? Object.values(dayHours.slots).every(status => status === 'closed') : false);
      });
      console.log('Ayarlanan tatil günleri:', newHolidayDays);
      setHolidayDays(newHolidayDays);
    }
  }, [workingHours]);

  useEffect(() => {
    if (workingHours) {
      console.log('Backend\'den gelen veriler:', workingHours);
      const newSchedule = DAYS.map((_, index) => {
        const dayNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
        const dayHours = workingHours.find(h => h.dayOfWeek === dayNames[index]);
        console.log(`Gün ${dayNames[index]} için veriler:`, dayHours);
        
        const slots = ALL_HOURS.map(slot => {
          const hour = parseInt(slot.time.split(':')[0]);
          
          // Eğer gün tatil günüyse tüm slotları closed yap
          if (holidayDays[index]) {
            return {
              time: slot.time,
              status: 'closed'
            } as TimeSlot;
          }
          
          if (hour >= startHour && hour <= endHour) {
            const workingHourData = dayHours as WorkingHour & { slotStatus?: Record<string, 'empty' | 'full' | 'closed'> };
            const savedStatus = workingHourData?.slotStatus?.[slot.time] || workingHourData?.slots?.[slot.time];
            console.log(`Slot ${slot.time} için savedStatus:`, savedStatus);
            
            if (savedStatus) {
              const newSlot = {
                time: slot.time,
                status: savedStatus as 'empty' | 'full' | 'closed'
              };
              console.log(`Oluşturulan slot:`, newSlot);
              return newSlot;
            }
            return {
              time: slot.time,
              status: 'empty'
            } as TimeSlot;
          }
          
          return {
            time: slot.time,
            status: 'closed'
          } as TimeSlot;
        });

        return {
          dayOfWeek: index,
          slots
        } as DaySchedule;
      });

      console.log('Oluşturulan yeni schedule:', newSchedule);
      setSchedule(newSchedule);
    } else {
      const defaultSchedule = DAYS.map((_, index) => ({
        dayOfWeek: index,
        slots: ALL_HOURS.map(slot => {
          const hour = parseInt(slot.time.split(':')[0]);
          // Eğer gün tatil günüyse tüm slotları closed yap
          if (holidayDays[index]) {
            return {
              time: slot.time,
              status: 'closed'
            } as TimeSlot;
          }
          return {
            time: slot.time,
            status: hour >= startHour && hour <= endHour ? 'empty' : 'closed'
          } as TimeSlot;
        })
      }));
      
      setSchedule(defaultSchedule);
    }
  }, [workingHours, startHour, endHour, holidayDays]);

  const handleHolidayChange = (index: number) => {
    const newHolidayDays = [...holidayDays];
    newHolidayDays[index] = !newHolidayDays[index];
    setHolidayDays(newHolidayDays);
  };

  // Tatil günleri değiştiğinde otomatik kaydet
  useEffect(() => {
    if (schedule.length > 0) {
      const dayNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] as const;
      const updatedHours = schedule.map((day, index) => {
        const slotsObject = day.slots.reduce((acc, slot) => {
          if (holidayDays[index]) {
            acc[slot.time] = 'closed';
          } else {
            acc[slot.time] = slot.status;
          }
          return acc;
        }, {} as Record<string, string>);

        return {
          dayOfWeek: dayNames[index],
          startTime: `${startHour.toString().padStart(2, '0')}:00`,
          endTime: `${endHour.toString().padStart(2, '0')}:00`,
          isOpen: !holidayDays[index],
          slots: slotsObject
        };
      });

      console.log('Backend\'e gönderilen veriler:', updatedHours);
      updateMutation.mutate(updatedHours);
    }
  }, [holidayDays, schedule, startHour, endHour]);

  const handleSlotClick = (dayIndex: number, slotIndex: number) => {
    // Eğer gün tatil günüyse işlem yapma
    if (holidayDays[dayIndex]) return;

    const newSchedule = [...schedule];
    const currentStatus = newSchedule[dayIndex].slots[slotIndex].status;
    
    // Sadece seçilen aralıktaki slotları değiştirebilir
    const time = newSchedule[dayIndex].slots[slotIndex].time;
    const hour = parseInt(time.split(':')[0]);
    if (hour < startHour || hour > endHour) return;
    
    let nextStatus: 'empty' | 'full' | 'closed';
    if (currentStatus === 'empty') nextStatus = 'full';
    else if (currentStatus === 'full') nextStatus = 'closed';
    else nextStatus = 'empty';

    newSchedule[dayIndex].slots[slotIndex].status = nextStatus;
    setSchedule(newSchedule);

    // Otomatik kaydetme
    const dayNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] as const;
    const updatedHours = newSchedule.map((day, index) => {
      const slotsObject = day.slots.reduce((acc, slot) => {
        if (holidayDays[index]) {
          acc[slot.time] = 'closed';
        } else {
          acc[slot.time] = slot.status;
        }
        return acc;
      }, {} as Record<string, string>);

      return {
        dayOfWeek: dayNames[index],
        startTime: `${startHour.toString().padStart(2, '0')}:00`,
        endTime: `${endHour.toString().padStart(2, '0')}:00`,
        isOpen: !holidayDays[index],
        slots: slotsObject
      };
    });

    updateMutation.mutate(updatedHours);
  };

  const updateMutation = useMutation({
    mutationFn: updateWorkingHours,
    onSuccess: () => {
      // Başarılı kaydetme durumunda alert göstermiyoruz
    },
    onError: (error: Error) => {
      console.error('Çalışma saatleri güncellenirken hata:', error);
      alert('Çalışma saatleri güncellenirken bir hata oluştu: ' + error.message);
    }
  });

  const handleReset = () => {
    const defaultSchedule = DAYS.map((_, index) => ({
      dayOfWeek: index,
      slots: ALL_HOURS.map(slot => {
        const hour = parseInt(slot.time.split(':')[0]);
        return {
          time: slot.time,
          status: hour >= startHour && hour <= endHour ? 'empty' : 'closed'
        } as TimeSlot;
      })
    }));
    
    setSchedule(defaultSchedule);
  };


  if (isLoading) return <div>Yükleniyor...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Çalışma Saatleri</h2>
      
      <div className="mb-6 bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Tatil Günleri</h3>
        <div className="flex flex-wrap gap-4">
          {DAYS.map((day, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={holidayDays[index]}
                onChange={() => handleHolidayChange(index)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>

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
              onChange={(e) => setStartHour(parseInt(e.target.value))}
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
              onChange={(e) => setEndHour(parseInt(e.target.value))}
              className="bg-gray-700 text-white p-2 rounded w-20"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sıfırla
        </button> 
      </div>

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
            {schedule[0]?.slots
              .filter(slot => {
                const hour = parseInt(slot.time.split(':')[0]);
                return hour >= startHour && hour <= endHour;
              })
              .map((slot) => {
                // Orijinal slot index'ini bul
                const originalIndex = schedule[0].slots.findIndex(s => s.time === slot.time);
                return (
                  <tr key={originalIndex} className="border-t border-gray-700">
                    <td className="p-2 text-center w-24">
                      {slot.time}
                    </td>
                    {DAYS.map((_, dayIndex) => (
                      <td key={dayIndex} className="p-2 w-32">
                        <button
                          onClick={() => handleSlotClick(dayIndex, originalIndex)}
                          disabled={holidayDays[dayIndex]}
                          className={`w-16 h-6 flex items-center justify-center rounded text-xs text-white ${
                            holidayDays[dayIndex] ? 'bg-gray-700 cursor-not-allowed' :
                            schedule[dayIndex]?.slots[originalIndex]?.status === 'full' ? 'bg-red-500' :
                            schedule[dayIndex]?.slots[originalIndex]?.status === 'empty' ? 'bg-green-500' :
                            'bg-gray-500'
                          }`}
                        >
                          {slot.time}
                        </button>
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 