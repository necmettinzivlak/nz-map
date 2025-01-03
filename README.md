Tamam, ana dizinde `README.md` dosyasını oluşturup içeriğini yazalım:

```markdown
# NZ MAP

Yerlem Map, koordinatlar arasında rota oluşturmanızı ve yönetmenizi sağlayan bir haritalama uygulamasıdır.

## Özellikler

- Harita üzerinde koordinat ekleme/silme
- Sürükle-bırak ile koordinat sıralama
- Gerçek zamanlı rota hesaplama
- Toplam mesafe ve süre bilgisi
- Koordinatları kopyalama ve paylaşma
- Responsive tasarım
- Başlangıç ve bitiş noktaları için özel işaretleyiciler
- Ara noktalar için numaralandırılmış işaretleyiciler
- Sağ tık menüsü ile hızlı koordinat ekleme
- URL üzerinden rota paylaşımı

## Kurulum

### Ön Gereksinimler

- Node.js (v14 veya üzeri)
- npm (v6 veya üzeri)

### Adım 1: Projeyi İndirin
```bash
git clone [proje-url]
cd yerlem-map
```

### Adım 2: Client Kurulumu
```bash
# Ana dizinde bağımlılıkları yükleyin
npm install

# Development modunda başlatın
npm run dev -- --host
```

### Adım 3: Server Kurulumu
```bash
# Server dizinine gidin
cd server

# Server bağımlılıklarını yükleyin
npm install

# Development modunda başlatın
npm run dev
```

### Erişim Bilgileri

Client:
- Local: http://localhost:5173
- Network: http://[yerel-ip]:5173

Server:
- API: http://localhost:5001

## Kullanım

<img width="1510" alt="Screenshot 2025-01-04 at 00 11 30" src="https://github.com/user-attachments/assets/2d914108-e62e-4e80-a302-d25ef8246569" />



### 1. Koordinat Ekleme
- **Sağ Tık ile**: Haritada istediğiniz noktaya sağ tıklayıp "Güzergaha Ekle" seçeneğini kullanın
- **Manuel Giriş**: Soldaki panelde koordinat giriş formunu kullanın
- **Sürükleme**: Mevcut işaretleyicileri sürükleyerek konumlarını değiştirin

### 2. Koordinat Yönetimi
- **Sıralama**: Koordinatları sürükle-bırak ile yeniden sıralayın
- **Silme**: Her koordinatın yanındaki çöp kutusu ikonuna tıklayın
- **Kopyalama**: Koordinatları tek tek veya toplu olarak kopyalayın

### 3. Rota Bilgileri
- Toplam mesafe (km)
- Tahmini süre (dakika)
- Otomatik rota çizimi

### 4. Paylaşım
- URL üzerinden rotayı paylaşabilirsiniz
- Koordinatları toplu olarak kopyalayabilirsiniz

## Teknik Detaylar

- Frontend: React + Vite
- UI Framework: Material-UI
- Harita: Leaflet
- Backend: Node.js + Express
- Rota API: OSRM

## Geliştirme

```bash
# Client geliştirme modu
npm run dev -- --host

# Server geliştirme modu
cd server
npm run dev
```



## İletişim

Necmettin Zıvlak - [zivlaknecmettin@gmail.com]
```

Bu README dosyası:
1. Projenin kapsamlı bir tanımını yapıyor
2. Tüm özellikleri listeliyor
3. Adım adım kurulum talimatları içeriyor
4. Detaylı kullanım kılavuzu sunuyor
5. Teknik detayları ve geliştirme bilgilerini içeriyor
6. İletişim bilgilerini içeriyor
