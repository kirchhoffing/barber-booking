import axios from './axios';

export interface TimeSlot {
  time: string;
  status: 'full' | 'empty' | 'closed';
}

export interface WorkingHour {
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  startTime: string;
  endTime: string;
  isOpen: boolean;
  slots: Record<string, string>;
}

// Berber ID'sini al
const getBarberId = (): number | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  
  try {
    const userData = JSON.parse(user);
    return userData.barberId;
  } catch {
    return null;
  }
};

// Çalışma Saatleri
export const getWorkingHours = async (): Promise<WorkingHour[]> => {
  const barberId = getBarberId();
  if (!barberId) throw new Error('Berber ID bulunamadı');
  
  const response = await axios.get<WorkingHour[]>(`/api/barber/${barberId}/working-hours`);
  return response.data;
};

export const updateWorkingHours = async (workingHours: WorkingHour[]): Promise<WorkingHour[]> => {
  const barberId = getBarberId();
  if (!barberId) throw new Error('Berber ID bulunamadı');
  
  const response = await axios.put<WorkingHour[]>(`/api/barber/${barberId}/working-hours`, workingHours);
  return response.data;
};

// Hizmetler
export const getServices = async () => {
  const barberId = getBarberId();
  if (!barberId) throw new Error('Berber ID bulunamadı');
  
  const response = await axios.get(`/api/barber/${barberId}/services`);
  return response.data;
};

export const createService = async (service: any) => {
  const barberId = getBarberId();
  if (!barberId) throw new Error('Berber ID bulunamadı');
  
  const response = await axios.post(`/api/barber/${barberId}/services`, service);
  return response.data;
};

export const updateService = async (service: any) => {
  const barberId = getBarberId();
  if (!barberId) throw new Error('Berber ID bulunamadı');
  
  const response = await axios.put(`/api/barber/${barberId}/services/${service.id}`, service);
  return response.data;
};

export const deleteService = async (id: string) => {
  const barberId = getBarberId();
  if (!barberId) throw new Error('Berber ID bulunamadı');
  
  const response = await axios.delete(`/api/barber/${barberId}/services/${id}`);
  return response.data;
};

// Randevular
export const getAppointments = async () => {
  const barberId = getBarberId();
  if (!barberId) throw new Error('Berber ID bulunamadı');
  
  const response = await axios.get(`/api/barber/${barberId}/appointments`);
  return response.data;
};

export const updateAppointmentStatus = async ({ id, status }: { id: string; status: string }) => {
  const barberId = getBarberId();
  if (!barberId) throw new Error('Berber ID bulunamadı');
  
  const response = await axios.put(`/api/barber/${barberId}/appointments/${id}/status`, { status });
  return response.data;
}; 