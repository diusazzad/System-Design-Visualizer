import type { Node, Edge } from 'reactflow';

export type Difficulty = 'Junior' | 'Mid' | 'Senior' | 'Staff';
export type ScenarioId = 'instagram' | 'uber' | 'whatsapp' | 'url-shortener' | 'youtube' | 'custom';

export interface InterviewLobbyState {
  scenarioId: ScenarioId;
  customScenario?: string;
  difficulty: Difficulty;
  timeLimitMinutes: number;
}

export interface PhaseAState {
  functionalReqs: Record<string, boolean>; // checklist
  dau: string;
  readWriteRatio: string;
  latencyReq: string;
  availability: string;
}

export interface PhaseBState {
  nodes: Node[];
  edges: Edge[];
}

export interface PhaseCState {
  answers: Record<string, string>; // questionId -> answer text
}

export interface PhaseDState {
  bottleneckId: string;
  mitigationId: string;
}

export interface InterviewSessionState {
  lobby: InterviewLobbyState;
  phaseA: PhaseAState;
  phaseB: PhaseBState;
  phaseC: PhaseCState;
  phaseD: PhaseDState;
  timeSpentSeconds: number;
}

export interface ReportCard {
  componentCoverageScore: number;
  connectionLogicScore: number;
  deepDiveScore: number;
  timeManagementScore: number;
  totalScore: number;
  grade: string;
  strengths: string[];
  weaknesses: string[];
  suggestedNextSteps: string[];
}
