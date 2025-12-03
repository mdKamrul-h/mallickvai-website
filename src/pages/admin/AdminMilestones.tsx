import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useContent } from '../../contexts/ContentContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2, Star, Search, Upload, X, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import { Milestone } from '../../data/milestones';
import { CMSGuide } from '../../components/admin/CMSGuide';
import { uploadImage, deleteImage, STORAGE_BUCKETS, isSupabaseUrl } from '../../lib/supabase';
import * as supabaseDb from '../../lib/supabase-db';

export function AdminMilestones() {
  const { milestones, addMilestone, updateMilestone, deleteMilestone } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const categories = ['all', 'education', 'career', 'business', 'community', 'leadership'];

  const filteredMilestones = milestones.filter(milestone => {
    const matchesSearch = milestone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         milestone.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || milestone.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate files
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is larger than 5MB`);
        return false;
      }
      return true;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
    
    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePreview = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0 && (!editingMilestone || editingMilestone.images.length === 0)) {
      alert('Please add at least one image');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Start with existing images (excluding ones that were removed)
      let images = editingMilestone?.images || [];
      
      // Upload new images to Supabase
      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(file => 
          uploadImage(file, STORAGE_BUCKETS.MILESTONES, 'milestones')
        );
        const uploadedUrls = await Promise.all(uploadPromises);
        images = [...images, ...uploadedUrls];
      }
      
      const milestoneData: Milestone = {
        id: editingMilestone?.id || Date.now().toString(),
        year: formData.get('year') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as 'education' | 'career' | 'community' | 'business' | 'leadership',
        images: images,
        featured: formData.get('featured') === 'on',
      };

      // Save to Supabase
      if (editingMilestone) {
        await supabaseDb.updateMilestone(editingMilestone.id, milestoneData);
        updateMilestone(editingMilestone.id, milestoneData);
      } else {
        await supabaseDb.createMilestone(milestoneData);
        addMilestone(milestoneData);
      }

      setShowForm(false);
      setEditingMilestone(null);
      setSelectedFiles([]);
      setPreviewUrls([]);
      setHasUnsavedChanges(true);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setHasUnsavedChanges(false);
      }, 2000);
    } catch (error: any) {
      console.error('Error uploading images:', error);
      const errorMessage = error?.message || 'Unknown error occurred';
      alert(`Failed to upload images:\n\n${errorMessage}\n\nPlease check your Supabase configuration and try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setShowForm(true);
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      const milestone = milestones.find(m => m.id === id);
      
      // Delete all images from Supabase
      if (milestone?.images) {
        for (const imageUrl of milestone.images) {
          if (isSupabaseUrl(imageUrl)) {
            try {
              await deleteImage(imageUrl, STORAGE_BUCKETS.MILESTONES);
            } catch (error) {
              console.warn('Failed to delete image from Supabase:', error);
            }
          }
        }
      }
      
      // Delete from Supabase database
      try {
        await supabaseDb.deleteMilestone(id);
        deleteMilestone(id);
        setHasUnsavedChanges(true);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setHasUnsavedChanges(false);
        }, 2000);
      } catch (error) {
        console.error('Error deleting milestone:', error);
        alert('Failed to delete milestone. Please try again.');
      }
    }
  };

  const handleRemoveExistingImage = async (imageUrl: string) => {
    if (editingMilestone) {
      // Delete from Supabase if it's a Supabase image
      if (isSupabaseUrl(imageUrl)) {
        try {
          await deleteImage(imageUrl, STORAGE_BUCKETS.MILESTONES);
        } catch (error) {
          console.warn('Failed to delete image from Supabase:', error);
        }
      }
      
      const updatedImages = editingMilestone.images.filter(img => img !== imageUrl);
      setEditingMilestone({ ...editingMilestone, images: updatedImages });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#0A1929] mb-2">Milestones</h1>
            <p className="text-gray-600 font-['Inter']">Manage life milestones and achievements</p>
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
                setEditingMilestone(null);
                setShowForm(true);
                setSelectedFiles([]);
                setPreviewUrls([]);
              }}
              className="font-['Inter']"
              style={{ background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)' }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Milestone
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
                    placeholder="Search milestones..."
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
                      {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
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
                {editingMilestone ? 'Edit Milestone' : 'New Milestone'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Year/Period *
                    </label>
                    <input
                      type="text"
                      name="year"
                      required
                      placeholder="e.g., 2024 or 2020-2023"
                      defaultValue={editingMilestone?.year}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      required
                      defaultValue={editingMilestone?.category}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    >
                      <option value="education">Education</option>
                      <option value="career">Career</option>
                      <option value="business">Business</option>
                      <option value="community">Community</option>
                      <option value="leadership">Leadership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingMilestone?.title}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    defaultValue={editingMilestone?.description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>

                {/* Existing Images */}
                {editingMilestone && editingMilestone.images.length > 0 && (
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Current Images
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                      {editingMilestone.images.map((imageUrl, index) => (
                        <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                          <img
                            src={imageUrl}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(imageUrl)}
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Add Images (Optional)
                  </label>
                  
                  {/* Preview new images */}
                  {previewUrls.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePreview(index)}
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* File Upload Input */}
                  <div className="relative">
                    <input
                      type="file"
                      id="milestone-image-upload"
                      accept="image/*"
                      capture="environment"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="milestone-image-upload"
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#C9A961] hover:bg-gray-50 transition-all"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <div className="text-center">
                        <p className="font-['Inter'] font-medium text-gray-700">
                          Upload Images from Device
                        </p>
                        <p className="text-xs text-gray-500 font-['Inter'] mt-1">
                          Click to choose from gallery or camera • Multiple images • Max 20MB each (auto-compressed to 5MB)
                        </p>
                      </div>
                    </label>
                  </div>
                  
                  {selectedFiles.length > 0 && (
                    <p className="text-sm text-gray-600 font-['Inter'] mt-2">
                      {selectedFiles.length} image(s) selected
                    </p>
                  )}
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 font-['Inter'] text-gray-700">
                    <input
                      type="checkbox"
                      name="featured"
                      defaultChecked={editingMilestone?.featured}
                      className="w-4 h-4 text-[#C9A961] focus:ring-[#C9A961] rounded"
                    />
                    Featured Milestone
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
                      editingMilestone ? 'Update Milestone' : 'Create Milestone'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingMilestone(null);
                      setSelectedFiles([]);
                      setPreviewUrls([]);
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

        {/* Milestones List */}
        {!showForm && (
          <div className="grid grid-cols-1 gap-4">
            {filteredMilestones.map((milestone) => (
              <Card key={milestone.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Images Thumbnail */}
                    {milestone.images.length > 0 ? (
                      <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <img
                          src={milestone.images[0]}
                          alt={milestone.title}
                          className="w-full h-full object-cover"
                        />
                        {milestone.images.length > 1 && (
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded font-['Inter']">
                            +{milestone.images.length - 1}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-[#C9A961] text-white rounded text-xs font-['Inter'] font-bold">
                              {milestone.year}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-['Inter']">
                              {milestone.category}
                            </span>
                            {milestone.featured && (
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          <h3 className="text-[#0A1929] mb-1">{milestone.title}</h3>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(milestone)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(milestone.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 font-['Inter'] text-sm">{milestone.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!showForm && filteredMilestones.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 font-['Inter']">No milestones found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
