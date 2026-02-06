# Jery Cevin Portfolio

Portfolio profesional yang dibangun dengan Next.js, TypeScript, Tailwind CSS, dan Supabase.

## ✨ Fitur

- 🎨 **Modern Design** - UI yang menarik dengan animasi smooth
- 📱 **Responsive** - Tampilan sempurna di semua device
- 🔐 **Admin Panel** - Kelola portfolio dengan mudah
- 💾 **Database Online** - Menggunakan Supabase (gratis & aman)
- 🚀 **Fast Performance** - Optimized untuk kecepatan
- 🎯 **SEO Friendly** - Metadata yang teroptimasi

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Vercel

## 📋 Cara Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Buat account di [Supabase](https://supabase.com)
2. Buat project baru
3. Jalankan SQL berikut di SQL Editor Supabase:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tech_stack TEXT[] NOT NULL,
  demo_url TEXT,
  github_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('data-science', 'web', 'game', 'mechanical')),
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create skills table
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for projects and skills
CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access for skills" ON skills
  FOR SELECT USING (true);

-- Admin write access for projects
CREATE POLICY "Admin full access to projects" ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Admin write access for skills
CREATE POLICY "Admin full access to skills" ON skills
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );
```

4. Buat admin user:
   - Pergi ke Authentication > Users
   - Klik "Add user" > "Create new user"
   - Masukkan email dan password
   - Copy UUID user yang baru dibuat
   - Jalankan SQL berikut (ganti YOUR_USER_UUID):

```sql
INSERT INTO admin_users (user_id) VALUES ('YOUR_USER_UUID');
```

### 3. Setup Environment Variables

Copy `.env.example` menjadi `.env.local`:

```bash
copy .env.example .env.local
```

Edit `.env.local` dan isi dengan credential Supabase Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Cara mendapatkan credentials:
- Pergi ke Project Settings > API
- Copy "Project URL" dan "anon public" key

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🚀 Deploy ke Vercel

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 2. Deploy di Vercel

1. Pergi ke [Vercel](https://vercel.com)
2. Klik "Import Project"
3. Pilih repository GitHub Anda
4. Tambahkan Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Klik "Deploy"

## 📝 Cara Menggunakan Admin Panel

1. Akses `/admin/login`
2. Login dengan credentials yang sudah dibuat di Supabase
3. Kelola projects dan skills dengan mudah

### Menambah Project
- Klik "Add Project"
- Isi form dengan detail project
- Tech stack dipisahkan dengan koma (e.g., "React, TypeScript, Node.js")
- Pilih category yang sesuai
- Klik "Add Project"

### Menambah Skill
- Klik "Add Skill"
- Isi nama skill dan category
- Atur level dengan slider (0-100%)
- Klik "Add Skill"

## 📁 Struktur Project

```
├── app/
│   ├── admin/              # Admin panel pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── lib/                    # Utilities
│   ├── auth.ts            # Authentication functions
│   └── supabase.ts        # Supabase client & types
└── public/                # Static assets
```

## 🎨 Customization

### Warna
Edit `tailwind.config.ts` untuk mengubah theme color.

### Konten
- **About**: Edit [components/About.tsx](components/About.tsx)
- **Contact**: Edit email dan social links di [components/Contact.tsx](components/Contact.tsx) dan [components/Hero.tsx](components/Hero.tsx)

## 🔒 Security

- Database menggunakan Row Level Security (RLS)
- Authentication menggunakan Supabase Auth
- Admin access dikontrol melalui `admin_users` table

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buka issue di GitHub repository.

## 📄 License

MIT License - Silakan gunakan untuk portfolio pribadi Anda!

---

Made with ❤️ by Jery Cevin
