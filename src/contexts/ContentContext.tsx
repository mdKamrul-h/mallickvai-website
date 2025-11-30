import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { BlogPost, defaultBlogPosts } from '../data/blog-posts';
import { GalleryImage, defaultGalleryImages } from '../data/gallery-images';
import { Achievement, defaultAchievements } from '../data/achievements';
import { Testimonial, defaultTestimonials } from '../data/testimonials';
import { CareerEvent, defaultCareerTimeline } from '../data/career-timeline';
import { Milestone, defaultMilestones } from '../data/milestones';
import { supabase } from '../lib/supabase';
import * as supabaseDb from '../lib/supabase-db';

interface ContentContextType {
  // Blog Posts
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  
  // Gallery Images
  galleryImages: GalleryImage[];
  addGalleryImage: (image: GalleryImage) => void;
  updateGalleryImage: (id: string, image: Partial<GalleryImage>) => void;
  deleteGalleryImage: (id: string) => void;
  
  // Achievements
  achievements: Achievement[];
  addAchievement: (achievement: Achievement) => void;
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  
  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  
  // Career Timeline
  careerTimeline: CareerEvent[];
  addCareerEvent: (event: CareerEvent) => void;
  updateCareerEvent: (id: string, event: Partial<CareerEvent>) => void;
  deleteCareerEvent: (id: string) => void;
  
  // Milestones
  milestones: Milestone[];
  addMilestone: (milestone: Milestone) => void;
  updateMilestone: (id: string, milestone: Partial<Milestone>) => void;
  deleteMilestone: (id: string) => void;
  
  // Reset all data
  resetAllData: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [blogPosts, setBlogPosts] = useLocalStorage<BlogPost[]>('blogPosts', defaultBlogPosts);
  const [galleryImages, setGalleryImages] = useLocalStorage<GalleryImage[]>('galleryImages', defaultGalleryImages);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('achievements', defaultAchievements);
  const [testimonials, setTestimonials] = useLocalStorage<Testimonial[]>('testimonials', defaultTestimonials);
  const [milestones, setMilestones] = useLocalStorage<Milestone[]>('milestones', defaultMilestones);
  const [careerTimeline, setCareerTimeline] = useLocalStorage<CareerEvent[]>('careerTimeline', defaultCareerTimeline);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from Supabase on mount
  useEffect(() => {
    const loadFromSupabase = async () => {
      if (!supabase) {
        console.log('Supabase not configured, using localStorage');
        setIsLoading(false);
        return;
      }

      try {
        // Load all data from Supabase in parallel with individual error handling
        // Each query has its own catch to prevent one failure from blocking others
        const [posts, images, achievementsData, testimonialsData, timeline, milestonesData] = await Promise.all([
          supabaseDb.getBlogPosts().catch((e) => { console.warn('Failed to load blog posts:', e); return []; }),
          supabaseDb.getGalleryImages().catch((e) => { console.warn('Failed to load gallery images:', e); return []; }),
          supabaseDb.getAchievements().catch((e) => { console.warn('Failed to load achievements:', e); return []; }),
          supabaseDb.getTestimonials().catch((e) => { console.warn('Failed to load testimonials:', e); return []; }),
          supabaseDb.getCareerTimeline().catch((e) => { console.warn('Failed to load career timeline:', e); return []; }),
          supabaseDb.getMilestones().catch((e) => { console.warn('Failed to load milestones:', e); return []; }),
        ]);

        // Only update if we got data from Supabase (non-empty arrays)
        if (Array.isArray(posts) && posts.length > 0) setBlogPosts(posts);
        if (Array.isArray(images) && images.length > 0) setGalleryImages(images);
        if (Array.isArray(achievementsData) && achievementsData.length > 0) setAchievements(achievementsData);
        if (Array.isArray(testimonialsData) && testimonialsData.length > 0) setTestimonials(testimonialsData);
        if (Array.isArray(timeline) && timeline.length > 0) setCareerTimeline(timeline);
        if (Array.isArray(milestonesData) && milestonesData.length > 0) setMilestones(milestonesData);
      } catch (error) {
        console.warn('Error loading from Supabase (using localStorage):', error);
        // Continue with localStorage data - it's already loaded
      } finally {
        // Always set loading to false, even if there are errors
        setIsLoading(false);
      }
    };

    loadFromSupabase();
  }, []); // Only run on mount

  // Blog Posts
  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [...prev, post]);
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(post => post.id === id ? { ...post, ...updates } : post));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  // Gallery Images
  const addGalleryImage = (image: GalleryImage) => {
    setGalleryImages(prev => [...prev, image]);
  };

  const updateGalleryImage = (id: string, updates: Partial<GalleryImage>) => {
    setGalleryImages(prev => prev.map(image => image.id === id ? { ...image, ...updates } : image));
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages(prev => prev.filter(image => image.id !== id));
  };

  // Achievements
  const addAchievement = (achievement: Achievement) => {
    setAchievements(prev => [...prev, achievement]);
  };

  const updateAchievement = (id: string, updates: Partial<Achievement>) => {
    setAchievements(prev => prev.map(ach => ach.id === id ? { ...ach, ...updates } : ach));
  };

  const deleteAchievement = (id: string) => {
    setAchievements(prev => prev.filter(ach => ach.id !== id));
  };

  // Testimonials
  const addTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => [...prev, testimonial]);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(test => test.id === id ? { ...test, ...updates } : test));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(test => test.id !== id));
  };

  // Career Timeline
  const addCareerEvent = (event: CareerEvent) => {
    setCareerTimeline(prev => [...prev, event]);
  };

  const updateCareerEvent = (id: string, updates: Partial<CareerEvent>) => {
    setCareerTimeline(prev => prev.map(event => event.id === id ? { ...event, ...updates } : event));
  };

  const deleteCareerEvent = (id: string) => {
    setCareerTimeline(prev => prev.filter(event => event.id !== id));
  };

  // Milestones
  const addMilestone = (milestone: Milestone) => {
    setMilestones(prev => [...prev, milestone]);
  };

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    setMilestones(prev => prev.map(milestone => milestone.id === id ? { ...milestone, ...updates } : milestone));
  };

  const deleteMilestone = (id: string) => {
    setMilestones(prev => prev.filter(milestone => milestone.id !== id));
  };

  // Reset all data
  const resetAllData = () => {
    setBlogPosts(defaultBlogPosts);
    setGalleryImages(defaultGalleryImages);
    setAchievements(defaultAchievements);
    setTestimonials(defaultTestimonials);
    setCareerTimeline(defaultCareerTimeline);
    setMilestones(defaultMilestones);
  };

  const value: ContentContextType = {
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    galleryImages,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    achievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    careerTimeline,
    addCareerEvent,
    updateCareerEvent,
    deleteCareerEvent,
    milestones,
    addMilestone,
    updateMilestone,
    deleteMilestone,
    resetAllData
  };

  // Show loading state while fetching from Supabase
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A961] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
