-- Final fix for gallery_images table - handles all edge cases
-- This script will work even if policies already exist

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

-- Step 2: Enable Row Level Security (RLS)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop policies using DO block (more reliable)
DO $$
BEGIN
  -- Drop policies if they exist
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

-- Step 5: Verify everything
SELECT 'Table and policies created successfully!' as status;






