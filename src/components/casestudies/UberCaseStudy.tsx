import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'ub-rider', type: 'architectureNode', position: { x: 50, y: 50 }, data: { type: 'client', label: 'Rider App', description: 'Request ride' } },
  { id: 'ub-driver', type: 'architectureNode', position: { x: 50, y: 250 }, data: { type: 'client', label: 'Driver App', description: 'Sends GPS every 4s' } },

  { id: 'ub-gateway', type: 'architectureNode', position: { x: 300, y: 150 }, data: { type: 'loadBalancer', label: 'API Gateway', description: 'gRPC & WebSockets' } },
  
  { id: 'ub-dispatch', type: 'architectureNode', position: { x: 600, y: 50 }, data: { type: 'server', label: 'Dispatch Service', description: 'Matches Rider + Driver' } },
  { id: 'ub-location', type: 'architectureNode', position: { x: 600, y: 250 }, data: { type: 'server', label: 'Location Service', description: 'Tracks millions of cars' } },
  
  { id: 'ub-redis', type: 'architectureNode', position: { x: 900, y: 250 }, data: { type: 'cache', label: 'Redis (Geospatial)', description: 'Geohashes of active drivers' } },
];

const initialEdges = [
  // Driver updating location
  { id: 'e-1', source: 'ub-driver', target: 'ub-gateway', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-2', source: 'ub-gateway', target: 'ub-location', animated: true, label: 'Location Pings', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
  { id: 'e-3', source: 'ub-location', target: 'ub-redis', animated: true, label: 'Update Geohash', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6' } },
  
  // Rider requesting ride
  { id: 'e-4', source: 'ub-rider', target: 'ub-gateway', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-5', source: 'ub-gateway', target: 'ub-dispatch', animated: true, label: 'Find Ride', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
  
  // Dispatch matching
  { id: 'e-6', source: 'ub-dispatch', target: 'ub-location', animated: true, label: 'Get Nearby Cars', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#f59e0b', strokeDasharray: '5,5' } },
];

export default function UberCaseStudy() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <div className="inline-block px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full text-sm font-bold tracking-wide mb-3">
          CASE STUDY
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Design Uber / Grab</h1>
        <p className="text-lg text-slate-600">
          A real-time ride-hailing system. The primary challenge is handling millions of high-frequency GPS pings and efficiently querying geographical data to match riders with nearby drivers.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Dispatch & Location Architecture</h2>
        <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-zinc-300 border-b border-white/20 pb-4">Concept Mapping: Why are we using these?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
              <span className="bg-amber-400/20 px-2 py-0.5 rounded text-xs text-amber-300 border border-amber-400/30">Concept</span>
              DB Indexing (Geospatial)
            </h4>
            <p className="text-sm text-slate-300">
              Querying SQL `WHERE lat &lt; X AND long &lt; Y` for millions of drivers is too slow. Uber uses algorithms like Google S2 geometry or Geohashing (e.g., in Redis `GEOADD`) to index drivers into small grid cells. Finding a driver is just looking up the Geohash string index.
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
              <span className="bg-cyan-400/20 px-2 py-0.5 rounded text-xs text-cyan-300 border border-cyan-400/30">Concept</span>
              API Design (gRPC & WebSockets)
            </h4>
            <p className="text-sm text-slate-300">
              Drivers ping their location every 4 seconds. Using standard REST (HTTP) has too much header overhead. gRPC provides lightweight, persistent binary streams to handle massive telemetry data efficiently.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
              <span className="bg-blue-400/20 px-2 py-0.5 rounded text-xs text-blue-300 border border-blue-400/30">Concept</span>
              Microservices
            </h4>
            <p className="text-sm text-slate-300">
              The system is broken down: Dispatch Service, Location Tracking, Maps/Routing (ETA calc), Payments, and Surge Pricing. This prevents a failure in Payments from bringing down the core Ride Matching capability.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-2">
              <span className="bg-rose-400/20 px-2 py-0.5 rounded text-xs text-rose-300 border border-rose-400/30">Concept</span>
              Rate Limiting
            </h4>
            <p className="text-sm text-slate-300">
              API Gateways implement rate limiting to ensure that rogue apps or buggy client devices cannot flood the Location Service with 100 pings per second, which would DDOS the internal databases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
