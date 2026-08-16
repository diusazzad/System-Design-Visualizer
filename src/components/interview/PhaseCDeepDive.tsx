import type { PhaseCState } from '../../utils/interviewState';
import { HelpCircle } from 'lucide-react';

interface Props {
  state: PhaseCState;
  onChange: (state: PhaseCState) => void;
}

const deepDiveQuestions = [
  { id: 'q1', text: 'How would you handle a sudden 10x spike in traffic during a major event?' },
  { id: 'q2', text: 'What eviction policy would you use for your caching layer and why?' },
  { id: 'q3', text: 'How do you ensure data consistency across multiple regions?' },
];

export default function PhaseCDeepDive({ state, onChange }: Props) {
  const updateAnswer = (id: string, text: string) => {
    onChange({ ...state, answers: { ...state.answers, [id]: text } });
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Deep Dive Questions</h3>
        <p className="text-slate-600 mb-8">
          Based on your architecture, the interviewer has some follow-up questions. Provide your reasoning.
        </p>

        <div className="space-y-8">
          {deepDiveQuestions.map((q, idx) => (
            <div key={q.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-800 flex gap-3 mb-4">
                <HelpCircle className="text-indigo-500 shrink-0 mt-0.5" size={20} />
                <span>Question {idx + 1}: {q.text}</span>
              </h4>
              <textarea
                className="w-full h-32 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                placeholder="Type your answer here..."
                value={state.answers[q.id] || ''}
                onChange={(e) => updateAnswer(q.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
