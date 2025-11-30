import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Eye, Clock, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Input } from '../components/ui/input';

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Topics');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  const categories = [
    'All Topics',
    'Operations',
    'Leadership',
    'RMG Industry',
    'Supply Chain',
    'CNBL',
    'Career Advice'
  ];

  const featuredArticle = {
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJtZW50JTIwZmFjdG9yeSUyMHRleHRpbGV8ZW58MXx8fHwxNzYzODkwMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'The Future of RMG in Bangladesh: Opportunities & Challenges',
    excerpt: 'The ready-made garment industry stands at a crossroads. As we navigate global economic shifts, technological disruption, and sustainability demands, the path forward requires both innovation and adherence to our core strengths...',
    categories: ['Operations', 'RMG Industry'],
    date: 'November 20, 2024',
    readTime: '8 min read',
    views: '1,234'
  };

  const articles = [
    {
      image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFuJTIwbWFudWZhY3R1cmluZyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzYzODkwMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Lean Manufacturing: Lessons from 25 Years',
      excerpt: 'Implementing lean principles across 9700+ workforce has taught me invaluable lessons about continuous improvement and operational excellence.',
      category: 'Leadership',
      date: 'Nov 15',
      readTime: '7 min'
    },
    {
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMGxlYWRlcnNoaXB8ZW58MXx8fHwxNzYzODkwMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Building High-Performing Teams',
      excerpt: 'The secret to achieving $27M monthly shipments lies not just in processes, but in empowering your teams to excel.',
      category: 'Operations',
      date: 'Nov 12',
      readTime: '5 min'
    },
    {
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBuZXR3b3JraW5nfGVufDF8fHx8MTc2Mzg5MDEwNnww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Community Building in the Digital Age',
      excerpt: 'How CNBL has adapted to maintain strong connections across generations in an increasingly digital world.',
      category: 'CNBL',
      date: 'Nov 10',
      readTime: '6 min'
    },
    {
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbHklMjBjaGFpbiUyMGxvZ2lzdGljc3xlbnwxfHx8fDE3NjM4OTAxMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Supply Chain Optimization Strategies',
      excerpt: 'Practical approaches to streamlining your supply chain for maximum efficiency and cost savings.',
      category: 'Supply Chain',
      date: 'Nov 8',
      readTime: '9 min'
    },
    {
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBwcm9mZXNzaW9uYWwlMjBncm93dGh8ZW58MXx8fHwxNzYzODkwMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Career Growth in RMG Sector',
      excerpt: 'Essential skills and mindsets for building a successful career in the ready-made garment industry.',
      category: 'Career Advice',
      date: 'Nov 5',
      readTime: '6 min'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwdGVhbXdvcmt8ZW58MXx8fHwxNzYzODkwMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Effective Leadership in Operations',
      excerpt: 'Balancing operational excellence with employee development and engagement in large-scale manufacturing.',
      category: 'Leadership',
      date: 'Nov 1',
      readTime: '7 min'
    },
    {
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjM4OTAxMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Digital Transformation in Manufacturing',
      excerpt: 'How technology is reshaping the RMG industry and what leaders need to know to stay competitive.',
      category: 'RMG Industry',
      date: 'Oct 28',
      readTime: '8 min'
    },
    {
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJpbGl0eSUyMGdyZWVufGVufDF8fHx8MTc2Mzg5MDEwNnww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Sustainability in Garment Manufacturing',
      excerpt: 'Implementing eco-friendly practices while maintaining profitability and meeting global standards.',
      category: 'Operations',
      date: 'Oct 25',
      readTime: '10 min'
    },
    {
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3JzaGlwJTIwY29hY2hpbmd8ZW58MXx8fHwxNzYzODkwMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'The Power of Mentorship',
      excerpt: 'Reflections on 25+ years of learning from and guiding others in the Notre Dame community.',
      category: 'CNBL',
      date: 'Oct 22',
      readTime: '5 min'
    }
  ];

  const totalPages = 8;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <div className="bg-[#FAFAF9]">
      {/* Premium Hero Section - Mobile First */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 md:px-8 md:py-24 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
      }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-[#B76E79] to-[#C9A961] rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-white mb-4 md:mb-6 animate-fade-in-up">
            Insights & Perspectives
          </h1>
          <p className="text-base md:text-xl text-gray-200 font-['Inter'] mb-6 md:mb-8 px-4 leading-relaxed">
            Sharing experiences from operations management, leadership, and community building
          </p>
          
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-300 font-['Inter'] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/" className="hover:text-[#C9A961] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-[#C9A961]">Blog</span>
          </nav>
        </div>
      </section>

      {/* Filter Bar - Mobile First with Horizontal Scroll */}
      <div className="sticky top-[64px] md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-5">
          {/* Search Bar - Mobile First */}
          <div className="mb-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:border-[#0A1929] transition-all"
              />
            </div>
          </div>

          {/* Categories - Horizontal Scroll on Mobile */}
          <div className="flex items-center gap-4">
            <div className="flex-1 overflow-x-auto hide-scrollbar">
              <div className="flex gap-2 pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 font-['Inter'] font-semibold text-xs md:text-sm ${
                      activeCategory === cat
                        ? 'bg-gradient-to-r from-[#0A1929] to-[#1A2942] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Desktop Search */}
            <div className="hidden md:block relative w-64 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:border-[#0A1929] transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Article - Mobile First */}
      <section className="px-4 py-8 md:px-8 md:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
            <h2 className="text-[#0A1929] uppercase tracking-wider font-['Inter'] font-bold text-sm md:text-base">Featured Article</h2>
          </div>

          <Card className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
            {/* Featured Badge */}
            <div className="absolute top-4 right-4 z-10 px-4 py-1.5 rounded-full text-white text-xs uppercase tracking-wider shadow-lg font-['Inter'] font-bold" style={{
              background: 'linear-gradient(135deg, #C9A961, #B76E79)'
            }}>
              Featured
            </div>

            <CardContent className="p-0">
              {/* Image */}
              <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
                <ImageWithFallback
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Content Overlay on Mobile */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {featuredArticle.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-['Inter'] font-semibold"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 text-xl leading-tight">{featuredArticle.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-200 font-['Inter']">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {featuredArticle.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {featuredArticle.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Content */}
              <div className="hidden md:block p-8 lg:p-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredArticle.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-4 py-1.5 bg-gradient-to-r from-[#0A1929]/10 to-[#1A2942]/10 text-[#0A1929] rounded-full text-xs font-['Inter'] font-semibold"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <h3 className="text-[#0A1929] mb-4 text-2xl lg:text-3xl leading-tight">
                  {featuredArticle.title}
                </h3>

                <p className="text-gray-600 mb-6 text-base lg:text-lg leading-relaxed font-['Inter']">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-['Inter']">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {featuredArticle.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {featuredArticle.readTime}
                    </span>
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4" /> {featuredArticle.views} views
                    </span>
                  </div>

                  <Button className="px-6 py-6 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-['Inter'] font-semibold" style={{
                    background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                  }}>
                    Read Full Article →
                  </Button>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="md:hidden p-6 pt-4">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed font-['Inter'] line-clamp-2">
                  {featuredArticle.excerpt}
                </p>
                <Button className="w-full py-6 text-white rounded-xl transition-all duration-300 shadow-lg font-['Inter'] font-semibold" style={{
                  background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                }}>
                  Read Full Article →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Article Grid - Mobile First */}
      <section className="px-4 py-12 md:px-8 md:py-20 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-[#0A1929] mb-8 md:mb-12">Latest Articles</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article, idx) => (
              <Card 
                key={idx} 
                className="group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border-0 bg-gradient-to-br from-gray-50 to-white"
              >
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-['Inter'] font-semibold mb-3" style={{
                      background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)',
                      color: '#C9A961'
                    }}>
                      {article.category}
                    </span>

                    <h3 className="text-[#0A1929] mb-3 text-lg md:text-xl leading-tight group-hover:text-[#C9A961] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed font-['Inter'] line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 font-['Inter']">
                      <div className="flex gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                      </div>
                      
                      <span className="text-[#C9A961] font-semibold group-hover:underline">
                        Read →
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination - Mobile First */}
      <section className="px-4 py-8 md:py-12 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              className="h-10 px-4 md:px-6 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-[#0A1929] hover:text-white hover:border-[#0A1929] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed font-['Inter'] font-semibold text-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft className="w-4 h-4 md:mr-1" />
              <span className="hidden md:inline">Previous</span>
            </Button>

            <div className="flex gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg transition-all duration-300 font-['Inter'] font-semibold text-sm ${
                    currentPage === page
                      ? 'text-white shadow-lg'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                  style={currentPage === page ? {
                    background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
                  } : {}}
                >
                  {page}
                </button>
              ))}

              <span className="flex items-center px-2 text-gray-400">...</span>

              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`w-10 h-10 rounded-lg transition-all duration-300 font-['Inter'] font-semibold text-sm ${
                  currentPage === totalPages
                    ? 'text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
                style={currentPage === totalPages ? {
                  background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
                } : {}}
              >
                {totalPages}
              </button>
            </div>

            <Button
              variant="outline"
              className="h-10 px-4 md:px-6 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-[#0A1929] hover:text-white hover:border-[#0A1929] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed font-['Inter'] font-semibold text-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <span className="hidden md:inline">Next</span>
              <ChevronRight className="w-4 h-4 md:ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription - Mobile First */}
      <section className="relative px-4 py-16 md:px-8 md:py-24 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
      }}>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-[#B76E79] to-[#C9A961] rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #C9A961, #B76E79)'
          }}>
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-white mb-4">Stay Updated</h2>

          <p className="text-gray-200 mb-8 md:mb-12 text-base md:text-lg font-['Inter'] leading-relaxed px-4">
            Join 1,000+ professionals receiving weekly insights on operations, leadership, and industry trends
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 shadow-2xl rounded-xl overflow-hidden">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 sm:h-14 px-5 bg-white border-0 rounded-xl sm:rounded-l-xl sm:rounded-r-none focus:ring-0 font-['Inter']"
              />
              <Button
                type="submit"
                className="h-12 sm:h-14 px-8 text-white rounded-xl sm:rounded-r-xl sm:rounded-l-none border-0 transition-all duration-300 hover:scale-105 font-['Inter'] font-semibold shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #C9A961, #B76E79)'
                }}
              >
                Subscribe
              </Button>
            </div>
          </form>

          <p className="text-gray-400 text-xs md:text-sm font-['Inter'] mt-4">
            No spam, unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
}