import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'ec-user', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'Shopper' } },

  { id: 'ec-gateway', type: 'architectureNode', position: { x: 300, y: 150 }, data: { type: 'loadBalancer', label: 'API Gateway', description: 'JWT Auth' } },
  
  { id: 'ec-cart', type: 'architectureNode', position: { x: 550, y: 50 }, data: { type: 'server', label: 'Cart Service' } },
  { id: 'ec-redis', type: 'architectureNode', position: { x: 800, y: 50 }, data: { type: 'cache', label: 'Redis Cart DB', description: 'High Read/Write' } },
  
  { id: 'ec-order', type: 'architectureNode', position: { x: 550, y: 250 }, data: { type: 'server', label: 'Order Service', description: 'Checkout & Inventory' } },
  { id: 'ec-sql', type: 'architectureNode', position: { x: 800, y: 250 }, data: { type: 'database', label: 'Relational DB (SQL)', description: 'ACID Transactions' } },
];

const initialEdges = [
  { id: 'e-1', source: 'ec-user', target: 'ec-gateway', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  
  // Cart Flow
  { id: 'e-2', source: 'ec-gateway', target: 'ec-cart', animated: true, label: 'Add to Cart', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
  { id: 'e-3', source: 'ec-cart', target: 'ec-redis', animated: true, label: 'Save JSON', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
  
  // Checkout Flow
  { id: 'e-4', source: 'ec-gateway', target: 'ec-order', animated: true, label: 'Checkout', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#f59e0b' } },
  { id: 'e-5', source: 'ec-order', target: 'ec-sql', animated: true, label: 'Deduct Inventory', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444' } },
];

export default function EcommerceCaseStudy() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold tracking-wide mb-3">
          CASE STUDY
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Design an E-commerce App (Amazon)</h1>
        <p className="text-lg text-slate-600">
          A complex system combining massive read traffic (browsing products) with highly critical, transactional write traffic (checkout and payments).
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Checkout & Cart Architecture</h2>
        <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-amber-300 border-b border-white/20 pb-4">Concept Mapping: Why are we using these?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
              <span className="bg-emerald-400/20 px-2 py-0.5 rounded text-xs text-emerald-300 border border-emerald-400/30">Concept</span>
              Databases (SQL for ACID)
            </h4>
            <p className="text-sm text-slate-300">
              When two users try to buy the last iPhone at the exact same millisecond, the system must not sell two phones. We use Relational Databases (SQL) for Orders/Inventory because they provide strong <strong>ACID guarantees</strong> and Row-Level Locks.
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
              <span className="bg-cyan-400/20 px-2 py-0.5 rounded text-xs text-cyan-300 border border-cyan-400/30">Concept</span>
              Caching (Redis for Cart)
            </h4>
            <p className="text-sm text-slate-300">
              The Shopping Cart is heavily modified but losing it temporarily isn't a financial disaster (unlike an Order). We store Carts in a NoSQL/Key-Value store like Redis for extreme read/write speed, offloading pressure from the main SQL DB.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
              <span className="bg-blue-400/20 px-2 py-0.5 rounded text-xs text-blue-300 border border-blue-400/30">Concept</span>
              Data Replication (Master-Slave)
            </h4>
            <p className="text-sm text-slate-300">
              Product catalogs are read millions of times per minute but rarely updated. The system uses a Master DB for writes (adding a new product), and heavily scales Read Replicas (Slaves) to serve user browsing traffic.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-2">
              <span className="bg-rose-400/20 px-2 py-0.5 rounded text-xs text-rose-300 border border-rose-400/30">Concept</span>
              Authentication
            </h4>
            <p className="text-sm text-slate-300">
              Before deducting money, the API Gateway verifies the user's JWT token to ensure the request is authorized. Secure session management prevents cart-hijacking or malicious checkouts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
