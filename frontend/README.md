# Barber Booking Frontend

Bu proje, berber randevu sistemi için geliştirilmiş bir React frontend uygulamasıdır.

## Teknolojiler

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Query

## Kurulum

1. Gerekli paketleri yükleyin:
```bash
npm install
```

2. `.env` dosyasını oluşturun ve API URL'sini ayarlayın:
```env
VITE_API_URL=http://localhost:3000
```

3. Uygulamayı başlatın:
```bash
npm run dev
```

## Özellikler

- Kullanıcı kaydı ve girişi
- Randevu oluşturma ve yönetme
- Randevu geçmişi görüntüleme
- Responsive tasarım
- Modern ve kullanıcı dostu arayüz

## Proje Yapısı

```
src/
├── components/     # Yeniden kullanılabilir UI bileşenleri
├── pages/         # Sayfa bileşenleri
├── hooks/         # Custom React hooks
├── services/      # API servisleri
├── types/         # TypeScript tipleri
├── utils/         # Yardımcı fonksiyonlar
└── App.tsx        # Ana uygulama bileşeni
```

## Geliştirme

- `npm run dev` - Geliştirme sunucusunu başlatır
- `npm run build` - Projeyi derler
- `npm run preview` - Derlenmiş projeyi önizler

## Stil

Tailwind CSS kullanılarak responsive ve modern bir tasarım oluşturulmuştur. Tema renkleri ve diğer stil değişkenleri `tailwind.config.js` dosyasında tanımlanmıştır.

## API Entegrasyonu

Backend API'si ile iletişim için Axios ve React Query kullanılmaktadır. API istekleri `services` klasöründe organize edilmiştir.

## Güvenlik

- JWT token yönetimi
- Protected routes
- Form validasyonu
- XSS koruması 