import image_8c459e6e80cdecfe109cfda4ddeb349e9f2497ca from 'figma:asset/8c459e6e80cdecfe109cfda4ddeb349e9f2497ca.png';
import image_821ae93c1cfa3a4a90e8b5e1a70890cab1bb25c7 from 'figma:asset/821ae93c1cfa3a4a90e8b5e1a70890cab1bb25c7.png';
import image_595be24ab299dc2c12b2638741d506725bcadb93 from 'figma:asset/595be24ab299dc2c12b2638741d506725bcadb93.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, Users, Shield, Award, MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import portraitImage from 'figma:asset/f3f51e39b39538153580c896dd90e282d38f15f2.png';
import poster1 from 'figma:asset/023ed9ca4ae374fdbfe5539a4176e568d38262a8.png';
import poster2 from 'figma:asset/a20a9f3344721801fd72ae2a23f262d55a5a86c2.png';
import poster3 from 'figma:asset/2b4a91fac962ac8a9b51f704bf34e15e0e0e7b92.png';
import poster4 from 'figma:asset/0f8ee55b0356fd2a56ce3d828a7505d136d9041b.png';
import poster5 from '../assets/poster1.jpeg';
import poster6 from '../assets/poster2.jpeg';

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
                <Link
                  to="/journey"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-['Inter'] font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <Award className="w-5 h-5" />
                  View Full Journey
                </Link>
              </div>
              <p className="text-sm text-gray-300 font-['Inter'] mt-3">Stay connected • Explore 22 milestones from 1997-2025</p>
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

      {/* CAMPAIGN MESSAGE SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[#0A1A3A] font-['Montserrat'] text-3xl md:text-4xl mb-4 text-center">
              A Connected CNBL for Every Generation
            </h2>
            <div className="h-1 w-24 bg-[#C62828] mx-auto mb-12"></div>
            
            <div className="space-y-6">
              {[
                'Strengthening batch-to-batch connection and mentorship programs',
                'Supporting member welfare through enhanced benefits and resources',
                'Enabling more engagement and family-friendly events throughout the year',
                'Encouraging unity and respect across all groups and generations',
                'Building a transparent, accessible leadership that listens and acts',
                'Creating opportunities for professional networking and growth'
              ].map((message, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-[#F2F2F2] rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C62828] flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 font-['Inter'] text-lg flex-1">{message}</p>
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
          <p className="text-xl font-['Inter'] text-gray-300 mb-8">
            Vote on 20 December 2025
          </p>
          <a
            href={whatsappJoinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#C62828] text-white font-['Inter'] font-semibold text-lg rounded-xl hover:bg-[#A52020] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            Join WhatsApp Group
          </a>
          
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