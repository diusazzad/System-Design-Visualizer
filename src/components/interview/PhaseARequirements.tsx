
import type { PhaseAState } from '../../utils/interviewState';
import { CheckSquare, SlidersHorizontal, AlertTriangle } from 'lucide-react';

interface Props {
  state: PhaseAState;
  onChange: (state: PhaseAState) => void;
}

const commonFunctionalReqs = [
  'Users can create an account and login',
  'System must support text search',
  'Users can upload media (images/videos)',
  'Real-time notifications/updates',
  'News feed / Timeline generation',
  'Data analytics and reporting',
  'Third-party API integrations'
];

export default function PhaseARequirements({ state, onChange }: Props) {
  const toggleReq = (req: string) => {
    const newReqs = { ...state.functionalReqs };
    if (newReqs[req]) {
      delete newReqs[req];
    } else {
      newReqs[req] = true;
    }
    onChange({ ...state, functionalReqs: newReqs });
  };

  const updateField = (field: keyof PhaseAState, value: string) => {
    onChange({ ...state, [field]: value });
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Requirements Clarification</h3>
          <p className="text-slate-600">
            Before jumping into architecture, clarify the scope. A common mistake is solving the wrong problem.
            Select the constraints for your system design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Functional Requirements */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
              <CheckSquare className="text-indigo-500" /> Functional Requirements
            </h4>
            <div className="space-y-3">
              {commonFunctionalReqs.map(req => (
                <label key={req} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                    checked={!!state.functionalReqs[req]}
                    onChange={() => toggleReq(req)}
                  />
                  <span className="text-slate-700 font-medium">{req}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3 text-amber-800 text-sm">
              <AlertTriangle className="shrink-0" size={20} />
              <p>In a real interview, you should explicitly ask the interviewer which of these are in scope.</p>
            </div>
          </div>

          {/* Non-Functional Requirements */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
              <SlidersHorizontal className="text-emerald-500" /> Non-Functional Requirements
            </h4>
            
            <div className="space-y-6">
              {/* DAU */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Estimated DAU (Scale)</label>
                <select 
                  className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-indigo-500 outline-none"
                  value={state.dau}
                  onChange={(e) => updateField('dau', e.target.value)}
                >
                  <option value="">Select scale...</option>
                  <option value="10k">10,000 (Small Startup)</option>
                  <option value="1m">1 Million (Growth)</option>
                  <option value="50m">50 Million (Enterprise)</option>
                  <option value="500m">500 Million+ (Global scale)</option>
                </select>
              </div>

              {/* R/W Ratio */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Read / Write Ratio</label>
                <select 
                  className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-indigo-500 outline-none"
                  value={state.readWriteRatio}
                  onChange={(e) => updateField('readWriteRatio', e.target.value)}
                >
                  <option value="">Select ratio...</option>
                  <option value="100:1">100:1 (Read-heavy, e.g., Twitter)</option>
                  <option value="1:1">1:1 (Balanced, e.g., Messaging)</option>
                  <option value="1:10">1:10 (Write-heavy, e.g., Analytics/IoT)</option>
                </select>
              </div>

              {/* Latency */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Latency Target</label>
                <select 
                  className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-indigo-500 outline-none"
                  value={state.latencyReq}
                  onChange={(e) => updateField('latencyReq', e.target.value)}
                >
                  <option value="">Select latency...</option>
                  <option value="sub-ms">Sub-millisecond (HFT, Gaming)</option>
                  <option value="10ms">&lt; 10ms (Real-time web)</option>
                  <option value="200ms">&lt; 200ms (Standard web)</option>
                  <option value="async">Async / Eventual (Batch processing)</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Availability Target</label>
                <select 
                  className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-indigo-500 outline-none"
                  value={state.availability}
                  onChange={(e) => updateField('availability', e.target.value)}
                >
                  <option value="">Select availability...</option>
                  <option value="99">99% (3.65 days downtime/year)</option>
                  <option value="99.9">99.9% (8.76 hours downtime/year)</option>
                  <option value="99.99">99.99% (52.6 minutes downtime/year)</option>
                  <option value="99.999">99.999% (5.26 minutes downtime/year)</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
