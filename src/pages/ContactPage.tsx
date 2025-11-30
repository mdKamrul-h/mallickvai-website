import { useState, useEffect } from 'react';
import { Linkedin, Mail, Phone, MapPin, Building, GraduationCap, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Link } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    agreedToPrivacy: false
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToPrivacy) {
      toast.error('Please agree to the privacy policy');
      return;
    }
    toast.success('Message sent successfully! We\'ll get back to you within 24-48 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      agreedToPrivacy: false
    });
  };

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
            <span className="text-[#C9A961]">Contact</span>
          </nav>

          {/* Title */}
          <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
              <span className="text-sm font-['Inter'] font-semibold text-[#C9A961] uppercase tracking-wider">Get in Touch</span>
              <div className="h-1 w-12 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
            </div>

            <h1 className="text-white mb-6">Let's Connect</h1>
            
            <p className="text-lg md:text-xl text-gray-200 font-['Inter'] leading-relaxed max-w-2xl mx-auto">
              Whether it's for professional opportunities, mentorship, CNBL collaboration, or just a conversation — I'd love to hear from you
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods - Premium Cards */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* LinkedIn Card */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, #0077B5 0%, #005885 100%)'
                }}>
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h3 className="mb-3 text-[#0A1929] group-hover:text-[#C9A961] transition-colors">LinkedIn</h3>
                <p className="text-gray-600 mb-6 font-['Inter'] leading-relaxed text-sm md:text-base">
                  Connect professionally and see my career journey
                </p>
                <Button 
                  className="w-full py-5 rounded-xl text-white font-['Inter'] font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #0077B5 0%, #005885 100%)'
                  }}
                  onClick={() => window.open('https://bd.linkedin.com/in/m-m-nazrul-islam-41992a30', '_blank')}
                >
                  Visit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                }}>
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 7L2 7" />
                  </svg>
                </div>
                <h3 className="mb-3 text-[#0A1929] group-hover:text-[#C9A961] transition-colors">Email</h3>
                <p className="text-gray-600 mb-6 font-['Inter'] leading-relaxed text-sm md:text-base">
                  Send a direct email for detailed inquiries
                </p>
                <a href="mailto:mallick.nazrul@gmail.com?subject=Contact%20from%20Website&body=Hello%20Engr.%20M%20M%20Nazrul%20Islam%2C%0D%0A%0D%0A" className="block">
                  <Button 
                    className="w-full py-5 rounded-xl text-white font-['Inter'] font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                    }}
                  >
                    Send Email
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* WhatsApp Card */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
                }}>
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h3 className="mb-3 text-[#0A1929] group-hover:text-[#C9A961] transition-colors">WhatsApp</h3>
                <p className="text-gray-600 mb-6 font-['Inter'] leading-relaxed text-sm md:text-base">
                  Quick messaging for urgent matters
                </p>
                <Button 
                  className="w-full py-5 rounded-xl text-white font-['Inter'] font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
                  }}
                  onClick={() => window.open('https://wa.me/8801845960925?text=Hello%20Engr.%20M%20M%20Nazrul%20Islam,%20I%20would%20like%20to%20connect%20with%20you.', '_blank')}
                >
                  Message on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Premium Design */}
      <section id="message-section" className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#C9A961]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[#B76E79]/5 to-transparent rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-[#C9A961] to-[#B76E79] rounded-full"></div>
                <span className="text-sm font-['Inter'] font-semibold text-gray-500 uppercase tracking-wider">Send Message</span>
                <div className="h-1 w-12 bg-gradient-to-r from-[#B76E79] to-[#C9A961] rounded-full"></div>
              </div>
              <h2 className="text-[#0A1929] mb-4">Let's Start a Conversation</h2>
              <p className="text-gray-600 font-['Inter'] text-base md:text-lg">
                Fill out the form below and I'll get back to you within 24-48 hours
              </p>
            </div>

            <Card className="overflow-hidden border-0 shadow-2xl bg-white">
              <CardContent className="p-6 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#0A1929] font-['Inter'] font-semibold">Your Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-[#C9A961] transition-all font-['Inter']"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#0A1929] font-['Inter'] font-semibold">Your Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-[#C9A961] transition-all font-['Inter']"
                      required
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#0A1929] font-['Inter'] font-semibold">Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      required
                    >
                      <SelectTrigger className="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-[#C9A961] transition-all font-['Inter']">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional Inquiry</SelectItem>
                        <SelectItem value="cnbl">CNBL Related</SelectItem>
                        <SelectItem value="mentorship">Mentorship Request</SelectItem>
                        <SelectItem value="speaking">Speaking/Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#0A1929] font-['Inter'] font-semibold">Your Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message here..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C9A961] transition-all font-['Inter'] resize-none"
                      required
                    />
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreedToPrivacy}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, agreedToPrivacy: checked as boolean })
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="privacy" className="text-sm cursor-pointer font-['Inter'] leading-relaxed text-gray-700">
                      I agree to the privacy policy and consent to my information being used to respond to my inquiry
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-xl text-white font-['Inter'] font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                    }}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Information - Premium Cards */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-[#0A1929] mb-4">Important Information</h2>
              <p className="text-gray-600 font-['Inter'] text-base md:text-lg">
                Please read before reaching out
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Response Time */}
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{
                    background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
                  }}>
                    <Clock className="w-6 h-6 md:w-7 md:h-7 text-[#C9A961]" />
                  </div>
                  <h3 className="mb-3 text-[#0A1929]">Response Time</h3>
                  <p className="text-gray-600 font-['Inter'] leading-relaxed text-sm md:text-base">
                    I typically respond within 24-48 hours during business days. Thank you for your patience!
                  </p>
                </CardContent>
              </Card>

              {/* CNBL Matters */}
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{
                    background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
                  }}>
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-[#C9A961]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4" />
                      <path d="M12 16h.01" />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-[#0A1929]">Urgent CNBL Matters</h3>
                  <p className="text-gray-600 font-['Inter'] leading-relaxed text-sm md:text-base">
                    For urgent CNBL-related matters, please contact the CNBL administration directly for faster assistance.
                  </p>
                </CardContent>
              </Card>

              {/* Business Inquiries */}
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{
                    background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
                  }}>
                    <Linkedin className="w-6 h-6 md:w-7 md:h-7 text-[#C9A961]" />
                  </div>
                  <h3 className="mb-3 text-[#0A1929]">Business Inquiries</h3>
                  <p className="text-gray-600 font-['Inter'] leading-relaxed text-sm md:text-base">
                    For business and professional inquiries, connecting via LinkedIn is the preferred method.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Info Section - Premium Dark */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0A1929 0%, #1A2942 100%)'
      }}>
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#C9A961] to-[#B76E79] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-[#B76E79] to-[#C9A961] rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {/* Location */}
              <div className="group">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                }}>
                  <MapPin className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="mb-2 text-white">Based In</h3>
                <p className="text-gray-300 font-['Inter']">Dhaka, Bangladesh</p>
              </div>

              {/* Company */}
              <div className="group">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                }}>
                  <Building className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="mb-2 text-white">Current Position</h3>
                <p className="text-gray-300 font-['Inter']">Sr. GM Operations</p>
                <p className="text-[#C9A961] font-['Inter'] text-sm mt-1">Lantabur Group</p>
              </div>

              {/* Alumni */}
              <div className="group sm:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, #C9A961 0%, #B76E79 100%)'
                }}>
                  <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="mb-2 text-white">Alumni</h3>
                <p className="text-gray-300 font-['Inter']">Notre Dame College</p>
                <p className="text-[#C9A961] font-['Inter'] text-sm mt-1">Batch '99</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}