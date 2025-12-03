import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useContent } from '../../contexts/ContentContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2, Star, Search, Upload, X, Loader2, Check } from 'lucide-react';
import { Testimonial } from '../../data/testimonials';
import { uploadImage, deleteImage, STORAGE_BUCKETS, isSupabaseUrl } from '../../lib/supabase';
import * as supabaseDb from '../../lib/supabase-db';

export function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => a.order - b.order);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setSelectedFile(file);
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
    
    if (!selectedFile && !editingTestimonial) {
      alert('Please upload a profile image');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      let imageUrl = editingTestimonial?.imageUrl || '';
      
      // Upload new image to Supabase if a file was selected
      if (selectedFile) {
        // Delete old image if it's a Supabase image
        if (editingTestimonial?.imageUrl && isSupabaseUrl(editingTestimonial.imageUrl)) {
          try {
            await deleteImage(editingTestimonial.imageUrl, STORAGE_BUCKETS.TESTIMONIALS);
          } catch (error) {
            console.warn('Failed to delete old image:', error);
          }
        }
        
        // Upload new image
        imageUrl = await uploadImage(selectedFile, STORAGE_BUCKETS.TESTIMONIALS, 'testimonials');
      }
      
      const testimonialData: Testimonial = {
        id: editingTestimonial?.id || Date.now().toString(),
        name: formData.get('name') as string,
        role: formData.get('role') as string,
        company: formData.get('company') as string,
        content: formData.get('content') as string,
        imageUrl: imageUrl,
        featured: formData.get('featured') === 'on',
        order: parseInt(formData.get('order') as string) || testimonials.length + 1,
      };

      // Save to Supabase
      if (editingTestimonial) {
        await supabaseDb.updateTestimonial(editingTestimonial.id, testimonialData);
        updateTestimonial(editingTestimonial.id, testimonialData);
      } else {
        await supabaseDb.createTestimonial(testimonialData);
        addTestimonial(testimonialData);
      }

      setShowForm(false);
      setEditingTestimonial(null);
      setSelectedFile(null);
      setPreviewUrl('');
      setHasUnsavedChanges(true);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setHasUnsavedChanges(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Failed to save testimonial. Please check your Supabase configuration and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      const testimonial = testimonials.find(t => t.id === id);
      
      // Delete image from Supabase if it's a Supabase image
      if (testimonial?.imageUrl && isSupabaseUrl(testimonial.imageUrl)) {
        try {
          await deleteImage(testimonial.imageUrl, STORAGE_BUCKETS.TESTIMONIALS);
        } catch (error) {
          console.warn('Failed to delete image from Supabase:', error);
        }
      }
      
      // Delete from Supabase
      try {
        await supabaseDb.deleteTestimonial(id);
        deleteTestimonial(id);
        setHasUnsavedChanges(true);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setHasUnsavedChanges(false);
        }, 2000);
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Failed to delete testimonial. Please try again.');
      }
    }
  };

  const toggleFeatured = (testimonial: Testimonial) => {
    updateTestimonial(testimonial.id, { featured: !testimonial.featured });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#0A1929] mb-2">Testimonials</h1>
            <p className="text-gray-600 font-['Inter']">Manage testimonials and reviews</p>
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
                setEditingTestimonial(null);
                setShowForm(true);
              }}
              className="font-['Inter']"
              style={{ background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)' }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Testimonial
            </Button>
          </div>
        </div>

        {/* Search */}
        {!showForm && (
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search testimonials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        {showForm && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-[#0A1929] mb-6">
                {editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={editingTestimonial?.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Role/Title *
                    </label>
                    <input
                      type="text"
                      name="role"
                      required
                      defaultValue={editingTestimonial?.role}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Company/Organization *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    defaultValue={editingTestimonial?.company}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Testimonial Content *
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={5}
                    defaultValue={editingTestimonial?.content}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Profile Image {!editingTestimonial && '*'}
                  </label>
                  
                  {/* Preview existing image when editing */}
                  {editingTestimonial && !previewUrl && (
                    <div className="mb-4">
                      <div className="relative w-32 h-32 bg-gray-100 rounded-full overflow-hidden mx-auto">
                        <img
                          src={editingTestimonial.imageUrl}
                          alt="Current profile image"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-['Inter']">
                          Current
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Preview new uploaded image */}
                  {previewUrl && (
                    <div className="mb-4">
                      <div className="relative w-32 h-32 bg-gray-100 rounded-full overflow-hidden mx-auto">
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
                      id="testimonial-image-upload"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="testimonial-image-upload"
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#C9A961] hover:bg-gray-50 transition-all"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <div className="text-center">
                        <p className="font-['Inter'] font-medium text-gray-700">
                          {editingTestimonial ? 'Upload New Profile Image (Optional)' : 'Upload Profile Image from Device'}
                        </p>
                        <p className="text-xs text-gray-500 font-['Inter'] mt-1">
                          Click to choose from gallery or camera • Max 20MB (auto-compressed to 5MB)
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
                      Display Order *
                    </label>
                    <input
                      type="number"
                      name="order"
                      required
                      min="1"
                      defaultValue={editingTestimonial?.order || testimonials.length + 1}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                    <p className="text-xs text-gray-500 mt-1 font-['Inter']">Lower numbers appear first</p>
                  </div>
                  <div className="flex items-center pt-7">
                    <label className="flex items-center gap-2 font-['Inter'] text-gray-700">
                      <input
                        type="checkbox"
                        name="featured"
                        defaultChecked={editingTestimonial?.featured}
                        className="w-4 h-4 text-[#C9A961] focus:ring-[#C9A961] rounded"
                      />
                      Featured on Homepage
                    </label>
                  </div>
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
                      editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingTestimonial(null);
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

        {/* Testimonials List */}
        {!showForm && (
          <div className="grid grid-cols-1 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-[#0A1929] mb-1">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600 font-['Inter']">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleFeatured(testimonial)}
                            title={testimonial.featured ? 'Remove from featured' : 'Mark as featured'}
                          >
                            <Star className={`h-4 w-4 ${testimonial.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(testimonial)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(testimonial.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 font-['Inter'] italic mb-3">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 font-['Inter']">
                        <span>Order: {testimonial.order}</span>
                        {testimonial.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!showForm && filteredTestimonials.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 font-['Inter']">No testimonials found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
