-- Fix gallery_images table - Add imageUrl column if missing or rename if needed
-- Run this in your Supabase SQL Editor

-- First, check if the table exists and what columns it has
-- You can run this to see the current structure:
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'gallery_images';

-- Option 1: If the column is named 'image_url' (snake_case), rename it to 'imageUrl'
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'gallery_images' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE gallery_images RENAME COLUMN image_url TO "imageUrl";
    RAISE NOTICE 'Renamed image_url to imageUrl';
  END IF;
END $$;

-- Option 2: If the column doesn't exist at all, add it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'gallery_images' AND column_name = 'imageUrl'
  ) THEN
    ALTER TABLE gallery_images ADD COLUMN "imageUrl" TEXT NOT NULL DEFAULT '';
    RAISE NOTICE 'Added imageUrl column';
  END IF;
END $$;

-- If you need to update existing rows that might have NULL values:
-- UPDATE gallery_images SET "imageUrl" = '' WHERE "imageUrl" IS NULL;

-- Verify the column exists
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'gallery_images' AND column_name = 'imageUrl';

