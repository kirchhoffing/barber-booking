import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function resetSequences() {
  try {
    // Önce tüm kullanıcıları sil
    await prisma.user.deleteMany()
    
    // Sequence'leri 1'den başlat
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"User"', 'id'), 1, false)`
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Barber"', 'id'), 1, false)`
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Service"', 'id'), 1, false)`
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Appointment"', 'id'), 1, false)`
    
    console.log('✅ Tüm sequence\'ler sıfırlandı ve kullanıcılar silindi')
  } catch (err) {
    console.error('❌ Hata:', err)
  } finally {
    await prisma.$disconnect()
  }
}

resetSequences() 