import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  // Users around the world
  { id: 'u-us', type: 'architectureNode', position: { x: 50, y: 50 }, data: { type: 'client', label: 'User (New York)' } },
  { id: 'u-eu', type: 'architectureNode', position: { x: 50, y: 200 }, data: { type: 'client', label: 'User (London)' } },
  { id: 'u-as', type: 'architectureNode', position: { x: 50, y: 350 }, data: { type: 'client', label: 'User (Tokyo)' } },

  // Edge Servers (CDN)
  { id: 'cdn-us', type: 'architectureNode', position: { x: 300, y: 50 }, data: { type: 'cache', label: 'Edge Server (US)' } },
  { id: 'cdn-eu', type: 'architectureNode', position: { x: 300, y: 200 }, data: { type: 'cache', label: 'Edge Server (EU)' } },
  { id: 'cdn-as', type: 'architectureNode', position: { x: 300, y: 350 }, data: { type: 'cache', label: 'Edge Server (Asia)' } },

  // Origin Server
  { id: 'origin', type: 'architectureNode', position: { x: 650, y: 200 }, data: { type: 'server', label: 'Origin Server', description: 'Located in us-east-1' } },
  
  // Storage
  { id: 's3', type: 'architectureNode', position: { x: 900, y: 200 }, data: { type: 'database', label: 'Object Storage (S3)', description: 'Static Assets: Images, Videos, CSS' } },
];

const initialEdges = [
  // Users to Edge
  { id: 'e-u1', source: 'u-us', target: 'cdn-us', animated: true, label: '10ms', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
  { id: 'e-u2', source: 'u-eu', target: 'cdn-eu', animated: true, label: '15ms', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
  { id: 'e-u3', source: 'u-as', target: 'cdn-as', animated: true, label: '12ms', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },

  // Edge to Origin (Cache Miss)
  { id: 'e-o1', source: 'cdn-us', target: 'origin', animated: true, label: 'Cache Miss (50ms)', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444', strokeDasharray: '5,5' } },
  { id: 'e-o2', source: 'cdn-eu', target: 'origin', animated: true, label: 'Cache Miss (90ms)', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444', strokeDasharray: '5,5' } },
  { id: 'e-o3', source: 'cdn-as', target: 'origin', animated: true, label: 'Cache Miss (150ms)', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444', strokeDasharray: '5,5' } },
  
  // Origin to Storage
  { id: 'e-s1', source: 'origin', target: 's3', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
];

export default function CDNConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Content Delivery Network (CDN)</h1>
        <p className="text-lg text-slate-600">
          A globally distributed network of servers designed to deliver static and dynamic content to users with high availability and high performance.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Edge Caching Architecture</h2>
        <div className="h-[450px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-900 mb-2">Cache Hit (Fast)</h3>
          <p className="text-emerald-800 mb-4">When a user requests a file that is already stored on the Edge Server closest to them.</p>
          <ul className="list-disc list-inside text-emerald-700 space-y-2">
            <li><strong>Ultra Low Latency:</strong> Usually &lt; 20ms response time.</li>
            <li><strong>Reduced Origin Load:</strong> Origin server does no work.</li>
            <li><strong>Cheaper:</strong> Edge bandwidth is often cheaper than egress from Cloud providers.</li>
          </ul>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <h3 className="text-xl font-bold text-red-900 mb-2">Cache Miss (Slow)</h3>
          <p className="text-red-800 mb-4">When the requested file is not on the Edge Server (expired or first request).</p>
          <ul className="list-disc list-inside text-red-700 space-y-2">
            <li><strong>High Latency:</strong> The Edge must fetch it from the Origin.</li>
            <li><strong>Cross-continental Routing:</strong> Can take 100ms - 300ms depending on distance.</li>
            <li><strong>Thundering Herd:</strong> If many cache misses happen at once, Origin might crash.</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-8">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Core CDN Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-semibold text-blue-800">Static vs Dynamic Content</h4>
            <p className="text-sm text-blue-700">Images, CSS, and JS (Static) can be cached indefinitely. API responses (Dynamic) can also be cached at the edge for a few seconds using Cache-Control headers.</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800">Cache Invalidation</h4>
            <p className="text-sm text-blue-700">When you update an image, you must tell the CDN to clear the old one. This is hard! Prefer Cache Busting (appending a hash to the filename: script-v2.js).</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800">Push vs Pull CDN</h4>
            <p className="text-sm text-blue-700"><strong>Pull:</strong> CDN fetches automatically on a cache miss. <strong>Push:</strong> You manually upload files to the CDN before users request them (good for large files).</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800">Anycast Routing</h4>
            <p className="text-sm text-blue-700">A network trick where all Edge Servers share the same IP address. The router automatically sends the user to the closest physical server.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
