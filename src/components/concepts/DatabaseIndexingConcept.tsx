import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'db-client', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'App Server', description: 'SELECT * FROM users WHERE age = 25' } },

  { id: 'db-index', type: 'architectureNode', position: { x: 350, y: 50 }, data: { type: 'cache', label: 'B-Tree Index', description: 'Key: Age, Value: Disk Pointer' } },
  { id: 'db-table', type: 'architectureNode', position: { x: 350, y: 250 }, data: { type: 'database', label: 'Table Data (Disk)', description: 'Full Row Data' } },
  
  { id: 'db-result', type: 'architectureNode', position: { x: 650, y: 150 }, data: { type: 'server', label: 'Fast Response', description: 'Found in O(log N)' } },
];

const initialEdges = [
  // Query hits index
  { id: 'e-q1', source: 'db-client', target: 'db-index', animated: true, label: '1. Search Index', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
  
  // Index points to disk
  { id: 'e-q2', source: 'db-index', target: 'db-table', animated: true, label: '2. Fetch Row (Pointer)', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6', strokeDasharray: '5,5' } },
  
  // Return result
  { id: 'e-q3', source: 'db-table', target: 'db-result', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
];

export default function DatabaseIndexingConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Database Indexing</h1>
        <p className="text-lg text-slate-600">
          A data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">How an Index Works (B-Tree)</h2>
        <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-900 mb-2">B-Tree Index</h3>
          <p className="text-emerald-800 mb-4">The most common index type in RDBMS (MySQL, Postgres). It keeps data sorted and allows searches, sequential access, insertions, and deletions in O(log N) time.</p>
          <ul className="list-disc list-inside text-emerald-700 space-y-2">
            <li><strong>Best for:</strong> Range queries (age &gt; 25), Equality queries.</li>
            <li><strong>Structure:</strong> Balanced tree where leaf nodes contain pointers to actual data.</li>
          </ul>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
          <h3 className="text-xl font-bold text-amber-900 mb-2">Hash Index</h3>
          <p className="text-amber-800 mb-4">Uses a hash function to map keys directly to their location. Lookups are O(1) in the best case.</p>
          <ul className="list-disc list-inside text-amber-700 space-y-2">
            <li><strong>Best for:</strong> Exact match queries (id = 123).</li>
            <li><strong>Worst for:</strong> Range queries (cannot do age &gt; 25 with a Hash Index).</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl mt-8">
        <h3 className="text-2xl font-bold mb-4 text-indigo-300">Advanced Indexing Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-indigo-500 text-xs px-2 py-1 rounded">1</span>
              Composite Index
            </h4>
            <p className="text-sm text-slate-300">
              An index on multiple columns (e.g., `last_name, first_name`). The order of columns matters! A query filtering on `first_name` cannot use this index efficiently (Left-most prefix rule).
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-emerald-500 text-xs px-2 py-1 rounded">2</span>
              Covering Index
            </h4>
            <p className="text-sm text-slate-300">
              When an index contains ALL the columns requested in the `SELECT` clause. The database doesn't even need to visit the actual table on disk, resulting in ultra-fast queries.
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-rose-500 text-xs px-2 py-1 rounded">3</span>
              Index Penalty
            </h4>
            <p className="text-sm text-slate-300">
              Indexes are not free! Every time you INSERT, UPDATE, or DELETE a row, the database must also update the index tree. Too many indexes will drastically slow down write performance.
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-xs px-2 py-1 rounded">4</span>
              Full Table Scan
            </h4>
            <p className="text-sm text-slate-300">
              When a query doesn't use an index, the database must read every single row in the table to find matches. This is O(N) and is the primary cause of slow queries in large databases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
