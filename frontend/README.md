# BarberBook Frontend

Bu proje React + TypeScript + Vite kullanılarak geliştirilmiştir.

## Özellikler

- Modern ve koyu tema tasarımı
- İl ve ilçe seçimi
  - Arama ile filtreleme
  - İl seçilmeden ilçe seçimi devre dışı
  - Dropdown menüler
- Berber arama fonksiyonu
- Responsive tasarım
- Giriş/Kayıt sistemi

## Teknolojiler

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Kurulum

1. Projeyi klonlayın
```bash
git clone [repo-url]
```

2. Proje dizinine gidin
```bash
cd frontend
```

3. Bağımlılıkları yükleyin
```bash
npm install
```

4. Geliştirme sunucusunu başlatın
```bash
npm run dev
```

## Proje Yapısı

```
frontend/
├── public/
├── src/
│   ├── data/
│   │   └── cities.ts     # İl ve ilçe verileri
│   │   └── components/     # Yeniden kullanılabilir UI bileşenleri
│   │   └── pages/         # Sayfa bileşenleri
│   │   └── hooks/         # Custom React hooks
│   │   └── context/       # React context'leri
│   │   └── services/      # API istekleri
│   │   └── types/         # TypeScript tipleri
│   │   └── utils/         # Yardımcı fonksiyonlar
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── README.md
```

## Stil ve Tasarım

- Koyu tema (#1E1E1E arka plan)
- Beyaz butonlar
- Modern input tasarımı
- Dropdown menüler
- Responsive grid yapısı

## Authentication
### 1. Login Sayfası
- Email ve şifre ile giriş formu
- Form validasyonu
- Hata mesajları gösterimi
- Başarılı girişte token saklama

### 2. Register Sayfası
- Kullanıcı kayıt formu
- Form validasyonu
- Hata mesajları gösterimi
- Başarılı kayıt sonrası yönlendirme

## State Yönetimi
- React Context API kullanımı
- Auth context oluşturuldu
- Kullanıcı bilgileri ve token yönetimi

## API İletişimi
- Axios instance oluşturuldu
- Interceptor'lar eklendi
- Token yönetimi
- Hata yönetimi

## Yapılacaklar
- [ ] Berber listesi sayfası
- [ ] Berber detay sayfası
- [ ] Randevu oluşturma sayfası
- [ ] Kullanıcı profil sayfası
- [ ] Admin paneli
- [ ] Berber paneli
- [ ] Randevu takvimi
- [ ] Bildirim sistemi 