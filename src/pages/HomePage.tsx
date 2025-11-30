import image_69074c91984a3201fa4c7dae18c5eb736bf0827c from 'figma:asset/69074c91984a3201fa4c7dae18c5eb736bf0827c.png';
import image_637659db039fafc556924c03498a62c29cca6ecc from 'figma:asset/637659db039fafc556924c03498a62c29cca6ecc.png';
import image_f3f51e39b39538153580c896dd90e282d38f15f2 from 'figma:asset/f3f51e39b39538153580c896dd90e282d38f15f2.png';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Mail, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';
import profileImage from 'figma:asset/6c38df665b9ba66e3ca1a3cf119acaae7dc96636.png';

export function HomePage() {
  const { blogPosts, galleryImages, testimonials } = useContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get published and featured content
  const publishedBlogPosts = blogPosts.filter(post => post.published);
  const featuredBlogPosts = publishedBlogPosts.filter(post => post.featured).slice(0, 3);
  const displayBlogPosts = featuredBlogPosts.length > 0 ? featuredBlogPosts : publishedBlogPosts.slice(0, 3);
  
  const featuredGalleryImages = galleryImages.filter(img => img.featured).slice(0, 8);
  const displayGalleryImages = featuredGalleryImages.length > 0 ? featuredGalleryImages : galleryImages.slice(0, 8);
  
  const featuredTestimonials = testimonials.filter(t => t.featured);
  const displayTestimonials = featuredTestimonials.length > 0 ? featuredTestimonials : testimonials.slice(0, 3);

  const achievements = [
    {
      image: 'https://images.unsplash.com/photo-1762006222425-cb6e6b5045f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjM4NzcwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: "Leading CNBL's Most Successful Member Engagement Initiative",
      points: ['200+ members engaged', '15+ events coordinated', 'Enhanced community bonds']
    },
    {
      image: 'https://images.unsplash.com/photo-1748347568194-c8cd8edd27da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwaW5kdXN0cmlhbCUyMG9wZXJhdGlvbnN8ZW58MXx8fHwxNjc2Mzg5MDEwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Achieving $27M Monthly Shipments',
      points: ['Led 9700+ workforce', 'On-time delivery excellence', 'Process automation success']
    },
    {
      image: 'https://images.unsplash.com/photo-1564069970419-0bc8e7b487da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwaGFuZHNoYWtlJTIwdGVhbXdvcmt8ZW58MXx8fHwxNjc2Mzg5MDEwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Building 500+ Professional Network',
      points: ['Industry leadership', 'Cross-batch connections', 'Mentorship impact']
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#FAFAF9]">
      {/* Premium Hero Section - Mobile First */}
      <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
      }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-[#B76E79] to-[#C9A961] rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Text Content */}
            <div className="order-2 md:order-1 space-y-6 md:space-y-8 text-center md:text-left">
              <div className={`inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <span className="text-[#C9A961] font-['Inter'] font-semibold text-xs md:text-sm">Batch '99 | Notre Dame College</span>
              </div>
              
              <h1 className={`text-white mb-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Engr. M M Nazrul <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A961] to-[#B76E79]">(Mallick)</span> Islam
              </h1>
              
              <div className={`space-y-2 md:space-y-3 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-xl md:text-2xl text-gray-200 font-['Inter'] font-medium">Sr. GM Operations | Lantabur Group</p>
                <p className="text-lg md:text-xl text-gray-300 font-['Inter']">CNBL Pillar | Community Leader</p>
              </div>
              
              <p className={`text-lg md:text-2xl text-[#C9A961] font-['Playfair_Display'] italic leading-relaxed transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                "Driving Operational Excellence & Building Communities"
              </p>

              <div className={`flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Button className="px-6 md:px-8 py-5 md:py-6 rounded-xl md:rounded-2xl text-white font-['Inter'] font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" style={{
                  background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                }} onClick={() => window.open('https://bd.linkedin.com/in/m-m-nazrul-islam-41992a30', '_blank')}>
                  <Linkedin className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  LinkedIn
                </Button>
                <Button variant="outline" className="px-6 md:px-8 py-5 md:py-6 rounded-xl md:rounded-2xl border-2 border-white/30 text-white hover:bg-white hover:text-[#0A1929] font-['Inter'] font-semibold transition-all duration-300 bg-transparent">
                  <Link to="/contact">Contact Me</Link>
                </Button>
                <Button variant="outline" className="px-6 md:px-8 py-5 md:py-6 rounded-xl md:rounded-2xl border-2 border-white/30 text-white hover:bg-white hover:text-[#0A1929] font-['Inter'] font-semibold transition-all duration-300 bg-transparent">
                  <Link to="/cnbl">View CNBL Work</Link>
                </Button>
              </div>

              {/* Premium Stats */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-6 md:pt-8 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {[
                  { number: '9700+', label: 'Workforce' },
                  { number: '$27M', label: 'Monthly' },
                  { number: '25+', label: 'Years' },
                  { number: '500+', label: 'Network' }
                ].map((stat, idx) => (
                  <div key={idx} className="group text-center p-4 md:p-5 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 hover:bg-white/15 hover:border-[#C9A961]/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C9A961] to-[#B76E79] mb-1 md:mb-2">{stat.number}</div>
                    <div className="text-xs md:text-sm text-gray-200 font-['Inter'] font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Image */}
            <div className="order-1 md:order-2">
              <div className={`relative max-w-xs sm:max-w-sm md:max-w-md mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="absolute -inset-4 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative aspect-square rounded-full overflow-hidden border-4 md:border-8 border-white/10 shadow-2xl ring-4 ring-[#C9A961]/20">
                  <ImageWithFallback
                    src={image_69074c91984a3201fa4c7dae18c5eb736bf0827c}
                    alt="Engr. M M Nazrul Islam"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-2 bg-[#C9A961] rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Who is Mallick Nazrul - Premium Cards with Custom Icons */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#C9A961]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#B76E79]/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-gray-500 uppercase tracking-wider">About</span>
              <div className="h-1 w-12 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>
            <h2 className="text-[#0A1929] mb-4">Who is Mallick Nazrul?</h2>
            <p className="text-lg md:text-xl text-gray-600 font-['Inter'] max-w-3xl mx-auto leading-relaxed">
              A multi-faceted leader driving excellence across operations, community, and innovation
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Professional Card */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
                }}>
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#C9A961]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="8" width="20" height="12" rx="2" />
                    <path d="M2 12h20" />
                    <path d="M12 8v12" />
                    <circle cx="6" cy="4" r="2" />
                    <circle cx="12" cy="4" r="2" />
                    <circle cx="18" cy="4" r="2" />
                  </svg>
                </div>
                <h3 className="mb-3 text-[#0A1929] group-hover:text-[#C9A961] transition-colors">Professional</h3>
                <p className="text-gray-600 mb-6 font-['Inter'] leading-relaxed">Operations Leader in RMG Industry managing 9700+ workforce</p>
                <Link to="/professional" className="inline-flex items-center text-[#C9A961] hover:text-[#B76E79] font-['Inter'] font-semibold transition-colors group-hover:gap-3 gap-2">
                  Learn More <ArrowRight className="h-4 w-4 transition-all" />
                </Link>
              </CardContent>
            </Card>

            {/* Community Card */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
                }}>
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#C9A961]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <h3 className="mb-3 text-[#0A1929] group-hover:text-[#C9A961] transition-colors">Community</h3>
                <p className="text-gray-600 mb-6 font-['Inter'] leading-relaxed">CNBL Asset & Active Member for 25+ years</p>
                <Link to="/cnbl" className="inline-flex items-center text-[#C9A961] hover:text-[#B76E79] font-['Inter'] font-semibold transition-colors group-hover:gap-3 gap-2">
                  View Impact <ArrowRight className="h-4 w-4 transition-all" />
                </Link>
              </CardContent>
            </Card>

            {/* Thought Leader Card */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
                }}>
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#C9A961]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                    <path d="M8.5 8.5l7 7" />
                    <path d="M8.5 15.5l7-7" />
                  </svg>
                </div>
                <h3 className="mb-3 text-[#0A1929] group-hover:text-[#C9A961] transition-colors">Thought Leader</h3>
                <p className="text-gray-600 mb-6 font-['Inter'] leading-relaxed">Lean Expert & SCM Specialist sharing insights</p>
                <Link to="/leadership" className="inline-flex items-center text-[#C9A961] hover:text-[#B76E79] font-['Inter'] font-semibold transition-colors group-hover:gap-3 gap-2">
                  View Expertise <ArrowRight className="h-4 w-4 transition-all" />
                </Link>
              </CardContent>
            </Card>

            {/* Notredamian Card */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
                }}>
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#C9A961]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
                <h3 className="mb-3 text-[#0A1929] group-hover:text-[#C9A961] transition-colors">Notredamian</h3>
                <p className="text-gray-600 mb-6 font-['Inter'] leading-relaxed">Proud Alumnus Since 1999, Batch '99 Legacy</p>
                <Link to="/notre-dame" className="inline-flex items-center text-[#C9A961] hover:text-[#B76E79] font-['Inter'] font-semibold transition-colors group-hover:gap-3 gap-2">
                  NDC Legacy <ArrowRight className="h-4 w-4 transition-all" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Achievements Carousel - Premium Design */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-gray-500 uppercase tracking-wider">Highlights</span>
              <div className="h-1 w-12 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>
            <h2 className="text-[#0A1929]">Featured Achievements</h2>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            <div 
              className="overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl" 
              onTouchStart={handleTouchStart} 
              onTouchMove={handleTouchMove} 
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative aspect-video md:aspect-[21/9]">
                <ImageWithFallback
                  src={achievements[currentSlide].image}
                  alt={achievements[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-6 md:p-10">
                  <div className="inline-flex items-center gap-2 mb-4 w-fit px-4 py-2 rounded-full" style={{
                    background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                  }}>
                    <span className="text-white font-['Inter'] font-semibold text-xs md:text-sm">Achievement {currentSlide + 1} of {achievements.length}</span>
                  </div>
                  
                  <h3 className="text-white mb-4 md:mb-6 text-xl md:text-3xl leading-tight max-w-3xl">{achievements[currentSlide].title}</h3>
                  
                  <ul className="text-white space-y-2 md:space-y-3 text-sm md:text-base max-w-2xl">
                    {achievements[currentSlide].points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                          background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                        }}>
                          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="leading-relaxed font-['Inter']">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md hover:bg-white border-0 shadow-xl transition-all duration-300 hover:scale-110"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6 text-[#0A1929]" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md hover:bg-white border-0 shadow-xl transition-all duration-300 hover:scale-110"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6 text-[#0A1929]" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mt-8">
              {achievements.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentSlide ? 'w-10 h-3' : 'w-3 h-3'
                  }`}
                  style={{
                    background: idx === currentSlide 
                      ? 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                      : '#D1D5DB'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial - Premium Design */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
      }}>
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-[#B76E79] to-[#C9A961] rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Quote Icon */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl" style={{
              background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
            }}>
              <Quote className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            
            <blockquote className="text-xl md:text-3xl text-white mb-8 font-['Playfair_Display'] italic leading-relaxed">
              Mallick is not just a member — he is an asset to CNBL. His dedication and leadership inspire us all.
            </blockquote>
            
            <div className="inline-flex flex-col items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-gray-200 font-['Inter'] font-semibold">— Fellow Notredamian</p>
              <span className="text-[#C9A961] text-sm font-['Inter']">Batch 2001</span>
            </div>
            
            <Link to="/cnbl" className="inline-flex items-center gap-2 mt-8 text-[#C9A961] hover:text-[#B76E79] font-['Inter'] font-semibold transition-all hover:gap-3">
              View All Testimonials <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Updates / Blog - Premium Cards */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-gray-500 uppercase tracking-wider">Insights</span>
              <div className="h-1 w-12 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>
            <h2 className="text-[#0A1929] mb-4">Latest Updates</h2>
            <p className="text-lg md:text-xl text-gray-600 font-['Inter'] max-w-2xl mx-auto">
              Thoughts on operations, leadership, and building communities
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {displayBlogPosts.map((blog) => (
              <Card key={blog.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-['Inter'] font-semibold text-white shadow-lg" style={{
                    background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                  }}>
                    {blog.category}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="mb-3 text-[#0A1929] group-hover:text-[#C9A961] transition-colors">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 font-['Inter'] leading-relaxed">{blog.excerpt}</p>
                  <Link to="/blog" className="inline-flex items-center text-[#C9A961] hover:text-[#B76E79] font-['Inter'] font-semibold transition-all group-hover:gap-3 gap-2">
                    Read More <ArrowRight className="h-4 w-4 transition-all" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link to="/blog">
              <Button className="px-8 py-6 rounded-xl text-white font-['Inter'] font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" style={{
                background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
              }}>
                View All Articles <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Moments / Gallery - Premium Cards */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-gray-500 uppercase tracking-wider">Gallery</span>
              <div className="h-1 w-12 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>
            <h2 className="text-[#0A1929] mb-4">Recent Moments</h2>
            <p className="text-lg md:text-xl text-gray-600 font-['Inter'] max-w-2xl mx-auto">
              Capturing professional milestones and community memories
            </p>
          </div>
          
          {/* Mobile-First Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
            {/* Large Featured Image - Mobile: spans 2 cols, Desktop: spans 2x2 */}
            <Link to="/gallery" className="col-span-2 row-span-2 group relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="aspect-square">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1762006222425-cb6e6b5045f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjM4NzcwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="CNBL Community Gathering"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6">
                  <div>
                    <p className="text-white font-['Inter'] font-semibold text-sm md:text-base mb-1">CNBL Community</p>
                    <p className="text-gray-200 text-xs md:text-sm font-['Inter']">Annual Gathering 2024</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Small Images */}
            {displayGalleryImages.slice(0, 6).map((img, idx) => (
              <Link key={img.id} to="/gallery" className={`group relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${idx >= 4 ? 'hidden md:block' : ''} ${idx >= 5 ? 'hidden lg:block' : ''}`}>
                <div className="aspect-square">
                  <ImageWithFallback
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Gallery Button */}
          <div className="text-center mt-8 md:mt-12">
            <Link to="/gallery">
              <Button className="px-8 py-6 rounded-xl text-white font-['Inter'] font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" style={{
                background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
              }}>
                View Full Gallery <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}