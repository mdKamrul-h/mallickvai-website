import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

// Import custom icons
import {
  CorporateLeadershipIcon,
  CommunityLeadershipIcon,
  LeanManufacturingIcon,
  OperationsExcellenceIcon,
  SupplyChainMasteryIcon,
  TeamDevelopmentIcon,
  MentorshipIcon,
  InsightsIcon,
  SpeakingIcon,
} from '../components/custom-icons/LeadershipIcons';

export function LeadershipPage() {
  const [isVisible, setIsVisible] = useState(false);
  const { blogPosts } = useContent();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    } catch {
      return dateString;
    }
  };

  // Calculate read time helper
  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Get leadership insights from blog posts (filtered by Leadership category or related tags)
  const insights = useMemo(() => {
    const leadershipPosts = blogPosts
      .filter(post => 
        post.published && 
        (post.category.toLowerCase().includes('leadership') || 
         post.category.toLowerCase().includes('operations') ||
         post.tags?.some(tag => 
           tag.toLowerCase().includes('leadership') || 
           tag.toLowerCase().includes('operations') ||
           tag.toLowerCase().includes('rmg')
         ))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
      .map(post => ({
        title: post.title,
        date: formatDate(post.date),
        readTime: calculateReadTime(post.content),
        category: post.category,
        slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }));

    // Fallback to default insights if no blog posts found
    if (leadershipPosts.length === 0) {
      return [
        {
          title: 'The Future of RMG in Bangladesh: Opportunities & Challenges',
          date: 'November 2024',
          readTime: '5 min read',
          category: 'Industry Trends',
          slug: ''
        },
        {
          title: 'Lean Manufacturing: Lessons from 25 Years in Operations',
          date: 'October 2024',
          readTime: '7 min read',
          category: 'Operations',
          slug: ''
        },
        {
          title: 'Building High-Performance Teams in Manufacturing',
          date: 'September 2024',
          readTime: '6 min read',
          category: 'Leadership',
          slug: ''
        }
      ];
    }

    return leadershipPosts;
  }, [blogPosts]);

  const domains = [
    {
      title: 'Corporate Leadership',
      icon: CorporateLeadershipIcon,
      description: 'Leading large-scale operations with strategic vision and operational excellence',
      items: [
        { label: 'Operations Management', detail: 'End-to-end oversight' },
        { label: 'Team of 9700+', detail: 'Multi-unit workforce' },
        { label: 'Multi-factory Operations', detail: 'Complex coordination' },
        { label: 'Strategic Planning', detail: 'Vision to execution' }
      ],
      gradient: 'from-[#C9A961] to-[#B76E79]'
    },
    {
      title: 'Community Leadership',
      icon: CommunityLeadershipIcon,
      description: '25+ years of community building and member engagement excellence',
      items: [
        { label: 'CNBL Coordination', detail: 'Core committee member' },
        { label: 'Batch Integration', detail: 'Cross-batch collaboration' },
        { label: 'Event Leadership', detail: 'Major event organization' },
        { label: 'Member Engagement', detail: 'Active participation' }
      ],
      gradient: 'from-[#B76E79] to-[#C9A961]'
    }
  ];

  const expertiseAreas = [
    {
      title: 'Lean Manufacturing',
      icon: LeanManufacturingIcon,
      skills: ['Six Sigma Implementation', 'Kaizen Methodology', 'Waste Reduction', 'Continuous Improvement'],
      gradient: 'from-[#C9A961] to-[#B76E79]'
    },
    {
      title: 'Operations Excellence',
      icon: OperationsExcellenceIcon,
      skills: ['Factory Operations', 'Quality Control', 'Process Design', 'Performance Management'],
      gradient: 'from-[#B76E79] to-[#C9A961]'
    },
    {
      title: 'Supply Chain Mastery',
      icon: SupplyChainMasteryIcon,
      skills: ['Strategic Sourcing', 'Global Logistics', 'Vendor Management', 'Compliance Excellence'],
      gradient: 'from-[#C9A961] to-[#B76E79]'
    },
    {
      title: 'Team Development',
      icon: TeamDevelopmentIcon,
      skills: ['Leadership Training', 'Talent Motivation', 'Culture Building', 'Career Mentorship'],
      gradient: 'from-[#B76E79] to-[#C9A961]'
    }
  ];

  const problemSolvingSteps = [
    { label: 'IDENTIFY', description: 'Root cause analysis' },
    { label: 'ANALYZE', description: 'Data-driven insights' },
    { label: 'STRATEGIZE', description: 'Solution design' },
    { label: 'IMPLEMENT', description: 'Execution excellence' },
    { label: 'MONITOR', description: 'Continuous optimization' }
  ];

  return (
    <div className="bg-[#FAFAF9]">
      {/* Premium Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
      }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-[#B76E79] to-[#C9A961] rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-20 text-center">
          {/* Breadcrumb */}
          <nav className={`text-sm text-gray-300 font-['Inter'] mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Link to="/" className="hover:text-[#C9A961] transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-[#C9A961]">Leadership & Expertise</span>
          </nav>

          {/* Title */}
          <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-[#C9A961] uppercase tracking-wider">Leadership Philosophy</span>
              <div className="h-1 w-12 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>

            <h1 className="text-white mb-8">Leadership & Expertise</h1>
            
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/10 max-w-3xl mx-auto">
              <div className="absolute -top-4 left-8 text-6xl md:text-7xl text-[#C9A961] font-['Playfair_Display']">"</div>
              <blockquote className="text-xl md:text-2xl text-white/90 font-['Playfair_Display'] italic mb-6 relative z-10">
                True leadership is not about authority — it's about empowering others to achieve collective excellence.
              </blockquote>
              <p className="text-[#C9A961] font-['Inter'] font-semibold">— M M Nazrul Islam</p>
              <div className="absolute -bottom-4 right-8 text-6xl md:text-7xl text-[#C9A961] font-['Playfair_Display'] rotate-180">"</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Domains */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-[#C9A961] uppercase tracking-wider">Dual Impact</span>
              <div className="h-1 w-8 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>
            <h2 className="text-[#0A1929] mb-4">Leadership Domains</h2>
            <p className="text-gray-600 font-['Inter'] max-w-2xl mx-auto">
              Bridging corporate excellence and community impact through dedicated leadership
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {domains.map((domain, idx) => (
              <Card key={idx} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
                <CardContent className="p-6 md:p-8">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 p-3 md:p-4 bg-gradient-to-br ${domain.gradient}`}>
                    <domain.icon />
                  </div>
                  
                  <h3 className="mb-3 text-[#0A1929] group-hover:text-[#C9A961] transition-colors">{domain.title}</h3>
                  <p className="text-gray-600 font-['Inter'] mb-6 text-sm md:text-base">{domain.description}</p>
                  
                  <div className="space-y-3">
                    {domain.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-[#C9A961]/5 hover:to-[#B76E79]/5 transition-all duration-300">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-br ${domain.gradient}`}></div>
                        <div className="flex-1">
                          <p className="text-[#0A1929] font-['Inter'] font-semibold text-sm md:text-base">{item.label}</p>
                          <p className="text-gray-500 font-['Inter'] text-xs md:text-sm">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Expertise */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-[#C9A961] uppercase tracking-wider">Core Competencies</span>
              <div className="h-1 w-8 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>
            <h2 className="text-[#0A1929] mb-4">Expertise Areas</h2>
            <p className="text-gray-600 font-['Inter'] max-w-2xl mx-auto">
              Specialized knowledge developed through 25+ years of hands-on experience
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {expertiseAreas.map((area, idx) => (
              <Card key={idx} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 p-3 bg-gradient-to-br ${area.gradient}`}>
                    <area.icon />
                  </div>
                  
                  <h3 className="mb-4 text-[#0A1929] group-hover:text-[#C9A961] transition-colors text-lg md:text-xl">{area.title}</h3>
                  
                  <ul className="space-y-2">
                    {area.skills.map((skill, skillIdx) => (
                      <li key={skillIdx} className="flex items-start gap-2 text-sm text-gray-600 font-['Inter']">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-br ${area.gradient}`}></div>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem-Solving Approach */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-[#C9A961] uppercase tracking-wider">Methodology</span>
              <div className="h-1 w-8 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>
            <h2 className="text-[#0A1929] mb-4">Problem-Solving Approach</h2>
            <p className="text-gray-600 font-['Inter'] max-w-2xl mx-auto">
              A proven 5-step framework for addressing complex operational challenges
            </p>
          </div>
          
          {/* Desktop View */}
          <div className="hidden lg:flex items-center justify-center gap-4 mb-12 max-w-6xl mx-auto">
            {problemSolvingSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-[#C9A961] to-[#B76E79] text-white px-8 py-6 rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                    <div className="text-center">
                      <div className="text-2xl font-['Montserrat'] font-bold mb-1">{step.label}</div>
                      <div className="text-xs font-['Inter'] opacity-90">{step.description}</div>
                    </div>
                  </div>
                </div>
                {idx < problemSolvingSteps.length - 1 && (
                  <svg className="w-8 h-8 text-[#C9A961]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Mobile/Tablet View */}
          <div className="lg:hidden space-y-4 mb-12 max-w-lg mx-auto">
            {problemSolvingSteps.map((step, idx) => (
              <div key={idx}>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-[#C9A961] to-[#B76E79] text-white px-6 py-5 rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-['Montserrat'] font-bold mb-1">{step.label}</div>
                        <div className="text-xs font-['Inter'] opacity-90">{step.description}</div>
                      </div>
                      <div className="text-3xl font-['Montserrat'] font-bold opacity-30">{idx + 1}</div>
                    </div>
                  </div>
                </div>
                {idx < problemSolvingSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <svg className="w-6 h-6 text-[#C9A961]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <p className="text-gray-700 font-['Playfair_Display'] italic text-lg md:text-xl leading-relaxed">
                "My approach combines data-driven analysis with human-centered leadership to solve complex operational challenges."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-[#C9A961] uppercase tracking-wider">Real Impact</span>
              <div className="h-1 w-8 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>
            <h2 className="text-[#0A1929] mb-4">Leadership Case Studies</h2>
            <p className="text-gray-600 font-['Inter'] max-w-2xl mx-auto">
              Demonstrable results from strategic leadership initiatives
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="operations" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-8 md:mb-12 h-auto bg-gray-100/50 p-1 rounded-2xl">
                <TabsTrigger value="operations" className="rounded-xl py-3 md:py-4 text-sm md:text-base font-['Inter'] data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#C9A961] data-[state=active]:to-[#B76E79] data-[state=active]:text-white transition-all duration-300">
                  Operations
                </TabsTrigger>
                <TabsTrigger value="process" className="rounded-xl py-3 md:py-4 text-sm md:text-base font-['Inter'] data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#C9A961] data-[state=active]:to-[#B76E79] data-[state=active]:text-white transition-all duration-300">
                  Process
                </TabsTrigger>
                <TabsTrigger value="team" className="rounded-xl py-3 md:py-4 text-sm md:text-base font-['Inter'] data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#C9A961] data-[state=active]:to-[#B76E79] data-[state=active]:text-white transition-all duration-300">
                  Team Building
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="operations">
                <Card className="border-0 shadow-lg overflow-hidden bg-white">
                  <div className="h-2 bg-gradient-to-r from-[#C9A961] to-[#B76E79]"></div>
                  <CardContent className="p-6 md:p-10">
                    <h3 className="mb-6 text-[#0A1929]">$27M Monthly Shipment Achievement</h3>
                    
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A961] to-[#B76E79] flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-['Montserrat'] font-bold">1</span>
                          </div>
                          <h4 className="text-[#0A1929] font-['Montserrat']">Challenge</h4>
                        </div>
                        <p className="text-gray-700 font-['Inter'] leading-relaxed ml-13">
                          Managing 9700+ workforce to achieve consistent monthly shipments in a competitive RMG industry with tight deadlines and quality requirements
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B76E79] to-[#C9A961] flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-['Montserrat'] font-bold">2</span>
                          </div>
                          <h4 className="text-[#0A1929] font-['Montserrat']">Strategic Approach</h4>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 ml-13">
                          {[
                            'Implemented lean manufacturing principles',
                            'Automated critical production processes',
                            'Enhanced team coordination systems',
                            'Optimized supply chain management'
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                              <svg className="w-5 h-5 text-[#C9A961] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700 font-['Inter'] text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A961] to-[#B76E79] flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-['Montserrat'] font-bold">3</span>
                          </div>
                          <h4 className="text-[#0A1929] font-['Montserrat']">Measurable Results</h4>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 ml-13">
                          {[
                            { metric: '$27M', label: 'Monthly shipments achieved' },
                            { metric: '98%', label: 'On-time delivery rate' },
                            { metric: '40%', label: 'Efficiency improvement' },
                            { metric: '25%', label: 'Cost reduction' }
                          ].map((result, idx) => (
                            <div key={idx} className="p-5 rounded-xl bg-gradient-to-br from-[#C9A961]/10 to-[#B76E79]/10 border border-[#C9A961]/20">
                              <div className="text-3xl md:text-4xl font-['Montserrat'] font-bold text-[#0A1929] mb-2">{result.metric}</div>
                              <div className="text-sm text-gray-600 font-['Inter']">{result.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button className="bg-gradient-to-r from-[#C9A961] to-[#B76E79] text-white hover:shadow-lg transition-all duration-300 hover:scale-105 px-6 py-6 rounded-xl font-['Inter'] font-semibold">
                        Read Full Case Study
                      </Button>
                      <Button variant="outline" className="border-[#C9A961] text-[#0A1929] hover:bg-[#C9A961]/5 px-6 py-6 rounded-xl font-['Inter'] font-semibold">
                        Download PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="process">
                <Card className="border-0 shadow-lg overflow-hidden bg-white">
                  <div className="h-2 bg-gradient-to-r from-[#B76E79] to-[#C9A961]"></div>
                  <CardContent className="p-6 md:p-10">
                    <h3 className="mb-6 text-[#0A1929]">Process Automation & Efficiency Excellence</h3>
                    <p className="text-gray-700 font-['Inter'] mb-6 leading-relaxed">
                      Comprehensive transformation of production workflows through strategic automation and lean principles, resulting in significant productivity gains and quality improvements.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                        <h4 className="mb-3 text-[#0A1929] font-['Montserrat']">Key Achievements</h4>
                        <ul className="space-y-3">
                          {[
                            'Reduced production cycle time by 35%',
                            'Increased output quality scores to 99.2%',
                            'Minimized defects through automated quality checks',
                            'Streamlined workflow coordination across units'
                          ].map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full mt-2 bg-gradient-to-br from-[#B76E79] to-[#C9A961] flex-shrink-0"></div>
                              <span className="text-gray-700 font-['Inter']">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button className="bg-gradient-to-r from-[#B76E79] to-[#C9A961] text-white hover:shadow-lg transition-all duration-300 hover:scale-105 px-6 py-6 rounded-xl font-['Inter'] font-semibold">
                        Explore Process Improvements
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="team">
                <Card className="border-0 shadow-lg overflow-hidden bg-white">
                  <div className="h-2 bg-gradient-to-r from-[#C9A961] to-[#B76E79]"></div>
                  <CardContent className="p-6 md:p-10">
                    <h3 className="mb-6 text-[#0A1929]">Building High-Performance Manufacturing Teams</h3>
                    <p className="text-gray-700 font-['Inter'] mb-6 leading-relaxed">
                      Creating and nurturing a culture of excellence through strategic talent development, motivation frameworks, and leadership empowerment across all organizational levels.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                        <h4 className="mb-3 text-[#0A1929] font-['Montserrat']">Team Development Pillars</h4>
                        <ul className="space-y-3">
                          {[
                            'Comprehensive leadership training programs',
                            'Performance-based motivation systems',
                            'Cross-functional collaboration initiatives',
                            'Continuous skill enhancement workshops'
                          ].map((pillar, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full mt-2 bg-gradient-to-br from-[#C9A961] to-[#B76E79] flex-shrink-0"></div>
                              <span className="text-gray-700 font-['Inter']">{pillar}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button className="bg-gradient-to-r from-[#C9A961] to-[#B76E79] text-white hover:shadow-lg transition-all duration-300 hover:scale-105 px-6 py-6 rounded-xl font-['Inter'] font-semibold">
                        View Team Success Stories
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Mentorship & Training */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-[#C9A961] uppercase tracking-wider">Giving Back</span>
              <div className="h-1 w-8 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>
            <h2 className="text-[#0A1929] mb-4">Mentorship & Training</h2>
            <p className="text-gray-600 font-['Inter'] max-w-2xl mx-auto">
              Empowering the next generation of leaders in RMG and beyond
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl overflow-hidden bg-white">
              <div className="h-2 bg-gradient-to-r from-[#C9A961] to-[#B76E79]"></div>
              <CardContent className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#C9A961] to-[#B76E79] p-5">
                      <MentorshipIcon />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="mb-4 text-[#0A1929]">Areas of Mentorship</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        'Operations Management for Young Engineers',
                        'Career Development in RMG Industry',
                        'Leadership Skills for Mid-level Managers',
                        'Community Building & Networking'
                      ].map((area, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                          <div className="w-2 h-2 rounded-full mt-2 bg-gradient-to-br from-[#C9A961] to-[#B76E79] flex-shrink-0"></div>
                          <span className="text-gray-700 font-['Inter'] text-sm">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#C9A961]/10 to-[#B76E79]/10 p-6 md:p-8 rounded-2xl mb-8 border border-[#C9A961]/20">
                  <p className="text-gray-700 font-['Playfair_Display'] italic text-lg md:text-xl leading-relaxed">
                    "I believe in lifting others as we climb. Mentoring the next generation is not just a responsibility — it's a privilege."
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-gradient-to-r from-[#C9A961] to-[#B76E79] text-white hover:shadow-lg transition-all duration-300 hover:scale-105 px-6 py-6 rounded-xl font-['Inter'] font-semibold">
                    Request Mentorship
                  </Button>
                  <Button variant="outline" className="border-[#C9A961] text-[#0A1929] hover:bg-[#C9A961]/5 px-6 py-6 rounded-xl font-['Inter'] font-semibold">
                    View Success Stories
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Insights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-[#C9A961] uppercase tracking-wider">Thought Leadership</span>
              <div className="h-1 w-8 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>
            <h2 className="text-[#0A1929] mb-4">Industry Insights</h2>
            <p className="text-gray-600 font-['Inter'] max-w-2xl mx-auto">
              Sharing expertise and perspectives on RMG industry trends and leadership
            </p>
          </div>
          
          <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
            {insights.map((insight, idx) => (
              <Card key={idx} className="group border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden bg-white">
                <div className="h-1 bg-gradient-to-r from-[#C9A961] to-[#B76E79] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#C9A961]/20 to-[#B76E79]/20 text-[#0A1929] text-xs font-['Inter'] font-semibold">
                          {insight.category}
                        </span>
                      </div>
                      <h3 className="mb-3 text-[#0A1929] group-hover:text-[#C9A961] transition-colors">{insight.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 font-['Inter']">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#C9A961]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{insight.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#B76E79]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{insight.readTime}</span>
                        </div>
                      </div>
                    </div>
                    {insight.slug ? (
                      <Link to={`/blog/${insight.slug}`}>
                        <Button className="bg-gradient-to-r from-[#C9A961] to-[#B76E79] text-white hover:shadow-lg transition-all duration-300 hover:scale-105 px-6 py-6 rounded-xl font-['Inter'] font-semibold w-full md:w-auto">
                          Read Article
                        </Button>
                      </Link>
                    ) : (
                      <Button className="bg-gradient-to-r from-[#C9A961] to-[#B76E79] text-white hover:shadow-lg transition-all duration-300 hover:scale-105 px-6 py-6 rounded-xl font-['Inter'] font-semibold w-full md:w-auto">
                        Read Article
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <Link to="/blog">
              <Button variant="outline" className="border-[#C9A961] text-[#0A1929] hover:bg-[#C9A961]/5 px-8 py-6 rounded-xl font-['Inter'] font-semibold">
                View All Insights
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Speaking & Consulting CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
      }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-[#B76E79] to-[#C9A961] rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 bg-gradient-to-br from-[#C9A961] to-[#B76E79] p-4 md:p-5">
            <SpeakingIcon />
          </div>
          
          <h2 className="text-white mb-4 md:mb-6">Speaking & Consulting</h2>
          <p className="mb-8 md:mb-12 text-gray-200 font-['Inter'] max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
            Available for industry conferences, corporate training sessions, operational consulting, and leadership workshops
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-[#0A1929] hover:bg-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 px-8 py-6 rounded-xl font-['Inter'] font-semibold">
              Book a Session
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent px-8 py-6 rounded-xl font-['Inter'] font-semibold">
              View Past Engagements
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}