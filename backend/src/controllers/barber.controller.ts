import { Request, Response } from 'express';
import { PrismaClient, TimeSlotStatus, Day } from '@prisma/client';

const prisma = new PrismaClient();

// Çalışma Saatleri
export const getWorkingHours = async (req: Request, res: Response) => {
  try {
    const barberId = req.params.barberId;
    if (!barberId) {
      return res.status(400).json({ message: 'Berber ID bulunamadı' });
    }

    // Kullanıcının yetkisi var mı kontrol et
    if (req.user?.barberId !== barberId) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const workingHours = await prisma.workingHours.findMany({
      where: { barberId }
    });

    // Her gün için çalışma saatlerini ve slot durumlarını düzenle
    const formattedHours = workingHours.map(hour => ({
      dayOfWeek: hour.dayOfWeek,
      startTime: hour.startTime,
      endTime: hour.endTime,
      isOpen: hour.isOpen,
      slots: hour.slotStatus || {}
    }));

    res.json(formattedHours);
  } catch (error) {
    console.error('Çalışma saatleri alınırken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

export const updateWorkingHours = async (req: Request, res: Response) => {
  try {
    const barberId = req.params.barberId;
    if (!barberId) {
      return res.status(400).json({ message: 'Berber ID bulunamadı' });
    }

    // Kullanıcının yetkisi var mı kontrol et
    if (req.user?.barberId !== barberId) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const workingHours = req.body;
    console.log('Received working hours:', JSON.stringify(workingHours, null, 2));

    // Mevcut çalışma saatlerini sil
    await prisma.workingHours.deleteMany({
      where: { barberId }
    });

    // Yeni çalışma saatlerini ekle
    const createdHours = await prisma.workingHours.createMany({
      data: workingHours.map((hour: any) => {
        console.log('Processing hour:', JSON.stringify(hour, null, 2));
        return {
          dayOfWeek: hour.dayOfWeek as Day,
          startTime: hour.startTime,
          endTime: hour.endTime,
          isOpen: hour.isOpen,
          slotStatus: hour.slots || {},
          barberId
        };
      })
    });

    // Güncellenmiş saatleri getir
    const updatedHours = await prisma.workingHours.findMany({
      where: { barberId }
    });

    console.log('Updated hours from database:', JSON.stringify(updatedHours, null, 2));

    const formattedHours = updatedHours.map(hour => ({
      dayOfWeek: hour.dayOfWeek,
      startTime: hour.startTime,
      endTime: hour.endTime,
      isOpen: hour.isOpen,
      slots: hour.slotStatus || {}
    }));

    console.log('Formatted hours to send:', JSON.stringify(formattedHours, null, 2));

    res.json(formattedHours);
  } catch (error) {
    console.error('Çalışma saatleri güncellenirken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

// Hizmetler
export const getServices = async (req: Request, res: Response) => {
  try {
    const barberId = req.params.barberId;
    if (!barberId) {
      return res.status(400).json({ message: 'Berber ID bulunamadı' });
    }

    // Kullanıcının yetkisi var mı kontrol et
    if (req.user?.barberId !== barberId) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const services = await prisma.service.findMany({
      where: { barberId }
    });

    res.json(services);
  } catch (error) {
    console.error('Hizmetler alınırken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const barberId = req.params.barberId;
    if (!barberId) {
      return res.status(400).json({ message: 'Berber ID bulunamadı' });
    }

    // Kullanıcının yetkisi var mı kontrol et
    if (req.user?.barberId !== barberId) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const service = await prisma.service.create({
      data: {
        ...req.body,
        barberId
      }
    });

    res.json(service);
  } catch (error) {
    console.error('Hizmet oluşturulurken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const barberId = req.params.barberId;
    if (!barberId) {
      return res.status(400).json({ message: 'Berber ID bulunamadı' });
    }

    // Kullanıcının yetkisi var mı kontrol et
    if (req.user?.barberId !== barberId) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const service = await prisma.service.update({
      where: { 
        id,
        barberId
      },
      data: req.body
    });

    res.json(service);
  } catch (error) {
    console.error('Hizmet güncellenirken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const barberId = req.params.barberId;
    if (!barberId) {
      return res.status(400).json({ message: 'Berber ID bulunamadı' });
    }

    // Kullanıcının yetkisi var mı kontrol et
    if (req.user?.barberId !== barberId) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    await prisma.service.delete({
      where: { 
        id,
        barberId
      }
    });

    res.json({ message: 'Hizmet başarıyla silindi' });
  } catch (error) {
    console.error('Hizmet silinirken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

// Randevular
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const barberId = req.params.barberId;
    if (!barberId) {
      return res.status(400).json({ message: 'Berber ID bulunamadı' });
    }

    // Kullanıcının yetkisi var mı kontrol et
    if (req.user?.barberId !== barberId) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const appointments = await prisma.appointment.findMany({
      where: { barberId },
      include: {
        user: {
          select: {
            name: true,
            phone: true
          }
        },
        service: true
      }
    });

    res.json(appointments);
  } catch (error) {
    console.error('Randevular alınırken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const barberId = req.params.barberId;
    if (!barberId) {
      return res.status(400).json({ message: 'Berber ID bulunamadı' });
    }

    // Kullanıcının yetkisi var mı kontrol et
    if (req.user?.barberId !== barberId) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const appointment = await prisma.appointment.update({
      where: { 
        id,
        barberId
      },
      data: { status }
    });

    res.json(appointment);
  } catch (error) {
    console.error('Randevu durumu güncellenirken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
}; 