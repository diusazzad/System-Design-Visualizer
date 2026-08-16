
import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'client1', type: 'architectureNode', position: { x: 50, y: 50 }, data: { type: 'client', label: 'User 1', description: 'Request A' } },
  { id: 'client2', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'User 2', description: 'Request B' } },
  { id: 'client3', type: 'architectureNode', position: { x: 50, y: 250 }, data: { type: 'client', label: 'User 3', description: 'Request C' } },
  
  { id: 'lb', type: 'architectureNode', position: { x: 300, y: 150 }, data: { type: 'loadBalancer', label: 'Load Balancer', description: 'Nginx / HAProxy' } },
  
  { id: 's1', type: 'architectureNode', position: { x: 550, y: 50 }, data: { type: 'server', label: 'Server 1', description: 'Healthy' } },
  { id: 's2', type: 'architectureNode', position: { x: 550, y: 150 }, data: { type: 'server', label: 'Server 2', description: 'Healthy' } },
  { id: 's3', type: 'architectureNode', position: { x: 550, y: 250 }, data: { type: 'server', label: 'Server 3', description: 'Healthy' } },
];

const initialEdges = [
  { id: 'e1', source: 'client1', target: 'lb', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2', source: 'client2', target: 'lb', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3', source: 'client3', target: 'lb', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4', source: 'lb', target: 's1', animated: true, label: 'Req A (Round Robin)', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e5', source: 'lb', target: 's2', animated: true, label: 'Req B', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e6', source: 'lb', target: 's3', animated: true, label: 'Req C', markerEnd: { type: MarkerType.ArrowClosed } },
];

export default function LoadBalancingConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Load Balancing</h1>
        <p className="text-lg text-slate-600">
          A load balancer distributes incoming network traffic across a group of backend servers to ensure high availability and reliability.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Traffic Distribution</h2>
        <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Round Robin</h3>
          <p className="text-sm text-slate-600">Requests are distributed sequentially across the group of servers.</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Least Connections</h3>
          <p className="text-sm text-slate-600">A new request is sent to the server with the fewest current connections.</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-2">IP Hash</h3>
          <p className="text-sm text-slate-600">The IP address of the client is used to determine which server receives the request.</p>
        </div>
      </div>
    </div>
  );
}
