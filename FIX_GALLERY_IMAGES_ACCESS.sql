-- Complete fix for gallery_images table access issue
-- The table exists but PostgREST can't see it
-- Run this entire script in your Supabase SQL Editor

-- Step 1: Verify table exists
SELECT 'Table exists: ' || EXISTS (
  SELECT 1 FROM information_schema.tables 
  WHERE table_name = 'gallery_images'
) as verification;

-- Step 2: Ensure table is in public schema
ALTER TABLE IF EXISTS gallery_images SET SCHEMA public;

-- Step 3: Grant all necessary permissions
GRANT ALL ON gallery_images TO anon;
GRANT ALL ON gallery_images TO authenticated;
GRANT ALL ON gallery_images TO service_role;
GRANT ALL ON gallery_images TO postgres;

-- Step 4: Grant schema usage
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

-- Step 5: Ensure RLS is enabled and policies exist
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies to ensure they're correct
DO $$
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "Public read access" ON gallery_images;
  DROP POLICY IF EXISTS "Allow insert" ON gallery_images;
  DROP POLICY IF EXISTS "Allow update" ON gallery_images;
  DROP POLICY IF EXISTS "Allow delete" ON gallery_images;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Create policies
CREATE POLICY "Public read access" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Allow insert" ON gallery_images
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update" ON gallery_images
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete" ON gallery_images
  FOR DELETE USING (true);

-- Step 6: Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';

-- Step 7: Test insert (this should work now)
DO $$
BEGIN
  INSERT INTO gallery_images (id, title, description, "imageUrl", category, date, featured, tags)
  VALUES ('test-' || extract(epoch from now())::text, 'Test Image', 'Test description', 'https://example.com/test.jpg', 'Test', CURRENT_DATE, false, '{}')
  ON CONFLICT (id) DO NOTHING;
  
  RAISE NOTICE 'Test insert successful!';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Test insert failed: %', SQLERRM;
END $$;

-- Step 8: Verify everything
SELECT 
  'SUCCESS: Table is accessible' as status,
  COUNT(*) as row_count
FROM gallery_images;

-- Show all policies
SELECT 
  policyname,
  cmd as command
FROM pg_policies 
WHERE tablename = 'gallery_images';




