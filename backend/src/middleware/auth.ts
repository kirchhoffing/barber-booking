import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'

// JWT payload tipi
interface JwtPayload {
  userId: number
  email: string
  role: string
}

// Request tipini genişlet
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
        email: string
        role: string
      }
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme token\'ı bulunamadı.' })
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    // Kullanıcıyı veritabanından kontrol et
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      return res.status(401).json({ message: 'Geçersiz token.' })
    }

    // Kullanıcı bilgilerini request nesnesine ekle
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    next()
  } catch (err) {
    console.error('[auth middleware error]', err)
    return res.status(401).json({ message: 'Geçersiz token.' })
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