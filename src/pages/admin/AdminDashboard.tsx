import { AdminLayout } from '../../components/admin/AdminLayout';
import { useContent } from '../../contexts/ContentContext';
import { Card, CardContent } from '../../components/ui/card';
import { FileText, Image, Award, MessageSquare, Briefcase, TrendingUp, Smartphone, CheckCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

export function AdminDashboard() {
  const { blogPosts, galleryImages, achievements, testimonials, careerTimeline, milestones, resetAllData } = useContent();

  const stats = [
    {
      name: 'Blog Posts',
      value: blogPosts.length,
      published: blogPosts.filter(p => p.published).length,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/blog'
    },
    {
      name: 'Gallery Images',
      value: galleryImages.length,
      featured: galleryImages.filter(i => i.featured).length,
      icon: Image,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/gallery'
    },
    {
      name: 'Milestones',
      value: milestones.length,
      featured: milestones.filter(m => m.featured).length,
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
      link: '/admin/milestones'
    },
    {
      name: 'Journey',
      value: 'Manage',
      icon: MapPin,
      color: 'from-pink-500 to-pink-600',
      link: '/admin/journey'
    },
    {
      name: 'Achievements',
      value: achievements.length,
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      link: '/admin/achievements'
    },
    {
      name: 'Testimonials',
      value: testimonials.length,
      featured: testimonials.filter(t => t.featured).length,
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
      link: '/admin/testimonials'
    },
    {
      name: 'Career Events',
      value: careerTimeline.length,
      icon: Briefcase,
      color: 'from-red-500 to-red-600',
      link: '/admin/career'
    },
  ];

  const recentBlogPosts = blogPosts.slice(0, 5);
  const recentGalleryImages = galleryImages.slice(0, 6);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      resetAllData();
      window.location.reload();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#0A1929] mb-2">Dashboard</h1>
            <p className="text-gray-600 font-['Inter']">Manage your website content</p>
          </div>
          <Button
            onClick={handleReset}
            variant="outline"
            className="font-['Inter'] text-red-600 border-red-200 hover:bg-red-50"
          >
            Reset to Defaults
          </Button>
        </div>

        {/* CMS Info Banner */}
        <Card className="border-2 border-[#C9A961] bg-gradient-to-r from-[#FFF9E6] to-[#FFF0F5]">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A961] to-[#B76E79] flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#0A1929] mb-2 font-['Montserrat']">📱 Real-Time Mobile CMS</h3>
                <p className="text-gray-700 font-['Inter'] mb-3">
                  Your website now has a complete Content Management System! Upload images and write blogs directly from your mobile device - all changes are instant and saved in real-time.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-['Inter']">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">📸 <strong>Upload from mobile camera or gallery</strong> - Direct image upload with preview</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">✍️ <strong>Write & publish blog posts</strong> - Full blog editor with categories and tags</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">🖼️ <strong>Manage gallery photos</strong> - Add, edit, delete with featured image marking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">⚡ <strong>Instant updates</strong> - All changes appear immediately on your website</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#C9A961]/30">
                  <p className="text-sm text-gray-600 font-['Inter']">
                    <strong>Getting Started:</strong> Click any section below to manage content. For mobile upload, tap "Add Image" or "New Blog Post" and select from your device camera or gallery.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6">
          {stats.map((stat) => (
            <Link key={stat.name} to={stat.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl text-[#0A1929] mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-['Inter'] mb-2">{stat.name}</div>
                  {stat.published !== undefined && (
                    <div className="text-xs text-gray-500 font-['Inter']">
                      {stat.published} published
                    </div>
                  )}
                  {stat.featured !== undefined && (
                    <div className="text-xs text-gray-500 font-['Inter']">
                      {stat.featured} featured
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Blog Posts */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#0A1929]">Recent Blog Posts</h3>
                <Link to="/admin/blog">
                  <Button variant="outline" size="sm" className="font-['Inter']">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentBlogPosts.map((post) => (
                  <div key={post.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${post.published ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-['Inter'] font-medium text-[#0A1929] truncate">{post.title}</div>
                      <div className="text-sm text-gray-500 font-['Inter']">{post.category} • {post.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Gallery Images */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#0A1929]">Recent Gallery</h3>
                <Link to="/admin/gallery">
                  <Button variant="outline" size="sm" className="font-['Inter']">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {recentGalleryImages.map((image) => (
                  <div key={image.id} className="aspect-square rounded-lg overflow-hidden relative group">
                    <img 
                      src={image.imageUrl} 
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {image.featured && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-yellow-400" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-[#0A1929] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              <Link to="/admin/blog">
                <Button className="w-full font-['Inter']" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  New Blog Post
                </Button>
              </Link>
              <Link to="/admin/gallery">
                <Button className="w-full font-['Inter']" variant="outline">
                  <Image className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              </Link>
              <Link to="/admin/milestones">
                <Button className="w-full font-['Inter']" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  New Milestone
                </Button>
              </Link>
              <Link to="/admin/journey">
                <Button className="w-full font-['Inter']" variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Manage Journey
                </Button>
              </Link>
              <Link to="/admin/achievements">
                <Button className="w-full font-['Inter']" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  New Achievement
                </Button>
              </Link>
              <Link to="/admin/testimonials">
                <Button className="w-full font-['Inter']" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Testimonial
                </Button>
              </Link>
              <Link to="/admin/career">
                <Button className="w-full font-['Inter']" variant="outline">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Add Career Event
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
