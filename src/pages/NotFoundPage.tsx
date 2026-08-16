import { NavLink } from 'react-router-dom';
import { Search, Map } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>404 Not Found - System Design Visualizer</title>
      </Helmet>
      
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full"></div>
        <Map size={120} className="text-indigo-500 relative z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-900 rounded-full p-2">
          <Search size={40} className="text-rose-500" />
        </div>
      </div>
      
      <h1 className="text-5xl font-extrabold text-white mb-4 text-center">404 - Lost in the Architecture</h1>
      <p className="text-xl text-slate-400 mb-8 max-w-lg text-center">
        The component you are looking for doesn't exist, or it has been temporarily disconnected from the load balancer.
      </p>
      
      <NavLink 
        to="/" 
        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/30"
      >
        Return to Safety (Home)
      </NavLink>
    </div>
  );
}
