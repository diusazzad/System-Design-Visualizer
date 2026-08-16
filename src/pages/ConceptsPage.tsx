import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { Layers, Zap, Database, Network } from 'lucide-react';
import { Server, MessageSquare, Globe, Triangle, Shield, Key, Search, Copy, Grid, Webhook } from 'lucide-react';
import CachingConcept from '../components/concepts/CachingConcept';
import ScalingConcept from '../components/concepts/ScalingConcept';
import LoadBalancingConcept from '../components/concepts/LoadBalancingConcept';

const coreNavItems = [
  { id: 'scaling', label: 'Scalability', icon: <Layers size={18} /> },
  { id: 'load-balancing', label: 'Load Balancing', icon: <Network size={18} /> },
  { id: 'caching', label: 'Caching', icon: <Zap size={18} /> },
  { id: 'databases', label: 'Databases', icon: <Database size={18} /> },
];

const advancedNavItems = [
  { id: 'microservices', label: 'Microservices', icon: <Server size={18} /> },
  { id: 'message-queues', label: 'Message Queues', icon: <MessageSquare size={18} /> },
  { id: 'cdn', label: 'CDN & Edge', icon: <Globe size={18} /> },
  { id: 'cap-theorem', label: 'CAP Theorem', icon: <Triangle size={18} /> },
  { id: 'rate-limiting', label: 'Rate Limiting', icon: <Shield size={18} /> },
  { id: 'indexing', label: 'DB Indexing', icon: <Search size={18} /> },
  { id: 'replication', label: 'Data Replication', icon: <Copy size={18} /> },
  { id: 'sharding', label: 'Database Sharding', icon: <Grid size={18} /> },
  { id: 'api-design', label: 'API Design', icon: <Webhook size={18} /> },
  { id: 'auth', label: 'Authentication', icon: <Key size={18} /> },
];

export default function ConceptsPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-10">
        <div className="p-6">
          <NavLink to="/" className="text-xl font-bold flex items-center gap-2 text-white mb-8">
            <span className="text-indigo-400">SystemDesign</span>
          </NavLink>
          <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-4 px-4">Core Concepts</h3>
          <nav className="flex flex-col gap-1 mb-8">
            {coreNavItems.map((item) => (
              <NavLink
                key={item.id}
                to={`/concepts/${item.id}`}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors ${
                    isActive ? 'bg-indigo-600 text-white font-medium shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-4 px-4">Advanced Concepts</h3>
          <nav className="flex flex-col gap-1 pb-10">
            {advancedNavItems.map((item) => (
              <NavLink
                key={item.id}
                to={`/concepts/${item.id}`}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors ${
                    isActive ? 'bg-indigo-600 text-white font-medium shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/concepts/scaling" replace />} />
          <Route path="scaling" element={<ScalingConcept />} />
          <Route path="caching" element={<CachingConcept />} />
          <Route path="load-balancing" element={<LoadBalancingConcept />} />
          <Route path="*" element={<div className="p-8 text-slate-500">Select a concept from the sidebar or this concept is coming soon.</div>} />
        </Routes>
      </main>
    </div>
  );
}
