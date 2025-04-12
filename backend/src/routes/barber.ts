import express from 'express'
import { authenticateToken, authorizeRole } from '../middleware/auth'
import prisma from '../lib/prisma'
import bcrypt from 'bcrypt'

const router = express.Router()

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
      where: { id: Number(id) },
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
    const { name, email, phone } = req.body

    if (!name || !email) {
      return res.status(400).json({ message: 'İsim ve email zorunludur' })
    }

    const barber = await prisma.barber.create({
      data: {
        name,
        email,
        phone
      }
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
      where: { id: Number(id) },
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
      where: { id: Number(id) }
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
router.post('/:id/working-hours', authenticateToken, authorizeRole(['BARBER', 'ADMIN']), async (req, res) => {
  try {
    const { id } = req.params
    const { dayOfWeek, startTime, endTime } = req.body

    if (!dayOfWeek || !startTime || !endTime) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur' })
    }

    const workingHours = await prisma.workingHours.create({
      data: {
        dayOfWeek,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        barberId: Number(id)
      }
    })

    res.status(201).json(workingHours)
  } catch (err) {
    console.error('[set working hours error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Berber çalışma saatlerini getir
router.get('/:id/working-hours', async (req, res) => {
  try {
    const { id } = req.params
    const workingHours = await prisma.workingHours.findMany({
      where: { barberId: Number(id) }
    })
    res.json(workingHours)
  } catch (err) {
    console.error('[get working hours error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Berber randevularını getir
router.get('/:id/appointments', authenticateToken, authorizeRole(['BARBER', 'ADMIN']), async (req, res) => {
  try {
    const { id } = req.params
    const appointments = await prisma.appointment.findMany({
      where: { barberId: Number(id) },
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
      where: { id: Number(appointmentId) },
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

    if (!status || !['EMPTY', 'FULL', 'CLOSED'].includes(status)) {
      return res.status(400).json({ message: 'Geçersiz durum' })
    }

    const timeSlot = await prisma.timeSlot.update({
      where: { id: Number(timeSlotId) },
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
        phone
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
      where: { id: Number(userId) }
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
        workingHours: {
          barberId: Number(id)
        }
      },
      orderBy: {
        date: 'asc'
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
      where: { id: Number(slotId) },
      data: { status }
    });

    res.json(timeSlot);
  } catch (err) {
    console.error('[update time slot error]', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

export default router 