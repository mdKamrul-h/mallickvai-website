import { Link } from "react-router-dom";
import {
  Linkedin,
  Facebook,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import logoImage from 'figma:asset/97b20d4f121ee7a389b0802aa92c936c5c4f8e2b.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0A1929 0%, #1A2942 100%)",
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[#B76E79] to-[#C9A961] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={logoImage} 
                alt="Mallick Nazrul Islam Logo" 
                className="w-14 h-14 object-contain"
              />
              <div>
                <div className="text-white font-['Montserrat'] font-bold text-lg">
                  Engr. M M Nazrul Islam (Mallick)
                </div>
                <div className="text-[#C9A961] font-['Inter'] text-sm">
                  Batch '99 | Sr. GM
                </div>
              </div>
            </div>
            <p className="text-gray-300 font-['Inter'] text-sm leading-relaxed mb-6 max-w-md">
              Operations Leader | CNBL Asset | Notredamian.
              Driving operational excellence and building
              communities for over 25 years.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-[#C9A961]" />
                <span className="font-['Inter'] text-sm">
                  Dhaka, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-[#C9A961]" />
                <span className="font-['Inter'] text-sm">
                  Available for consultation
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-['Montserrat'] font-bold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                {
                  to: "/professional",
                  label: "Professional Profile",
                },
                { to: "/cnbl", label: "CNBL Journey" },
                { to: "/leadership", label: "Leadership" },
                { to: "/gallery", label: "Gallery" },
                {
                  to: "/notre-dame",
                  label: "Notre Dame Legacy",
                },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 font-['Inter'] text-sm hover:text-[#C9A961] transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-[#C9A961] group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-white font-['Montserrat'] font-bold text-lg mb-6">
              Connect
            </h3>
            <div className="space-y-4 mb-6">
              <a
                href="https://www.linkedin.com/in/m-m-nazrul-islam-41992a30/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-[#C9A961] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#C9A961] hover:to-[#B76E79] hover:border-transparent transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="font-['Inter'] text-sm">
                  LinkedIn
                </span>
              </a>
              <a
                href="https://www.facebook.com/mallicknazrul"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-[#C9A961] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#C9A961] hover:to-[#B76E79] hover:border-transparent transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </div>
                <span className="font-['Inter'] text-sm">
                  Facebook
                </span>
              </a>
              <a
                href="mailto:mallick.nazrul@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-[#C9A961] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#C9A961] hover:to-[#B76E79] hover:border-transparent transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-['Inter'] text-sm">
                  Email
                </span>
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <p className="text-gray-300 font-['Inter'] text-sm mb-3">
                Stay Updated
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="mallick.nazrul@gmail.com"
                  className="flex-1 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#C9A961] transition-colors font-['Inter'] text-sm"
                />
                <button className="px-4 py-2 rounded-xl bg-gradient-to-br from-[#C9A961] to-[#B76E79] text-white font-['Inter'] font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 font-['Inter'] text-sm text-center md:text-left">
            © {currentYear} M M Nazrul Islam | Notredamian
            Batch '99 | All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="#"
              className="text-gray-400 hover:text-[#C9A961] font-['Inter'] text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-[#C9A961] font-['Inter'] text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}