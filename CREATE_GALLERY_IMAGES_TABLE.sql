-- Create gallery_images table in Supabase
-- Copy and paste this entire script into your Supabase SQL Editor and run it

-- Step 1: Create the table
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

-- Step 2: Enable Row Level Security (RLS)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop existing policies if they exist (using DO block for reliability)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery_images' AND policyname = 'Public read access') THEN
    DROP POLICY "Public read access" ON gallery_images;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery_images' AND policyname = 'Allow insert') THEN
    DROP POLICY "Allow insert" ON gallery_images;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery_images' AND policyname = 'Allow update') THEN
    DROP POLICY "Allow update" ON gallery_images;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery_images' AND policyname = 'Allow delete') THEN
    DROP POLICY "Allow delete" ON gallery_images;
  END IF;
END $$;

-- Step 4: Create RLS Policies
-- Policy: Allow anyone to read gallery images
CREATE POLICY "Public read access" ON gallery_images
  FOR SELECT
  USING (true);

-- Policy: Allow anyone to insert (you can restrict this later if needed)
CREATE POLICY "Allow insert" ON gallery_images
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow anyone to update
CREATE POLICY "Allow update" ON gallery_images
  FOR UPDATE
  USING (true);

-- Policy: Allow anyone to delete
CREATE POLICY "Allow delete" ON gallery_images
  FOR DELETE
  USING (true);

-- Verify the table was created
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'gallery_images'
ORDER BY ordinal_position;

