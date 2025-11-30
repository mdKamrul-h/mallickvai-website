# Supabase Database Schema

This document describes the database tables needed for the CMS. Run these SQL commands in your Supabase SQL Editor to create the tables.

## Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **"New query"**
4. Copy and paste the SQL below
5. Click **"Run"** (or press Ctrl+Enter)

---

## Database Tables

### 1. Blog Posts Table

```sql
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  imageUrl TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) - Allow public read, authenticated write
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read blog posts
CREATE POLICY "Public read access" ON blog_posts
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users to insert (you can modify this based on your auth setup)
CREATE POLICY "Allow insert" ON blog_posts
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow authenticated users to update
CREATE POLICY "Allow update" ON blog_posts
  FOR UPDATE
  USING (true);

-- Policy: Allow authenticated users to delete
CREATE POLICY "Allow delete" ON blog_posts
  FOR DELETE
  USING (true);
```

### 2. Gallery Images Table

```sql
CREATE TABLE IF NOT EXISTS gallery_images (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  date TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON gallery_images
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert" ON gallery_images
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update" ON gallery_images
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete" ON gallery_images
  FOR DELETE
  USING (true);
```

### 3. Achievements Table

```sql
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  metric TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON achievements
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert" ON achievements
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update" ON achievements
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete" ON achievements
  FOR DELETE
  USING (true);
```

### 4. Testimonials Table

```sql
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON testimonials
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert" ON testimonials
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update" ON testimonials
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete" ON testimonials
  FOR DELETE
  USING (true);
```

### 5. Career Timeline Table

```sql
CREATE TABLE IF NOT EXISTS career_timeline (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('professional', 'education', 'community')),
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE career_timeline ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON career_timeline
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert" ON career_timeline
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update" ON career_timeline
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete" ON career_timeline
  FOR DELETE
  USING (true);
```

### 6. Milestones Table

```sql
CREATE TABLE IF NOT EXISTS milestones (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('education', 'career', 'community', 'business', 'leadership')),
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON milestones
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert" ON milestones
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update" ON milestones
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow delete" ON milestones
  FOR DELETE
  USING (true);
```

---

## Storage Buckets

In addition to the database tables, you need to create storage buckets for images:

1. Go to **Storage** in your Supabase dashboard
2. Create these buckets (all should be **Public**):
   - `gallery-images`
   - `milestone-images`
   - `journey-images`
   - `blog-images`
   - `testimonial-images`

For each bucket, set up public read access policies (see the main setup guide).

---

## Quick Setup Script

Copy and paste this entire script to create all tables at once:

```sql
-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  imageUrl TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Images
CREATE TABLE IF NOT EXISTS gallery_images (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  date TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  metric TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Career Timeline
CREATE TABLE IF NOT EXISTS career_timeline (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('professional', 'education', 'community')),
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Milestones
CREATE TABLE IF NOT EXISTS milestones (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('education', 'career', 'community', 'business', 'leadership')),
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Journey Milestones (separate table for Journey Admin page with image and image2 fields)
CREATE TABLE IF NOT EXISTS journey_milestones (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  image2 TEXT NOT NULL DEFAULT '',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_milestones ENABLE ROW LEVEL SECURITY;

-- Create public read policies for all tables
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access" ON career_timeline FOR SELECT USING (true);
CREATE POLICY "Public read access" ON milestones FOR SELECT USING (true);
CREATE POLICY "Public read access" ON journey_milestones FOR SELECT USING (true);

-- Create insert policies
CREATE POLICY "Allow insert" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert" ON gallery_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert" ON achievements FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert" ON career_timeline FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert" ON milestones FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert" ON journey_milestones FOR INSERT WITH CHECK (true);

-- Create update policies
CREATE POLICY "Allow update" ON blog_posts FOR UPDATE USING (true);
CREATE POLICY "Allow update" ON gallery_images FOR UPDATE USING (true);
CREATE POLICY "Allow update" ON achievements FOR UPDATE USING (true);
CREATE POLICY "Allow update" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow update" ON career_timeline FOR UPDATE USING (true);
CREATE POLICY "Allow update" ON milestones FOR UPDATE USING (true);
CREATE POLICY "Allow update" ON journey_milestones FOR UPDATE USING (true);

-- Create delete policies
CREATE POLICY "Allow delete" ON blog_posts FOR DELETE USING (true);
CREATE POLICY "Allow delete" ON gallery_images FOR DELETE USING (true);
CREATE POLICY "Allow delete" ON achievements FOR DELETE USING (true);
CREATE POLICY "Allow delete" ON testimonials FOR DELETE USING (true);
CREATE POLICY "Allow delete" ON career_timeline FOR DELETE USING (true);
CREATE POLICY "Allow delete" ON milestones FOR DELETE USING (true);
CREATE POLICY "Allow delete" ON journey_milestones FOR DELETE USING (true);
```

---

## Notes

- All tables use `TEXT` for IDs (string-based IDs from the application)
- Arrays are stored as PostgreSQL `TEXT[]` type
- `order` is a reserved keyword in PostgreSQL, so it's quoted as `"order"`
- RLS (Row Level Security) is enabled but policies allow public access for this use case
- You can modify the policies later to require authentication if needed

---

## Verification

After running the SQL, verify the tables were created:

1. Go to **Table Editor** in Supabase dashboard
2. You should see all 7 tables listed (blog_posts, gallery_images, achievements, testimonials, career_timeline, milestones, journey_milestones)
3. Click on each table to verify the columns match the schema

---

## Troubleshooting

If you get errors:
- Make sure you're running the SQL in the correct project
- Check that you have the necessary permissions
- Some policies might already exist - you can drop them first if needed:
  ```sql
  DROP POLICY IF EXISTS "Public read access" ON blog_posts;
  -- Repeat for other tables
  ```

