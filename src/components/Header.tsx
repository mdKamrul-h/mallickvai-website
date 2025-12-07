import image_494966ff6f2336eb8afb7a355ac7725861848ae4 from 'figma:asset/494966ff6f2336eb8afb7a355ac7725861848ae4.png';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, Facebook, Mail } from 'lucide-react';
import { Button } from './ui/button';
import profileImage from 'figma:asset/6c38df665b9ba66e3ca1a3cf119acaae7dc96636.png';

const logoImage = image_494966ff6f2336eb8afb7a355ac7725861848ae4;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/profile', label: 'Profile' },
    { path: '/professional', label: 'Professional' },
    { path: '/experience', label: 'Experience' },
    { path: '/journey', label: 'Journey' },
    { path: '/cnbl', label: 'CNBL' },
    { path: '/leadership', label: 'Leadership' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 glass-effect border-b border-[rgba(45,55,72,0.1)] shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Premium Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-14 h-14 transform group-hover:scale-110 transition-transform duration-300">
                <img src={image_494966ff6f2336eb8afb7a355ac7725861848ae4} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="hidden md:block">
                <div className="text-[#0A1929] font-['Montserrat'] font-bold text-lg">Engr. M M Nazrul Islam (Mallick)</div>
                <div className="text-sm text-[#64748B] font-['Inter'] font-medium">NDC '99 | Sr. GM</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2.5 rounded-xl font-['Inter'] font-semibold text-sm transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-white shadow-lg'
                      : 'text-[#2D3748] hover:text-[#0A1929]'
                  }`}
                  style={isActive(item.path) ? {
                    background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
                  } : {}}
                >
                  {!isActive(item.path) && (
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#F8F9FA] to-[#FAFAF9] opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                  )}
                  {item.label}
                </Link>
              ))}
              <a
                href="https://www.linkedin.com/in/m-m-nazrul-islam-41992a30/"
                className="ml-2 w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A961] to-[#B76E79] flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-[#F8F9FA] rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Premium Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[9999] md:hidden overflow-y-auto"
          style={{
            background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)',
            animation: 'slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="min-h-screen p-6 flex flex-col">
            {/* Close Button */}
            <div className="flex justify-end mb-8">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-8 w-8" />
              </Button>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mb-12">
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-[#C9A961] shadow-2xl">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#C9A961] to-[#B76E79] opacity-50 blur-xl"></div>
              </div>
              <h2 className="text-white font-['Montserrat'] font-bold text-2xl mb-2 text-center">M M Nazrul Islam</h2>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-[#C9A961] font-['Inter'] font-semibold text-sm">Batch '99 | Sr. GM Operations</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-3 mb-12">
              {navItems.map((item, idx) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-6 py-4 text-white font-['Inter'] font-semibold text-lg rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#C9A961] transition-all duration-300 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animation: `fadeInUp 0.4s ease-out ${idx * 0.1}s both` }}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    <span className="text-[#C9A961]">→</span>
                  </span>
                </Link>
              ))}
            </nav>

            {/* Social Links */}
            <div className="border-t border-white/20 pt-8">
              <p className="text-white font-['Inter'] font-medium mb-6 text-center">Connect with me</p>
              <div className="flex justify-center gap-4">
                <a
                  href="#"
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A961] to-[#B76E79] flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#C9A961] hover:scale-110 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#C9A961] hover:scale-110 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}