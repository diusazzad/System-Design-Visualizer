import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  // Monolith
  { id: 'm-client', type: 'architectureNode', position: { x: 50, y: 50 }, data: { type: 'client', label: 'Client' } },
  { id: 'm-app', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'server', label: 'Monolithic App', description: 'UI, Auth, Billing, Catalog' } },
  { id: 'm-db', type: 'architectureNode', position: { x: 50, y: 250 }, data: { type: 'database', label: 'Shared Database' } },

  // Microservices
  { id: 'ms-client', type: 'architectureNode', position: { x: 350, y: 50 }, data: { type: 'client', label: 'Client' } },
  { id: 'ms-api', type: 'architectureNode', position: { x: 350, y: 150 }, data: { type: 'loadBalancer', label: 'API Gateway', description: 'Routing, Auth, Rate Limit' } },
  
  { id: 'ms-auth', type: 'architectureNode', position: { x: 200, y: 300 }, data: { type: 'server', label: 'Auth Service' } },
  { id: 'ms-catalog', type: 'architectureNode', position: { x: 350, y: 300 }, data: { type: 'server', label: 'Catalog Service' } },
  { id: 'ms-billing', type: 'architectureNode', position: { x: 500, y: 300 }, data: { type: 'server', label: 'Billing Service' } },
  
  { id: 'ms-db-auth', type: 'architectureNode', position: { x: 200, y: 400 }, data: { type: 'database', label: 'Auth DB' } },
  { id: 'ms-db-catalog', type: 'architectureNode', position: { x: 350, y: 400 }, data: { type: 'database', label: 'Catalog DB' } },
  { id: 'ms-db-billing', type: 'architectureNode', position: { x: 500, y: 400 }, data: { type: 'database', label: 'Billing DB' } },
  
  // Service Discovery
  { id: 'ms-discovery', type: 'architectureNode', position: { x: 650, y: 150 }, data: { type: 'cache', label: 'Service Registry', description: 'Consul/Eureka' } },
];

const initialEdges = [
  // Monolith Edges
  { id: 'e-m1', source: 'm-client', target: 'm-app', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-m2', source: 'm-app', target: 'm-db', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },

  // Microservices Edges
  { id: 'e-ms1', source: 'ms-client', target: 'ms-api', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  
  { id: 'e-ms2', source: 'ms-api', target: 'ms-auth', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
  { id: 'e-ms3', source: 'ms-api', target: 'ms-catalog', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
  { id: 'e-ms4', source: 'ms-api', target: 'ms-billing', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
  
  { id: 'e-db1', source: 'ms-auth', target: 'ms-db-auth', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-db2', source: 'ms-catalog', target: 'ms-db-catalog', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-db3', source: 'ms-billing', target: 'ms-db-billing', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  
  { id: 'e-disc1', source: 'ms-api', target: 'ms-discovery', label: 'Lookup', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6', strokeDasharray: '5,5' } },
  { id: 'e-disc2', source: 'ms-auth', target: 'ms-discovery', label: 'Register', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6', strokeDasharray: '5,5' } },
  { id: 'e-disc3', source: 'ms-catalog', target: 'ms-discovery', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6', strokeDasharray: '5,5' } },
  { id: 'e-disc4', source: 'ms-billing', target: 'ms-discovery', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6', strokeDasharray: '5,5' } },
];

export default function MicroservicesConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Microservices Architecture</h1>
        <p className="text-lg text-slate-600">
          An architectural style that structures an application as a collection of loosely coupled, independently deployable services.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Monolith vs Microservices</h2>
        <div className="h-[500px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">Monolithic Architecture</h3>
          <p className="text-indigo-800 mb-4">All business logic is grouped together in a single deployable unit.</p>
          <ul className="list-disc list-inside text-indigo-700 space-y-2">
            <li><strong>Pros:</strong> Easy to test, simple to deploy initially.</li>
            <li><strong>Pros:</strong> Cross-module function calls are fast.</li>
            <li><strong>Cons:</strong> A bug in one module can crash the whole system.</li>
            <li><strong>Cons:</strong> Cannot scale specific parts of the app independently.</li>
          </ul>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-900 mb-2">Microservices Architecture</h3>
          <p className="text-emerald-800 mb-4">Business logic is split into separate, independent services communicating via network.</p>
          <ul className="list-disc list-inside text-emerald-700 space-y-2">
            <li><strong>Pros:</strong> Independent deployment and scaling.</li>
            <li><strong>Pros:</strong> Fault isolation (one service crashes, others live).</li>
            <li><strong>Pros:</strong> Technology heterogeneity (use Go for one, Node for another).</li>
            <li><strong>Cons:</strong> Distributed system complexity (tracing, networking).</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mt-8">
        <h3 className="text-xl font-bold text-amber-900 mb-2">Key Components of Microservices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-semibold text-amber-800">API Gateway</h4>
            <p className="text-sm text-amber-700">The single entry point for clients. Handles routing, composition, rate limiting, and authentication. Prevents clients from needing to know every service's IP address.</p>
          </div>
          <div>
            <h4 className="font-semibold text-amber-800">Service Discovery</h4>
            <p className="text-sm text-amber-700">A registry (like Consul or Eureka) where services register their IP addresses dynamically. The API Gateway queries this to find where a service lives.</p>
          </div>
          <div>
            <h4 className="font-semibold text-amber-800">Database Per Service</h4>
            <p className="text-sm text-amber-700">To maintain loose coupling, each service should own its own data. Avoid sharing a database, which creates hidden coupling.</p>
          </div>
          <div>
            <h4 className="font-semibold text-amber-800">Inter-service Communication</h4>
            <p className="text-sm text-amber-700">Services communicate synchronously via HTTP/gRPC, or asynchronously via Message Queues (Kafka/RabbitMQ) for better resilience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
