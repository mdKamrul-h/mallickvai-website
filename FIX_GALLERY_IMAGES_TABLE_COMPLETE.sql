-- Complete fix for gallery_images table
-- This script handles existing policies and creates everything needed

-- Step 1: Create the table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS gallery_images (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  date TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Enable Row Level Security (RLS) - safe to run multiple times
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public read access" ON gallery_images;
DROP POLICY IF EXISTS "Allow insert" ON gallery_images;
DROP POLICY IF EXISTS "Allow update" ON gallery_images;
DROP POLICY IF EXISTS "Allow delete" ON gallery_images;

-- Step 4: Create RLS Policies
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

-- Step 5: Verify everything was created correctly
SELECT 
  'Table created successfully' as status,
  column_name, 
  data_type
FROM information_schema.columns 
WHERE table_name = 'gallery_images'
ORDER BY ordinal_position;

SELECT 
  'Policies created successfully' as status,
  policyname,
  cmd
FROM pg_policies 
WHERE tablename = 'gallery_images';


