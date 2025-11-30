import { Award, Target, Handshake, Users, TrendingUp, Heart } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router-dom';

export function NotreDamePage() {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Striving for operational excellence in every endeavor'
    },
    {
      icon: Handshake,
      title: 'Service',
      description: 'Active CNBL community contribution and support'
    },
    {
      icon: TrendingUp,
      title: 'Discipline',
      description: 'Consistent presence and commitment to responsibilities'
    },
    {
      icon: Users,
      title: 'Leadership',
      description: 'Guiding others with integrity and purpose'
    }
  ];

  const reunions = [
    { year: '2004', title: '5 Year Reunion', description: 'First major batch gathering post-graduation' },
    { year: '2009', title: '10 Year Reunion', description: 'Celebrating a decade of achievements' },
    { year: '2014', title: '15 Year Reunion', description: 'Reconnecting and strengthening bonds' },
    { year: '2019', title: '20 Year Reunion', description: 'Two decades of Notredamian spirit' },
    { year: '2024', title: '25 Year Reunion', description: 'Silver jubilee celebration' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1645559946960-c002b6e9d559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZWR1Y2F0aW9uJTIwYnVpbGRpbmd8ZW58MXx8fHwxNjc2Mzg5MDEwOHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Notre Dame College"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#003366]/85"></div>
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
            <span className="text-[#003366] text-3xl">NDC</span>
          </div>
          <h1 className="mb-4 text-white">Notre Dame Legacy</h1>
          <p className="text-2xl mb-2">Batch '99 - Where It All Began</p>
          <p className="text-xl text-gray-200 italic">"Once a Notredamian, Always a Notredamian"</p>
        </div>
      </section>

      {/* The NDC Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="mb-6 text-[#003366]">The NDC Story</h2>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Notre Dame College shaped the foundation of who I am today. The values of excellence, 
                discipline, and service that I learned there continue to guide my professional and 
                community leadership.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Batch '99 was a special cohort - we learned together, grew together, and continue to 
                support each other decades later through CNBL. The friendships forged at Notre Dame 
                have been lifelong, and the lessons learned have been invaluable.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Batch '99 Memories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-[#003366]">Batch '99 Memories</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Classroom Moments', src: 'https://images.unsplash.com/photo-1645559946960-c002b6e9d559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwZWR1Y2F0aW9uJTIwYnVpbGRpbmd8ZW58MXx8fHwxNjc2Mzg5MDEwOHww&ixlib=rb-4.1.0&q=80&w=1080' },
              { title: 'Sports Day', src: 'https://images.unsplash.com/photo-1762006222425-cb6e6b5045f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjM4NzcwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
              { title: 'Farewell Party', src: 'https://images.unsplash.com/photo-1758691736424-4b4273948341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NjM4OTAxMDd8MA&ixlib=rb-4.1.0&q=80&w=1080' }
            ].map((memory, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square">
                  <ImageWithFallback
                    src={memory.src}
                    alt={memory.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-center">{memory.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/gallery">
              <Button className="bg-[#003366] hover:bg-[#004488]">
                View Full Batch '99 Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NDC Values in Action */}
      <section className="py-16 bg-[#E6F2FF]">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4 text-[#003366]">NDC Values in Action</h2>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
            How Notre Dame principles guide my life every day
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-[#003366]">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Message to Current Students */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-xl border-l-4 border-[#D4AF37]">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#E6F2FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-[#003366]" />
                </div>
                <h2 className="text-[#003366]">Message to Current Students</h2>
              </div>
              
              <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-6 pl-4 border-l-4 border-[#003366]">
                "Your time at Notre Dame is not just about academics - it's about building character, 
                forming lifelong friendships, and developing values that will guide you throughout your 
                career and life. Cherish every moment, learn from every experience, and carry the 
                Notredamian spirit with you wherever you go."
              </blockquote>
              
              <div className="text-center">
                <Button className="bg-[#003366] hover:bg-[#004488]">
                  Share Your NDC Story
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Batch Reunion Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-[#003366]">Batch Reunion Highlights</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#003366] -translate-x-1/2"></div>
              
              <div className="space-y-12">
                {reunions.map((reunion, idx) => (
                  <div key={idx} className={`flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <h3 className="mb-2 text-[#003366]">{reunion.title}</h3>
                          <p className="text-gray-600">{reunion.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center text-white flex-shrink-0 relative z-10 shadow-lg">
                      {reunion.year}
                    </div>
                    
                    <div className="flex-1"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Link to="/gallery">
                <Button variant="outline" className="border-[#003366] text-[#003366]">
                  View Reunion Photos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#003366] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-white">Join the Notredamian Family</h2>
          <p className="mb-8 text-gray-200 max-w-2xl mx-auto">
            Whether you're an alumnus or current student, let's stay connected and keep the NDC spirit alive
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-white text-[#003366] hover:bg-gray-100">
              <Link to="/cnbl">Join CNBL</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/gallery">View More Memories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
