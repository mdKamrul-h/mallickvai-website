import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, Eye, Clock, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useContent } from '../contexts/ContentContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import profileImage from 'figma:asset/6c38df665b9ba66e3ca1a3cf119acaae7dc96636.png';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blogPosts } = useContent();
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to generate slug from title (consistent with HomePage)
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Calculate read time helper
  const calculateReadTime = (content: string | undefined) => {
    if (!content || content.trim().length === 0) return '1 min read';
    const words = content.split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  // Find blog post by slug
  const blogPost = useMemo(() => {
    if (!slug) return null;
    
    const normalizedSlug = slug.toLowerCase().trim();
    
    return blogPosts.find(post => {
      const postSlug = generateSlug(post.title);
      return postSlug === normalizedSlug;
    });
  }, [slug, blogPosts]);

  // Get related articles (other published posts from same category, excluding current)
  // MUST be called before any conditional returns to follow Rules of Hooks
  const relatedArticles = useMemo(() => {
    if (!blogPost || !blogPost.id || !blogPost.category) return [];
    try {
      return blogPosts
        .filter(post => post.published && post.id !== blogPost.id && post.category === blogPost.category)
        .slice(0, 3)
        .map(post => ({
          image: post.imageUrl || '',
          title: post.title || '',
          excerpt: post.excerpt || '',
          category: post.category || '',
          date: formatDate(post.date || ''),
          readTime: calculateReadTime(post.content || ''),
          slug: generateSlug(post.title || '')
        }));
    } catch (error) {
      console.error('Error generating related articles:', error);
      return [];
    }
  }, [blogPosts, blogPost]);

  // Wait for blogPosts to load, then check if post exists
  useEffect(() => {
    console.log('ArticleDetailPage - slug:', slug);
    console.log('ArticleDetailPage - blogPosts count:', blogPosts.length);
    console.log('ArticleDetailPage - blogPosts:', blogPosts.map(p => ({ title: p.title, slug: generateSlug(p.title) })));
    
    // If blogPosts is still empty, wait a bit more
    if (blogPosts.length === 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Increased timeout
      return () => clearTimeout(timer);
    }
    
    setIsLoading(false);
    
    // Only redirect if we have blogPosts loaded and still can't find the post
    if (slug && blogPosts.length > 0 && !blogPost) {
      console.warn(`Blog post with slug "${slug}" not found. Available slugs:`, 
        blogPosts.map(p => generateSlug(p.title)));
      // Don't redirect immediately, show error message instead
    }
  }, [slug, blogPost, blogPosts, navigate]);

  // Show loading state while blogPosts are being fetched
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A961] mx-auto mb-4"></div>
          <p className="text-gray-600 font-['Inter']">Loading article...</p>
        </div>
      </div>
    );
  }

  // Show error if blogPosts loaded but post not found
  if (blogPosts.length > 0 && !blogPost && slug) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h1>
          <p className="text-gray-600 mb-4 font-['Inter']">
            The article with slug "{slug}" doesn't exist.
          </p>
          <p className="text-sm text-gray-500 mb-6 font-['Inter']">
            Available posts: {blogPosts.length}
          </p>
          <Link to="/blog" className="text-blue-600 hover:underline font-['Inter']">Return to Blog</Link>
        </div>
      </div>
    );
  }

  // Show loading if blogPosts haven't loaded yet
  if (blogPosts.length === 0) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A961] mx-auto mb-4"></div>
          <p className="text-gray-600 font-['Inter']">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Safety check - if we still don't have blogPost, show error
  if (!blogPost) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h1>
          <p className="text-gray-600 mb-4 font-['Inter']">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-blue-600 hover:underline font-['Inter']">Return to Blog</Link>
        </div>
      </div>
    );
  }

  // Validate required fields
  if (!blogPost.title || !blogPost.content) {
    console.error('Blog post missing required fields:', blogPost);
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Post Data</h1>
          <p className="text-gray-600 mb-4 font-['Inter']">This post is missing required information.</p>
          <Link to="/blog" className="text-blue-600 hover:underline font-['Inter']">Return to Blog</Link>
        </div>
      </div>
    );
  }

  const tags = blogPost.tags || [blogPost.category || 'Uncategorized'];

  // Ensure content exists
  const content = blogPost.content || '';
  const imageUrl = blogPost.imageUrl || '';
  const author = blogPost.author || 'Unknown Author';
  const excerpt = blogPost.excerpt || '';

  return (
    <div className="bg-white">
      {/* Article Header */}
      <section
        className="relative h-[600px] flex flex-col justify-center px-4 md:px-[15%] py-[120px]"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: imageUrl ? 'transparent' : '#0A1929'
        }}
      >
        <div className="absolute inset-0 bg-[rgba(0,51,102,0.7)]"></div>

        {/* Breadcrumb */}
        <nav
          className="absolute top-[120px] left-4 md:left-[15%] z-10"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.7)'
          }}
        >
          <Link to="/profile" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">{'>'}</span>
          <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-white">{blogPost.title}</span>
        </nav>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-block px-4 py-1.5 bg-[#E6F2FF] text-[#003366] rounded-2xl" style={{
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: '600',
              fontSize: '12px'
            }}>
              {blogPost.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-white max-w-[900px] mb-8 text-3xl md:text-5xl lg:text-[56px]"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 'bold',
              lineHeight: '1.2',
              textShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}
          >
            {blogPost.title}
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-[800px] mb-10 text-base md:text-lg lg:text-xl"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: '1.6'
            }}
          >
            {excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-4">
              <img
                src={profileImage}
                alt="Author"
                className="w-14 h-14 rounded-full border-[3px] border-[#D4AF37]"
              />
              <span
                className="text-white"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontWeight: '600',
                  fontSize: '16px'
                }}
              >
                By {author}
              </span>
            </div>
            <div className="flex items-center gap-6 text-[rgba(255,255,255,0.9)]" style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '14px'
            }}>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {formatDate(blogPost.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {calculateReadTime(content)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-12 md:py-[100px]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-[10%] flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content - 70% */}
          <article className="flex-[0_0_100%] lg:flex-[0_0_70%] max-w-[750px]">
            <div 
              className="prose prose-lg max-w-none markdown-content"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '18px',
                color: '#333333',
                lineHeight: '1.9'
              }}
            >
              {content ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  children={content}
                  components={{
                  // Custom styling for headings
                  h1: ({node, ...props}) => (
                    <h1 style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '36px',
                      color: '#003366',
                      lineHeight: '1.3',
                      margin: '60px 0 24px',
                      borderLeft: '6px solid #D4AF37',
                      paddingLeft: '24px'
                    }} {...props} />
                  ),
                  h2: ({node, ...props}) => (
                    <h2 style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '32px',
                      color: '#003366',
                      lineHeight: '1.3',
                      margin: '60px 0 24px',
                      borderLeft: '6px solid #D4AF37',
                      paddingLeft: '24px'
                    }} {...props} />
                  ),
                  h3: ({node, ...props}) => (
                    <h3 style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '24px',
                      color: '#003366',
                      lineHeight: '1.3',
                      margin: '40px 0 16px'
                    }} {...props} />
                  ),
                  h4: ({node, ...props}) => (
                    <h4 style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: '600',
                      fontSize: '20px',
                      color: '#003366',
                      lineHeight: '1.3',
                      margin: '32px 0 12px'
                    }} {...props} />
                  ),
                  // Custom styling for paragraphs
                  p: ({node, ...props}) => (
                    <p style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '18px',
                      color: '#333333',
                      lineHeight: '1.9',
                      marginBottom: '28px'
                    }} {...props} />
                  ),
                  // Custom styling for lists
                  ul: ({node, ...props}) => (
                    <ul style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '18px',
                      color: '#444444',
                      lineHeight: '1.9',
                      margin: '24px 0',
                      marginLeft: '32px',
                      listStyleType: 'disc'
                    }} {...props} />
                  ),
                  ol: ({node, ...props}) => (
                    <ol style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '18px',
                      color: '#444444',
                      lineHeight: '1.9',
                      margin: '24px 0',
                      marginLeft: '32px'
                    }} {...props} />
                  ),
                  li: ({node, ...props}) => (
                    <li style={{
                      marginBottom: '12px',
                      paddingLeft: '8px'
                    }} {...props} />
                  ),
                  // Custom styling for blockquotes
                  blockquote: ({node, ...props}) => (
                    <blockquote style={{
                      padding: '32px 40px',
                      background: '#F5F5F5',
                      borderLeft: '6px solid #D4AF37',
                      fontFamily: 'Playfair Display, serif',
                      fontStyle: 'italic',
                      fontSize: '22px',
                      color: '#003366',
                      lineHeight: '1.7',
                      margin: '40px 0',
                      borderRadius: '8px'
                    }} {...props} />
                  ),
                  // Custom styling for code blocks
                  code: ({node, inline, className, ...props}: any) => {
                    if (inline) {
                      return (
                        <code style={{
                          background: 'rgba(0,51,102,0.1)',
                          color: '#003366',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontFamily: 'Courier New, monospace',
                          fontSize: '15px'
                        }} {...props} />
                      );
                    }
                    return (
                      <code className={className} style={{
                        background: '#F5F5F5',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontFamily: 'Courier New, monospace',
                        fontSize: '15px'
                      }} {...props} />
                    );
                  },
                  pre: ({node, ...props}: any) => (
                    <pre style={{
                      background: '#F5F5F5',
                      padding: '20px',
                      borderRadius: '8px',
                      fontFamily: 'Courier New, monospace',
                      fontSize: '15px',
                      overflowX: 'auto',
                      margin: '24px 0',
                      border: '1px solid #E0E0E0'
                    }} {...props} />
                  ),
                  // Custom styling for links
                  a: ({node, ...props}: any) => (
                    <a style={{
                      color: '#C9A961',
                      textDecoration: 'underline',
                      fontWeight: '600'
                    }} {...props} />
                  ),
                  // Custom styling for strong/bold
                  strong: ({node, ...props}) => (
                    <strong style={{
                      fontWeight: '700',
                      color: '#003366'
                    }} {...props} />
                  ),
                  // Custom styling for emphasis/italic
                  em: ({node, ...props}) => (
                    <em style={{
                      fontStyle: 'italic',
                      color: '#555555'
                    }} {...props} />
                  ),
                  // Custom styling for horizontal rules
                  hr: ({node, ...props}) => (
                    <hr style={{
                      border: 'none',
                      borderTop: '2px solid #E0E0E0',
                      margin: '40px 0'
                    }} {...props} />
                  ),
                  // Custom styling for images
                  img: ({node, ...props}: any) => (
                    <img style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      margin: '24px 0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} {...props} />
                  ),
                  // Custom styling for tables (from remark-gfm)
                  table: ({node, ...props}: any) => (
                    <div style={{ overflowX: 'auto', margin: '24px 0' }}>
                      <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '16px'
                      }} {...props} />
                    </div>
                  ),
                  thead: ({node, ...props}: any) => (
                    <thead style={{
                      background: '#F5F5F5',
                      borderBottom: '2px solid #E0E0E0'
                    }} {...props} />
                  ),
                  th: ({node, ...props}: any) => (
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#003366',
                      borderBottom: '1px solid #E0E0E0'
                    }} {...props} />
                  ),
                  td: ({node, ...props}: any) => (
                    <td style={{
                      padding: '12px',
                      borderBottom: '1px solid #E0E0E0'
                    }} {...props} />
                  ),
                  tr: ({node, ...props}: any) => (
                    <tr style={{
                      '&:hover': {
                        background: '#F9F9F9'
                      }
                    }} {...props} />
                  )
                }}
              />
              ) : (
                <div className="text-gray-500 font-['Inter']">
                  <p>No content available for this article.</p>
                </div>
              )}
            </div>
          </article>

          {/* Sidebar - 30% */}
          <aside className="flex-[0_0_100%] lg:flex-[0_0_30%] lg:sticky lg:top-[120px] lg:self-start space-y-8">

            {/* Share This Article */}
            <Card className="p-8 bg-[#F5F5F5] rounded-xl border-2 border-[#E0E0E0]">
              <CardContent className="p-0">
                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: '#003366',
                  marginBottom: '20px'
                }}>
                  Share on Social Media
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="w-12 h-12 rounded-full bg-[#F5F5F5] text-[#666666] flex items-center justify-center transition-all duration-300 hover:bg-[#1877F2] hover:text-white hover:scale-110"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    className="w-12 h-12 rounded-full bg-[#F5F5F5] text-[#666666] flex items-center justify-center transition-all duration-300 hover:bg-[#1DA1F2] hover:text-white hover:scale-110"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    className="w-12 h-12 rounded-full bg-[#F5F5F5] text-[#666666] flex items-center justify-center transition-all duration-300 hover:bg-[#0A66C2] hover:text-white hover:scale-110"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button
                    className="w-12 h-12 rounded-full bg-[#F5F5F5] text-[#666666] flex items-center justify-center transition-all duration-300 hover:bg-[#D4AF37] hover:text-white hover:scale-110"
                    aria-label="Share via Email"
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <Card className="p-8 bg-[#F5F5F5] rounded-xl border-2 border-[#E0E0E0]">
                <CardContent className="p-0">
                  <h3 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: '#003366',
                    marginBottom: '24px'
                  }}>
                    You May Also Like
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((article, idx) => (
                      <Link
                        key={idx}
                        to={`/blog/${article.slug}`}
                        className="flex gap-4 p-4 bg-[#F5F5F5] rounded-lg hover:bg-[#E6F2FF] transition-all duration-300 cursor-pointer"
                      >
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-[100px] h-[75px] object-cover rounded-lg flex-shrink-0"
                        />
                        <h4 style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: '600',
                          fontSize: '14px',
                          color: '#003366',
                          lineHeight: '1.4',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {article.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </section>

      {/* Article Footer */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Tags Section - Redesigned */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <h3 className="text-[#0A1929] font-['Montserrat'] font-bold text-xl md:text-2xl">
                Topics & Tags
              </h3>
              <div className="h-1 flex-1 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {tags.map((tag, idx) => (
                <button
                  key={idx}
                  className="group relative px-6 py-3 rounded-full font-['Inter'] font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)',
                    color: '#C9A961',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)';
                    e.currentTarget.style.color = '#C9A961';
                  }}
                >
                  <span className="relative z-10">#{tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* About the Author Section - Redesigned */}
          <div className="relative">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-[#B76E79] to-[#C9A961] rounded-full blur-3xl"></div>
            </div>

            <Card className="relative overflow-hidden border-0 shadow-2xl" style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAF9 100%)'
            }}>
              <CardContent className="p-0">
                {/* Header with Gradient Accent */}
                <div className="relative h-2 bg-gradient-to-r from-[#C9A961] via-[#B76E79] to-[#C9A961]"></div>
                
                <div className="p-8 md:p-12">
                  {/* Section Title */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                      background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                    }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-[#0A1929] font-['Montserrat'] font-bold text-2xl md:text-3xl">
                      About the Author
                    </h3>
                  </div>

                  {/* Author Content */}
                  <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                    {/* Profile Image with Enhanced Styling */}
                    <div className="relative flex-shrink-0 mx-auto md:mx-0">
                      <div className="relative w-24 h-24 md:w-32 md:h-32">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C9A961] to-[#B76E79] p-1 animate-pulse"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                          <img
                            src={profileImage}
                            alt="Author"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A961] to-[#B76E79] flex items-center justify-center border-4 border-white shadow-lg">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex-1 min-w-0 text-center md:text-left">
                      <h4 className="text-[#0A1929] font-['Montserrat'] font-bold text-2xl md:text-3xl mb-3 break-words">
                        Engr. M M Nazrul Islam
                      </h4>
                      
                      {/* Author Title Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{
                        background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, rgba(183, 110, 121, 0.1) 100%)',
                        border: '1px solid rgba(201, 169, 97, 0.3)'
                      }}>
                        <span className="text-[#0A1929] font-['Inter'] font-semibold text-sm md:text-base">
                          Sr. GM Operations | Lantabur Group
                        </span>
                      </div>

                      {/* Author Bio */}
                      <p className="text-[#64748B] font-['Inter'] text-base md:text-lg leading-relaxed mb-6 break-words">
                        CNBL leader and Notre Dame College alumnus (Batch '99). With over 25 years of experience in operations management, leading a workforce of 9,700+ and achieving $27M monthly shipments. Passionate about operational excellence, community building, and mentoring the next generation of leaders.
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
                        <Link
                          to="/professional"
                          className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-['Inter'] font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)',
                            color: '#FFFFFF'
                          }}
                        >
                          <span>View Full Profile</span>
                          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-['Inter'] font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 border-2"
                          style={{
                            borderColor: '#C9A961',
                            color: '#0A1929',
                            background: 'transparent'
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
                          <Mail className="w-4 h-4" />
                          <span>Get in Touch</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="bg-white py-[100px]">
        <div className="max-w-[750px] mx-auto px-[15%]">
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            fontSize: '32px',
            color: '#003366',
            marginBottom: '40px'
          }}>
            Comments ({comments.length + 10})
          </h2>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-10">
            <Textarea
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-[120px] p-4 bg-[#F5F5F5] border-2 border-[#E0E0E0] rounded-lg resize-y mb-4 focus:border-[#003366] focus:bg-white"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '15px'
              }}
            />
            <Button
              type="submit"
              className="w-[180px] h-12 bg-[#D4AF37] hover:bg-[#C19B2F] text-white rounded-lg"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: '600',
                fontSize: '15px'
              }}
            >
              Post Comment
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-5">
            {comments.map((comment, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#F5F5F5] rounded-xl hover:bg-[#ECECEC] transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={comment.avatar}
                    alt={comment.name}
                    className="w-12 h-12 rounded-full flex-shrink-0"
                  />
                  <div>
                    <h4 style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontWeight: '600',
                      fontSize: '16px',
                      color: '#003366'
                    }}>
                      {comment.name}
                    </h4>
                    <p style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '13px',
                      color: '#999999'
                    }}>
                      {comment.date}
                    </p>
                  </div>
                </div>
                <p style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '15px',
                  color: '#555555',
                  lineHeight: '1.7',
                  margin: '16px 0'
                }}>
                  {comment.text}
                </p>
                <div className="flex gap-5">
                  <button
                    className="text-[#666666] hover:text-[#003366] transition-colors"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                  >
                    Reply
                  </button>
                  <button
                    className="flex items-center gap-1 text-[#666666] hover:text-[#003366] transition-colors"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                  >
                    <ThumbsUp className="w-4 h-4" /> Like ({comment.likes})
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="w-[200px] h-12 bg-transparent border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white rounded-lg transition-all duration-300"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: '600',
                fontSize: '15px'
              }}
            >
              Load More Comments
            </Button>
          </div>
        </div>
      </section>

      {/* Related Articles (Full Width) */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#F5F5F5] py-12 md:py-[100px] px-4 md:px-[10%]">
          <h2
            className="text-center mb-8 md:mb-15 text-3xl md:text-4xl lg:text-[42px]"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 'bold',
              color: '#003366'
            }}
          >
            Continue Reading
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {relatedArticles.map((article, idx) => {
              const articleSlug = article.slug;
              return (
                <Link key={idx} to={`/blog/${articleSlug}`}>
                  <Card
                    className="bg-[#F5F5F5] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] cursor-pointer h-full"
                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                  >
                    <CardContent className="p-7">
                      <div className="mb-5 overflow-hidden rounded-xl">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-[240px] object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      <span
                        className="inline-block px-4 py-1.5 bg-[#E6F2FF] text-[#003366] rounded-2xl mb-5"
                        style={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontWeight: '600',
                          fontSize: '12px'
                        }}
                      >
                        {article.category}
                      </span>

                      <h3
                        className="text-[#003366] mb-4"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 'bold',
                          fontSize: '22px',
                          lineHeight: '1.4'
                        }}
                      >
                        {article.title}
                      </h3>

                      <p
                        className="text-[#666666] mb-5 line-clamp-3"
                        style={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontSize: '15px',
                          lineHeight: '1.7'
                        }}
                      >
                        {article.excerpt}
                      </p>

                      <div className="flex gap-4 mb-5 text-[#999999] text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {article.readTime}
                        </span>
                      </div>

                      <div
                        className="text-[#D4AF37] hover:underline inline-flex items-center gap-1"
                        style={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontWeight: '600',
                          fontSize: '14px'
                        }}
                      >
                        Read More →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
