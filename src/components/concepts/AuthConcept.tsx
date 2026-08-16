import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'auth-client', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'Client (Browser)' } },

  { id: 'auth-server', type: 'architectureNode', position: { x: 350, y: 50 }, data: { type: 'server', label: 'API Server', description: 'Verifies Token' } },
  { id: 'auth-idp', type: 'architectureNode', position: { x: 350, y: 250 }, data: { type: 'server', label: 'Identity Provider', description: 'OAuth2 / Auth0' } },
  
  { id: 'auth-db', type: 'architectureNode', position: { x: 650, y: 50 }, data: { type: 'database', label: 'Database', description: 'Protected Resource' } },
];

const initialEdges = [
  // Login flow
  { id: 'e-login1', source: 'auth-client', target: 'auth-idp', animated: true, label: '1. Login with Credentials', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-login2', source: 'auth-idp', target: 'auth-client', animated: true, label: '2. Return JWT Token', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6' } },
  
  // API Access flow
  { id: 'e-api1', source: 'auth-client', target: 'auth-server', animated: true, label: '3. Request + JWT Header', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
  { id: 'e-api2', source: 'auth-server', target: 'auth-db', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
];

export default function AuthConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Authentication & Authorization</h1>
        <p className="text-lg text-slate-600">
          Authentication proves <strong>who</strong> you are (Identity). Authorization determines <strong>what</strong> you can do (Permissions).
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Token-based Auth Flow (JWT & OAuth2)</h2>
        <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
          <h3 className="text-xl font-bold text-amber-900 mb-2">Session-Based (Stateful)</h3>
          <p className="text-amber-800 mb-4">The server stores session data in memory or Redis. The client stores a small Session ID cookie.</p>
          <ul className="list-disc list-inside text-amber-700 space-y-2">
            <li><strong>How it works:</strong> Client sends cookie. Server looks up cookie in Redis to find the user.</li>
            <li><strong>Pros:</strong> Easy to revoke/logout instantly.</li>
            <li><strong>Cons:</strong> Harder to scale (requires distributed cache like Redis).</li>
          </ul>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-900 mb-2">Token-Based / JWT (Stateless)</h3>
          <p className="text-emerald-800 mb-4">The server signs a payload containing user info. The client stores it (localStorage/Cookie) and sends it with every request.</p>
          <ul className="list-disc list-inside text-emerald-700 space-y-2">
            <li><strong>How it works:</strong> Server mathematically verifies the token's signature. No DB lookup needed!</li>
            <li><strong>Pros:</strong> Infinitely scalable. Perfect for microservices.</li>
            <li><strong>Cons:</strong> Very hard to revoke before it expires. Size is larger.</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl mt-8">
        <h3 className="text-2xl font-bold mb-6 text-rose-300">OAuth2 & SSO (Single Sign-On)</h3>
        <p className="text-slate-300 mb-6">
          OAuth2 is a <strong>delegated authorization framework</strong>. It allows a third-party application to obtain limited access to an HTTP service on behalf of a resource owner.
        </p>
        <div className="space-y-4 text-sm text-slate-300">
          <div className="flex gap-4 items-start bg-white/5 p-4 rounded-lg">
            <span className="font-bold text-white min-w-[120px]">Resource Owner:</span>
            <span>You (the human user).</span>
          </div>
          <div className="flex gap-4 items-start bg-white/5 p-4 rounded-lg">
            <span className="font-bold text-white min-w-[120px]">Client:</span>
            <span>The application you are trying to use (e.g., Notion).</span>
          </div>
          <div className="flex gap-4 items-start bg-white/5 p-4 rounded-lg">
            <span className="font-bold text-white min-w-[120px]">Auth Server:</span>
            <span>The system authenticating you (e.g., Google Sign-In).</span>
          </div>
          <div className="flex gap-4 items-start bg-white/5 p-4 rounded-lg">
            <span className="font-bold text-white min-w-[120px]">Resource Server:</span>
            <span>The API holding your data (e.g., Google Calendar API).</span>
          </div>
        </div>
      </div>
    </div>
  );
}
