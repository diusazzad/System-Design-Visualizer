import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'url-client', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'User / Browser' } },

  { id: 'url-gateway', type: 'architectureNode', position: { x: 300, y: 150 }, data: { type: 'loadBalancer', label: 'API Gateway', description: 'Rate Limiting' } },
  { id: 'url-cache', type: 'architectureNode', position: { x: 550, y: 50 }, data: { type: 'cache', label: 'Redis Cache', description: 'O(1) Lookups for redirects' } },
  { id: 'url-app', type: 'architectureNode', position: { x: 550, y: 250 }, data: { type: 'server', label: 'URL Service', description: 'Base62 Encoder (A-Z, a-z, 0-9)' } },
  
  { id: 'url-db', type: 'architectureNode', position: { x: 850, y: 250 }, data: { type: 'database', label: 'Relational DB', description: 'Indexed by ShortURL' } },
];

const initialEdges = [
  { id: 'e-1', source: 'url-client', target: 'url-gateway', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  
  { id: 'e-2', source: 'url-gateway', target: 'url-cache', animated: true, label: 'GET /tiny', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
  { id: 'e-3', source: 'url-gateway', target: 'url-app', animated: true, label: 'POST /create (or Cache Miss)', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
  
  { id: 'e-4', source: 'url-app', target: 'url-cache', animated: true, label: 'Write-Through Cache', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6', strokeDasharray: '5,5' } },
  { id: 'e-5', source: 'url-app', target: 'url-db', animated: true, label: 'Save Mapping', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#f59e0b' } },
];

export default function URLShortenerCaseStudy() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold tracking-wide mb-3">
          CASE STUDY
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Design a URL Shortener (TinyURL)</h1>
        <p className="text-lg text-slate-600">
          A classic system design interview question. The goal is to take a long URL and generate a short, unique alias (e.g., tinyurl.com/aB3x9).
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Architecture Blueprint</h2>
        <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-indigo-300 border-b border-white/20 pb-4">Concept Mapping: Why are we using these?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
              <span className="bg-emerald-400/20 px-2 py-0.5 rounded text-xs text-emerald-300 border border-emerald-400/30">Concept</span>
              Caching
            </h4>
            <p className="text-sm text-slate-300">
              A URL shortener is extremely <strong>Read-Heavy</strong> (e.g., 100 reads for every 1 write). Querying the DB for every redirect would crush it. We use Redis to cache the most frequently accessed short URLs.
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
              <span className="bg-amber-400/20 px-2 py-0.5 rounded text-xs text-amber-300 border border-amber-400/30">Concept</span>
              DB Indexing
            </h4>
            <p className="text-sm text-slate-300">
              When a Cache Miss occurs, we must find the long URL in the database using the short alias. Without a <strong>B-Tree Index</strong> on the `short_url` column, this would be an O(N) table scan (disaster).
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-2">
              <span className="bg-rose-400/20 px-2 py-0.5 rounded text-xs text-rose-300 border border-rose-400/30">Concept</span>
              Rate Limiting
            </h4>
            <p className="text-sm text-slate-300">
              Malicious users could write a script to generate millions of short URLs per second, exhausting our DB storage (Token Exhaustion Attack). The API Gateway enforces a Token Bucket rate limit per IP.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
              <span className="bg-blue-400/20 px-2 py-0.5 rounded text-xs text-blue-300 border border-blue-400/30">Concept</span>
              Load Balancing
            </h4>
            <p className="text-sm text-slate-300">
              To handle millions of redirects globally, a single server won't suffice. A Load Balancer distributes incoming redirect requests across multiple stateless `URL Service` instances.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h3 className="text-xl font-bold text-blue-900 mb-4">The Math: Base62 Encoding</h3>
        <p className="text-blue-800 mb-4 text-sm">
          Why do short URLs look like `aB3x9`? We use Base62 encoding: [a-z, A-Z, 0-9] = 26 + 26 + 10 = 62 possible characters.
        </p>
        <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm text-slate-700">
          If length = 7 characters:<br/>
          Combinations = 62^7 = <strong>3.5 Trillion</strong> possible unique URLs.<br/><br/>
          1. Database Auto-Increments ID (e.g., 10000)<br/>
          2. Convert Base10 (10000) to Base62 = '2Bi'<br/>
          3. Save mapping: '2Bi' -&gt; 'https://very-long-url.com'
        </div>
      </div>
    </div>
  );
}
