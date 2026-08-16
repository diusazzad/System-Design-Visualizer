import { useMemo } from 'react';
import type { InterviewSessionState } from '../../utils/interviewState';
import { generateReportCard } from '../../utils/scoringEngine';
import { Trophy, CheckCircle2, XCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface Props {
  state: InterviewSessionState;
}

export default function InterviewReportCard({ state }: Props) {
  const report = useMemo(() => generateReportCard(state), [state]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 75) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <div className="flex-1 bg-slate-50 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <Trophy size={48} className={`mx-auto mb-4 ${getScoreColor(report.totalScore)}`} />
          <h2 className="text-4xl font-extrabold text-slate-800 mb-2">Interview Complete</h2>
          <p className="text-slate-500">You designed {state.lobby.scenarioId === 'custom' ? state.lobby.customScenario : state.lobby.scenarioId} at {state.lobby.difficulty} level.</p>
          
          <div className="mt-8 flex justify-center items-end gap-4">
            <div className="text-6xl font-black text-slate-800">{report.totalScore}</div>
            <div className="text-2xl text-slate-400 font-bold mb-2">/ 100</div>
          </div>
          <div className={`mt-2 text-xl font-bold ${getScoreColor(report.totalScore)}`}>
            Grade: {report.grade}
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-indigo-500" /> Score Breakdown
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Component Coverage</span>
                <span className="font-bold text-slate-800">{report.componentCoverageScore}/25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Connection Logic</span>
                <span className="font-bold text-slate-800">{report.connectionLogicScore}/25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Deep Dive Answers</span>
                <span className="font-bold text-slate-800">{report.deepDiveScore}/25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Time Management</span>
                <span className="font-bold text-slate-800">{report.timeManagementScore}/25</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div>
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500" size={18} /> Strengths
              </h3>
              <ul className="space-y-2">
                {report.strengths.length > 0 ? report.strengths.map((s: string, i: number) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-emerald-500">•</span> {s}
                  </li>
                )) : <li className="text-sm text-slate-400 italic">None identified.</li>}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <XCircle className="text-rose-500" size={18} /> Areas to Improve
              </h3>
              <ul className="space-y-2">
                {report.weaknesses.length > 0 ? report.weaknesses.map((w: string, i: number) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-rose-500">•</span> {w}
                  </li>
                )) : <li className="text-sm text-slate-400 italic">None! Perfect run.</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        {report.suggestedNextSteps.length > 0 && (
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-3">Suggested Learning Path</h3>
            <ul className="space-y-2">
              {report.suggestedNextSteps.map((step: any, i: number) => (
                <li key={i} className="text-indigo-700 flex items-center gap-2 text-sm font-medium">
                  <ArrowRight size={16} /> {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <NavLink 
            to="/"
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200"
          >
            Start Another Interview
          </NavLink>
        </div>

      </div>
    </div>
  );
}
