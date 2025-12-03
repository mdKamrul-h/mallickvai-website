import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Image uploads will not work. Please check your .env file.');
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Storage bucket names
export const STORAGE_BUCKETS = {
  GALLERY: 'gallery-images',
  MILESTONES: 'milestone-images',
  JOURNEY: 'journey-images',
  BLOG: 'blog-images',
  TESTIMONIALS: 'testimonial-images',
} as const;

/**
 * Upload an image file to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The storage bucket name
 * @param folder - Optional folder path within the bucket
 * @returns Public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  bucket: string,
  folder: string = ''
): Promise<string> {
  if (!supabase) {
    const errorMsg = 'Supabase is not configured. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Validate file
  if (!file || file.size === 0) {
    throw new Error('Invalid file: File is empty or not provided.');
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error(`File is too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum size is 10MB.`);
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error(`Invalid file type: ${file.type}. Only image files are allowed.`);
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  if (!fileExt) {
    throw new Error('File has no extension. Please ensure the file has a valid image extension.');
  }
  const fileName = `${folder ? `${folder}/` : ''}${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

  try {
    // Upload file to Supabase Storage
    // Note: We don't check bucket existence first because:
    // 1. The listBuckets() call may fail due to permissions even if bucket exists
    // 2. The upload will fail with a clear error if bucket doesn't exist
    // 3. This avoids false positives when bucket exists but listing is restricted
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      // Provide more specific error messages
      if (error.message?.includes('new row violates row-level security')) {
        throw new Error(`Permission denied: The storage bucket "${bucket}" may have RLS policies that prevent uploads. Please check your Supabase storage policies.`);
      } else if (error.message?.includes('Bucket not found')) {
        throw new Error(`Storage bucket "${bucket}" not found. Please create it in your Supabase dashboard under Storage.`);
      } else if (error.message?.includes('JWT')) {
        throw new Error('Authentication error: Please check your Supabase anon key in the .env file.');
      } else {
        throw new Error(`Upload failed: ${error.message || 'Unknown error'}`);
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL for uploaded image. The file may have been uploaded but the bucket may not be public.');
    }

    return urlData.publicUrl;
  } catch (error: any) {
    console.error('Error uploading image to Supabase:', {
      error,
      bucket,
      fileName,
      fileSize: file.size,
      fileType: file.type,
      supabaseUrl: supabaseUrl ? 'Configured' : 'Not configured',
    });
    
    // Re-throw with more context if it's not already a detailed error
    if (error instanceof Error && error.message) {
      throw error;
    }
    
    throw new Error(`Failed to upload image: ${error?.message || 'Unknown error occurred'}`);
  }
}

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the image to delete
 * @param bucket - The storage bucket name
 */
export async function deleteImage(url: string, bucket: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please check your environment variables.');
  }

  try {
    // Extract file path from Supabase public URL
    // URL format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
    const publicPath = `/storage/v1/object/public/${bucket}/`;
    const pathIndex = url.indexOf(publicPath);
    
    if (pathIndex === -1) {
      throw new Error('Invalid Supabase URL format');
    }
    
    // Get everything after the bucket name
    const filePath = url.substring(pathIndex + publicPath.length);

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting image from Supabase:', error);
    throw error;
  }
}

/**
 * Check if a URL is a Supabase Storage URL
 */
export function isSupabaseUrl(url: string): boolean {
  return url.includes('supabase.co') && url.includes('/storage/v1/object/public/');
}

