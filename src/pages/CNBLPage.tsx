import { Calendar, Network, Compass, Handshake, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';

export function CNBLPage() {
  const { galleryImages } = useContent();
  
  // Get CNBL category images from gallery
  const cnblImages = galleryImages.filter(img => 
    img.category.toLowerCase() === 'cnbl' || 
    img.category.toLowerCase() === 'community' ||
    img.tags?.some(tag => tag.toLowerCase().includes('cnbl'))
  ).slice(0, 6); // Get first 6 CNBL images
  const pillars = [
    {
      icon: Calendar,
      number: 1,
      title: 'Events & Member Engagement',
      description: 'Actively involved in planning & organizing major CNBL programs',
      color: '#D4AF37',
      points: [
        'Actively involved in planning & organizing major CNBL programs',
        'Known for bringing people together across batches',
        'Ensures maximum participation in club events',
        'Encourages positivity, unity, and spontaneous involvement'
      ]
    },
    {
      icon: Network,
      number: 2,
      title: 'Communication & Outreach',
      description: 'Maintains strong communication between batches',
      color: '#4CAF50',
      points: [
        'Maintains strong communication between batches',
        'Actively promotes events and encourages participation',
        'Creates uplifting atmosphere through messaging',
        'Professional writing enhances club\'s image'
      ]
    },
    {
      icon: Compass,
      number: 3,
      title: 'Leadership Support',
      description: 'Guides discussions on club development & discipline',
      color: '#2196F3',
      points: [
        'Guides discussions on club development & discipline',
        'Shares strategic ideas for structure & growth',
        'Provides balanced, solution-oriented suggestions',
        'Respected voice in decision-making processes'
      ]
    },
    {
      icon: Handshake,
      number: 4,
      title: 'Representation & Goodwill',
      description: 'Represents CNBL with dignity and professionalism',
      color: '#FF9800',
      points: [
        'Represents CNBL with dignity and professionalism',
        'Promotes positive image of Notredamians',
        'Creates goodwill in social & professional circles',
        'Builds bridges between different batches'
      ]
    },
    {
      icon: Heart,
      number: 5,
      title: 'Consistent Presence & Commitment',
      description: 'Always present in events, meetings, and gatherings',
      color: '#E91E63',
      points: [
        'Always present in events, meetings, and gatherings',
        'Takes initiative during event execution',
        'Supports others with enthusiasm',
        'Passion for CNBL motivates others to be active'
      ]
    }
  ];

  const testimonials = [
    {
      quote: "Mallick's dedication to CNBL is unmatched. He brings people together like no one else.",
      author: "Fellow Notredamian",
      batch: "Batch 2001"
    },
    {
      quote: "His leadership and positivity inspire all of us to be better contributors to our community.",
      author: "Fellow Notredamian",
      batch: "Batch 2005"
    },
    {
      quote: "Every event we organize is better because of Mallick's involvement and guidance.",
      author: "CNBL Committee Member",
      batch: "Batch 2003"
    }
  ];

  const timeline = [
    { year: '1999', event: 'Joined CNBL', description: 'Became part of the Notredamian family' },
    { year: '2005', event: 'First Event Organized', description: 'Led first major batch reunion' },
    { year: '2010', event: 'Major Initiative', description: 'Launched cross-batch networking program' },
    { year: '2015', event: 'Leadership Role', description: 'Took on advisory position' },
    { year: '2024', event: 'Present', description: 'Continuing as active pillar of CNBL' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762006222425-cb6e6b5045f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjM4NzcwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="CNBL Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#003366]/80"></div>
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
          <h1 className="mb-4 text-white">"Not Just a Member — An Asset to CNBL"</h1>
          <p className="text-xl max-w-3xl">
            Engr. Mallick Nazrul Islam's Journey with Club Notredamians Bangladesh Ltd
          </p>
          <div className="mt-8 animate-bounce">
            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
              ↓
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
            Since joining Club Notredamians Bangladesh Ltd, Mallick Nazrul has been one of the most active, 
            dependable, and influential contributors to the club's growth and vibrancy. His dedication, 
            leadership mindset, and consistent support have strengthened activities and member engagement 
            in multiple ways.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2 text-[#003366]">25+</div>
              <div className="text-sm text-gray-600">Years Active</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2 text-[#003366]">100+</div>
              <div className="text-sm text-gray-600">Events</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2 text-[#003366]">All</div>
              <div className="text-sm text-gray-600">Batches</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2 text-[#003366]">High</div>
              <div className="text-sm text-gray-600">Impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Pillars of Contribution */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-center mb-12 text-[#003366]">Five Pillars of Contribution</h2>
          
          <div className="space-y-8">
            {pillars.map((pillar, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-[#003366] rounded-full flex items-center justify-center text-white text-2xl">
                        {pillar.number}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#E6F2FF] rounded-lg flex items-center justify-center flex-shrink-0">
                          <pillar.icon className="w-6 h-6 text-[#003366]" />
                        </div>
                        <div>
                          <h3 className="mb-2 text-[#003366]">{pillar.title}</h3>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 text-gray-700">
                        {pillar.points.map((point, pointIdx) => (
                          <li key={pointIdx} className="flex items-start">
                            <span className="mr-2 text-[#003366]">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline of Involvement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-center mb-12 text-[#003366]">Timeline of Involvement</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-[#E6F2FF]"></div>
            
            <div className="grid md:grid-cols-5 gap-8 relative">
              {timeline.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center text-white mx-auto mb-4 relative z-10">
                    {item.year}
                  </div>
                  <h3 className="mb-2">{item.event}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-center mb-12 text-[#003366]">Testimonials</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl text-[#003366] mb-4">"</div>
                  <p className="text-gray-700 mb-4 italic">{testimonial.quote}</p>
                  <div className="border-t pt-4">
                    <p className="text-sm">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.batch}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">View All Testimonials</Button>
          </div>
        </div>
      </section>

      {/* Event Gallery Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-center mb-12 text-[#003366]">Event Gallery</h2>
          
          {cnblImages.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cnblImages.map((img) => (
                  <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                    <ImageWithFallback
                      src={img.imageUrl}
                      alt={img.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-semibold line-clamp-2">{img.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link to="/gallery">
                  <Button className="bg-[#003366] hover:bg-[#004488]">
                    View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No CNBL gallery images available yet.</p>
              <Link to="/gallery">
                <Button className="bg-[#003366] hover:bg-[#004488]">
                  View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-[#003366] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-white">Impact Metrics</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-2">25+</div>
              <div className="text-gray-300">Years Active</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">100+</div>
              <div className="text-gray-300">Events Organized</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">500+</div>
              <div className="text-gray-300">Members Engaged</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">15+</div>
              <div className="text-gray-300">Batches Connected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-[#003366]">Inspired by Mallick's Dedication?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join CNBL and make your contribution to the Notredamian community!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-[#003366] hover:bg-[#004488]">
              Join CNBL
            </Button>
            <Button variant="outline">
              <Link to="/contact">Contact Mallick</Link>
            </Button>
            <Button variant="outline">
              Share This Story
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}