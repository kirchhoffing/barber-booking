import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

// JWT payload tipi
interface JwtPayload {
  userId: string
  email: string
  role: Role
  barberId?: string
  iat: number
  exp: number
}

// Request tipini genişlet
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        role: Role
        barberId?: string
      }
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      barberId: decoded.barberId
    };
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied. Admin only.' })
  }
  next()
}

// Rol bazlı yetkilendirme middleware'i
export const authorizeRole = (roles: Role[]) => {
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