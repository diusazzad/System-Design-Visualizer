import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'rep-client', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'App Servers' } },

  { id: 'rep-master', type: 'architectureNode', position: { x: 350, y: 50 }, data: { type: 'database', label: 'Master DB', description: 'Handles all Writes' } },
  { id: 'rep-slave1', type: 'architectureNode', position: { x: 650, y: 150 }, data: { type: 'database', label: 'Read Replica 1', description: 'Handles Reads' } },
  { id: 'rep-slave2', type: 'architectureNode', position: { x: 650, y: 300 }, data: { type: 'database', label: 'Read Replica 2', description: 'Handles Reads' } },
];

const initialEdges = [
  // Writes go to master
  { id: 'e-write', source: 'rep-client', target: 'rep-master', animated: true, label: 'Write (INSERT/UPDATE)', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444' } },
  
  // Master syncs to slaves
  { id: 'e-sync1', source: 'rep-master', target: 'rep-slave1', animated: true, label: 'Async Replication', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6', strokeDasharray: '5,5' } },
  { id: 'e-sync2', source: 'rep-master', target: 'rep-slave2', animated: true, label: 'Async Replication', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6', strokeDasharray: '5,5' } },
  
  // Reads come from slaves
  { id: 'e-read1', source: 'rep-client', target: 'rep-slave1', animated: true, label: 'Read (SELECT)', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
];

export default function DataReplicationConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Data Replication</h1>
        <p className="text-lg text-slate-600">
          The process of keeping multiple copies of data on different nodes to increase availability, durability, and read throughput.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Master-Slave Architecture</h2>
        <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Synchronous Replication</h3>
          <p className="text-blue-800 mb-4">The master waits for the replica to acknowledge it has saved the data before returning success to the client.</p>
          <ul className="list-disc list-inside text-blue-700 space-y-2">
            <li><strong>Pros:</strong> Zero data loss if the master crashes.</li>
            <li><strong>Cons:</strong> Writes are slow (tied to the slowest replica).</li>
            <li><strong>Cons:</strong> If a replica goes down, writes might be blocked.</li>
          </ul>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-900 mb-2">Asynchronous Replication</h3>
          <p className="text-emerald-800 mb-4">The master returns success to the client immediately, then syncs to replicas in the background.</p>
          <ul className="list-disc list-inside text-emerald-700 space-y-2">
            <li><strong>Pros:</strong> Extremely fast writes.</li>
            <li><strong>Pros:</strong> Master operates even if replicas are offline.</li>
            <li><strong>Cons:</strong> Risk of data loss if the master crashes before syncing.</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white border-l-4 border-indigo-500 p-6 rounded-r-2xl shadow-sm mt-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Common Topologies</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-indigo-700">Master-Slave (Single-Leader)</h4>
            <p className="text-slate-600">The most common setup. Only the master accepts writes. Slaves accept reads. If the master dies, one of the slaves is promoted to be the new master.</p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-700">Master-Master (Multi-Leader)</h4>
            <p className="text-slate-600">Multiple nodes can accept writes. Good for multi-datacenter setups (e.g., one master in US, one in EU). <strong>Hardest problem:</strong> Conflict resolution (what if two users update the same row on different masters simultaneously?).</p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-700">Leaderless</h4>
            <p className="text-slate-600">Any node can accept writes. Systems like Cassandra or DynamoDB use this. They use quorum reads/writes (e.g., write to 3 nodes, must get ACK from 2 to succeed).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
