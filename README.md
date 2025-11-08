# 🧠 AI Log Activity

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-5.x-blue?logo=express)
![Electron](https://img.shields.io/badge/Electron-39.x-gray?logo=electron)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-CDN-blueviolet?logo=tailwind-css)
![License](https://img.shields.io/badge/License-No_License-lightgrey)

AI Log Activity adalah aplikasi desktop berbasis **Electron** yang membantu kamu membuat **log harian magang** secara otomatis menggunakan **AI**.  
Kamu cukup menuliskan aktivitas yang kamu lakukan hari itu, dan sistem akan **menghasilkan uraian aktivitas**, **pembelajaran yang diperoleh**, serta **kendala yang mungkin dialami** secara otomatis!

---

## 🚀 Tujuan Proyek

Project ini dibuat karena seringkali proses menulis log harian terasa **merepotkan dan repetitif**. AI Log Activity hadir untuk **mempermudah dan mempercepat** proses tersebut dengan bantuan **AI (Large Language Model)** dari Google Gemini. \
Kamu hanya perlu menulis **aktivitas harian**, dan aplikasi akan mengubahnya menjadi **laporan log lengkap**.

---

## 🧩 Teknologi yang Digunakan

- ⚙️ **Node.js** — sebagai JavaScript runtime environment  
- 🌐 **Express.js** — backend untuk menangani request API  
- 🤖 **Google Gemini (genai)** — LLM yang digunakan untuk menghasilkan teks AI  
- 💻 **Electron** — agar aplikasi dapat dijalankan sebagai **desktop app**  
- 🎨 **Tailwind CSS (CDN)** — styling sederhana dan cepat tanpa konfigurasi  
- 📦 **Tanpa Database** — data tidak disimpan permanen, fokus pada hasil instan

---

## 📁 Struktur Folder Utama
```bash
├── api/
│ └── process.js # File utama untuk pemrosesan AI request
├── .gitignore
├── index.html # Tampilan utama aplikasi
├── main.js # Entry point Electron
├── package-lock.json
├── package.json
└── preload.js
```
---

## ⚡ Cara Menjalankan Project

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/username/ai-log-activity.git
   cd ai-log-activity
   ```

2. **Buat file .env di root project, lalu isi dengan:**
   ```bash
   GEMINI_API_KEY=gemini_api_key_anda
   ```
   
3. **Install dependencies**
   ```bash
   npm install
   ```
   
4. **Build aplikasi**
   ```bash
   npm run build
   ```
   Setelah proses build selesai, folder baru (biasanya AI Log Activity-win32-x64/) akan muncul di direktori project.
   
5. **Jalankan aplikasi**

    Buka file .exe di folder hasil build untuk langsung menjalankan AI Log Activity 🚀

---

## 👨‍💻 Pembuat

Dibuat dengan semangat oleh Rafael Manurung 💡\
Seorang pengembang yang ingin menggabungkan kecerdasan buatan dengan efisiensi kerja nyata.

---

## ⚠️ Lisensi

Tidak memiliki lisensi (No License). \
Silakan gunakan, pelajari, atau modifikasi sesuai kebutuhan pribadi.

---

## ✨ Preview

"Ketik aktivitasmu hari ini, biarkan AI yang menuliskan log harianmu dengan rapi." \
Mudah, cepat, dan cerdas ⚡

---

## 💬 Contoh Output

Input:
```nginx
Hari ini saya belajar dasar Express.js dan mencoba membuat routing sederhana untuk API.
```

Output yang dihasilkan:
- Uraian Aktivitas: Hari ini saya fokus memahami konsep dasar routing pada Express.js...
- Pembelajaran yang Diperoleh: Saya memahami struktur dasar request-response...
- Kendala yang Dialami: Beberapa error muncul karena salah penulisan route handler...
