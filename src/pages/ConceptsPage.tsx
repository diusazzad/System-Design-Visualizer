import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { Layers, Zap, Database, Network } from 'lucide-react';
import { Server, MessageSquare, Globe, Triangle, Shield, Key, Search, Copy, Grid, Share2 } from 'lucide-react';
import CachingConcept from '../components/concepts/CachingConcept';
import ScalingConcept from '../components/concepts/ScalingConcept';
import LoadBalancingConcept from '../components/concepts/LoadBalancingConcept';
import DatabasesConcept from '../components/concepts/DatabasesConcept';
import MicroservicesConcept from '../components/concepts/MicroservicesConcept';
import MessageQueuesConcept from '../components/concepts/MessageQueuesConcept';
import CDNConcept from '../components/concepts/CDNConcept';
import CAPTheoremConcept from '../components/concepts/CAPTheoremConcept';
import RateLimitingConcept from '../components/concepts/RateLimitingConcept';
import DatabaseIndexingConcept from '../components/concepts/DatabaseIndexingConcept';
import DataReplicationConcept from '../components/concepts/DataReplicationConcept';
import DatabaseShardingConcept from '../components/concepts/DatabaseShardingConcept';
import APIDesignConcept from '../components/concepts/APIDesignConcept';
import AuthConcept from '../components/concepts/AuthConcept';

import URLShortenerCaseStudy from '../components/casestudies/URLShortenerCaseStudy';
import TwitterCaseStudy from '../components/casestudies/TwitterCaseStudy';
import WhatsAppCaseStudy from '../components/casestudies/WhatsAppCaseStudy';
import YouTubeCaseStudy from '../components/casestudies/YouTubeCaseStudy';
import UberCaseStudy from '../components/casestudies/UberCaseStudy';
import EcommerceCaseStudy from '../components/casestudies/EcommerceCaseStudy';
import { Link2, MessageCircle, PlaySquare, Map, ShoppingCart } from 'lucide-react';

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
  { id: 'api-design', label: 'API Design', icon: <Share2 size={18} /> },
  { id: 'auth', label: 'Authentication', icon: <Key size={18} /> },
];

const caseStudyItems = [
  { id: 'url-shortener', label: 'URL Shortener', icon: <Link2 size={18} /> },
  { id: 'twitter', label: 'Twitter Feed', icon: <MessageCircle size={18} /> },
  { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle size={18} /> },
  { id: 'youtube', label: 'YouTube', icon: <PlaySquare size={18} /> },
  { id: 'uber', label: 'Uber', icon: <Map size={18} /> },
  { id: 'ecommerce', label: 'E-commerce', icon: <ShoppingCart size={18} /> },
];

export default function ConceptsPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-10">
        <div className="p-6">
          <NavLink to="/" className="text-xl font-bold flex items-center gap-2 text-white mb-2">
            <span className="text-indigo-400">SystemDesign</span>
          </NavLink>
          <NavLink to="/builder" className="block w-full text-center text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-3 rounded-lg mb-8 transition-colors shadow-lg">
            🚀 Scenario Builder
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

          <div className="text-xs font-bold text-slate-400 tracking-wider mb-4 px-2 uppercase mt-8">
            Real-World Systems
          </div>
          <nav className="space-y-1">
            {caseStudyItems.map((item) => (
              <NavLink
                key={item.id}
                to={`/concepts/${item.id}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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
          <Route path="databases" element={<DatabasesConcept />} />
          <Route path="microservices" element={<MicroservicesConcept />} />
          <Route path="message-queues" element={<MessageQueuesConcept />} />
          <Route path="cdn" element={<CDNConcept />} />
          <Route path="cap-theorem" element={<CAPTheoremConcept />} />
          <Route path="rate-limiting" element={<RateLimitingConcept />} />
          <Route path="indexing" element={<DatabaseIndexingConcept />} />
          <Route path="replication" element={<DataReplicationConcept />} />
          <Route path="sharding" element={<DatabaseShardingConcept />} />
          <Route path="api-design" element={<APIDesignConcept />} />
          <Route path="auth" element={<AuthConcept />} />
          
          <Route path="url-shortener" element={<URLShortenerCaseStudy />} />
          <Route path="twitter" element={<TwitterCaseStudy />} />
          <Route path="whatsapp" element={<WhatsAppCaseStudy />} />
          <Route path="youtube" element={<YouTubeCaseStudy />} />
          <Route path="uber" element={<UberCaseStudy />} />
          <Route path="ecommerce" element={<EcommerceCaseStudy />} />
          
          <Route path="*" element={<div className="p-8 text-slate-500">Select a concept from the sidebar or this concept is coming soon.</div>} />
        </Routes>
      </main>
    </div>
  );
}
