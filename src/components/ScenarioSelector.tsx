
import { useArchitectureStore } from '../store/useArchitectureStore';

export default function ScenarioSelector() {
  const { scenarios, selectedScenario, setScenario, isSimulating, setSimulating } = useArchitectureStore();

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 border rounded-t-xl shadow-sm border-b-0">
      <div className="flex items-center gap-4">
        <label className="font-semibold text-slate-700">System Scenario:</label>
        <select 
          className="border border-slate-300 rounded-md px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedScenario.id}
          onChange={(e) => setScenario(e.target.value)}
        >
          {scenarios.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => setSimulating(!isSimulating)}
          className={`px-4 py-2 rounded-md font-medium text-white transition-colors ${
            isSimulating ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isSimulating ? 'Stop Traffic' : 'Simulate 1M Users'}
        </button>
      </div>
    </div>
  );
}
