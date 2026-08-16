import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'shard-client', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'App Server', description: 'Find user ID 405' } },

  { id: 'shard-router', type: 'architectureNode', position: { x: 300, y: 150 }, data: { type: 'loadBalancer', label: 'Router / Proxy', description: 'Hash(405) % 3 = 1' } },
  
  { id: 'shard-0', type: 'architectureNode', position: { x: 600, y: 50 }, data: { type: 'database', label: 'Shard 0', description: 'IDs: 0, 3, 6, 9...' } },
  { id: 'shard-1', type: 'architectureNode', position: { x: 600, y: 150 }, data: { type: 'database', label: 'Shard 1', description: 'IDs: 1, 4, 7, 10...' } },
  { id: 'shard-2', type: 'architectureNode', position: { x: 600, y: 250 }, data: { type: 'database', label: 'Shard 2', description: 'IDs: 2, 5, 8, 11...' } },
];

const initialEdges = [
  // Client to Router
  { id: 'e-r1', source: 'shard-client', target: 'shard-router', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  
  // Router to Shards
  { id: 'e-s0', source: 'shard-router', target: 'shard-0', animated: false, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#cbd5e1' } },
  { id: 'e-s1', source: 'shard-router', target: 'shard-1', animated: true, label: 'Route to Shard 1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'e-s2', source: 'shard-router', target: 'shard-2', animated: false, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#cbd5e1' } },
];

export default function DatabaseShardingConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Database Sharding (Horizontal Partitioning)</h1>
        <p className="text-lg text-slate-600">
          The process of splitting a single logical dataset into multiple distinct physical databases (shards) so it can be distributed across multiple servers.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Algorithmic Sharding (Hash Based)</h2>
        <div className="h-[350px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
          <h3 className="text-xl font-bold text-rose-900 mb-2">Why Shard?</h3>
          <ul className="list-disc list-inside text-rose-700 space-y-2">
            <li><strong>Storage Limits:</strong> A single disk can only hold so much data (e.g., 10TB).</li>
            <li><strong>Compute Limits:</strong> A single CPU can only handle so many queries.</li>
            <li><strong>Network Limits:</strong> A single server's network card can get saturated.</li>
            <li>Sharding solves this by distributing the load infinitely (Scale Out).</li>
          </ul>
        </div>
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">The Cost of Sharding</h3>
          <ul className="list-disc list-inside text-indigo-700 space-y-2">
            <li><strong>Complexity:</strong> The application now needs to know *which* database to talk to.</li>
            <li><strong>Cross-Shard Joins:</strong> Joining data that lives on different servers is slow and hard.</li>
            <li><strong>Resharding:</strong> What happens when you add a 4th server? (Requires Consistent Hashing).</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl mt-8">
        <h3 className="text-2xl font-bold mb-6 text-emerald-300">Sharding Strategies</h3>
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h4 className="font-bold text-lg text-emerald-400 mb-2">1. Algorithmic / Hash Sharding</h4>
            <p className="text-slate-300">
              Apply a hash function to the Shard Key (e.g., User ID), then modulo the number of servers. `server = hash(user_id) % num_servers`.
              <br /><strong className="text-white mt-1 block">Pros:</strong> Data is evenly distributed.
              <br /><strong className="text-rose-400 mt-1 block">Cons:</strong> Adding a new server changes the modulo (`% 4` instead of `% 3`), meaning almost ALL data must be moved!
            </p>
          </div>
          <div className="border-b border-white/10 pb-4">
            <h4 className="font-bold text-lg text-emerald-400 mb-2">2. Directory / Lookup Sharding</h4>
            <p className="text-slate-300">
              Keep a lookup table in a separate database that maps User ID directly to a Shard. (User 1 -&gt; Shard A, User 2 -&gt; Shard C).
              <br /><strong className="text-white mt-1 block">Pros:</strong> Easy to move individual users to new servers.
              <br /><strong className="text-rose-400 mt-1 block">Cons:</strong> The lookup table becomes a single point of failure and a bottleneck.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-emerald-400 mb-2">3. Geo-based Sharding</h4>
            <p className="text-slate-300">
              Shard based on location. US users in the US shard, EU users in the EU shard.
              <br /><strong className="text-white mt-1 block">Pros:</strong> Low latency for users, helps with data residency laws (GDPR).
              <br /><strong className="text-rose-400 mt-1 block">Cons:</strong> Can lead to "Hot Shards" (e.g., US shard is overloaded, but EU shard is idle).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
