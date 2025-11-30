import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import image_60cd5e9871a2724053130fad5e09470d7cd02c44 from 'figma:asset/60cd5e9871a2724053130fad5e09470d7cd02c44.png';
import image_d514f3d5bf1d041190d64f8dca84c0431b2b5504 from 'figma:asset/d514f3d5bf1d041190d64f8dca84c0431b2b5504.png';
import image_d2506b9ceebfd96f289347e92a90edd1fe616bfa from 'figma:asset/d2506b9ceebfd96f289347e92a90edd1fe616bfa.png';
import image_02d592557e333e75b07cdcc79dcbc7ecf3148be0 from 'figma:asset/02d592557e333e75b07cdcc79dcbc7ecf3148be0.png';
import mbaLogo from '../assets/6c38df665b9ba66e3ca1a3cf119acaae7dc96636.png';
import lantaburLogo from '../assets/6c38df665b9ba66e3ca1a3cf119acaae7dc96636.png';
import { Download, Linkedin, Mail, MapPin, Calendar, Factory, TrendingUp, Users, Cog } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import professionalImage from 'figma:asset/6c38df665b9ba66e3ca1a3cf119acaae7dc96636.png';
import buetLogo from '../assets/6c38df665b9ba66e3ca1a3cf119acaae7dc96636.png';

export function ProfessionalPage() {
  const navigate = useNavigate();
  
  const competencies = [
    {
      title: 'Operations Management',
      icon: Factory,
      skills: ['Factory Ops', 'Team Leadership', 'Quality Control']
    },
    {
      title: 'Supply Chain Management',
      icon: TrendingUp,
      skills: ['Sourcing', 'Logistics', 'Vendor Management']
    },
    {
      title: 'Production Planning',
      icon: Cog,
      skills: ['Capacity Planning', 'Schedule Optimization', 'Resource Allocation']
    },
    {
      title: 'Lean Manufacturing',
      icon: TrendingUp,
      skills: ['Six Sigma', 'Kaizen', 'Waste Reduction']
    },
    {
      title: 'Apparel Marketing',
      icon: Users,
      skills: ['RMG Industry', 'Export Compliance', 'Market Analysis']
    },
    {
      title: 'Process Automation',
      icon: Cog,
      skills: ['Tech Integration', 'System Design', 'Digital Transformation']
    }
  ];

  const expertise = [
    'Operations', 'SCM', 'Production Planning', 'Marketing', 'Sourcing',
    'Lean Expert', 'RMG Professional', 'APEX', 'FCI', 'BEXIMCO',
    'Lantabur', 'Team Management', 'Process Improvement', 'Quality Control', 'Compliance'
  ];

  const achievements = [
    'Led 9,700+ workforce achieving $27M monthly shipments',
    'Implemented lean manufacturing practices across operations',
    'Drove significant process automation improvements',
    'Maintained consistent on-time delivery excellence',
    'Built 500+ professional network connections',
    'Enhanced operational efficiency by 35%'
  ];

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-[#003366] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-2 text-gray-300">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <span>Professional</span>
          </div>
          <h1 className="text-white">Professional Profile</h1>
        </div>
      </div>

      {/* Professional Summary */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                    <ImageWithFallback
                      src={professionalImage}
                      alt="Engr. M M Nazrul Islam"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h2 className="mb-2 text-[#003366]">Engr. M M Nazrul (Mallick) Islam</h2>
                  <p className="text-xl mb-1 text-gray-700">Sr. GM (Operations) | Lantabur Group</p>
                  <p className="text-gray-600 mb-6">IPE (BUET) | MBA on Apparel Marketing</p>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Proven leader in factory operations, adept at driving on-time shipments and process automation, 
                    significantly enhancing efficiency at Partex Garments Ltd, led a team of 9700+ achieving an average 
                    monthly shipment of $27,000,000.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-[#003366] hover:bg-[#004488]">
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </Button>
                    <Button variant="outline" onClick={() => window.open('https://bd.linkedin.com/in/m-m-nazrul-islam-41992a30', '_blank')}>
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn Profile
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-[rgba(250,250,249,0)]" onClick={() => {
                      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
                      if (isMobile) {
                        window.location.href = 'sms:+8801845960925';
                      } else {
                        navigate('/contact');
                        setTimeout(() => {
                          const messageSection = document.getElementById('message-section');
                          if (messageSection) {
                            messageSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      }
                    }}>
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Current Position */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#003366]">Current Position</h2>
          
          <Card className="shadow-md">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-2 shadow-sm">
                  <img src={image_d2506b9ceebfd96f289347e92a90edd1fe616bfa} alt="Lantabur Group" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="mb-1">Senior GM (Operations)</h3>
                  <p className="text-gray-600 mb-1">Lantabur Group | Dhaka, Bangladesh</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Present
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="mb-3 text-[#003366]">Key Responsibilities:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-[#003366]">•</span>
                    <span>Leading operations across multiple factories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#003366]">•</span>
                    <span>Managing large-scale production teams</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#003366]">•</span>
                    <span>Ensuring on-time delivery & quality standards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#003366]">•</span>
                    <span>Process optimization & automation implementation</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#003366]">Core Competencies</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Operations Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004488] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="8" width="20" height="12" rx="2" />
                    <path d="M2 12h20" />
                    <path d="M12 8v12" />
                    <circle cx="6" cy="4" r="2" />
                    <circle cx="12" cy="4" r="2" />
                    <circle cx="18" cy="4" r="2" />
                  </svg>
                </div>
                <h3 className="mb-3">Operations Management</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Factory Ops
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Team Leadership
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Quality Control
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Supply Chain Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004488] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h4l3 9H7l-4-9z" />
                    <circle cx="9" cy="19" r="2" />
                    <path d="M14 3h4l3 9h-3l-4-9z" />
                    <circle cx="17" cy="19" r="2" />
                    <path d="M9 17h8" />
                  </svg>
                </div>
                <h3 className="mb-3">Supply Chain Management</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Sourcing
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Logistics
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Vendor Management
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Production Planning */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004488] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M7 8h10M7 12h10M7 16h6" />
                  </svg>
                </div>
                <h3 className="mb-3">Production Planning</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Capacity Planning
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Schedule Optimization
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Resource Allocation
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Lean Manufacturing */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004488] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3 className="mb-3">Lean Manufacturing</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Six Sigma
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Kaizen
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Waste Reduction
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Apparel Marketing */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004488] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2l3 6v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8l3-6z" />
                    <path d="M15 2l3 6v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V8l3-6z" />
                    <path d="M6 2h3M15 2h3" />
                  </svg>
                </div>
                <h3 className="mb-3">Apparel Marketing</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    RMG Industry
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Export Compliance
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Market Analysis
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Process Automation */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004488] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                  </svg>
                </div>
                <h3 className="mb-3">Process Automation</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Tech Integration
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    System Design
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#003366]">•</span>
                    Digital Transformation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#003366]">Areas of Expertise</h2>
          
          <div className="flex flex-wrap gap-2">
            {expertise.map((tag, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="px-4 py-2 text-sm bg-[#E6F2FF] text-[#003366] hover:bg-[#003366] hover:text-white transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#003366]">Education & Certifications</h2>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img src={image_d514f3d5bf1d041190d64f8dca84c0431b2b5504} alt="Notre Dame College Logo" className="w-12 h-12 object-contain" />
                  <div>
                    <h3 className="mb-1">Notre Dame College</h3>
                    <p className="text-gray-600 mb-1">HSC, Science</p>
                    <p className="text-sm text-gray-500">1997 - 1999</p>
                    <p className="text-sm text-gray-600 mt-2">Grade: 87.4%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img src={image_60cd5e9871a2724053130fad5e09470d7cd02c44} alt="BUET Logo" className="w-12 h-12 object-contain" />
                  <div>
                    <h3 className="mb-1">Bangladesh University of Engineering and Technology</h3>
                    <p className="text-gray-600 mb-1">B.Sc.(Engg), Industrial & Production Engineering</p>
                    <p className="text-sm text-gray-500 mb-2">2000 - 2005</p>
                    <p className="text-sm text-gray-600">&gt;CGPA 3.62 on a 4.00 scale.</p>
                    <p className="text-sm text-gray-600">&gt;Hold post of Finance secretary of Association of Industrial and production Engineers(AIPE) from 2004 to 2006.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img src={image_02d592557e333e75b07cdcc79dcbc7ecf3148be0} alt="MBA Logo" className="w-12 h-12 object-contain" />
                  <div>
                    <h3 className="mb-1">MBA on Apparel Marketing</h3>
                    <p className="text-gray-600">Business Administration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#003366]">Key Achievements</h2>
          
          <Card className="shadow-md">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                    <p className="text-gray-700">{achievement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Industry Focus */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#003366]">Industry Focus</h2>
          
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="mb-2">Primary Industry</h3>
                  <p className="text-gray-600">Ready-Made Garments (RMG) / Apparel</p>
                </div>
                <div>
                  <h3 className="mb-2">Specialization</h3>
                  <p className="text-gray-600">Operations, Supply Chain, Production</p>
                </div>
                <div>
                  <h3 className="mb-2">Market</h3>
                  <p className="text-gray-600">Export-oriented manufacturing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-[#003366] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-white">Interested in Connecting?</h2>
          <p className="mb-8 text-gray-200">
            Let's discuss professional opportunities, mentorship, or collaboration
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-white text-[#003366] hover:bg-gray-100" onClick={() => {
              const title = encodeURIComponent('Meeting with Engr. M M Nazrul Islam');
              const details = encodeURIComponent('Meeting request from website. Please suggest your preferred date and time.');
              const guests = encodeURIComponent('mallick.nazrul@gmail.com');
              const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&add=${guests}`;
              window.open(calendarUrl, '_blank');
            }}>
              Schedule a Meeting
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-[rgba(250,250,249,0)]" onClick={() => {
              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
              if (isMobile) {
                window.location.href = 'sms:+8801845960925';
              } else {
                navigate('/contact');
                setTimeout(() => {
                  const messageSection = document.getElementById('message-section');
                  if (messageSection) {
                    messageSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }
            }}>
              Send Message
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-[rgba(250,250,249,0)]" onClick={() => window.open('https://www.linkedin.com/in/m-m-nazrul-islam-41992a30/', '_blank')}>
              <Linkedin className="mr-2 h-4 w-4" />
              View LinkedIn
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}