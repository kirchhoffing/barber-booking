import { Request, Response } from 'express';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;

    // İsteği yapan kullanıcının admin olup olmadığını kontrol et
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    // Kullanıcının rolünü güncelle
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: role as Role }
    });

    // Eğer kullanıcı BARBER rolüne yükseltiliyorsa, Barber kaydı oluştur
    if (role === 'BARBER') {
      await prisma.barber.create({
        data: {
          userId: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email
        }
      });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Rol güncellenirken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // İsteği yapan kullanıcının admin olup olmadığını kontrol et
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        createdAt: true
      }
    });

    res.json(users);
  } catch (error) {
    console.error('Kullanıcılar listelenirken hata:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
}; 