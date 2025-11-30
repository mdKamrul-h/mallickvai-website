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
    throw new Error('Supabase is not configured. Please check your environment variables.');
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder ? `${folder}/` : ''}${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

  try {
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL for uploaded image');
    }

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image to Supabase:', error);
    throw error;
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

