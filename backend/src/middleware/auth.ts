import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// JWT payload tipi
interface JwtPayload {
  userId: number
  email: string
  role: string
  barberId: number
  iat: number
  exp: number
}

// Request tipini genişlet
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
        email: string
        role: string
        barberId?: number
      }
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization']
    console.log('Auth Header:', authHeader)
    
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN
    console.log('Token:', token)

    if (!token) {
      return res.status(401).json({ message: 'Token bulunamadı' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    console.log('Decoded Token:', decoded)
    
    // Kullanıcı bilgilerini al
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }, // userId kullan
      include: {
        barber: true
      }
    })
    console.log('Found User:', user)

    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı' })
    }

    // req.user'a barberId ekle
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      barberId: user.barber?.id
    }
    console.log('Set User:', req.user)

    next()
  } catch (error) {
    console.error('[auth middleware error]', error)
    if (error instanceof jwt.JsonWebTokenError) {
      console.error('JWT Error:', error.message)
      return res.status(401).json({ message: 'Geçersiz token: ' + error.message })
    }
    return res.status(401).json({ message: 'Geçersiz token' })
  }
}

// Rol bazlı yetkilendirme middleware'i
export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Yetkilendirme gerekli.' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok.' })
    }

    next()
  }
} 