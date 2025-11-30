import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ProfessionalPage } from './pages/ProfessionalPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { CNBLPage } from './pages/CNBLPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { BlogPage } from './pages/BlogPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { NotreDamePage } from './pages/NotreDamePage';
import { CampaignPage } from './pages/CampaignPage';
import { MilestonesPage } from './pages/MilestonesPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminBlog } from './pages/admin/AdminBlog';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminAchievements } from './pages/admin/AdminAchievements';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminCareer } from './pages/admin/AdminCareer';
import { AdminMilestones } from './pages/admin/AdminMilestones';
import { JourneyAdmin } from './pages/admin/JourneyAdmin';
import { ContentProvider } from './contexts/ContentContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CampaignModal } from './components/CampaignModal';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Routes>
              {/* Campaign Route - Now the Landing Page */}
              <Route path="/" element={<CampaignPage />} />
              <Route path="/campaign" element={<CampaignPage />} />
              
              {/* Login Route */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Admin Routes - Protected with Authentication */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/blog" element={
                <ProtectedRoute>
                  <AdminBlog />
                </ProtectedRoute>
              } />
              <Route path="/admin/gallery" element={
                <ProtectedRoute>
                  <AdminGallery />
                </ProtectedRoute>
              } />
              <Route path="/admin/milestones" element={
                <ProtectedRoute>
                  <AdminMilestones />
                </ProtectedRoute>
              } />
              <Route path="/admin/achievements" element={
                <ProtectedRoute>
                  <AdminAchievements />
                </ProtectedRoute>
              } />
              <Route path="/admin/testimonials" element={
                <ProtectedRoute>
                  <AdminTestimonials />
                </ProtectedRoute>
              } />
              <Route path="/admin/career" element={
                <ProtectedRoute>
                  <AdminCareer />
                </ProtectedRoute>
              } />
              <Route path="/admin/journey" element={
                <ProtectedRoute>
                  <JourneyAdmin />
                </ProtectedRoute>
              } />
            
            {/* Public Routes - With Header/Footer */}
            <Route path="/*" element={
              <>
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/profile" element={<HomePage />} />
                    <Route path="/professional" element={<ProfessionalPage />} />
                    <Route path="/experience" element={<ExperiencePage />} />
                    <Route path="/journey" element={<MilestonesPage />} />
                    <Route path="/cnbl" element={<CNBLPage />} />
                    <Route path="/leadership" element={<LeadershipPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<ArticleDetailPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/notre-dame" element={<NotreDamePage />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ContentProvider>
    </AuthProvider>
  );
}