import { useState, useEffect } from 'react';
import { X, Heart, Share2, Download, Search } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

// Default gallery photos - will be replaced with localStorage data
const defaultPhotos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1762006222425-cb6e6b5045f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjM4NzcwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'CNBL Annual Gathering 2024',
    category: 'CNBL',
    date: 'November 15, 2024',
    location: 'Dhaka, Bangladesh',
    description: 'Building bridges across generations'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1748347568194-c8cd8edd27da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwaW5kdXN0cmlhbCUyMG9wZXJhdGlvbnN8ZW58MXx8fHwxNjc2Mzg5MDEwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Factory Operations Leadership',
    category: 'Corporate',
    date: 'October 2024',
    location: 'Lantabur Group',
    description: 'Leading operational excellence initiatives'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1645559946960-c002b6e9d559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZWR1Y2F0aW9uJTIwYnVpbGRpbmd8ZW58MXx8fHwxNjc2Mzg5MDEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Batch 99 Reunion',
    category: 'Batch Reunions',
    date: 'September 2024',
    location: 'Notre Dame College',
    description: 'Celebrating 25 years of friendship'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1564069970419-0bc8e7b487da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwaGFuZHNoYWtlJTIwdGVhbXdvcmt8ZW58MXx8fHwxNjc2Mzg5MDEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Industry Leadership Forum',
    category: 'Conferences',
    date: 'August 2024',
    location: 'Dhaka',
    description: 'Keynote speech on operational excellence'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1758691736424-4b4273948341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NjM4OTAxMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Excellence Award Ceremony',
    category: 'Awards',
    date: 'July 2024',
    location: 'Lantabur Group',
    description: 'Recognition for outstanding performance'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1762006222425-cb6e6b5045f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjM4NzcwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'CNBL Community Event',
    category: 'CNBL',
    date: 'June 2024',
    location: 'Dhaka',
    description: 'Community engagement and networking'
  }
];

export function GalleryPage() {
  const { galleryImages } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [visibleCount, setVisibleCount] = useState(12); // Show 12 photos initially
  
  // Transform gallery images from ContentContext to photos format
  const photos = galleryImages.length > 0 
    ? galleryImages.map((img) => ({
        id: parseInt(img.id) || img.id,
        src: img.imageUrl,
        title: img.title,
        category: img.category,
        date: img.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        location: img.location || 'Dhaka, Bangladesh',
        description: img.description
      }))
    : defaultPhotos;

  const categories = ['All', ...Array.from(new Set(photos.map(p => p.category)))];

  // Dynamically create albums from actual categories in the gallery
  const albums = categories
    .filter(cat => cat !== 'All') // Exclude 'All' category
    .map(category => {
      const categoryPhotos = photos.filter(p => p.category === category);
      const firstPhoto = categoryPhotos[0];
      
      return {
        title: category,
        cover: firstPhoto?.src || '',
        count: categoryPhotos.length,
        category: category
      };
    })
    .filter(album => album.count > 0) // Only show albums with photos
    .concat([
      // Add "All Photos" album at the end
      {
        title: 'All Photos',
        cover: photos[0]?.src || '',
        count: photos.length,
        category: 'All'
      }
    ]);

  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory]);

  // Get visible photos based on pagination
  const visiblePhotos = filteredPhotos.slice(0, visibleCount);
  const hasMorePhotos = filteredPhotos.length > visibleCount;

  // Load more photos handler
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <div className="bg-[#FAFAF9]">
      {/* Premium Page Header */}
      <div className="relative h-80 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-white mb-4 font-['Montserrat'] animate-fade-in-down">Photo Gallery</h1>
          <p className="text-xl text-gray-200 font-['Inter'] max-w-2xl mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            A Visual Journey Through Professional & Community Life
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-300 font-['Inter'] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/" className="hover:text-[#C9A961] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-[#C9A961]">Gallery</span>
          </div>
        </div>
      </div>

      {/* Filter & Sort Options */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-[#003366] hover:bg-[#004488]' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search photos..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Photo */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-video">
              <ImageWithFallback
                src={photos[0].src}
                alt={photos[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <h2 className="text-white mb-2">{photos[0].title}</h2>
              <div className="text-gray-200">
                📅 {photos[0].date} | 📍 {photos[0].location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePhotos.map((photo) => (
              <Card
                key={photo.id}
                className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setLightboxImage(photo.id)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="icon" variant="secondary" className="rounded-full">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-[#E6F2FF] text-[#003366]">{photo.category}</Badge>
                  <h3 className="mb-1">{photo.title}</h3>
                  <p className="text-sm text-gray-600">{photo.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {hasMorePhotos && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleLoadMore}
                className="px-8 py-6 rounded-xl font-['Inter'] font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: '#C9A961',
                  color: '#0A1929'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#0A1929';
                  e.currentTarget.style.borderColor = '#C9A961';
                }}
              >
                Load More Photos ({filteredPhotos.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Photo Albums */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-[#003366]">Photo Albums</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {albums.map((album, idx) => (
              <Card
                key={idx}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory(album.category)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <ImageWithFallback
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm mb-1">{album.title}</h3>
                  <p className="text-xs text-gray-600">{album.count} photos</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="max-w-5xl w-full">
            <div className="aspect-video mb-4">
              <ImageWithFallback
                src={photos.find(p => p.id === lightboxImage)?.src || ''}
                alt={photos.find(p => p.id === lightboxImage)?.title || ''}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <h3 className="mb-2">{photos.find(p => p.id === lightboxImage)?.title}</h3>
              <p className="text-sm text-gray-300 mb-4">
                Date: {photos.find(p => p.id === lightboxImage)?.date} | 
                Location: {photos.find(p => p.id === lightboxImage)?.location}
              </p>

              <div className="flex gap-4">
                <Button size="sm" variant="secondary">
                  <Heart className="mr-2 h-4 w-4" />
                  Like
                </Button>
                <Button size="sm" variant="secondary">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button size="sm" variant="secondary">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}