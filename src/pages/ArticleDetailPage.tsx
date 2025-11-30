import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Clock, Facebook, Twitter, Linkedin, Mail, ThumbsUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Textarea } from '../components/ui/textarea';
import profileImage from 'figma:asset/6c38df665b9ba66e3ca1a3cf119acaae7dc96636.png';

export function ArticleDetailPage() {
  const [comment, setComment] = useState('');
  const [activeSection, setActiveSection] = useState('introduction');

  const tableOfContents = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'current-landscape', label: 'Current Landscape' },
    { id: 'key-challenges', label: 'Key Challenges' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'strategic-roadmap', label: 'Strategic Roadmap' },
    { id: 'conclusion', label: 'Conclusion' }
  ];

  const relatedArticles = [
    {
      image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=100&h=75&fit=crop',
      title: 'Lean Manufacturing: Lessons from 25 Years'
    },
    {
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=75&fit=crop',
      title: 'Building High-Performing Teams'
    },
    {
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&h=75&fit=crop',
      title: 'Community Building in Digital Age'
    }
  ];

  const tags = ['Operations', 'RMG', 'Strategy', 'Innovation', 'Supply Chain'];

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

  const continueReadingArticles = [
    {
      image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=360&h=240',
      title: 'Lean Manufacturing: Lessons from 25 Years',
      excerpt: 'Implementing lean principles across 9700+ workforce has taught me invaluable lessons.',
      category: 'Leadership',
      date: 'Nov 15',
      readTime: '7 min'
    },
    {
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=360&h=240',
      title: 'Building High-Performing Teams',
      excerpt: 'The secret to achieving $27M monthly shipments lies in empowering teams.',
      category: 'Operations',
      date: 'Nov 12',
      readTime: '5 min'
    },
    {
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=360&h=240',
      title: 'Community Building in the Digital Age',
      excerpt: 'How CNBL has adapted to maintain strong connections across generations.',
      category: 'CNBL',
      date: 'Nov 10',
      readTime: '6 min'
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
        className="relative h-[600px] flex flex-col justify-center px-[15%] py-[120px]"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-[rgba(0,51,102,0.7)]"></div>

        {/* Breadcrumb */}
        <nav
          className="absolute top-[120px] left-[15%] z-10"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.7)'
          }}
        >
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">{'>'}</span>
          <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span className="mx-2">{'>'}</span>
          <span>The Future of RMG</span>
        </nav>

        <div className="relative z-10">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-block px-4 py-1.5 bg-[#E6F2FF] text-[#003366] rounded-2xl" style={{
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: '600',
              fontSize: '12px'
            }}>
              Operations
            </span>
            <span className="inline-block px-4 py-1.5 bg-[#E6F2FF] text-[#003366] rounded-2xl" style={{
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: '600',
              fontSize: '12px'
            }}>
              Leadership
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-white max-w-[900px] mb-8"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 'bold',
              fontSize: '56px',
              lineHeight: '1.2',
              textShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}
          >
            The Future of RMG in Bangladesh: Opportunities & Challenges
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-[800px] mb-10"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '20px',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: '1.6'
            }}
          >
            Exploring how the ready-made garment industry can navigate global challenges while maintaining competitive advantage
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
                By M M Nazrul Islam
              </span>
            </div>
            <div className="flex items-center gap-6 text-[rgba(255,255,255,0.9)]" style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '14px'
            }}>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> November 20, 2024
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> 8 min read
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" /> 1,234 views
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-[100px]">
        <div className="max-w-[1400px] mx-auto px-[10%] flex gap-12">
          {/* Main Content - 70% */}
          <article className="flex-[0_0_70%] max-w-[750px]">
            <div className="prose prose-lg">
              <p style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '18px',
                color: '#333333',
                lineHeight: '1.9',
                marginBottom: '28px'
              }}>
                The ready-made garment (RMG) industry in Bangladesh stands at a critical juncture. As the world's second-largest apparel exporter, our industry has been the backbone of economic growth for decades, employing millions and contributing significantly to GDP. However, the landscape is rapidly evolving, and with it comes both unprecedented challenges and exciting opportunities.
              </p>

              <h2
                id="introduction"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '32px',
                  color: '#003366',
                  lineHeight: '1.3',
                  margin: '60px 0 24px',
                  borderLeft: '6px solid #D4AF37',
                  paddingLeft: '24px'
                }}
              >
                Introduction
              </h2>

              <p style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '18px',
                color: '#333333',
                lineHeight: '1.9',
                marginBottom: '28px'
              }}>
                Over my 25+ years in operations management, I've witnessed firsthand the transformation of our industry. From managing a workforce of 9,700+ employees to achieving consistent monthly shipments of $27M, the journey has been filled with lessons about resilience, innovation, and the importance of sustainable growth.
              </p>

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
              }}>
                "The future belongs to those who can balance technological advancement with human-centric leadership."
              </blockquote>

              <h2
                id="current-landscape"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '32px',
                  color: '#003366',
                  lineHeight: '1.3',
                  margin: '60px 0 24px',
                  borderLeft: '6px solid #D4AF37',
                  paddingLeft: '24px'
                }}
              >
                Current Landscape
              </h2>

              <p style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '18px',
                color: '#333333',
                lineHeight: '1.9',
                marginBottom: '28px'
              }}>
                Today's RMG sector faces multiple pressures: rising labor costs, increasing automation in competing markets, sustainability requirements from international buyers, and the need for digital transformation. Yet, these challenges also present unique opportunities for those willing to adapt and innovate.
              </p>

              <ImageWithFallback
                src="https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=750"
                alt="Modern garment factory"
                className="w-full h-auto rounded-xl my-10"
                style={{
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}
              />
              <p style={{
                fontFamily: 'Open Sans, sans-serif',
                fontStyle: 'italic',
                fontSize: '15px',
                color: '#999999',
                textAlign: 'center',
                marginTop: '12px',
                marginBottom: '40px'
              }}>
                Modern manufacturing facility showcasing advanced production capabilities
              </p>

              <h2
                id="key-challenges"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '32px',
                  color: '#003366',
                  lineHeight: '1.3',
                  margin: '60px 0 24px',
                  borderLeft: '6px solid #D4AF37',
                  paddingLeft: '24px'
                }}
              >
                Key Challenges
              </h2>

              <ul style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '18px',
                color: '#444444',
                lineHeight: '1.9',
                margin: '24px 0',
                marginLeft: '32px'
              }}>
                <li style={{ marginBottom: '12px' }}>Adapting to rapidly changing global market dynamics</li>
                <li style={{ marginBottom: '12px' }}>Meeting increasingly stringent sustainability and compliance standards</li>
                <li style={{ marginBottom: '12px' }}>Integrating automation while maintaining employment levels</li>
                <li style={{ marginBottom: '12px' }}>Building resilient supply chains in an uncertain geopolitical climate</li>
                <li style={{ marginBottom: '12px' }}>Developing skilled workforce for advanced manufacturing processes</li>
              </ul>

              <h3 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '600',
                fontSize: '24px',
                color: '#003366',
                margin: '40px 0 16px'
              }}>
                The Automation Dilemma
              </h3>

              <p style={{
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '18px',
                color: '#333333',
                lineHeight: '1.9',
                marginBottom: '28px'
              }}>
                One of the most pressing concerns is balancing automation with our competitive advantage in labor-intensive processes. The key is to use technology as an <code style={{
                  background: 'rgba(0,51,102,0.1)',
                  color: '#003366',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '15px'
                }}>enabler</code> rather than a replacement, focusing on augmentation over substitution.
              </p>
            </div>
          </article>

          {/* Sidebar - 30% */}
          <aside className="flex-[0_0_30%] sticky top-[120px] self-start space-y-8">
            {/* Table of Contents */}
            <Card className="p-8 bg-[#F5F5F5] rounded-xl border-2 border-[#E0E0E0]">
              <CardContent className="p-0">
                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  color: '#003366',
                  marginBottom: '20px'
                }}>
                  On This Page
                </h3>
                <nav>
                  {tableOfContents.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      onClick={() => setActiveSection(item.id)}
                      className={`block py-2.5 transition-all duration-200 ${
                        activeSection === item.id
                          ? 'text-[#003366] border-l-[3px] border-[#D4AF37] pl-3'
                          : 'text-[#666666] hover:text-[#003366] hover:translate-x-2'
                      }`}
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '15px',
                        fontWeight: activeSection === item.id ? 'bold' : 'normal'
                      }}
                    >
                      {idx + 1}. {item.label}
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>

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
                    <a
                      key={idx}
                      href="#"
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
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
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
          <Card className="p-10 bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
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
              <div className="flex items-start gap-8">
                <img
                  src={profileImage}
                  alt="Author"
                  className="w-20 h-20 rounded-full border-4 border-[#D4AF37] flex-shrink-0"
                />
                <div>
                  <h4 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '22px',
                    color: '#003366',
                    marginBottom: '12px'
                  }}>
                    Engr. M M Nazrul Islam
                  </h4>
                  <p style={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontSize: '16px',
                    color: '#666666',
                    lineHeight: '1.7',
                    marginBottom: '20px'
                  }}>
                    Sr. GM Operations at Lantabur Group, CNBL leader, and Notre Dame College alumnus (Batch '99). Passionate about operational excellence and community building.
                  </p>
                  <div className="flex gap-4">
                    <Link
                      to="/professional"
                      className="text-[#D4AF37] hover:underline"
                      style={{
                        fontFamily: 'Open Sans, sans-serif',
                        fontWeight: '600',
                        fontSize: '15px'
                      }}
                    >
                      View Profile →
                    </Link>
                    <button
                      className="text-[#003366] hover:underline"
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
      <section className="bg-[#F5F5F5] py-[100px] px-[10%]">
        <h2
          className="text-center mb-15"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            fontSize: '42px',
            color: '#003366'
          }}
        >
          Continue Reading
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {continueReadingArticles.map((article, idx) => (
            <Card
              key={idx}
              className="bg-[#F5F5F5] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] cursor-pointer"
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

                <a
                  href="#"
                  className="text-[#D4AF37] hover:underline inline-flex items-center gap-1"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  Read More →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
