import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useContent } from '../../contexts/ContentContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2, Star, Search, Upload, X, Loader2, Save, Check } from 'lucide-react';
import { GalleryImage } from '../../data/gallery-images';
import { CMSGuide } from '../../components/admin/CMSGuide';
import { uploadImage, deleteImage, STORAGE_BUCKETS, isSupabaseUrl } from '../../lib/supabase';
import * as supabaseDb from '../../lib/supabase-db';

// Gallery Manager with Mobile Image Upload Support - v2.0
export function AdminGallery() {
  const { galleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const categories = ['all', ...Array.from(new Set(galleryImages.map(i => i.category)))];

  const filteredImages = galleryImages.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || image.category === filterCategory;
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
    
    if (!selectedFile && !editingImage) {
      alert('Please select an image');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      let imageUrl = editingImage?.imageUrl || '';
      
      // Upload new image to Supabase if a file was selected
      if (selectedFile) {
        // Delete old image if it's a Supabase image
        if (editingImage?.imageUrl && isSupabaseUrl(editingImage.imageUrl)) {
          try {
            await deleteImage(editingImage.imageUrl, STORAGE_BUCKETS.GALLERY);
          } catch (error) {
            console.warn('Failed to delete old image:', error);
          }
        }
        
        // Upload new image
        imageUrl = await uploadImage(selectedFile, STORAGE_BUCKETS.GALLERY, 'gallery');
      }
      
      const tagsInput = (formData.get('tags') as string) || '';
      const imageData: GalleryImage = {
        id: editingImage?.id || Date.now().toString(),
        title: formData.get('title') as string,
        description: (formData.get('description') as string) || '',
        imageUrl: imageUrl,
        category: formData.get('category') as string,
        tags: tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [],
        date: (formData.get('date') as string) || '',
        featured: formData.get('featured') === 'on',
      };

      // Save to Supabase
      if (editingImage) {
        await supabaseDb.updateGalleryImage(editingImage.id, imageData);
        updateGalleryImage(editingImage.id, imageData);
      } else {
        await supabaseDb.createGalleryImage(imageData);
        addGalleryImage(imageData);
      }

      setShowForm(false);
      setEditingImage(null);
      setSelectedFile(null);
      setPreviewUrl('');
      setHasUnsavedChanges(true);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setHasUnsavedChanges(false);
      }, 2000);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please check your Supabase configuration and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const image = galleryImages.find(img => img.id === id);
      
      // Delete from Supabase if it's a Supabase image
      if (image?.imageUrl && isSupabaseUrl(image.imageUrl)) {
        try {
          await deleteImage(image.imageUrl, STORAGE_BUCKETS.GALLERY);
        } catch (error) {
          console.warn('Failed to delete image from Supabase:', error);
        }
      }
      
      // Delete from Supabase database
      try {
        await supabaseDb.deleteGalleryImage(id);
        deleteGalleryImage(id);
        setHasUnsavedChanges(true);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setHasUnsavedChanges(false);
        }, 2000);
      } catch (error) {
        console.error('Error deleting gallery image:', error);
        alert('Failed to delete gallery image. Please try again.');
      }
    }
  };

  const toggleFeatured = async (image: GalleryImage) => {
    const updated = { featured: !image.featured };
    try {
      await supabaseDb.updateGalleryImage(image.id, updated);
      updateGalleryImage(image.id, updated);
      setHasUnsavedChanges(true);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setHasUnsavedChanges(false);
      }, 2000);
    } catch (error) {
      console.error('Error updating featured status:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#0A1929] mb-2">Gallery</h1>
            <p className="text-gray-600 font-['Inter']">Manage gallery images</p>
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
                setEditingImage(null);
                setShowForm(true);
              }}
              className="font-['Inter']"
              style={{ background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)' }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Image
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
                    placeholder="Search gallery..."
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
                {editingImage ? 'Edit Image' : 'Add New Image'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      defaultValue={editingImage?.title}
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
                      defaultValue={editingImage?.category || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    >
                      <option value="">Select Category</option>
                      <option value="Community">Community</option>
                      <option value="Professional">Professional</option>
                      <option value="Events">Events</option>
                      <option value="Awards">Awards</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={editingImage?.description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Image {!editingImage && '*'}
                  </label>
                  
                  {/* Preview existing image when editing */}
                  {editingImage && !previewUrl && (
                    <div className="mb-4">
                      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={editingImage.imageUrl}
                          alt="Current image"
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
                      id="image-upload"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#C9A961] hover:bg-gray-50 transition-all"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <div className="text-center">
                        <p className="font-['Inter'] font-medium text-gray-700">
                          {editingImage ? 'Upload New Image (Optional)' : 'Upload Image from Device'}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      defaultValue={editingImage?.date}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      defaultValue={editingImage?.tags?.join(', ') || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 font-['Inter'] text-gray-700">
                    <input
                      type="checkbox"
                      name="featured"
                      defaultChecked={editingImage?.featured}
                      className="w-4 h-4 text-[#C9A961] focus:ring-[#C9A961] rounded"
                    />
                    Featured Image
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
                      editingImage ? 'Update Image' : 'Add Image'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingImage(null);
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

        {/* Gallery Grid */}
        {!showForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="aspect-square relative group">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {image.featured && (
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleFeatured(image)}
                      className="bg-white"
                    >
                      <Star className={`h-4 w-4 ${image.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(image)}
                      className="bg-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(image.id)}
                      className="bg-white text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-['Inter'] font-medium text-[#0A1929] mb-1">{image.title}</h4>
                  <p className="text-sm text-gray-600 font-['Inter'] mb-2">{image.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 font-['Inter']">
                    <span>{image.category}</span>
                    <span>{image.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!showForm && filteredImages.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 font-['Inter']">No images found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}