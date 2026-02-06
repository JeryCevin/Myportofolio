# PANDUAN SETUP PORTFOLIO JERY CEVIN

## 🎯 Langkah-langkah Setup

### 1. Install Node.js dan Dependencies

```bash
# Pastikan Node.js sudah terinstall (minimal versi 18)
node --version

# Install dependencies
npm install
```

### 2. Setup Supabase Database

#### A. Buat Project Supabase
1. Kunjungi https://supabase.com
2. Klik "Start your project"
3. Login dengan GitHub atau email
4. Klik "New Project"
5. Isi:
   - Name: `jery-cevin-portfolio`
   - Database Password: (buat password yang kuat, simpan dengan aman!)
   - Region: Pilih yang terdekat (Southeast Asia recommended)
6. Klik "Create new project" dan tunggu ~2 menit

#### B. Jalankan SQL Schema
1. Di dashboard Supabase, klik "SQL Editor" di sidebar kiri
2. Klik "New query"
3. Copy seluruh isi file `supabase-setup.sql` dan paste di editor
4. Klik "Run" atau tekan Ctrl+Enter
5. Tunggu sampai selesai (akan ada notifikasi "Success")

#### C. Buat Admin User
1. Di dashboard Supabase, klik "Authentication" > "Users"
2. Klik "Add user" > "Create new user"
3. Isi:
   - Email: admin@jerycevin.com (atau email Anda)
   - Password: (buat password yang kuat!)
   - Auto Confirm User: ✅ (centang)
4. Klik "Create user"
5. Copy UUID user (kode panjang di kolom ID)
6. Kembali ke SQL Editor
7. Jalankan query berikut (ganti YOUR_USER_UUID):

```sql
INSERT INTO admin_users (user_id) VALUES ('YOUR_USER_UUID');
```

#### D. Ambil API Credentials
1. Klik "Project Settings" (ikon gear) > "API"
2. Copy:
   - Project URL (contoh: https://abcdefgh.supabase.co)
   - anon public key (key yang panjang)

### 3. Setup Environment Variables

1. Copy file `.env.example` menjadi `.env.local`:
```bash
copy .env.example .env.local
```

2. Buka `.env.local` dan edit:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

3. Ganti dengan credentials dari langkah 2D

### 4. Test Locally

```bash
# Run development server
npm run dev
```

Buka browser dan akses:
- Portfolio: http://localhost:3000
- Admin: http://localhost:3000/admin/login

Login dengan email dan password yang dibuat di langkah 2C.

### 5. Deploy ke Vercel

#### A. Push ke GitHub
```bash
# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio setup"

# Create repository di GitHub dulu, lalu:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

#### B. Deploy di Vercel
1. Kunjungi https://vercel.com
2. Login dengan GitHub
3. Klik "Import Project"
4. Pilih repository yang baru dibuat
5. Framework Preset: Next.js (auto-detected)
6. Klik "Environment Variables" dan tambahkan:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (paste URL Supabase Anda)
   - Klik "Add"
   
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (paste anon key Anda)
   - Klik "Add"

7. Klik "Deploy"
8. Tunggu 2-3 menit
9. Portfolio Anda sudah online! 🎉

## 🎨 Kustomisasi

### Mengubah Informasi Personal

1. **Nama dan Deskripsi**
   - Edit [app/layout.tsx](app/layout.tsx) untuk metadata SEO
   - Edit [components/Hero.tsx](components/Hero.tsx) untuk hero section

2. **Email dan Social Media**
   - Edit [components/Hero.tsx](components/Hero.tsx)
   - Edit [components/Contact.tsx](components/Contact.tsx)
   - Edit [components/Footer.tsx](components/Footer.tsx)

3. **About Section**
   - Edit [components/About.tsx](components/About.tsx)

### Mengubah Warna Theme

Edit [tailwind.config.ts](tailwind.config.ts):
```typescript
colors: {
  primary: {
    500: '#0ea5e9', // Ganti dengan warna pilihan Anda
    600: '#0284c7',
  },
}
```

## 📝 Cara Menggunakan Admin Panel

### Login
- Akses: https://your-domain.vercel.app/admin/login
- Gunakan credentials yang dibuat di Supabase

### Menambah Project
1. Login ke admin panel
2. Klik tab "Projects"
3. Klik "Add Project"
4. Isi form:
   - Title: Nama project
   - Description: Deskripsi singkat
   - Tech Stack: Pisahkan dengan koma (e.g., "React, Node.js, MongoDB")
   - Category: Pilih kategori yang sesuai
   - Demo URL: Link demo (opsional)
   - GitHub URL: Link repository (opsional)
   - Featured: Centang untuk project unggulan
5. Klik "Add Project"

### Menambah Skill
1. Klik tab "Skills"
2. Klik "Add Skill"
3. Isi:
   - Name: Nama skill (e.g., "Python")
   - Category: Kategori (e.g., "Data Science")
   - Level: Geser slider (0-100%)
4. Klik "Add Skill"

### Edit/Delete
- Klik icon pensil (✏️) untuk edit
- Klik icon trash (🗑️) untuk hapus

## 🔧 Troubleshooting

### Error "Failed to fetch"
- Pastikan environment variables sudah benar
- Restart development server: `Ctrl+C` lalu `npm run dev`

### Error "Invalid API key"
- Double check SUPABASE_ANON_KEY di `.env.local`
- Pastikan tidak ada spasi atau karakter extra

### Tidak bisa login ke admin
- Pastikan user sudah ditambahkan ke tabel `admin_users`
- Cek di Supabase: Table Editor > admin_users

### Database permission error
- Pastikan RLS policies sudah dibuat (jalankan ulang SQL script)

## 📞 Butuh Bantuan?

Jika mengalami masalah:
1. Cek console browser (F12) untuk error messages
2. Cek Supabase logs di dashboard
3. Pastikan semua langkah sudah diikuti dengan benar

## ✅ Checklist

- [ ] Node.js terinstall
- [ ] Supabase project dibuat
- [ ] SQL schema dijalankan
- [ ] Admin user dibuat dan ditambahkan ke admin_users
- [ ] Environment variables dikonfigurasi
- [ ] Test locally berhasil
- [ ] Repository GitHub dibuat
- [ ] Deploy ke Vercel berhasil
- [ ] Portfolio bisa diakses online
- [ ] Admin panel bisa login

Selamat! Portfolio Anda sudah siap! 🚀
