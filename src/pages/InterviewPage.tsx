import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import InterviewLobby from '../components/interview/InterviewLobby';
import InterviewWizard from '../components/interview/InterviewWizard';
import type { InterviewLobbyState, InterviewSessionState } from '../utils/interviewState';

export default function InterviewPage() {
  const [session, setSession] = useState<InterviewSessionState | null>(null);

  const startInterview = (lobby: InterviewLobbyState) => {
    setSession({
      lobby,
      phaseA: { functionalReqs: {}, dau: '', readWriteRatio: '', latencyReq: '', availability: '' },
      phaseB: { nodes: [], edges: [] },
      phaseC: { answers: {} },
      phaseD: { bottleneckId: '', mitigationId: '' },
      timeSpentSeconds: 0
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white p-4 shadow-md shrink-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-indigo-400">SystemDesign</span>
            <span>Interview</span>
          </NavLink>
          {session && (
            <div className="flex gap-4 items-center">
              <span className="text-slate-400 text-sm">
                Scenario: <strong className="text-white">{session.lobby.scenarioId === 'custom' ? session.lobby.customScenario : session.lobby.scenarioId}</strong>
              </span>
              <button 
                onClick={() => setSession(null)}
                className="text-xs bg-slate-800 hover:bg-rose-900/50 hover:text-rose-400 px-3 py-1.5 rounded-md transition-colors"
              >
                Quit Interview
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 md:p-8">
        {!session ? (
          <InterviewLobby onStart={startInterview} />
        ) : (
          <InterviewWizard initialState={session} />
        )}
      </main>
    </div>
  );
}
