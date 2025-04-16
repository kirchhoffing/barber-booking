import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { isAdmin } from '../middleware/auth';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Admin'in kendi rolünü değiştirmesini engelle
    const currentUser = (req as any).user; // auth middleware'den gelen kullanıcı bilgisi
    if (currentUser.id === id) {
      return res.status(403).json({ 
        message: 'Administrators cannot change their own role for security reasons.' 
      });
    }

    // Sistemdeki son admin'i engellemeyi kontrol et
    if (role !== 'ADMIN') {
      const adminCount = await prisma.user.count({
        where: { role: 'ADMIN' }
      });
      
      const targetUser = await prisma.user.findUnique({
        where: { id },
        select: { role: true }
      });

      if (adminCount === 1 && targetUser?.role === 'ADMIN') {
        return res.status(403).json({ 
          message: 'Cannot remove the last administrator from the system.' 
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Admin'in kendisini silmesini engelle
    const currentUser = (req as any).user;
    if (currentUser.id === id) {
      return res.status(403).json({ 
        message: 'Administrators cannot delete their own account.' 
      });
    }

    // Son admin'i silmeyi engelle
    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: { role: true }
    });

    if (targetUser?.role === 'ADMIN') {
      const adminCount = await prisma.user.count({
        where: { role: 'ADMIN' }
      });

      if (adminCount === 1) {
        return res.status(403).json({ 
          message: 'Cannot delete the last administrator from the system.' 
        });
      }
    }

    await prisma.user.delete({
      where: { id },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
}; 