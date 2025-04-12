# Barber Booking - Backend

## Proje Kurulumu ve Başlangıç
- Node.js projesi oluşturuldu
- TypeScript kurulumu yapıldı
- Express.js framework'ü eklendi
- Gerekli bağımlılıklar yüklendi (bcrypt, cors, dotenv, jsonwebtoken)

## Authentication Sistemi
### 1. Kullanıcı Kaydı (Register)
- `/auth/register` endpoint'i oluşturuldu
- Email ve şifre zorunlu alanlar olarak belirlendi
- Şifreler bcrypt ile hash'lenerek saklanıyor
- Email adresleri unique olarak ayarlandı

### 2. Kullanıcı Girişi (Login)
- `/auth/login` endpoint'i oluşturuldu
- JWT token implementasyonu yapıldı
- Token'da kullanıcı bilgileri (id, email, role) saklanıyor
- Token süresi 24 saat olarak ayarlandı

### 3. Authentication Middleware
- Token doğrulama middleware'i oluşturuldu
- Rol bazlı yetkilendirme middleware'i eklendi
- Kullanıcı bilgileri request nesnesine eklendi

## Veritabanı Yapılandırması
### 1. Prisma Kurulumu
- Prisma ORM kuruldu
- PostgreSQL veritabanı bağlantısı yapılandırıldı
- Schema dosyası oluşturuldu

### 2. Veritabanı Modelleri
- User modeli
  - id, email, password, name, phone, role, appointments
  - Role enum: USER, ADMIN, BARBER
- Barber modeli
  - id, name, email, phone, services, appointments
- Service modeli
  - id, name, description, duration, price, barber, appointments
- Appointment modeli
  - id, date, status, user, barber, service
  - Status enum: PENDING, CONFIRMED, CANCELLED, COMPLETED

## Berber Yönetimi
### 1. Berber CRUD İşlemleri
- GET `/barbers` - Tüm berberleri listele
- GET `/barbers/:id` - Berber detayı
- POST `/barbers` - Yeni berber ekle (admin)
- PUT `/barbers/:id` - Berber güncelle (admin)
- DELETE `/barbers/:id` - Berber sil (admin)

## Notlar
- Admin kullanıcısı oluşturma script'i yazıldı
- Sequence sıfırlama script'i oluşturuldu
- Tüm endpoint'ler için hata yönetimi eklendi
- Tüm işlemler için loglama yapıldı

## Yapılacaklar
- [ ] Hizmet (Service) yönetimi
- [ ] Randevu (Appointment) sistemi
- [ ] Kullanıcı profil yönetimi
- [ ] Berber profil yönetimi
- [ ] Randevu durumu güncelleme
- [ ] Email bildirim sistemi 