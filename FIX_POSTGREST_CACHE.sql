-- Fix PostgREST schema cache issue
-- The table exists but PostgREST API can't see it
-- Run this to refresh the schema cache and verify RLS policies

-- Step 1: Verify table exists and check schema
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE tablename = 'gallery_images';

-- Step 2: Check RLS status
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'gallery_images';

-- Step 3: Verify all policies exist and are correct
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd as command,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'gallery_images';

-- Step 4: Ensure table is in public schema and accessible
-- If table is not in public schema, this will show it
SELECT 
  table_schema,
  table_name
FROM information_schema.tables 
WHERE table_name = 'gallery_images';

-- Step 5: Grant necessary permissions (if needed)
GRANT ALL ON gallery_images TO anon;
GRANT ALL ON gallery_images TO authenticated;
GRANT ALL ON gallery_images TO service_role;

-- Step 6: Refresh PostgREST schema cache
-- Note: This might require a Supabase restart or API reload
NOTIFY pgrst, 'reload schema';


