import { MarkerType, type Node, type Edge } from 'reactflow';
import type { GeneratedComponent, GeneratedEdge } from './scenarioTypes';

const LAYER_Y_MAP = {
  edge: 50,
  gateway: 200,
  app: 350,
  data: 500,
  storage: 650,
};

export function buildFlow(components: GeneratedComponent[], edges: GeneratedEdge[]): { nodes: Node[], flowEdges: Edge[] } {
  const nodes: Node[] = [];
  
  // Group components by layer
  const layers: Record<string, GeneratedComponent[]> = {
    edge: [], gateway: [], app: [], data: [], storage: []
  };

  components.forEach(c => {
    if (layers[c.layer]) {
      layers[c.layer].push(c);
    }
  });

  // Assign positions based on layer and index
  Object.keys(layers).forEach((layerKey) => {
    const layerComps = layers[layerKey];
    const y = LAYER_Y_MAP[layerKey as keyof typeof LAYER_Y_MAP];
    
    // Calculate X to center them. Assume each node is 200px wide + 50px gap = 250px per node.
    // Base width = 800px (center is 400px)
    const nodeWidth = 250;
    const totalWidth = layerComps.length * nodeWidth;
    const startX = 400 - (totalWidth / 2) + 125; // center offset

    layerComps.forEach((c, index) => {
      nodes.push({
        id: c.id,
        type: 'architectureNode', // custom node type registered in the visualizer
        position: { x: startX + (index * nodeWidth), y },
        data: {
          type: c.type,
          label: c.label,
          description: c.description
        }
      });
    });
  });

  // Convert edges
  const flowEdges: Edge[] = edges.map(e => ({
    id: e.id,
    source: e.source,
    target: e.target,
    animated: e.animated,
    label: e.label,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#64748b', strokeWidth: 1.5 }
  }));

  return { nodes, flowEdges };
}
