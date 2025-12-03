import { supabase } from './supabase';

// Database table names
export const TABLES = {
  BLOG_POSTS: 'blog_posts',
  GALLERY_IMAGES: 'gallery_images',
  ACHIEVEMENTS: 'achievements',
  TESTIMONIALS: 'testimonials',
  CAREER_TIMELINE: 'career_timeline',
  MILESTONES: 'milestones',
  JOURNEY_MILESTONES: 'journey_milestones',
} as const;

// Blog Posts
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!supabase) {
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from(TABLES.BLOG_POSTS)
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      // Table might not exist yet - that's okay
      if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        console.log('Blog posts table does not exist yet. Run the database schema SQL.');
        return [];
      }
      console.warn('Error fetching blog posts:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.warn('Exception fetching blog posts:', error);
    return [];
  }
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase
    .from(TABLES.BLOG_POSTS)
    .insert([{ ...post, id: Date.now().toString() }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
  
  return data;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase
    .from(TABLES.BLOG_POSTS)
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
  
  return data;
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { error } = await supabase
    .from(TABLES.BLOG_POSTS)
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

// Gallery Images
export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  date: string;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!supabase) {
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from(TABLES.GALLERY_IMAGES)
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        console.log('Gallery images table does not exist yet. Run the database schema SQL.');
        return [];
      }
      console.warn('Error fetching gallery images:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.warn('Exception fetching gallery images:', error);
    return [];
  }
}

export async function createGalleryImage(image: Omit<GalleryImage, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryImage | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  try {
    // Ensure tags is an array (handle both array and string)
    const tagsArray = Array.isArray(image.tags) ? image.tags : (image.tags ? [image.tags] : []);
    
    // Prepare data for insert
    // PostgreSQL converts unquoted column names to lowercase
    // The error shows the column is "imageurl" (lowercase), so we need to match that
    const insertData: any = {
      id: Date.now().toString(),
      title: image.title || '',
      description: image.description || '',
      imageurl: image.imageUrl || '', // Use lowercase to match PostgreSQL's column name
      category: image.category || '',
      tags: tagsArray,
      date: image.date || new Date().toISOString().split('T')[0],
      featured: image.featured || false,
    };
    
    const { data, error } = await supabase
      .from(TABLES.GALLERY_IMAGES)
      .insert([insertData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating gallery image:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        data: insertData
      });
      
      // Provide more helpful error messages
      if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        throw new Error(`Database table "${TABLES.GALLERY_IMAGES}" does not exist. Please run the database schema SQL in your Supabase dashboard.`);
      } else if (error.code === '42501' || error.message?.includes('permission denied') || error.message?.includes('RLS')) {
        throw new Error(`Permission denied: Row Level Security (RLS) policies may be blocking the insert. Please check your Supabase RLS policies for the "${TABLES.GALLERY_IMAGES}" table.`);
      } else if (error.message?.includes('null value') || error.message?.includes('violates not-null constraint')) {
        throw new Error(`Missing required field: ${error.message}. Please ensure all required fields are provided.`);
      } else {
        throw new Error(`Database error: ${error.message || 'Unknown error'}. Code: ${error.code || 'N/A'}`);
      }
    }
    
    return data;
  } catch (error: any) {
    // Re-throw with better context if it's not already a detailed error
    if (error instanceof Error && error.message && !error.message.includes('Database') && !error.message.includes('table') && !error.message.includes('RLS')) {
      throw new Error(`Failed to create gallery image record: ${error.message}`);
    }
    throw error;
  }
}

export async function updateGalleryImage(id: string, updates: Partial<GalleryImage>): Promise<GalleryImage | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  // Convert imageUrl to imageurl (lowercase) for PostgreSQL
  const updateData: any = { ...updates };
  if ('imageUrl' in updateData) {
    updateData.imageurl = updateData.imageUrl;
    delete updateData.imageUrl;
  }
  
  const { data, error } = await supabase
    .from(TABLES.GALLERY_IMAGES)
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating gallery image:', error);
    throw error;
  }
  
  return data;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { error } = await supabase
    .from(TABLES.GALLERY_IMAGES)
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting gallery image:', error);
    throw error;
  }
}

// Achievements
export interface Achievement {
  id: string;
  title: string;
  description: string;
  metric: string;
  icon: string;
  category: string;
  year?: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export async function getAchievements(): Promise<Achievement[]> {
  if (!supabase) {
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from(TABLES.ACHIEVEMENTS)
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        return [];
      }
      console.warn('Error fetching achievements:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.warn('Exception fetching achievements:', error);
    return [];
  }
}

export async function createAchievement(achievement: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>): Promise<Achievement | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase
    .from(TABLES.ACHIEVEMENTS)
    .insert([{ ...achievement, id: Date.now().toString() }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating achievement:', error);
    throw error;
  }
  
  return data;
}

export async function updateAchievement(id: string, updates: Partial<Achievement>): Promise<Achievement | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase
    .from(TABLES.ACHIEVEMENTS)
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating achievement:', error);
    throw error;
  }
  
  return data;
}

export async function deleteAchievement(id: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { error } = await supabase
    .from(TABLES.ACHIEVEMENTS)
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting achievement:', error);
    throw error;
  }
}

// Testimonials
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  imageUrl: string;
  featured: boolean;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!supabase) {
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from(TABLES.TESTIMONIALS)
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        return [];
      }
      console.warn('Error fetching testimonials:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.warn('Exception fetching testimonials:', error);
    return [];
  }
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Promise<Testimonial | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase
    .from(TABLES.TESTIMONIALS)
    .insert([{ ...testimonial, id: Date.now().toString() }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }
  
  return data;
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase
    .from(TABLES.TESTIMONIALS)
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating testimonial:', error);
    throw error;
  }
  
  return data;
}

export async function deleteTestimonial(id: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { error } = await supabase
    .from(TABLES.TESTIMONIALS)
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
}

// Career Timeline
export interface CareerEvent {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'professional' | 'education' | 'community';
  order: number;
  created_at?: string;
  updated_at?: string;
}

export async function getCareerTimeline(): Promise<CareerEvent[]> {
  if (!supabase) {
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from(TABLES.CAREER_TIMELINE)
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        return [];
      }
      console.warn('Error fetching career timeline:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.warn('Exception fetching career timeline:', error);
    return [];
  }
}

export async function createCareerEvent(event: Omit<CareerEvent, 'id' | 'created_at' | 'updated_at'>): Promise<CareerEvent | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase
    .from(TABLES.CAREER_TIMELINE)
    .insert([{ ...event, id: Date.now().toString() }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating career event:', error);
    throw error;
  }
  
  return data;
}

export async function updateCareerEvent(id: string, updates: Partial<CareerEvent>): Promise<CareerEvent | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase
    .from(TABLES.CAREER_TIMELINE)
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating career event:', error);
    throw error;
  }
  
  return data;
}

export async function deleteCareerEvent(id: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { error } = await supabase
    .from(TABLES.CAREER_TIMELINE)
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting career event:', error);
    throw error;
  }
}

// Milestones
export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  category: 'education' | 'career' | 'community' | 'business' | 'leadership';
  images: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getMilestones(): Promise<Milestone[]> {
  if (!supabase) {
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from(TABLES.MILESTONES)
      .select('*')
      .order('year', { ascending: false });
    
    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        return [];
      }
      console.warn('Error fetching milestones:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.warn('Exception fetching milestones:', error);
    return [];
  }
}

export async function createMilestone(milestone: Omit<Milestone, 'id' | 'created_at' | 'updated_at'>): Promise<Milestone | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase
    .from(TABLES.MILESTONES)
    .insert([{ ...milestone, id: Date.now().toString() }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating milestone:', error);
    throw error;
  }
  
  return data;
}

export async function updateMilestone(id: string, updates: Partial<Milestone>): Promise<Milestone | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { data, error } = await supabase
    .from(TABLES.MILESTONES)
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating milestone:', error);
    throw error;
  }
  
  return data;
}

export async function deleteMilestone(id: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  const { error } = await supabase
    .from(TABLES.MILESTONES)
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting milestone:', error);
    throw error;
  }
}

// Journey Milestones (different structure with image and image2)
export interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  category: string;
  image: string;
  image2: string;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getJourneyMilestones(): Promise<JourneyMilestone[]> {
  if (!supabase) {
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from(TABLES.JOURNEY_MILESTONES)
      .select('*')
      .order('year', { ascending: false });
    
    if (error) {
      if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        return [];
      }
      console.warn('Error fetching journey milestones:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.warn('Exception fetching journey milestones:', error);
    return [];
  }
}

export async function saveJourneyMilestones(milestones: JourneyMilestone[]): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }
  
  try {
    // Get all existing milestone IDs
    const { data: existingData } = await supabase
      .from(TABLES.JOURNEY_MILESTONES)
      .select('id');
    
    const existingIds = existingData?.map(m => m.id) || [];
    const newIds = milestones.map(m => m.id);
    
    // Delete milestones that are no longer in the new list
    const idsToDelete = existingIds.filter(id => !newIds.includes(id));
    if (idsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from(TABLES.JOURNEY_MILESTONES)
        .delete()
        .in('id', idsToDelete);
      
      if (deleteError) {
        console.warn('Error deleting old journey milestones:', deleteError);
      }
    }
    
    // Upsert all milestones (insert or update)
    if (milestones.length > 0) {
      const { error } = await supabase
        .from(TABLES.JOURNEY_MILESTONES)
        .upsert(milestones, { onConflict: 'id' });
      
      if (error) {
        console.error('Error saving journey milestones:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error saving journey milestones:', error);
    throw error;
  }
}

