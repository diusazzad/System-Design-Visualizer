import Visualizer from '../components/Visualizer';
import ScenarioSelector from '../components/ScenarioSelector';
import { Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <div className="bg-indigo-600 text-white text-center py-2 text-sm font-medium">
        🚀 Featured on Product Hunt - Check us out!
      </div>
      <header className="bg-slate-900 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-indigo-400">SystemDesign</span>
            <span>Visualizer</span>
          </h1>
          <nav className="flex gap-4">
            <a href="/concepts" className="text-slate-300 hover:text-white px-3 py-2 rounded-md font-medium">Concepts</a>
            <a href="/community" className="text-slate-300 hover:text-white px-3 py-2 rounded-md font-medium">Community</a>
            <a href="/blog" className="text-slate-300 hover:text-white px-3 py-2 rounded-md font-medium">Blog</a>
            <a href="/builder" className="text-indigo-300 hover:text-white px-3 py-2 rounded-md font-bold bg-indigo-900/50 hover:bg-indigo-900 border border-indigo-700/50 transition-colors shadow-sm">Scenario Builder 🚀</a>
            <a href="/interview" className="text-slate-300 hover:text-white px-3 py-2 rounded-md font-medium bg-slate-800 hover:bg-slate-700 transition-colors shadow-sm">Interview Mode</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Interactive Architecture</h2>
            <p className="text-slate-600 text-lg">
              Explore how large-scale systems are designed. Select a scenario and simulate traffic.
            </p>
          </div>

          <ScenarioSelector />
          <div className="h-[650px] bg-white border border-t-0 rounded-b-xl shadow-sm overflow-hidden relative">
            <Visualizer />
          </div>
        </div>
      </main>

      {/* Testimonials */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Loved by 15,000+ Engineers</h2>
            <p className="text-lg text-slate-500">Helping candidates ace interviews at top tech companies.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="flex gap-1 text-orange-400 mb-4">
                <Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" />
              </div>
              <p className="text-slate-700 font-medium mb-6">"The Interview Mode is insanely accurate. I practiced 5 scenarios and easily cleared my L5 loop at Google."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">S</div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Sarah Jenkins</div>
                  <div className="text-slate-500 text-xs">Senior SWE @ Google</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="flex gap-1 text-orange-400 mb-4">
                <Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" />
              </div>
              <p className="text-slate-700 font-medium mb-6">"I use the Scenario Builder to map out real startup architectures. It's so much faster than drawing on Excalidraw."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center">M</div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Mike Chen</div>
                  <div className="text-slate-500 text-xs">CTO @ TechStartup</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="flex gap-1 text-orange-400 mb-4">
                <Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" />
              </div>
              <p className="text-slate-700 font-medium mb-6">"The deep dive questions taught me things I never knew about consistent hashing. A must-have for learning."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">A</div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Alex Rossi</div>
                  <div className="text-slate-500 text-xs">Backend Engineer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
