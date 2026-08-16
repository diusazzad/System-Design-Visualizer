export type NodeType = 
  | 'server' 
  | 'database' 
  | 'loadBalancer' 
  | 'cache' 
  | 'queue' 
  | 'cdn' 
  | 'client'
  | 'gateway';

export interface ArchitectureNodeData {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  icon?: string;
  details?: {
    pros?: string[];
    cons?: string[];
    useCases?: string[];
  };
}

export interface ArchitectureNode {
  id: string;
  type: 'architectureNode';
  position: { x: number; y: number };
  data: ArchitectureNodeData;
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  type?: string;
}

export interface SystemScenario {
  id: string;
  name: string;
  description: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}
