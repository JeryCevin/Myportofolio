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

-- Create experiences table (optional for future use)
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id)
);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for projects
CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

-- Public read access for skills
CREATE POLICY "Public read access for skills" ON skills
  FOR SELECT USING (true);

-- Public read access for experiences
CREATE POLICY "Public read access for experiences" ON experiences
  FOR SELECT USING (true);

-- Admin full access to projects
CREATE POLICY "Admin full access to projects" ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Admin full access to skills
CREATE POLICY "Admin full access to skills" ON skills
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Admin full access to experiences
CREATE POLICY "Admin full access to experiences" ON experiences
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Public insert access for contact messages (anyone can submit)
CREATE POLICY "Public insert access for contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Admin read access to contact messages
CREATE POLICY "Admin read access to contact messages" ON contact_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Admin update access to contact messages (for marking as read)
CREATE POLICY "Admin update access to contact messages" ON contact_messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Admin delete access to contact messages
CREATE POLICY "Admin delete access to contact messages" ON contact_messages
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Insert sample data (optional)
INSERT INTO projects (title, description, image_url, tech_stack, category, featured, order_index) VALUES
  ('AI Data Analysis Dashboard', 'Interactive dashboard for real-time data analysis using machine learning models', '', ARRAY['Python', 'TensorFlow', 'React', 'D3.js'], 'data-science', true, 1),
  ('E-Commerce Platform', 'Full-stack e-commerce solution with payment integration and admin panel', '', ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'], 'web', true, 2),
  ('3D Adventure Game', 'Immersive 3D adventure game with physics-based mechanics', '', ARRAY['Unity', 'C#', 'Blender'], 'game', true, 3);

INSERT INTO skills (name, category, level) VALUES
  ('Python', 'Data Science', 90),
  ('TensorFlow', 'Data Science', 85),
  ('Pandas', 'Data Science', 88),
  ('Scikit-learn', 'Data Science', 85),
  ('React/Next.js', 'Web Development', 92),
  ('TypeScript', 'Web Development', 88),
  ('Node.js', 'Web Development', 85),
  ('Tailwind CSS', 'Web Development', 90),
  ('Unity', 'Game Development', 80),
  ('C#', 'Game Development', 82),
  ('Unreal Engine', 'Game Development', 75),
  ('Arduino', 'Mechanical', 78),
  ('C++', 'Mechanical', 80);

-- Storage policies for project-images bucket
-- Note: Create bucket 'project-images' in Supabase Storage as PUBLIC bucket first

-- Allow anyone to view images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'project-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'project-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images" ON storage.objects FOR DELETE USING (
  bucket_id = 'project-images' 
  AND auth.role() = 'authenticated'
);

-- Note: After running this script, create an admin user in Supabase Auth
-- Then run: INSERT INTO admin_users (user_id) VALUES ('YOUR_USER_UUID');
