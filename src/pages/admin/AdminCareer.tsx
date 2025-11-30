import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useContent } from '../../contexts/ContentContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2, Search, Briefcase, GraduationCap, Users, Loader2, Check } from 'lucide-react';
import { CareerEvent } from '../../data/career-timeline';
import * as supabaseDb from '../../lib/supabase-db';

export function AdminCareer() {
  const { careerTimeline, addCareerEvent, updateCareerEvent, deleteCareerEvent } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingEvent, setEditingEvent] = useState<CareerEvent | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const types = ['all', 'professional', 'education', 'community'];

  const filteredEvents = careerTimeline.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesType;
  }).sort((a, b) => a.order - b.order);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const eventData: CareerEvent = {
        id: editingEvent?.id || Date.now().toString(),
        year: formData.get('year') as string,
        title: formData.get('title') as string,
        company: formData.get('company') as string,
        description: formData.get('description') as string,
        type: formData.get('type') as 'professional' | 'education' | 'community',
        order: parseInt(formData.get('order') as string) || careerTimeline.length + 1,
      };

      // Save to Supabase
      if (editingEvent) {
        await supabaseDb.updateCareerEvent(editingEvent.id, eventData);
        updateCareerEvent(editingEvent.id, eventData);
      } else {
        await supabaseDb.createCareerEvent(eventData);
        addCareerEvent(eventData);
      }

      setShowForm(false);
      setEditingEvent(null);
      setHasUnsavedChanges(true);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setHasUnsavedChanges(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving career event:', error);
      alert('Failed to save career event. Please check your Supabase configuration and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (event: CareerEvent) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this career event?')) {
      try {
        await supabaseDb.deleteCareerEvent(id);
        deleteCareerEvent(id);
        setHasUnsavedChanges(true);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setHasUnsavedChanges(false);
        }, 2000);
      } catch (error) {
        console.error('Error deleting career event:', error);
        alert('Failed to delete career event. Please try again.');
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'professional':
        return <Briefcase className="h-5 w-5" />;
      case 'education':
        return <GraduationCap className="h-5 w-5" />;
      case 'community':
        return <Users className="h-5 w-5" />;
      default:
        return <Briefcase className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'professional':
        return 'from-blue-500 to-blue-600';
      case 'education':
        return 'from-purple-500 to-purple-600';
      case 'community':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#0A1929] mb-2">Career Timeline</h1>
            <p className="text-gray-600 font-['Inter']">Manage career history and milestones</p>
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
                setEditingEvent(null);
                setShowForm(true);
              }}
              className="font-['Inter']"
              style={{ background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)' }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>

        {/* Filters */}
        {!showForm && (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search career events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
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
                {editingEvent ? 'Edit Career Event' : 'New Career Event'}
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
                      placeholder="e.g. 2020 - Present or 1999"
                      defaultValue={editingEvent?.year}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <select
                      name="type"
                      required
                      defaultValue={editingEvent?.type}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    >
                      <option value="professional">Professional</option>
                      <option value="education">Education</option>
                      <option value="community">Community</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="e.g. Sr. GM Operations"
                      defaultValue={editingEvent?.title}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Company/Organization *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      placeholder="e.g. Lantabur Group"
                      defaultValue={editingEvent?.company}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    placeholder="Describe your role, responsibilities, and achievements..."
                    defaultValue={editingEvent?.description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                    Display Order *
                  </label>
                  <input
                    type="number"
                    name="order"
                    required
                    min="1"
                    defaultValue={editingEvent?.order || careerTimeline.length + 1}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                  <p className="text-xs text-gray-500 mt-1 font-['Inter']">Lower numbers appear first (most recent first)</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="font-['Inter']"
                    style={{ background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)' }}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      editingEvent ? 'Update Event' : 'Create Event'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingEvent(null);
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

        {/* Timeline List */}
        {!showForm && (
          <div className="space-y-6">
            {filteredEvents.map((event, index) => (
              <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Timeline Icon */}
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-br ${getTypeColor(event.type)}`}>
                        {getTypeIcon(event.type)}
                      </div>
                      {index < filteredEvents.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-['Inter'] font-semibold px-3 py-1 rounded-full" style={{
                              background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)',
                              color: 'white'
                            }}>
                              {event.year}
                            </span>
                            <span className="text-xs font-['Inter'] px-2 py-1 bg-gray-100 text-gray-600 rounded capitalize">
                              {event.type}
                            </span>
                          </div>
                          <h3 className="text-[#0A1929] mb-1">{event.title}</h3>
                          <p className="text-sm text-gray-600 font-['Inter'] font-medium mb-3">{event.company}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(event)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(event.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 font-['Inter'] leading-relaxed mb-3">
                        {event.description}
                      </p>
                      
                      <div className="text-xs text-gray-400 font-['Inter']">
                        Order: {event.order}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!showForm && filteredEvents.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 font-['Inter']">No career events found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
