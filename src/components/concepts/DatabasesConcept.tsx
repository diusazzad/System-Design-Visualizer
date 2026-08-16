import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  // SQL
  { id: 'sql-app', type: 'architectureNode', position: { x: 50, y: 100 }, data: { type: 'client', label: 'Application' } },
  { id: 'sql-db', type: 'architectureNode', position: { x: 300, y: 100 }, data: { type: 'database', label: 'Relational DB (SQL)', description: 'Structured, ACID Compliant' } },
  
  // NoSQL
  { id: 'nosql-app', type: 'architectureNode', position: { x: 50, y: 300 }, data: { type: 'client', label: 'Application' } },
  { id: 'nosql-db', type: 'architectureNode', position: { x: 300, y: 300 }, data: { type: 'database', label: 'NoSQL DB', description: 'Unstructured, Eventual Consistency' } },
];

const initialEdges = [
  { id: 'e-sql', source: 'sql-app', target: 'sql-db', animated: true, label: 'JOIN Users & Orders', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
  { id: 'e-nosql', source: 'nosql-app', target: 'nosql-db', animated: true, label: 'Get Document JSON', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
];

export default function DatabasesConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Databases (SQL vs NoSQL)</h1>
        <p className="text-lg text-slate-600">
          Choosing the right database is the most critical decision in System Design. Data storage determines how your application scales, performs, and maintains consistency.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Database Paradigms</h2>
        <div className="h-[450px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 text-white p-2 rounded-lg font-bold">SQL</div>
            <h3 className="text-xl font-bold text-blue-900">Relational Databases</h3>
          </div>
          <p className="text-blue-800 mb-4">Data is stored in tables with strictly defined schemas (rows and columns). Uses Structured Query Language.</p>
          <ul className="list-disc list-inside text-blue-700 space-y-2 mb-4">
            <li><strong>Structure:</strong> Tabular (Schema-on-write)</li>
            <li><strong>ACID:</strong> Strong consistency guarantees</li>
            <li><strong>Scaling:</strong> Vertical scaling (usually)</li>
            <li><strong>Examples:</strong> PostgreSQL, MySQL, Oracle</li>
          </ul>
          <div className="bg-white/50 p-3 rounded-lg border border-blue-200">
            <strong className="text-blue-900">Best For:</strong> Financial systems, ERPs, systems needing complex JOINs.
          </div>
        </div>

        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-600 text-white p-2 rounded-lg font-bold">NoSQL</div>
            <h3 className="text-xl font-bold text-emerald-900">Non-Relational Databases</h3>
          </div>
          <p className="text-emerald-800 mb-4">Data is stored flexibly as documents, key-value pairs, wide columns, or graphs. No rigid schema required.</p>
          <ul className="list-disc list-inside text-emerald-700 space-y-2 mb-4">
            <li><strong>Structure:</strong> Documents, Key-Value, Graph</li>
            <li><strong>ACID:</strong> Often Eventual Consistency (BASE)</li>
            <li><strong>Scaling:</strong> Horizontal scaling (Sharding built-in)</li>
            <li><strong>Examples:</strong> MongoDB, DynamoDB, Redis, Neo4j</li>
          </ul>
          <div className="bg-white/50 p-3 rounded-lg border border-emerald-200">
            <strong className="text-emerald-900">Best For:</strong> Rapid prototyping, massive unstructured data, high read/write throughput.
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl mt-8">
        <h3 className="text-2xl font-bold mb-6 text-amber-300">Types of NoSQL Databases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-2">Document Stores</h4>
            <p className="text-sm text-slate-300 mb-2">Stores data as JSON-like documents. Great for general purpose apps.</p>
            <span className="text-xs font-mono text-emerald-400">MongoDB, Couchbase</span>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-2">Key-Value Stores</h4>
            <p className="text-sm text-slate-300 mb-2">Extremely fast lookups by key. Perfect for caching or session storage.</p>
            <span className="text-xs font-mono text-emerald-400">Redis, Memcached</span>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-2">Wide-Column</h4>
            <p className="text-sm text-slate-300 mb-2">Optimized for fast queries over massive datasets (time-series, logs).</p>
            <span className="text-xs font-mono text-emerald-400">Cassandra, HBase</span>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-2">Graph Databases</h4>
            <p className="text-sm text-slate-300 mb-2">Optimized for traversing relationships (social networks, recommendations).</p>
            <span className="text-xs font-mono text-emerald-400">Neo4j, Amazon Neptune</span>
          </div>
        </div>
      </div>
    </div>
  );
}
