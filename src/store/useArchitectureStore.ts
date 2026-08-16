import { create } from 'zustand';
import type { SystemScenario } from '../types/architecture';
import { scenarios } from '../data/scenarios';

interface ArchitectureState {
  scenarios: SystemScenario[];
  selectedScenario: SystemScenario;
  setScenario: (id: string) => void;
  isSimulating: boolean;
  setSimulating: (simulating: boolean) => void;
}

export const useArchitectureStore = create<ArchitectureState>((set) => ({
  scenarios: scenarios,
  selectedScenario: scenarios[0],
  setScenario: (id) => 
    set((state) => ({
      selectedScenario: state.scenarios.find((s) => s.id === id) || state.scenarios[0]
    })),
  isSimulating: false,
  setSimulating: (simulating) => set({ isSimulating: simulating }),
}));
