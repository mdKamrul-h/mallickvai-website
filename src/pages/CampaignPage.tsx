import image_8c459e6e80cdecfe109cfda4ddeb349e9f2497ca from 'figma:asset/8c459e6e80cdecfe109cfda4ddeb349e9f2497ca.png';
import image_821ae93c1cfa3a4a90e8b5e1a70890cab1bb25c7 from 'figma:asset/821ae93c1cfa3a4a90e8b5e1a70890cab1bb25c7.png';
import image_595be24ab299dc2c12b2638741d506725bcadb93 from 'figma:asset/595be24ab299dc2c12b2638741d506725bcadb93.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, Users, Shield, Award, MessageCircle, ArrowRight, CheckCircle, Download, FileText, Target, Handshake, TrendingUp, Calendar, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import portraitImage from 'figma:asset/f3f51e39b39538153580c896dd90e282d38f15f2.png';
import poster1 from 'figma:asset/023ed9ca4ae374fdbfe5539a4176e568d38262a8.png';
import poster2 from 'figma:asset/a20a9f3344721801fd72ae2a23f262d55a5a86c2.png';
import poster3 from 'figma:asset/2b4a91fac962ac8a9b51f704bf34e15e0e0e7b92.png';
import poster4 from 'figma:asset/0f8ee55b0356fd2a56ce3d828a7505d136d9041b.png';
import poster5 from '../assets/poster1.jpeg';
import poster6 from '../assets/poster2.jpeg';
import manifestoPdf from '../assets/cv.pdf';

interface CampaignPageProps {
  isModal?: boolean;
  onClose?: () => void;
}

export function CampaignPage({ isModal = false, onClose }: CampaignPageProps) {
  const [showPage, setShowPage] = useState(true);

  const handleClose = () => {
    setShowPage(false);
    if (onClose) onClose();
  };

  const whatsappJoinUrl = "https://chat.whatsapp.com/Kd56Eidki7IG2hpQeSLK9m?mode=hqrt2";

  if (!showPage) return null;

  const content = (
    <div className="relative bg-white">
      {/* Close Button (for modal) */}
      {isModal && (
        <button
          onClick={handleClose}
          className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 border-2 border-gray-200"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-[#0A1A3A]" />
        </button>
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0A1A3A 0%, #15294A 100%)'
      }}>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-block">
                <div className="text-[#C62828] font-['Inter'] font-semibold text-sm tracking-wider mb-4">
                  CNBL EXECUTIVE COMMITTEE CANDIDATE
                </div>
              </div>
              
              <h1 className="font-['Montserrat'] text-4xl md:text-5xl lg:text-6xl leading-tight text-[rgb(141,144,147)]">
                Lead with <span className="text-[#C62828]">Calm</span>.<br />
                Serve with <span className="text-[#C62828]">Heart</span>.
              </h1>
              
              <div className="h-1 w-24 bg-[#C62828]"></div>
              
              {/* Identity Block */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 inline-block">
                <div className="font-['Montserrat'] font-bold text-2xl md:text-3xl mb-2">
                  MALLICK NAZRUL ISLAM
                </div>
                <div className="font-['Inter'] text-lg text-[#C62828] font-semibold">
                  LM 0202 • NDC 1999
                </div>
              </div>
              
              <div className="space-y-2 text-lg font-['Inter']">
                <p className="text-gray-300">Executive Committee Candidate — CNBL</p>
                <p className="text-white font-semibold">Election: 20 December 2025</p>
              </div>
              
              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappJoinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C62828] text-white font-['Inter'] font-semibold rounded-xl hover:bg-[#A52020] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join WhatsApp Group
                </a>
                <a
                  href={manifestoPdf}
                  download="Election_Manifesto_Mallick_Nazrul_Islam.pdf"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-['Inter'] font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download Manifesto
                </a>
                <Link
                  to="/journey"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-['Inter'] font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <Award className="w-5 h-5" />
                  View Journey
                </Link>
              </div>
              <p className="text-sm text-gray-300 font-['Inter'] mt-3">Stay connected • Download full manifesto • Explore 22 milestones from 1997-2025</p>
            </div>

            {/* Right Portrait */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <ImageWithFallback
                  src={portraitImage}
                  alt="M.M. Mallick"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3A]/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-[#F2F2F2]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[#0A1A3A] font-['Montserrat'] text-3xl md:text-4xl mb-4 text-center">
              Who I Am
            </h2>
            <div className="h-1 w-24 bg-[#C62828] mx-auto mb-8"></div>
            
            <p className="text-gray-700 font-['Inter'] text-lg leading-relaxed text-center mb-12">
              With over two decades of dedication to CNBL and a lifelong commitment to the values we share, 
              I believe in calm, respectful leadership that brings people together. My vision is simple: 
              a stronger, more connected CNBL where every member feels valued, heard, and supported. 
              Together, we can build unity across generations and foster a community that truly serves everyone.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Shield, label: 'Integrity' },
                { icon: Users, label: 'Unity' },
                { icon: Heart, label: 'Respect' },
                { icon: Award, label: 'Service' },
              ].map((value, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#0A1A3A] to-[#15294A] flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-[#0A1A3A] font-['Montserrat'] font-semibold">{value.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO DOWNLOAD SECTION */}
      <section className="py-16 bg-gradient-to-br from-[#0A1A3A] to-[#15294A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <FileText className="w-16 h-16 mx-auto text-[#C62828]" />
            </div>
            <h2 className="font-['Montserrat'] text-3xl md:text-4xl mb-4">
              Download the Complete Election Manifesto
            </h2>
            <p className="text-gray-300 font-['Inter'] text-lg mb-8 max-w-2xl mx-auto">
              Get the full document detailing my vision, mission, and comprehensive action plans for CNBL's future. 
              This manifesto outlines my commitment to strengthening our community, enhancing member welfare, and building a more connected CNBL.
            </p>
            <a
              href={manifestoPdf}
              download="Election_Manifesto_Mallick_Nazrul_Islam.pdf"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#C62828] text-white font-['Inter'] font-semibold text-lg rounded-xl hover:bg-[#A52020] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Download className="w-6 h-6" />
              Download Original Manifesto PDF
            </a>
            <p className="text-sm text-gray-400 font-['Inter'] mt-4">PDF Document • Complete Election Manifesto 2025</p>
          </div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Vision */}
              <div className="bg-gradient-to-br from-[#0A1A3A] to-[#15294A] rounded-2xl p-8 text-white">
                <div className="w-16 h-16 rounded-full bg-[#C62828] flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-['Montserrat'] text-2xl md:text-3xl mb-4">My Vision</h3>
                <p className="font-['Inter'] text-lg leading-relaxed text-gray-200">
                  A stronger, more connected CNBL where every member feels valued, heard, and supported. 
                  A community that bridges generations, fosters unity, and creates lasting bonds through 
                  respectful leadership and genuine service.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-gradient-to-br from-[#C62828] to-[#A52020] rounded-2xl p-8 text-white">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-['Montserrat'] text-2xl md:text-3xl mb-4">My Mission</h3>
                <p className="font-['Inter'] text-lg leading-relaxed text-gray-100">
                  To lead with calm and serve with heart, bringing together all generations of CNBL members 
                  through transparent leadership, enhanced member welfare, and meaningful engagement that 
                  strengthens our collective bond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE MANIFESTO POINTS */}
      <section className="py-20 bg-[#F2F2F2]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#0A1A3A] font-['Montserrat'] text-3xl md:text-4xl mb-4">
                Core Manifesto Commitments
              </h2>
              <div className="h-1 w-24 bg-[#C62828] mx-auto mb-4"></div>
              <p className="text-gray-600 font-['Inter'] text-lg max-w-2xl mx-auto">
                Six fundamental pillars that will guide my leadership and service to CNBL
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: 'Strengthen Connections',
                  description: 'Build stronger batch-to-batch connections and establish mentorship programs that bridge generations',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  icon: Heart,
                  title: 'Member Welfare',
                  description: 'Enhance member benefits, resources, and support systems to ensure every member feels valued',
                  color: 'from-red-500 to-red-600'
                },
                {
                  icon: Calendar,
                  title: 'More Engagement',
                  description: 'Organize family-friendly events throughout the year to increase participation and strengthen bonds',
                  color: 'from-green-500 to-green-600'
                },
                {
                  icon: Handshake,
                  title: 'Unity & Respect',
                  description: 'Foster unity and respect across all groups and generations, creating an inclusive environment',
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  icon: Shield,
                  title: 'Transparent Leadership',
                  description: 'Build accessible leadership that listens, communicates openly, and acts on member feedback',
                  color: 'from-orange-500 to-orange-600'
                },
                {
                  icon: TrendingUp,
                  title: 'Professional Growth',
                  description: 'Create networking opportunities and professional development programs for member advancement',
                  color: 'from-teal-500 to-teal-600'
                }
              ].map((point, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center mb-4`}>
                    <point.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-['Montserrat'] font-semibold text-xl text-[#0A1A3A] mb-3">
                    {point.title}
                  </h3>
                  <p className="font-['Inter'] text-gray-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED ACTION PLANS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[#0A1A3A] font-['Montserrat'] text-3xl md:text-4xl mb-4">
                Action Plans & Priorities
              </h2>
              <div className="h-1 w-24 bg-[#C62828] mx-auto mb-4"></div>
              <p className="text-gray-600 font-['Inter'] text-lg">
                Concrete steps I will take to fulfill these commitments
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  category: 'Connection & Mentorship',
                  actions: [
                    'Establish formal mentorship programs pairing senior and junior batches',
                    'Create regular inter-batch networking events and social gatherings',
                    'Develop digital platforms for better communication and connection'
                  ]
                },
                {
                  category: 'Member Welfare',
                  actions: [
                    'Review and enhance existing member benefits and support systems',
                    'Create emergency assistance fund for members in need',
                    'Establish health and wellness programs for members and families'
                  ]
                },
                {
                  category: 'Events & Engagement',
                  actions: [
                    'Organize quarterly family-friendly events open to all members',
                    'Plan annual grand reunion with enhanced programming',
                    'Create special events for different age groups and interests'
                  ]
                },
                {
                  category: 'Transparency & Communication',
                  actions: [
                    'Implement regular town halls and member feedback sessions',
                    'Establish clear communication channels for updates and announcements',
                    'Create transparent reporting on committee activities and decisions'
                  ]
                },
                {
                  category: 'Professional Development',
                  actions: [
                    'Organize industry-specific networking events and workshops',
                    'Create mentorship opportunities for career advancement',
                    'Establish partnerships with educational and professional institutions'
                  ]
                }
              ].map((plan, idx) => (
                <div key={idx} className="bg-gradient-to-r from-[#F2F2F2] to-white rounded-xl p-6 border-l-4 border-[#C62828] hover:shadow-lg transition-all duration-300">
                  <h3 className="font-['Montserrat'] font-semibold text-xl text-[#0A1A3A] mb-4">
                    {plan.category}
                  </h3>
                  <ul className="space-y-3">
                    {plan.actions.map((action, actionIdx) => (
                      <li key={actionIdx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#C62828] flex-shrink-0 mt-0.5" />
                        <span className="font-['Inter'] text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP JOIN CTA BLOCK */}
      <section className="py-20" style={{
        background: 'linear-gradient(135deg, #E8F5E9 0%, #E3F2FD 100%)'
      }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-[#0A1A3A] font-['Montserrat'] text-3xl md:text-4xl mb-6">
              Join Our WhatsApp Community
            </h2>
            
            <p className="text-gray-700 font-['Inter'] text-lg mb-8 leading-relaxed">
              Get updates, posters, event announcements, and campaign messages directly in your WhatsApp. 
              Stay connected, stay informed, and be part of the conversation that shapes our CNBL future.
            </p>
            
            <a
              href={whatsappJoinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#C62828] text-white font-['Inter'] font-semibold text-lg rounded-xl hover:bg-[#A52020] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              Join WhatsApp Group
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <p className="text-sm text-gray-600 font-['Inter'] mt-4">Open to all CNBL members</p>
          </div>
        </div>
      </section>

      {/* VISUAL GALLERY SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-[#0A1A3A] font-['Montserrat'] text-3xl md:text-4xl mb-4 text-center">
            Campaign Visuals
          </h2>
          <div className="h-1 w-24 bg-[#C62828] mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Poster 1 - Calm Leadership */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <ImageWithFallback
                src={poster1}
                alt="Calm Leadership. Respectful Service."
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Poster 2 - Bridging Generations */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <ImageWithFallback
                src={image_595be24ab299dc2c12b2638741d506725bcadb93}
                alt="Bridging Every Generation of CNBL"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Poster 3 - Integrity */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <ImageWithFallback
                src={image_821ae93c1cfa3a4a90e8b5e1a70890cab1bb25c7}
                alt="Integrity You Can Trust"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Poster 4 - Unity */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <ImageWithFallback
                src={image_8c459e6e80cdecfe109cfda4ddeb349e9f2497ca}
                alt="Committed to Member Welfare"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Poster 5 - Respect */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <ImageWithFallback
                src={poster5}
                alt="Strength in Our Unity"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Poster 6 - Service */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <ImageWithFallback
                src={poster6}
                alt="Vote Dec 20: Your Voice Matters"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-20 bg-[#0A1A3A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Montserrat'] text-3xl md:text-5xl mb-6 text-white">
            Your Support Strengthens Our Bonds.
          </h2>
          <p className="text-xl font-['Inter'] text-gray-300 mb-4">
            Vote on 20 December 2025
          </p>
          <p className="text-lg font-['Inter'] text-gray-400 mb-8 max-w-2xl mx-auto">
            Together, we can build a stronger, more connected CNBL. Download the complete manifesto to learn more about my vision and plans.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href={whatsappJoinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#C62828] text-white font-['Inter'] font-semibold text-lg rounded-xl hover:bg-[#A52020] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              Join WhatsApp Group
            </a>
            <a
              href={manifestoPdf}
              download="Election_Manifesto_Mallick_Nazrul_Islam.pdf"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-['Inter'] font-semibold text-lg rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <Download className="w-6 h-6" />
              Download Manifesto
            </a>
          </div>
          
          {!isModal && (
            <div className="mt-8">
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-['Inter'] transition-colors duration-300"
              >
                Continue to Profile Website
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#F2F2F2] py-12 border-t-4 border-[#C62828]">
        <div className="container mx-auto px-4 text-center">
          <div className="font-['Montserrat'] font-bold text-2xl text-[#0A1A3A] mb-2">
            MALLICK NAZRUL ISLAM
          </div>
          <div className="font-['Inter'] text-lg text-[#C62828] font-semibold mb-4">
            LM 0202 • NDC 1999
          </div>
          <div className="font-['Inter'] text-gray-600">
            Election: 20 December 2025
          </div>
          <div className="mt-6 text-sm text-gray-500 font-['Inter']">
            Authorized by Mallick Nazrul Islam for CNBL Executive Committee Election
          </div>
        </div>
      </footer>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/50 backdrop-blur-sm">
        <div className="min-h-screen">
          {content}
        </div>
      </div>
    );
  }

  return content;
}