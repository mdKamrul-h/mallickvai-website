import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useContent } from '../../contexts/ContentContext';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2, Search, TrendingUp, Award, Users, GraduationCap, Loader2, Check } from 'lucide-react';
import { Achievement } from '../../data/achievements';
import * as supabaseDb from '../../lib/supabase-db';

const iconOptions = [
  { value: 'TrendingUp', label: 'Trending Up', icon: TrendingUp },
  { value: 'Award', label: 'Award', icon: Award },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'GraduationCap', label: 'Graduation Cap', icon: GraduationCap },
];

export function AdminAchievements() {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const categories = ['all', ...Array.from(new Set(achievements.map(a => a.category)))];

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || achievement.category === filterCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.order - b.order);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const achievementData: Achievement = {
        id: editingAchievement?.id || Date.now().toString(),
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        metric: formData.get('metric') as string,
        icon: formData.get('icon') as string,
        category: formData.get('category') as string,
        year: formData.get('year') as string || undefined,
        order: parseInt(formData.get('order') as string) || achievements.length + 1,
      };

      // Save to Supabase
      if (editingAchievement) {
        await supabaseDb.updateAchievement(editingAchievement.id, achievementData);
        updateAchievement(editingAchievement.id, achievementData);
      } else {
        await supabaseDb.createAchievement(achievementData);
        addAchievement(achievementData);
      }

      setShowForm(false);
      setEditingAchievement(null);
      setHasUnsavedChanges(true);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setHasUnsavedChanges(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving achievement:', error);
      alert('Failed to save achievement. Please check your Supabase configuration and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await supabaseDb.deleteAchievement(id);
        deleteAchievement(id);
        setHasUnsavedChanges(true);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          setHasUnsavedChanges(false);
        }, 2000);
      } catch (error) {
        console.error('Error deleting achievement:', error);
        alert('Failed to delete achievement. Please try again.');
      }
    }
  };

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption ? iconOption.icon : TrendingUp;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#0A1929] mb-2">Achievements</h1>
            <p className="text-gray-600 font-['Inter']">Manage achievements and milestones</p>
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
                setEditingAchievement(null);
                setShowForm(true);
              }}
              className="font-['Inter']"
              style={{ background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)' }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Achievement
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
                    placeholder="Search achievements..."
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
                {editingAchievement ? 'Edit Achievement' : 'New Achievement'}
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
                      defaultValue={editingAchievement?.title}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Metric *
                    </label>
                    <input
                      type="text"
                      name="metric"
                      required
                      placeholder="e.g. $27M, 25+ Years"
                      defaultValue={editingAchievement?.metric}
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
                    rows={3}
                    defaultValue={editingAchievement?.description}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Icon *
                    </label>
                    <select
                      name="icon"
                      required
                      defaultValue={editingAchievement?.icon}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    >
                      {iconOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      required
                      placeholder="e.g. Professional, Community"
                      defaultValue={editingAchievement?.category}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-['Inter'] font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    <input
                      type="text"
                      name="year"
                      placeholder="e.g. 2024 or 1999-2024"
                      defaultValue={editingAchievement?.year}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                    />
                  </div>
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
                    defaultValue={editingAchievement?.order || achievements.length + 1}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  />
                  <p className="text-xs text-gray-500 mt-1 font-['Inter']">Lower numbers appear first</p>
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
                      editingAchievement ? 'Update Achievement' : 'Create Achievement'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingAchievement(null);
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

        {/* Achievements Grid */}
        {!showForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => {
              const IconComponent = getIcon(achievement.icon);
              return (
                <Card key={achievement.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                      }}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(achievement)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(achievement.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C9A961] to-[#B76E79]">
                        {achievement.metric}
                      </span>
                    </div>
                    
                    <h3 className="text-[#0A1929] mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 font-['Inter'] text-sm mb-3">{achievement.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 font-['Inter']">
                      <span className="px-2 py-1 bg-gray-100 rounded">{achievement.category}</span>
                      {achievement.year && <span>{achievement.year}</span>}
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-400 font-['Inter']">
                      Order: {achievement.order}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!showForm && filteredAchievements.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 font-['Inter']">No achievements found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
