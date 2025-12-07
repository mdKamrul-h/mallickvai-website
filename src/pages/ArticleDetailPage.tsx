import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, Eye, Clock, Facebook, Twitter, Linkedin, Mail, ThumbsUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Textarea } from '../components/ui/textarea';
import { useContent } from '../contexts/ContentContext';
import profileImage from 'figma:asset/6c38df665b9ba66e3ca1a3cf119acaae7dc96636.png';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blogPosts } = useContent();
  const [comment, setComment] = useState('');
  const [activeSection, setActiveSection] = useState('introduction');

  // Find blog post by slug
  const blogPost = useMemo(() => {
    if (!slug) return null;
    
    return blogPosts.find(post => {
      const postSlug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return postSlug === slug;
    });
  }, [slug, blogPosts]);

  // Redirect to blog page if post not found
  useEffect(() => {
    if (slug && !blogPost) {
      console.warn(`Blog post with slug "${slug}" not found`);
      navigate('/blog');
    }
  }, [slug, blogPost, navigate]);

  if (!blogPost) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h1>
          <Link to="/blog" className="text-blue-600 hover:underline">Return to Blog</Link>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Calculate read time (rough estimate: 200 words per minute)
  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Get related articles (other published posts from same category, excluding current)
  const relatedArticles = useMemo(() => {
    return blogPosts
      .filter(post => post.published && post.id !== blogPost.id && post.category === blogPost.category)
      .slice(0, 3)
      .map(post => ({
        image: post.imageUrl,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        date: formatDate(post.date),
        readTime: calculateReadTime(post.content),
        slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }));
  }, [blogPosts, blogPost]);

  const tags = blogPost.tags || [blogPost.category];

  const comments = [
    {
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop',
      name: 'John Doe',
      date: 'Nov 21, 2024',
      text: 'Excellent insights! The perspective on automation integration is particularly valuable...',
      likes: 5
    },
    {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop',
      name: 'Sarah Ahmed',
      date: 'Nov 21, 2024',
      text: 'As someone working in the RMG sector, I find these observations very relevant to our current challenges.',
      likes: 3
    }
  ];


  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Comment:', comment);
    setComment('');
  };

  return (
    <div className="bg-white">
      {/* Article Header */}
      <section
        className="relative h-[600px] flex flex-col justify-center px-4 md:px-[15%] py-[120px]"
        style={{
          backgroundImage: `url(${blogPost.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
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
            {blogPost.excerpt}
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
                By {blogPost.author}
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
                <Clock className="w-4 h-4" /> {calculateReadTime(blogPost.content)}
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
              className="prose prose-lg max-w-none"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '18px',
                color: '#333333',
                lineHeight: '1.9'
              }}
            >
              {blogPost.content.split('\n\n').map((paragraph, idx) => {
                // Check if paragraph is a heading (starts with ##)
                if (paragraph.trim().startsWith('##')) {
                  const text = paragraph.replace(/^##+\s*/, '');
                  const level = paragraph.match(/^##+/)?.[0].length || 2;
                  const HeadingTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
                  return (
                    <HeadingTag
                      key={idx}
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 'bold',
                        fontSize: level === 2 ? '32px' : level === 3 ? '24px' : '20px',
                        color: '#003366',
                        lineHeight: '1.3',
                        margin: '60px 0 24px',
                        borderLeft: level === 2 ? '6px solid #D4AF37' : 'none',
                        paddingLeft: level === 2 ? '24px' : '0'
                      }}
                    >
                      {text}
                    </HeadingTag>
                  );
                }
                // Check if paragraph is a list item
                if (paragraph.trim().startsWith('- ') || paragraph.trim().startsWith('* ')) {
                  const items = paragraph.split('\n').filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* '));
                  return (
                    <ul key={idx} style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '18px',
                      color: '#444444',
                      lineHeight: '1.9',
                      margin: '24px 0',
                      marginLeft: '32px'
                    }}>
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx} style={{ marginBottom: '12px' }}>
                          {item.replace(/^[-*]\s+/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                // Regular paragraph
                if (paragraph.trim()) {
                  return (
                    <p key={idx} style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '18px',
                      color: '#333333',
                      lineHeight: '1.9',
                      marginBottom: '28px'
                    }}>
                      {paragraph.trim()}
                    </p>
                  );
                }
                return null;
              })}
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
      <section className="bg-[#F5F5F5] py-[60px]">
        <div className="max-w-[750px] mx-auto px-[15%]">
          {/* Tags */}
          <div className="mb-10">
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 'bold',
              fontSize: '16px',
              color: '#003366',
              marginRight: '16px'
            }}>
              Tags:
            </span>
            {tags.map((tag, idx) => (
              <button
                key={idx}
                className="inline-block px-5 py-2 bg-white border-2 border-[#E0E0E0] rounded-[20px] text-[#666666] mr-2 mb-2 transition-all duration-300 hover:border-[#003366] hover:text-[#003366] hover:bg-[#E6F2FF] cursor-pointer"
                style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="h-[2px] bg-[#E0E0E0] my-10"></div>

          {/* About the Author */}
          <Card className="p-6 md:p-10 bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
            <CardContent className="p-0">
              <h3 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold',
                fontSize: '20px',
                color: '#003366',
                marginBottom: '24px'
              }}>
                About the Author
              </h3>
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8">
                <img
                  src={profileImage}
                  alt="Author"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#D4AF37] flex-shrink-0 mx-auto sm:mx-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-[#003366] mb-2 sm:mb-3 break-words" style={{
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                    Engr. M M Nazrul Islam
                  </h4>
                  <p className="text-sm sm:text-base text-[#666666] leading-relaxed mb-4 sm:mb-5 break-words" style={{
                    fontFamily: 'Open Sans, sans-serif',
                    lineHeight: '1.7'
                  }}>
                    Sr. GM Operations at Lantabur Group, CNBL leader, and Notre Dame College alumnus (Batch '99). Passionate about operational excellence and community building.
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <Link
                      to="/professional"
                      className="text-[#D4AF37] hover:underline whitespace-nowrap inline-flex items-center gap-1"
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontWeight: '600',
                        fontSize: '15px'
                      }}
                    >
                      View Profile →
                    </Link>
                    <button
                      className="text-[#003366] hover:underline whitespace-nowrap"
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontWeight: '600',
                        fontSize: '15px'
                      }}
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
