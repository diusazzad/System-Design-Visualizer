import type { PhaseDState } from '../../utils/interviewState';
import { AlertOctagon, Wrench } from 'lucide-react';

interface Props {
  state: PhaseDState;
  onChange: (state: PhaseDState) => void;
}

const bottlenecks = [
  { id: 'db-bottleneck', label: 'Database Write Bottleneck' },
  { id: 'cache-stampede', label: 'Cache Stampede' },
  { id: 'single-point-failure', label: 'Single Point of Failure (SPOF)' },
  { id: 'high-latency', label: 'High Latency for Global Users' },
];

const mitigations = [
  { id: 'add-sharding', label: 'Implement Database Sharding' },
  { id: 'add-jitter', label: 'Add Jitter / Lock on Cache Miss' },
  { id: 'add-replicas', label: 'Deploy Multi-AZ Replicas' },
  { id: 'add-cdn', label: 'Use a CDN & Edge Compute' },
];

export default function PhaseDTradeoffs({ state, onChange }: Props) {
  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Trade-offs & Bottlenecks</h3>
        <p className="text-slate-600 mb-8">
          Every system has a breaking point. Identify the weakest link in your architecture and propose a mitigation strategy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bottlenecks */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <AlertOctagon className="text-rose-500" /> Identify the Bottleneck
            </h4>
            <div className="space-y-3">
              {bottlenecks.map(b => (
                <button
                  key={b.id}
                  onClick={() => onChange({ ...state, bottleneckId: b.id })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    state.bottleneckId === b.id 
                      ? 'border-rose-500 bg-rose-50' 
                      : 'border-slate-200 hover:border-rose-200'
                  }`}
                >
                  <span className={`font-medium ${state.bottleneckId === b.id ? 'text-rose-700' : 'text-slate-700'}`}>
                    {b.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mitigations */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Wrench className="text-emerald-500" /> Mitigation Strategy
            </h4>
            <div className="space-y-3">
              {mitigations.map(m => (
                <button
                  key={m.id}
                  onClick={() => onChange({ ...state, mitigationId: m.id })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    state.mitigationId === m.id 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-slate-200 hover:border-emerald-200'
                  }`}
                >
                  <span className={`font-medium ${state.mitigationId === m.id ? 'text-emerald-700' : 'text-slate-700'}`}>
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
