import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ConceptsPage from './pages/ConceptsPage';
import InterviewPage from './pages/InterviewPage';
import DesignGallery from './pages/DesignGallery';
import CommunityGalleryPage from './pages/CommunityGalleryPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import { HelmetProvider } from 'react-helmet-async';

import ScenarioBuilderPage from './pages/ScenarioBuilderPage';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-slate-500">Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/concepts/*" element={<ConceptsPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/builder" element={<ScenarioBuilderPage />} />
          <Route path="/gallery" element={<DesignGallery />} />
          <Route path="/community" element={<CommunityGalleryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {/* Global Footer for Analytics/Feedback */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-center text-sm relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">
          <p>© 2026 System Design Visualizer. Open Source.</p>
          <div className="flex gap-6">
            <a href="https://github.com/your-username/system-design-visualizer/issues/new?template=bug_report.md" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">🐛 Report a Bug</a>
            <a href="https://github.com/your-username/system-design-visualizer/issues/new?template=feature_request.md" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">💡 Request Feature</a>
            <a href="https://github.com/your-username/system-design-visualizer/discussions" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">💬 Discussions</a>
          </div>
        </div>
      </footer>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
