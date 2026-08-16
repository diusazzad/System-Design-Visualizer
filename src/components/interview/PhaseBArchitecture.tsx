import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, { Background, Controls, addEdge, ReactFlowProvider, MarkerType, useReactFlow, type Connection, type Edge, type Node } from 'reactflow';
import type { PhaseBState } from '../../utils/interviewState';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';
import { Database, Globe, Layers, Server, MessageSquare } from 'lucide-react';

const nodeTypes = { architectureNode: ArchitectureNode };

interface Props {
  state: PhaseBState;
  onChange: (state: PhaseBState) => void;
}

const paletteItems = [
  { type: 'client', label: 'Client / User', icon: <Globe size={18} /> },
  { type: 'cdn', label: 'CDN', icon: <Globe size={18} /> },
  { type: 'loadBalancer', label: 'Load Balancer', icon: <Layers size={18} /> },
  { type: 'server', label: 'App Server', icon: <Server size={18} /> },
  { type: 'cache', label: 'Cache (Redis)', icon: <Database size={18} /> },
  { type: 'database', label: 'Database', icon: <Database size={18} /> },
  { type: 'queue', label: 'Message Queue', icon: <MessageSquare size={18} /> },
];

let idCounter = 0;
const getId = () => `dndnode_${idCounter++}`;

function DnDFlow({ state, onChange }: Props) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>(state.nodes);
  const [edges, setEdges] = useState<Edge[]>(state.edges);
  const { screenToFlowPosition } = useReactFlow();

  const updateParent = (n: Node[], e: Edge[]) => {
    setNodes(n);
    setEdges(e);
    onChange({ nodes: n, edges: e });
  };

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const newEdge = { ...params, animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { strokeWidth: 2 } };
      updateParent(nodes, addEdge(newEdge, edges));
    },
    [nodes, edges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow/type');
      const label = event.dataTransfer.getData('application/reactflow/label');

      if (typeof type === 'undefined' || !type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type: 'architectureNode',
        position,
        data: { label, type, description: 'Double click to edit' },
      };

      updateParent(nodes.concat(newNode), edges);
    },
    [nodes, edges, screenToFlowPosition]
  );

  const onNodesChange = (changes: any[]) => {
    // Basic node movement tracking (ignoring selection for brevity)
    let moved = false;
    const nextNodes = nodes.map(n => {
      const change = changes.find(c => c.id === n.id && c.type === 'position');
      if (change && change.position) {
        moved = true;
        return { ...n, position: change.position };
      }
      return n;
    });
    if (moved) {
      setNodes(nextNodes);
      onChange({ nodes: nextNodes, edges });
    }
  };

  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex-1 flex w-full h-full">
      {/* Component Palette */}
      <aside className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col gap-2 z-10 overflow-y-auto">
        <h3 className="font-bold text-slate-700 text-sm mb-2 uppercase tracking-wider">Components</h3>
        <p className="text-xs text-slate-500 mb-4">Drag components to the canvas to build your architecture.</p>
        
        {paletteItems.map(item => (
          <div 
            key={item.label}
            className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-grab hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            onDragStart={(event) => onDragStart(event, item.type, item.label)}
            draggable
          >
            <div className="text-indigo-600">{item.icon}</div>
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
          </div>
        ))}
      </aside>

      {/* Canvas */}
      <div className="flex-1 h-full relative bg-slate-50" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#cbd5e1" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function PhaseBArchitecture(props: Props) {
  return (
    <ReactFlowProvider>
      <DnDFlow {...props} />
    </ReactFlowProvider>
  );
}
