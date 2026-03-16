# ✨ DailyFlow — Günlük Yaşam Yönetici Uygulaması

Günlük hayatını organize etmek için geliştirilen bu uygulama;  
alışveriş listesi, not defteri ve hatırlatıcı özelliklerini tek bir arayüzde birleştirir.

🌐 **Canlı Demo:** [dailyflow-project.netlify.app](https://dailyflow-project.netlify.app)

---

## 🚀 Özellikler

### 🛒 Alışveriş Listesi
- Ürün ekleme
- Tamamlandı olarak işaretleme
- Ürün düzenleme ve silme

### 📝 Notlar
- Başlık ve içerikli not oluşturma
- Not düzenleme ve silme
- Oluşturma tarihi görüntüleme

### ⏰ Hatırlatıcılar
- Tarih ve saat seçerek hatırlatıcı oluşturma
- Tarihe göre otomatik sıralama
- Tamamlandı işaretleme, düzenleme ve silme

### 💾 Veri Kalıcılığı
- Tüm veriler `localStorage` ile saklanır, sayfa yenilenince kaybolmaz

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|---|---|
| [React](https://react.dev) | UI geliştirme |
| [Vite](https://vitejs.dev) | Proje kurulumu ve build |
| [Tailwind CSS](https://tailwindcss.com) | Stillendirme |
| [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Veri saklama |

---

## 📁 Proje Yapısı
```
src/
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── ShoppingPage.jsx
│   ├── NotesPage.jsx
│   └── ReminderPage.jsx
├── interfaces/
├── App.jsx
└── main.jsx
```

---

## ⚙️ Kurulum ve Çalıştırma
```bash
# Repoyu klonla
git clone https://github.com/anacbetul/dailyflow.git

# Proje klasörüne gir
cd dailyflow

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

---

## 📦 Build Alma
```bash
npm run build
```

---