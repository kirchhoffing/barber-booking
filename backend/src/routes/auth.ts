// /backend/src/routes/auth.ts

import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'
import { authenticateToken } from '../middleware/auth'
import { Router } from 'express'
import { login, register } from '../controllers/auth'

const router = Router()

router.post('/register', register)
router.post('/login', login)

// Mevcut kullanıcı bilgilerini getir
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Yetkilendirme gerekli' });
    }

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
