
import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'client', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'Client', description: 'User Request' } },
  { id: 'cache', type: 'architectureNode', position: { x: 300, y: 50 }, data: { type: 'cache', label: 'Redis Cache', description: 'Fast, In-Memory' } },
  { id: 'db', type: 'architectureNode', position: { x: 300, y: 250 }, data: { type: 'database', label: 'Database', description: 'Slow, Persistent DB' } },
];

const initialEdges = [
  { id: 'e1', source: 'client', target: 'cache', animated: true, label: '1. Check Cache', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2', source: 'cache', target: 'client', animated: true, label: '2. Cache Hit (Fast)', style: { stroke: '#22c55e' } },
  { id: 'e3', source: 'cache', target: 'db', animated: true, label: '3. Cache Miss (Query DB)', style: { stroke: '#ef4444', strokeDasharray: '5 5' } },
];

export default function CachingConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Caching Strategies</h1>
        <p className="text-lg text-slate-600">
          Caching is the technique of storing copies of frequently accessed data in a temporary, fast-access storage layer (like RAM).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Visualizing Cache Flow</h2>
          <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
            <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
              <Background color="#cbd5e1" gap={16} />
            </ReactFlow>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span>Code Snippet (Redis)</span>
            </h3>
            <pre className="text-sm bg-slate-800 p-4 rounded-lg overflow-x-auto text-green-400">
              <code>{`// Example: Cache Aside Pattern
async function getUser(id) {
  // 1. Check Cache
  const cachedUser = await redis.get(\`user:\${id}\`);
  if (cachedUser) return JSON.parse(cachedUser);

  // 2. Cache Miss - Query DB
  const user = await db.query('SELECT * FROM users...');
  
  // 3. Populate Cache (TTL 1hr)
  await redis.setex(\`user:\${id}\`, 3600, JSON.stringify(user));
  
  return user;
}`}</code>
            </pre>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Popular Caching Strategies</h3>
            <ul className="space-y-3 text-slate-600 list-disc list-inside">
              <li><strong className="text-slate-800">Cache Aside:</strong> Application checks cache first, then DB.</li>
              <li><strong className="text-slate-800">Read-Through:</strong> Cache sits between app and DB. Cache updates itself.</li>
              <li><strong className="text-slate-800">Write-Through:</strong> Data is written to cache and DB simultaneously.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
