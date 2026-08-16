import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ConceptsPage from './pages/ConceptsPage';
import InterviewPage from './pages/InterviewPage';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-600">Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/concepts/*" element={<ConceptsPage />} />
          <Route path="/interview" element={<InterviewPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
