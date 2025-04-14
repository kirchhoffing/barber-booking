import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre zorunludur.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        barber: true
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
    }

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role,
        barberId: user.barber?.id
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        barberId: user.barber?.id
      }
    });
  } catch (err) {
    console.error('[login error]', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email ve şifre zorunludur.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER' // Varsayılan rol
      }
    });

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err: any) {
    console.error('[register error]', err);
    if (err.code === 'P2002') {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanımda.' });
    }
    res.status(500).json({ message: 'Sunucu hatası' });
  }
}; 