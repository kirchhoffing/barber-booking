// /backend/src/routes/auth.ts

import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, password, name, phone } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre zorunludur.' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone
      }
    })

    console.log('✅ Kayıt başarılı:', { email })
    res.status(201).json({ message: 'Kayıt başarılı', user: { id: user.id, email: user.email } })
  } catch (err: any) {
    console.error('[register error]', err)
    if (err.code === 'P2002') {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanımda.' })
    }
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre zorunludur.' })
  }

  try {
    // Kullanıcıyı veritabanında ara
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre.' })
    }

    // Şifreyi kontrol et
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre.' })
    }

    // JWT token oluştur
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    // Kullanıcı bilgilerini ve token'ı döndür
    res.json({
      message: 'Giriş başarılı',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (err) {
    console.error('[login error]', err)
    res.status(500).json({ message: 'Sunucu hatası' })
  }
})

// Mevcut kullanıcı bilgilerini getir
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // @ts-ignore - req.user token middleware'den geliyor
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.json({ user });
  } catch (err) {
    console.error('[get current user error]', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

export default router
