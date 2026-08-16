import { useState } from 'react';
import type { InterviewLobbyState, ScenarioId, Difficulty } from '../../utils/interviewState';
import { Target, Clock, BrainCircuit, Rocket, Edit3 } from 'lucide-react';

interface Props {
  onStart: (state: InterviewLobbyState) => void;
}

const scenarios: { id: ScenarioId; title: string; desc: string }[] = [
  { id: 'instagram', title: 'Design Instagram', desc: 'Photo sharing, feed generation, celebrity problem.' },
  { id: 'uber', title: 'Design Uber', desc: 'Geospatial search, dispatch, real-time tracking.' },
  { id: 'whatsapp', title: 'Design WhatsApp', desc: 'Real-time messaging, presence, end-to-end encryption.' },
  { id: 'youtube', title: 'Design YouTube', desc: 'Video upload, transcoding, streaming via CDN.' },
  { id: 'url-shortener', title: 'Design URL Shortener', desc: 'Read-heavy, global distribution, collision avoidance.' },
  { id: 'custom', title: 'Custom Scenario', desc: 'Define your own system design challenge.' }
];

export default function InterviewLobby({ onStart }: Props) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('instagram');
  const [customScenario, setCustomScenario] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Mid');
  const [timeLimit, setTimeLimit] = useState<number>(30);

  const handleStart = () => {
    onStart({
      scenarioId,
      customScenario: scenarioId === 'custom' ? customScenario : undefined,
      difficulty,
      timeLimitMinutes: timeLimit
    });
  };

  return (
    <div className="max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="bg-slate-900 text-white p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-indigo-500/20 rounded-full">
            <BrainCircuit size={48} className="text-indigo-400" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold mb-2">System Design Simulator</h1>
        <p className="text-slate-400">Step into the hot seat. Design architectures under time pressure.</p>
      </div>

      <div className="p-8 space-y-8">
        {/* Scenario Selection */}
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800 mb-4">
            <Target className="text-indigo-500" size={20} />
            1. Select Scenario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {scenarios.map(s => (
              <button
                key={s.id}
                onClick={() => setScenarioId(s.id)}
                className={`p-4 text-left rounded-xl border-2 transition-all ${
                  scenarioId === s.id 
                    ? 'border-indigo-600 bg-indigo-50 shadow-sm' 
                    : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-800 flex items-center gap-2">
                  {s.id === 'custom' && <Edit3 size={16} />}
                  {s.title}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-2">{s.desc}</div>
              </button>
            ))}
          </div>
          
          {scenarioId === 'custom' && (
            <div className="mt-4">
              <input 
                type="text" 
                placeholder="e.g. Design a Ticketmaster waiting room"
                className="w-full border-2 border-indigo-200 rounded-lg p-3 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                value={customScenario}
                onChange={(e) => setCustomScenario(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Difficulty Selection */}
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800 mb-4">
            <BrainCircuit className="text-emerald-500" size={20} />
            2. Difficulty Level
          </h2>
          <div className="flex gap-3">
            {(['Junior', 'Mid', 'Senior', 'Staff'] as Difficulty[]).map(level => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-3 rounded-lg border-2 font-bold transition-all ${
                  difficulty === level
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-slate-100 text-slate-600 hover:border-emerald-200 hover:bg-slate-50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-3 pl-1">
            {difficulty === 'Junior' && 'Focus: Basic components, single DB, simple load balancing.'}
            {difficulty === 'Mid' && 'Focus: Caching, basic sharding, queues for async processing.'}
            {difficulty === 'Senior' && 'Focus: Distributed systems, trade-offs, handling failures and hot keys.'}
            {difficulty === 'Staff' && 'Focus: Cross-system boundaries, organizational constraints, extreme scale.'}
          </p>
        </div>

        {/* Time Limit */}
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800 mb-4">
            <Clock className="text-amber-500" size={20} />
            3. Time Limit
          </h2>
          <div className="flex gap-3">
            {[15, 30, 45, 60].map(mins => (
              <button
                key={mins}
                onClick={() => setTimeLimit(mins)}
                className={`px-6 py-2 rounded-lg border-2 font-bold transition-all ${
                  timeLimit === mins
                    ? 'border-amber-600 bg-amber-50 text-amber-800'
                    : 'border-slate-100 text-slate-600 hover:border-amber-200 hover:bg-slate-50'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button 
            onClick={handleStart}
            disabled={scenarioId === 'custom' && !customScenario.trim()}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Interview <Rocket size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
