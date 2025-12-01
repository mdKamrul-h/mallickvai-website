import { Download, Mail, Calendar, Building2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import professionalImage from 'figma:asset/6c38df665b9ba66e3ca1a3cf119acaae7dc96636.png';
import lantaburaLogo from '../assets/1631312325371.jpg';
import cvPdf from '../assets/cv.pdf';
import beximcoLogo from 'figma:asset/1312e7585c846834e5cfe9452d0426afa83948dc.png';
import manvillLogo from 'figma:asset/865327b294aeff036bfd502f824b9d015737561b.png';
import apexLogo from 'figma:asset/6506a3b045055b0a7d2cf395b4c3cadb70fcbee6.png';
import {
  OperationsIcon,
  LeadershipIcon,
  QualityIcon,
  SupplyChainIcon,
  StrategyIcon,
  AchievementIcon,
  CertificationIcon,
  ExperienceIcon,
  TeamIcon,
  ProductionIcon,
  InnovationIcon,
  ComplianceIcon
} from '../components/custom-icons/ExperienceIcons';

export function ExperiencePage() {
  const careerStats = [
    { number: '19+', label: 'Years Experience', icon: ExperienceIcon, color: '#C9A961' },
    { number: '6,500+', label: 'Team Members Managed', icon: TeamIcon, color: '#B76E79' },
    { number: '$130M+', label: 'Yearly Operations', icon: StrategyIcon, color: '#C9A961' },
    { number: '5', label: 'Major Companies Led', icon: ProductionIcon, color: '#B76E79' }
  ];

  const currentResponsibilities = [
    {
      icon: StrategyIcon,
      title: 'Strategic Operations',
      color: '#0A1929',
      items: [
        'Managing $130M+ yearly operations',
        'Multi-unit leadership across Apparels, Printing, Washing & Embroidery',
        'Production planning & control across 6,500+ team members',
        'Capacity optimization and expansion',
        'Strategic decision making & budget management'
      ]
    },
    {
      icon: LeadershipIcon,
      title: 'Team Leadership & Development',
      color: '#B76E79',
      items: [
        'Leading 6,500+ employees across multiple units',
        'Department head management',
        'Training & development programs',
        'Performance management systems',
        'Team motivation & retention strategies'
      ]
    },
    {
      icon: QualityIcon,
      title: 'Quality & Compliance',
      color: '#C9A961',
      items: [
        'Quality assurance systems',
        'International compliance standards',
        'Audit management & documentation',
        'Safety standards implementation',
        'Process excellence initiatives'
      ]
    },
    {
      icon: SupplyChainIcon,
      title: 'Supply Chain Excellence',
      color: '#0A1929',
      items: [
        'Sourcing & procurement optimization',
        'Vendor management programs',
        'Logistics coordination',
        'Inventory optimization',
        'Cost reduction initiatives'
      ]
    }
  ];

  const careerHistory = [
    {
      title: 'Operations Group Lead',
      company: 'Lantabur Group',
      logo: lantaburaLogo,
      period: 'Sep 2025 – Present',
      location: 'Dhaka, Bangladesh',
      isCurrent: true,
      description: 'Managing $130M+ yearly operations across Apparels, Printing, Washing & Embroidery',
      metrics: [
        { label: '$130M+ Operations', icon: StrategyIcon },
        { label: '6,500+ Team', icon: TeamIcon },
        { label: 'Multi-unit Leadership', icon: LeadershipIcon }
      ],
      responsibilities: [
        'Strategic leadership across multiple manufacturing units',
        'Operations management for $130M+ yearly revenue',
        'Leading 6,500+ workforce across diverse divisions',
        'Process optimization and quality control',
        'Supply chain and logistics coordination'
      ]
    },
    {
      title: 'Group Operations Head (Apparels)',
      company: 'Lantabur Group',
      logo: lantaburaLogo,
      period: 'Oct 2024 – Aug 2025',
      location: 'Dhaka, Bangladesh',
      description: 'Scaled operations from 87 to 117 stitching lines, achieving 34% capacity expansion',
      metrics: [
        { label: '34% Growth', icon: AchievementIcon },
        { label: '$9M Monthly', icon: StrategyIcon },
        { label: '117 Lines', icon: ProductionIcon }
      ],
      responsibilities: [
        'Scaled stitching lines from 87 to 117',
        'Achieved 34% capacity expansion',
        'Managed $9M monthly operations',
        'Led production planning and optimization',
        'Quality assurance and compliance management'
      ],
      achievements: [
        'Successfully scaled operations by 34% in under a year',
        'Managed $9M average monthly shipments',
        'Expanded production capacity from 87 to 117 stitching lines'
      ]
    },
    {
      title: 'Head of Operations / GM',
      company: 'Beximco',
      logo: beximcoLogo,
      period: 'May 2023 – Sep 2024',
      location: 'Dhaka, Bangladesh',
      description: 'Delivered 33% output growth while maintaining industry-leading 99.03% on-time delivery',
      metrics: [
        { label: '33% Output ↑', icon: AchievementIcon },
        { label: '99.03% OTD', icon: QualityIcon },
        { label: '$35-38M Revenue', icon: StrategyIcon }
      ],
      responsibilities: [
        'Achieved 33% output growth',
        'Maintained 99.03% on-time delivery rate',
        'Managed $35-38M revenue operations',
        'Led quality control initiatives',
        'Optimized production processes'
      ],
      achievements: [
        'Delivered 33% output growth year-over-year',
        'Achieved industry-leading 99.03% on-time delivery',
        'Managed $35-38M monthly revenue operations',
        'Implemented process improvements increasing efficiency'
      ]
    },
    {
      title: 'DMD (Operations & Marketing)',
      company: 'Manvill Styles Ltd',
      logo: manvillLogo,
      period: '2012 – 2022',
      location: 'Dhaka, Bangladesh',
      description: 'Built subcontract unit from ground zero to $8.4M yearly revenue over 10 years',
      metrics: [
        { label: '$0 → $8.4M', icon: StrategyIcon },
        { label: '800 Staff', icon: TeamIcon },
        { label: '10 Years', icon: ExperienceIcon }
      ],
      responsibilities: [
        'Built operations from ground zero',
        'Scaled to $8.4M yearly revenue',
        'Led team of 800 staff members',
        'Operations and marketing leadership',
        'Business development and client management'
      ],
      achievements: [
        'Built subcontract unit from scratch to $8.4M yearly revenue',
        'Scaled workforce to 800+ employees over 10 years',
        'Established strong client relationships and market presence',
        'Developed comprehensive operational systems and processes'
      ]
    },
    {
      title: 'AGM (IE, Planning & Supply Chain)',
      company: 'Apex Holdings',
      logo: apexLogo,
      period: '2010 – 2012',
      location: 'Dhaka, Bangladesh',
      description: 'First FastReact Certified Professional in Bangladesh, drove $15M sales increase in 6 months',
      metrics: [
        { label: 'First in BD', icon: CertificationIcon },
        { label: '$15M Increase', icon: StrategyIcon },
        { label: '4 Factories', icon: ProductionIcon }
      ],
      responsibilities: [
        'Industrial engineering and planning',
        'Supply chain management across 4 factories',
        'FastReact implementation and optimization',
        'Process improvement initiatives',
        'Sales and operations planning'
      ],
      achievements: [
        'First FastReact Certified Professional in Bangladesh',
        'Drove $15M sales increase in 6 months',
        'Managed operations across 4 manufacturing facilities',
        'Pioneered advanced planning systems in Bangladesh RMG industry'
      ]
    }
  ];

  const keySkills = [
    'Operations Management', 'Supply Chain', 'Lean Manufacturing', 'Six Sigma',
    'Quality Control', 'Team Leadership', 'Process Automation', 'Strategic Planning',
    'Budget Management', 'Vendor Management', 'Compliance', 'SAP', 'ERP Systems'
  ];

  const certifications = [
    {
      title: 'Lean Six Sigma Black Belt',
      institution: 'International Association for Six Sigma Certification',
      year: '2015',
      icon: QualityIcon,
      color: '#C9A961'
    },
    {
      title: 'Operations Management Professional',
      institution: 'Institute of Industrial Engineers',
      year: '2012',
      icon: OperationsIcon,
      color: '#0A1929'
    },
    {
      title: 'Supply Chain Management',
      institution: 'APICS Certification',
      year: '2010',
      icon: SupplyChainIcon,
      color: '#B76E79'
    }
  ];

  const majorAchievements = [
    'Led 9,700+ workforce achieving $27M average monthly shipments',
    'Maintained 98% on-time delivery rate consistently',
    'Implemented lean manufacturing reducing waste by 35%',
    'Successfully led automation initiatives improving efficiency by 42%',
    'Developed high-performing management team of 50+ leaders',
    'Achieved zero critical compliance violations for 5 consecutive years',
    'Reduced production costs by 22% through process optimization',
    'Enhanced operational efficiency by 35% across all facilities'
  ];

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-[#0A1929] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-2 text-gray-300">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link to="/professional" className="hover:text-white">Professional</Link>
            <span>›</span>
            <span>Experience</span>
          </div>
          <h1 className="text-white mb-2">Professional Experience</h1>
          <p className="text-gray-200">
            From management trainee to leading $130M+ operations across multiple manufacturing units
          </p>
        </div>
      </div>

      {/* Career Overview Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-[#0A1929]">Career at a Glance</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {careerStats.map((stat, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                      border: `2px solid ${stat.color}30`
                    }}
                  >
                    <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                  </div>
                  <div className="text-3xl mb-2" style={{ color: stat.color, fontWeight: 'bold' }}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Position Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#0A1929]">Current Position</h2>
          
          <Card className="shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                  <img
                    src={professionalImage}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                    <div>
                      <h3 className="mb-2 text-[#0A1929]">Operations Group Lead</h3>
                      <p className="text-xl text-gray-700 mb-1">Lantabur Group</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Sep 2025 - Present
                        </span>
                        <span>📍 Dhaka, Bangladesh</span>
                      </div>
                    </div>
                    <Badge className="bg-[#C9A961] text-white px-4 py-1">
                      Current Position
                    </Badge>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Managing $130M+ yearly operations across Apparels, Printing, Washing & Embroidery. Leading strategic operations across multiple manufacturing units with a workforce of 6,500+ employees, ensuring excellence in quality, delivery, and operational efficiency.
                  </p>
                  
                  {/* Metrics Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-[#C9A961] text-[#0A1929] px-3 py-1">
                      $130M+ Operations
                    </Badge>
                    <Badge variant="outline" className="border-[#B76E79] text-[#0A1929] px-3 py-1">
                      6,500+ Team
                    </Badge>
                    <Badge variant="outline" className="border-[#C9A961] text-[#0A1929] px-3 py-1">
                      Multi-unit Leadership
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Responsibilities Grid */}
          <h3 className="mb-6 text-[#0A1929]">Key Responsibilities</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {currentResponsibilities.map((resp, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: `linear-gradient(135deg, ${resp.color}15 0%, ${resp.color}05 100%)`,
                        border: `2px solid ${resp.color}30`
                      }}
                    >
                      <resp.icon className="w-6 h-6" style={{ color: resp.color }} />
                    </div>
                    <h4 className="text-[#0A1929]">{resp.title}</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {resp.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start">
                        <span className="mr-2 text-[#C9A961]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career History Timeline */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#0A1929]">Career History</h2>
          
          <div className="space-y-6">
            {careerHistory.map((position, idx) => (
              <Card key={idx} className="shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white p-2"
                      style={{ 
                        border: position.isCurrent 
                          ? '2px solid #C9A96130'
                          : '2px solid #0A192930'
                      }}
                    >
                      <img 
                        src={position.logo} 
                        alt={`${position.company} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
                        <div>
                          <h3 className="text-[#0A1929] mb-1">{position.title}</h3>
                          <p className="text-lg text-gray-700">{position.company}</p>
                        </div>
                        {position.isCurrent && (
                          <Badge className="bg-[#C9A961] text-white">Current</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {position.period}
                        </span>
                        <span>📍 {position.location}</span>
                      </div>

                      {/* Description */}
                      {position.description && (
                        <p className="text-gray-700 mb-3 text-sm italic">
                          {position.description}
                        </p>
                      )}

                      {/* Metrics Badges */}
                      {position.metrics && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {position.metrics.map((metric, metricIdx) => (
                            <Badge 
                              key={metricIdx} 
                              variant="outline" 
                              className="border-[#C9A961] text-[#0A1929] px-3 py-1 text-xs"
                            >
                              {metric.label}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="mb-4">
                        <h4 className="text-sm mb-2 text-[#0A1929]">Responsibilities:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {position.responsibilities.map((resp, respIdx) => (
                            <li key={respIdx} className="flex items-start">
                              <span className="mr-2 text-[#0A1929]">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {position.achievements && (
                        <div>
                          <h4 className="text-sm mb-2 text-[#C9A961] flex items-center gap-2">
                            <AchievementIcon className="w-4 h-4" />
                            Key Achievements:
                          </h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {position.achievements.map((achievement, achIdx) => (
                              <li key={achIdx} className="flex items-start">
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C9A961] bg-opacity-10 flex items-center justify-center mr-2 mt-0.5">
                                  <span className="text-[#C9A961] text-xs">✓</span>
                                </div>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#0A1929]">Skills & Expertise</h2>
          
          <div className="flex flex-wrap gap-2">
            {keySkills.map((skill, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="px-4 py-2 text-sm bg-[#0A1929] bg-opacity-5 text-[#0A1929] hover:bg-[#0A1929] hover:text-white transition-colors cursor-pointer"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#0A1929]">Professional Certifications</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4" style={{ color: cert.color }}>{cert.icon}</div>
                  <h3 className="mb-2 text-[#0A1929]">{cert.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{cert.institution}</p>
                  <p className="text-sm text-gray-500">{cert.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Major Achievements */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#0A1929]">Major Achievements</h2>
          
          <Card className="shadow-md">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {majorAchievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div 
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                      style={{ background: 'linear-gradient(135deg, #C9A961 0%, #B89850 100%)' }}
                    >
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

      {/* Professional Memberships */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="mb-8 text-[#0A1929]">Professional Memberships & Affiliations</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ 
                    background: 'linear-gradient(135deg, #0A192915 0%, #0A192905 100%)',
                    border: '2px solid #0A192930'
                  }}
                >
                  <ExperienceIcon className="w-8 h-8 text-[#0A1929]" />
                </div>
                <h3 className="mb-2 text-[#0A1929]">Club Notredamians Bangladesh</h3>
                <p className="text-sm text-gray-600">Active Member Since 1999</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ 
                    background: 'linear-gradient(135deg, #B76E7915 0%, #B76E7905 100%)',
                    border: '2px solid #B76E7930'
                  }}
                >
                  <ProductionIcon className="w-8 h-8 text-[#B76E79]" />
                </div>
                <h3 className="mb-2 text-[#0A1929]">Bangladesh Garment Manufacturers & Exporters Association</h3>
                <p className="text-sm text-gray-600">Member</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ 
                    background: 'linear-gradient(135deg, #C9A96115 0%, #C9A96105 100%)',
                    border: '2px solid #C9A96130'
                  }}
                >
                  <AchievementIcon className="w-8 h-8 text-[#C9A961]" />
                </div>
                <h3 className="mb-2 text-[#0A1929]">Institute of Industrial Engineers</h3>
                <p className="text-sm text-gray-600">Professional Member</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-[#0A1929] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-white">Interested in Collaborating?</h2>
          <p className="mb-8 text-gray-200">
            Let's connect for speaking opportunities, consulting, or professional networking
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              className="bg-[#C9A961] hover:bg-[#B89850] text-white"
              onClick={() => {
                const link = document.createElement('a');
                link.href = cvPdf;
                link.download = 'M_M_Nazrul_Islam_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-[rgba(250,250,249,0)]">
              <Link to="/contact">
                <Mail className="mr-2 h-4 w-4 inline" />
                Contact Me
              </Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-[rgba(250,250,249,0)]">
              <Link to="/professional">View Professional Profile</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}