import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useContent } from '../../contexts/ContentContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Upload, X, Loader2, Check } from 'lucide-react';
import { BlogPost } from '../../data/blog-posts';
import { CMSGuide } from '../../components/admin/CMSGuide';
import { uploadImage, deleteImage, STORAGE_BUCKETS, isSupabaseUrl } from '../../lib/supabase';
import * as supabaseDb from '../../lib/supabase-db';

// Blog CMS with Mobile Image Upload Support - v2.0
export function AdminBlog() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, refreshBlogPosts } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const categories = ['all', ...Array.from(new Set(blogPosts.map(p => p.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedFile && !editingPost) {
      alert('Please select a featured image');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      let imageUrl = editingPost?.imageUrl || '';
      
      // Upload new image to Supabase if a file was selected
      if (selectedFile) {
        // Delete old image if it's a Supabase image
        if (editingPost?.imageUrl && isSupabaseUrl(editingPost.imageUrl)) {
          try {
            await deleteImage(editingPost.imageUrl, STORAGE_BUCKETS.BLOG);
          } catch (error) {
            console.warn('Failed to delete old image:', error);
          }
        }
        
        // Upload new image
        imageUrl = await uploadImage(selectedFile, STORAGE_BUCKETS.BLOG, 'blog');
      }
      
      const postData: BlogPost = {
        id: editingPost?.id || Date.now().toString(),
        title: formData.get('title') as string,
        excerpt: formData.get('excerpt') as string,
        content: formData.get('content') as string,
        author: formData.get('author') as string,
        date: formData.get('date') as string,
        category: formData.get('category') as string,
        tags: (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(t => t.length > 0),
        imageUrl: imageUrl,
        featured: formData.get('featured') === 'on',
        published: formData.get('published') === 'on',
      };

      // Save to Supabase
      if (editingPost) {
        // Exclude id from updates since it's passed separately
        const { id, ...updates } = postData;
        await supabaseDb.updateBlogPost(editingPost.id, updates);
        updateBlogPost(editingPost.id, postData); // Also update local state (include id for context)
      } else {
        const createdPost = await supabaseDb.createBlogPost(postData);
        if (createdPost) {
          addBlogPost(createdPost); // Also update local state
        }
      }

      // Refresh blog posts from Supabase to ensure sync
      await refreshBlogPosts();

      setShowForm(false);
      setEditingPost(null);
      setSelectedFile(null);
      setPreviewUrl('');
      setHasUnsavedChanges(true);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setHasUnsavedChanges(false);
      }, 2000);
    } catch (error: any) {
      console.error('Error saving blog post:', error);
      const errorMessage = error?.message || 'Unknown error occurred';
      alert(`Failed to save blog post:\n\n${errorMessage}\n\nPlease check your Supabase configuration and try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setSelectedFile(null);
    setPreviewUrl('');
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const post = blogPosts.find(p => p.id === id);
      
      // Delete image from Supabase if it's a Supabase image
      if (post?.imageUrl && isSupabaseUrl(post.imageUrl)) {
        try {
          await deleteImage(post.imageUrl, STORAGE_BUCKETS.BLOG);
        } catch (error) {
          console.warn('Failed to delete image from Supabase:', error);
        }
      }
      
      // Delete from Supabase
      try {
        await supabaseDb.deleteBlogPost(id);
        deleteBlogPost(id); // Also update local state
        setHasUnsavedChanges(true);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setHasUnsavedChanges(false);
        }, 2000);
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Failed to delete blog post. Please try again.');
      }
    }
  };

  const togglePublished = async (post: BlogPost) => {
    const updated = { published: !post.published };
    try {
      await supabaseDb.updateBlogPost(post.id, updated);
      updateBlogPost(post.id, updated);
      setHasUnsavedChanges(true);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setHasUnsavedChanges(false);
      }, 2000);
    } catch (error) {
      console.error('Error updating published status:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#0A1929] mb-2">Blog Posts</h1>
            <p className="text-gray-600 font-['Inter']">Manage blog posts and articles</p>
          </div>
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2">
                {saveSuccess ? (
                  <span className="text-green-600 text-sm font-['Inter'] flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Saved!
                  </span>
                ) : (
                  <span className="text-yellow-600 text-sm font-['Inter'] animate-pulse">
                    ⚠️ Changes made
                  </span>
                )}
              </div>
            )}
            <Button
              onClick={() => {
                setEditingPost(null);
                setSelectedFile(null);
                setPreviewUrl('');
                setShowForm(true);
              }}
              className="font-['Inter']"
              style={{ background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)' }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Blog Post
            </Button>
          </div>
        </div>

        {/* CMS Guide */}
        {showForm && <CMSGuide />}

        {/* Filters */}
        {!showForm && (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        {showForm && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-[#0A1929] mb-6">
                {editingPost ? 'Edit Blog Post' : 'New Blog Post'}
              </h3>
              <form key={editingPost?.id || 'new'} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      defaultValue={editingPost?.title}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      required
                      defaultValue={editingPost?.author || 'Engr. M M Nazrul Islam'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    name="excerpt"
                    required
                    rows={2}
                    defaultValue={editingPost?.excerpt}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={8}
                    defaultValue={editingPost?.content}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      required
                      defaultValue={editingPost?.category}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      defaultValue={editingPost?.date}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Tags (comma separated) *
                    </label>
                    <input
                      type="text"
                      name="tags"
                      required
                      defaultValue={editingPost?.tags.join(', ')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                </div>

                {/* Featured Image Upload Section */}
                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Featured Image {!editingPost && '*'}
                  </label>
                  
                  {/* Preview existing image when editing */}
                  {editingPost && !previewUrl && (
                    <div className="mb-4">
                      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={editingPost.imageUrl}
                          alt="Current featured image"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-['Inter']">
                          Current Image
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Preview new uploaded image */}
                  {previewUrl && (
                    <div className="mb-4">
                      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* File Upload Input */}
                  <div className="relative">
                    <input
                      type="file"
                      id="blog-image-upload"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="blog-image-upload"
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#C9A961] hover:bg-gray-50 transition-all"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <div className="text-center">
                        <p className="font-['Inter'] font-medium text-gray-700">
                          {editingPost ? 'Upload New Featured Image (Optional)' : 'Upload Featured Image from Device'}
                        </p>
                        <p className="text-xs text-gray-500 font-['Inter'] mt-1">
                          Click to choose from gallery or camera • Max 5MB
                        </p>
                      </div>
                    </label>
                  </div>
                  
                  {selectedFile && (
                    <p className="text-sm text-gray-600 font-['Inter'] mt-2">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 font-['Inter'] text-gray-700">
                    <input
                      type="checkbox"
                      name="featured"
                      defaultChecked={editingPost?.featured}
                      className="w-4 h-4 text-[#C9A961] focus:ring-[#C9A961] rounded"
                    />
                    Featured Post
                  </label>
                  <label className="flex items-center gap-2 font-['Inter'] text-gray-700">
                    <input
                      type="checkbox"
                      name="published"
                      defaultChecked={editingPost?.published ?? true}
                      className="w-4 h-4 text-[#C9A961] focus:ring-[#C9A961] rounded"
                    />
                    Published
                  </label>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="font-['Inter']"
                    style={{ background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)' }}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      editingPost ? 'Update Post' : 'Create Post'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingPost(null);
                      setSelectedFile(null);
                      setPreviewUrl('');
                    }}
                    className="font-['Inter']"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Blog Posts List */}
        {!showForm && (
          <div className="grid grid-cols-1 gap-4">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-[#0A1929] mb-1">{post.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500 font-['Inter']">
                            <span>{post.category}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.author}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => togglePublished(post)}
                            title={post.published ? 'Unpublish' : 'Publish'}
                          >
                            {post.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 font-['Inter'] text-sm mb-3">{post.excerpt}</p>
                      <div className="flex gap-2">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-['Inter']"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {post.featured && (
                        <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-['Inter'] font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!showForm && filteredPosts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 font-['Inter']">No blog posts found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
