
import Visualizer from '../components/Visualizer';
import ScenarioSelector from '../components/ScenarioSelector';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-indigo-400">SystemDesign</span>
            <span>Visualizer</span>
          </h1>
          <nav className="flex gap-4">
            <a href="/concepts" className="text-slate-300 hover:text-white px-3 py-2 rounded-md font-medium">Concepts</a>
            <a href="/interview" className="text-slate-300 hover:text-white px-3 py-2 rounded-md font-medium bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm">Design Interview</a>
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
    </div>
  );
}
