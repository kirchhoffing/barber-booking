import express from 'express'
import { authenticateToken, authorizeRole } from '../middleware/auth'
import prisma from '../lib/prisma'
import bcrypt from 'bcrypt'
import { Prisma, Role } from '@prisma/client'

const router = express.Router()

interface CreateBarberRequest {
  name: string
  email: string
  phone?: string
}

// Tüm berberleri listele
router.get('/', async (req, res) => {
  try {
    const barbers = await prisma.barber.findMany({
      include: {
        services: true
      }
    })
    res.json(barbers)
  } catch (err) {
    console.error('[get barbers error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Berber detayı
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const barber = await prisma.barber.findUnique({
      where: { id },
      include: {
        services: true
      }
    })

    if (!barber) {
      return res.status(404).json({ message: 'Berber bulunamadı' })
    }

    res.json(barber)
  } catch (err) {
    console.error('[get barber error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Yeni berber ekle (sadece admin)
router.post('/', authenticateToken, authorizeRole(['ADMIN']), async (req, res) => {
  try {
    const { name, email, phone } = req.body as CreateBarberRequest

    if (!name || !email) {
      return res.status(400).json({ message: 'İsim ve email zorunludur' })
    }

    const barber = await prisma.$transaction(async (tx) => {
      // Önce user oluştur
      const hashedPassword = await bcrypt.hash('temporary', 10)
      
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'BARBER' as Role,
          phone,
        }
      })

      // Sonra berber oluştur
      return await tx.barber.create({
        data: {
          name,
          email,
          phone,
          userId: user.id
        }
      })
    })

    res.status(201).json(barber)
  } catch (err: any) {
    console.error('[create barber error]', err)
    if (err.code === 'P2002') {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanımda' })
    }
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Berber güncelle (sadece admin)
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone } = req.body

    const barber = await prisma.barber.update({
      where: { id },
      data: {
        name,
        email,
        phone
      }
    })

    res.json(barber)
  } catch (err: any) {
    console.error('[update barber error]', err)
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Berber bulunamadı' })
    }
    if (err.code === 'P2002') {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanımda' })
    }
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Berber sil (sadece admin)
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params

    await prisma.barber.delete({
      where: { id }
    })

    res.json({ message: 'Berber başarıyla silindi' })
  } catch (err: any) {
    console.error('[delete barber error]', err)
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Berber bulunamadı' })
    }
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Berber çalışma saatlerini ayarla
router.put('/:id/working-hours', authenticateToken, authorizeRole(['BARBER', 'ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    const workingHours = req.body;

    if (!Array.isArray(workingHours)) {
      return res.status(400).json({ message: 'Geçersiz veri formatı' });
    }

    // Veri doğrulama
    const validDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const invalidHours = workingHours.some(hour => 
      !validDays.includes(hour.dayOfWeek) ||
      !hour.startTime ||
      !hour.endTime ||
      typeof hour.isOpen !== 'boolean'
    );

    if (invalidHours) {
      return res.status(400).json({ message: 'Geçersiz çalışma saati verisi' });
    }

    // Önce mevcut çalışma saatlerini sil
    await prisma.workingHours.deleteMany({
      where: { barberId: id }
    });

    // Yeni çalışma saatlerini ekle
    const createdHours = await prisma.workingHours.createMany({
      data: workingHours.map(hour => ({
        dayOfWeek: hour.dayOfWeek,
        startTime: hour.startTime,
        endTime: hour.endTime,
        isOpen: hour.isOpen,
        slotStatus: hour.slots || {},
        barberId: id
      }))
    });

    // Oluşturulan saatleri getir ve frontend'e gönder
    const updatedHours = await prisma.workingHours.findMany({
      where: { barberId: id }
    });

    res.json(updatedHours);
  } catch (err) {
    console.error('[set working hours error]', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Berber çalışma saatlerini getir
router.get('/:id/working-hours', async (req, res) => {
  try {
    const { id } = req.params;
    const workingHours = await prisma.workingHours.findMany({
      where: { barberId: id }
    });
    
    res.json(workingHours);
  } catch (err) {
    console.error('[get working hours error]', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Berber randevularını getir
router.get('/:id/appointments', authenticateToken, authorizeRole(['BARBER', 'ADMIN']), async (req, res) => {
  try {
    const { id } = req.params
    const appointments = await prisma.appointment.findMany({
      where: { barberId: id },
      include: {
        user: {
          select: {
            name: true,
            phone: true
          }
        },
        service: true
      }
    })
    res.json(appointments)
  } catch (err) {
    console.error('[get appointments error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Randevu iptal et
router.put('/:id/appointments/:appointmentId/cancel', authenticateToken, authorizeRole(['BARBER', 'ADMIN']), async (req, res) => {
  try {
    const { appointmentId } = req.params
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'CANCELLED' }
    })
    res.json(appointment)
  } catch (err) {
    console.error('[cancel appointment error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Zaman dilimlerini güncelle
router.put('/:id/time-slots/:timeSlotId', authenticateToken, authorizeRole(['BARBER', 'ADMIN']), async (req, res) => {
  try {
    const { timeSlotId } = req.params
    const { status } = req.body

    const timeSlot = await prisma.timeSlot.update({
      where: { id: timeSlotId },
      data: { status }
    })

    res.json(timeSlot)
  } catch (err) {
    console.error('[update time slot error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Berber hesabı oluştur
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'İsim, email ve şifre zorunludur' })
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10)

    // Önce kullanıcı oluştur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role: 'BARBER'
      }
    })

    // Sonra berber oluştur
    const barber = await prisma.barber.create({
      data: {
        name,
        email,
        phone,
        userId: user.id
      }
    })

    res.status(201).json({ user, barber })
  } catch (err: any) {
    console.error('[create barber account error]', err)
    if (err.code === 'P2002') {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanımda' })
    }
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Kullanıcı ID'sine göre berber bilgilerini getir
router.get('/by-user/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Önce kullanıcıyı kontrol et
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || user.role !== 'BARBER') {
      return res.status(404).json({ message: 'Berber bulunamadı' });
    }

    // Berber bilgilerini getir
    const barber = await prisma.barber.findFirst({
      where: { email: user.email }
    });

    if (!barber) {
      return res.status(404).json({ message: 'Berber bilgileri bulunamadı' });
    }

    res.json(barber);
  } catch (err) {
    console.error('[get barber by user error]', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Berberin zaman dilimlerini getir
router.get('/:id/time-slots', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        workingHour: {
          barberId: id
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    res.json(timeSlots);
  } catch (err) {
    console.error('[get time slots error]', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Zaman dilimi durumunu güncelle
router.put('/:id/time-slots/:slotId', authenticateToken, authorizeRole(['BARBER']), async (req, res) => {
  try {
    const { slotId } = req.params;
    const { status } = req.body;

    const timeSlot = await prisma.timeSlot.update({
      where: { id: slotId },
      data: { status }
    });

    res.json(timeSlot);
  } catch (err) {
    console.error('[update time slot error]', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Berber hizmetlerini getir
router.get('/:id/services', async (req, res) => {
  try {
    const { id } = req.params
    const services = await prisma.service.findMany({
      where: { barberId: id }
    })
    res.json(services)
  } catch (err) {
    console.error('[get services error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Yeni hizmet ekle
router.post('/:id/services', authenticateToken, authorizeRole(['BARBER', 'ADMIN']), async (req, res) => {
  try {
    const { id } = req.params
    const { name, duration, price, description } = req.body

    const service = await prisma.service.create({
      data: {
        name,
        duration,
        price,
        description,
        barberId: id
      }
    })

    res.status(201).json(service)
  } catch (err) {
    console.error('[create service error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Hizmet güncelle
router.put('/:id/services/:serviceId', authenticateToken, authorizeRole(['BARBER', 'ADMIN']), async (req, res) => {
  try {
    const { serviceId } = req.params
    const { name, duration, price, description } = req.body

    const service = await prisma.service.update({
      where: { id: serviceId },
      data: {
        name,
        duration,
        price,
        description
      }
    })

    res.json(service)
  } catch (err) {
    console.error('[update service error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Hizmet sil
router.delete('/:id/services/:serviceId', authenticateToken, authorizeRole(['BARBER', 'ADMIN']), async (req, res) => {
  try {
    const { serviceId } = req.params

    await prisma.service.delete({
      where: { id: serviceId }
    })

    res.json({ message: 'Hizmet başarıyla silindi' })
  } catch (err) {
    console.error('[delete service error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

export default router 