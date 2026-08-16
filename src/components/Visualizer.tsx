import { useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, MarkerType } from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { useArchitectureStore } from '../store/useArchitectureStore';
import ArchitectureNode from './ArchitectureNode';

const nodeTypes = {
  architectureNode: ArchitectureNode,
};

export default function Visualizer() {
  const { selectedScenario, isSimulating } = useArchitectureStore();

  const nodes: Node[] = useMemo(() => {
    return selectedScenario.nodes.map(node => ({
      ...node,
      data: { ...node.data }
    }));
  }, [selectedScenario]);

  const edges: Edge[] = useMemo(() => {
    return selectedScenario.edges.map(edge => ({
      ...edge,
      animated: isSimulating || edge.animated,
      style: { stroke: isSimulating ? '#6366f1' : '#94a3b8', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: isSimulating ? '#6366f1' : '#94a3b8' },
    }));
  }, [selectedScenario, isSimulating]);

  return (
    <div className="w-full h-full bg-slate-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="w-full h-full"
      >
        <Background color="#cbd5e1" gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
