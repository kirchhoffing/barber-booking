import bcrypt from 'bcrypt'
import prisma from '../lib/prisma'
import { Role } from '@prisma/client'

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        phone: '5551234567',
        role: 'ADMIN' as Role
      }
    })

    console.log('✅ Admin kullanıcısı oluşturuldu:', admin)
  } catch (err) {
    console.error('❌ Hata:', err)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin() 