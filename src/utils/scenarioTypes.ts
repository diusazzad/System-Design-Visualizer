export type DAULevel = '<10K' | '10K-100K' | '100K-1M' | '1M-10M' | '10M+';
export type WorkloadType = 'Read-Heavy' | 'Write-Heavy' | 'Balanced';
export type ConsistencyType = 'Strong' | 'Eventual';
export type BudgetLevel = 'Low ($)' | 'Medium ($$)' | 'High ($$$)';

export interface ScenarioFormState {
  systemName: string;
  dau: DAULevel;
  workload: WorkloadType;
  realtime: boolean;
  consistency: ConsistencyType;
  geoDistributed: boolean;
  budget: BudgetLevel;
}

export interface GeneratedComponent {
  id: string;
  type: 'client' | 'loadBalancer' | 'server' | 'cache' | 'database';
  layer: 'edge' | 'gateway' | 'app' | 'data' | 'storage';
  label: string;
  description?: string;
}

export interface GeneratedEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface Justification {
  componentId: string;
  title: string;
  rationale: string;
  tradeoff?: string;
  type: 'success' | 'warning' | 'info';
}

export interface ArchitectureResult {
  components: GeneratedComponent[];
  edges: GeneratedEdge[];
  justifications: Justification[];
}
