
import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'v1', type: 'architectureNode', position: { x: 50, y: 50 }, data: { type: 'server', label: 'Small Server', description: '2GB RAM, 1 CPU' } },
  { id: 'v2', type: 'architectureNode', position: { x: 50, y: 250 }, data: { type: 'server', label: 'Large Server', description: '32GB RAM, 16 CPU' } },
  
  { id: 'h1', type: 'architectureNode', position: { x: 300, y: 50 }, data: { type: 'server', label: 'Server 1', description: '2GB RAM' } },
  { id: 'h2', type: 'architectureNode', position: { x: 300, y: 150 }, data: { type: 'server', label: 'Server 2', description: '2GB RAM' } },
  { id: 'h3', type: 'architectureNode', position: { x: 300, y: 250 }, data: { type: 'server', label: 'Server 3', description: '2GB RAM' } },
];

const initialEdges = [
  { id: 'e1', source: 'v1', target: 'v2', animated: true, label: 'Vertical Scaling (Scale Up)', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2', source: 'v1', target: 'h1', animated: true, label: 'Horizontal Scaling (Scale Out)', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
  { id: 'e3', source: 'v1', target: 'h2', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
  { id: 'e4', source: 'v1', target: 'h3', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
];

export default function ScalingConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Scalability</h1>
        <p className="text-lg text-slate-600">
          Scalability is the property of a system to handle a growing amount of work by adding resources to the system.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Horizontal vs Vertical Scaling</h2>
        <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">Vertical Scaling (Scale Up)</h3>
          <p className="text-indigo-800 mb-4">Adding more power (CPU, RAM) to an existing machine.</p>
          <ul className="list-disc list-inside text-indigo-700 space-y-2">
            <li>Easier to implement initially</li>
            <li>No code changes required</li>
            <li>Has a hard hardware limit</li>
            <li>Single point of failure</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Horizontal Scaling (Scale Out)</h3>
          <p className="text-blue-800 mb-4">Adding more machines into your pool of resources.</p>
          <ul className="list-disc list-inside text-blue-700 space-y-2">
            <li>Infinite scalability</li>
            <li>Requires load balancing</li>
            <li>Harder to maintain data consistency</li>
            <li>Resilient to node failures</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
