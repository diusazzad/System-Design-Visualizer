import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'rl-user1', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'Normal User', description: '5 req/sec' } },
  { id: 'rl-user2', type: 'architectureNode', position: { x: 50, y: 300 }, data: { type: 'client', label: 'Bot / Attacker', description: '5000 req/sec' } },

  { id: 'rl-gateway', type: 'architectureNode', position: { x: 350, y: 225 }, data: { type: 'loadBalancer', label: 'API Gateway', description: 'Rate Limiter Middleware' } },
  { id: 'rl-redis', type: 'architectureNode', position: { x: 350, y: 75 }, data: { type: 'cache', label: 'Redis Cache', description: 'Stores IP Counters' } },
  
  { id: 'rl-api', type: 'architectureNode', position: { x: 650, y: 225 }, data: { type: 'server', label: 'Backend API', description: 'Protected Resource' } },
  { id: 'rl-drop', type: 'architectureNode', position: { x: 350, y: 400 }, data: { type: 'server', label: 'HTTP 429', description: 'Too Many Requests' } },
];

const initialEdges = [
  // User to Gateway
  { id: 'e-u1', source: 'rl-user1', target: 'rl-gateway', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-u2', source: 'rl-user2', target: 'rl-gateway', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  
  // Gateway to Redis
  { id: 'e-g1', source: 'rl-gateway', target: 'rl-redis', label: 'Check/Incr Counter', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6', strokeDasharray: '5,5' } },
  
  // Gateway to API (Allowed)
  { id: 'e-g2', source: 'rl-gateway', target: 'rl-api', label: 'Allowed (Normal)', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981', strokeWidth: 2 } },
  
  // Gateway to Drop (Rejected)
  { id: 'e-g3', source: 'rl-gateway', target: 'rl-drop', label: 'Blocked (Bot)', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444', strokeWidth: 2 } },
];

export default function RateLimitingConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Rate Limiting</h1>
        <p className="text-lg text-slate-600">
          A technique to control the rate of traffic sent or received by a network interface controller. It prevents resource starvation, DDoS attacks, and enforces usage quotas.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Distributed Rate Limiting Architecture</h2>
        <div className="h-[500px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">Token Bucket Algorithm</h3>
          <p className="text-indigo-800 mb-4">Imagine a bucket that holds a maximum of N tokens. Tokens are added at a fixed rate. Each request costs 1 token.</p>
          <ul className="list-disc list-inside text-indigo-700 space-y-2">
            <li><strong>Pros:</strong> Allows a burst of traffic (up to bucket capacity).</li>
            <li><strong>Pros:</strong> Very memory efficient.</li>
            <li><strong>Use Case:</strong> Amazon API Gateway, Stripe API.</li>
          </ul>
        </div>
        <div className="bg-cyan-50 p-6 rounded-2xl border border-cyan-100">
          <h3 className="text-xl font-bold text-cyan-900 mb-2">Leaky Bucket Algorithm</h3>
          <p className="text-cyan-800 mb-4">Imagine a bucket with a hole at the bottom. Requests enter from the top, and are processed at a fixed rate from the bottom.</p>
          <ul className="list-disc list-inside text-cyan-700 space-y-2">
            <li><strong>Pros:</strong> Smooths out bursts. Output rate is strictly constant.</li>
            <li><strong>Cons:</strong> A burst can fill the bucket, causing newer (potentially more important) requests to drop.</li>
            <li><strong>Use Case:</strong> Network traffic shaping (NGINX).</li>
          </ul>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-900 mb-2">Fixed Window Counter</h3>
          <p className="text-emerald-800 mb-4">Divides time into fixed windows (e.g., 12:00 - 12:01) and counts requests in that window.</p>
          <ul className="list-disc list-inside text-emerald-700 space-y-2">
            <li><strong>Pros:</strong> Simple to implement (Redis INCR & EXPIRE).</li>
            <li><strong>Cons:</strong> Edge case burst - a user can send 2x capacity at the boundary of two windows.</li>
          </ul>
        </div>
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
          <h3 className="text-xl font-bold text-rose-900 mb-2">Sliding Window Log / Counter</h3>
          <p className="text-rose-800 mb-4">Keeps a log of timestamps for each request, or smoothly interpolates between two fixed windows.</p>
          <ul className="list-disc list-inside text-rose-700 space-y-2">
            <li><strong>Pros:</strong> Solves the fixed window edge burst problem. Highly accurate.</li>
            <li><strong>Cons:</strong> Memory intensive if keeping logs of every timestamp.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
