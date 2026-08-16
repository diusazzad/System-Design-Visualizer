import { useState, useEffect } from 'react';
import type { InterviewSessionState } from '../../utils/interviewState';
import PhaseARequirements from './PhaseARequirements';
import PhaseBArchitecture from './PhaseBArchitecture';
import PhaseCDeepDive from './PhaseCDeepDive';
import PhaseDTradeoffs from './PhaseDTradeoffs';
import InterviewReportCard from './InterviewReportCard';

interface Props {
  initialState: InterviewSessionState;
}

type WizardStep = 'PhaseA' | 'PhaseB' | 'PhaseC' | 'PhaseD' | 'Report';

export default function InterviewWizard({ initialState }: Props) {
  const [state, setState] = useState<InterviewSessionState>(initialState);
  const [currentStep, setCurrentStep] = useState<WizardStep>('PhaseA');
  const [timeLeft, setTimeLeft] = useState(initialState.lobby.timeLimitMinutes * 60);

  // Timer logic
  useEffect(() => {
    if (currentStep === 'Report') return;
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit if time runs out
          setCurrentStep('Report');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentStep]);

  const updatePhase = <K extends keyof InterviewSessionState>(phase: K, data: InterviewSessionState[K]) => {
    setState((prev: any) => ({ ...prev, [phase]: data }));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const nextStep = () => {
    if (currentStep === 'PhaseA') setCurrentStep('PhaseB');
    else if (currentStep === 'PhaseB') setCurrentStep('PhaseC');
    else if (currentStep === 'PhaseC') setCurrentStep('PhaseD');
    else if (currentStep === 'PhaseD') setCurrentStep('Report');
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'PhaseA': return 'Phase 1: Requirements Clarification';
      case 'PhaseB': return 'Phase 2: High-Level Design Canvas';
      case 'PhaseC': return 'Phase 3: Deep Dive Questions';
      case 'PhaseD': return 'Phase 4: Trade-offs & Bottlenecks';
      case 'Report': return 'Interview Report Card';
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Wizard Header */}
      {currentStep !== 'Report' && (
        <div className="bg-white rounded-t-xl border border-b-0 border-slate-200 p-4 flex justify-between items-center shadow-sm z-10 relative">
          <h2 className="text-xl font-bold text-slate-800">{getStepTitle()}</h2>
          
          <div className="flex items-center gap-6">
            {/* Progress indicators */}
            <div className="flex gap-2">
              {(['PhaseA', 'PhaseB', 'PhaseC', 'PhaseD'] as WizardStep[]).map((step, idx) => {
                const isActive = step === currentStep;
                const isPassed = ['PhaseA', 'PhaseB', 'PhaseC', 'PhaseD'].indexOf(currentStep) > idx;
                return (
                  <div 
                    key={step} 
                    className={`h-2 w-12 rounded-full ${isActive ? 'bg-indigo-600' : isPassed ? 'bg-indigo-200' : 'bg-slate-100'}`}
                  />
                );
              })}
            </div>

            {/* Timer */}
            <div className={`font-mono text-xl font-bold px-4 py-1.5 rounded-lg border-2 ${
              timeLeft < 300 ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse' : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}>
              ⏱️ {formatTime(timeLeft)}
            </div>

            <button 
              onClick={nextStep}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
            >
              Next Step ⏭️
            </button>
          </div>
        </div>
      )}

      {/* Wizard Content */}
      <div className={`flex-1 flex flex-col ${currentStep !== 'Report' ? 'border border-slate-200 rounded-b-xl overflow-hidden' : ''}`}>
        {currentStep === 'PhaseA' && (
          <PhaseARequirements state={state.phaseA} onChange={(s) => updatePhase('phaseA', s)} />
        )}
        {currentStep === 'PhaseB' && (
          <PhaseBArchitecture state={state.phaseB} onChange={(s) => updatePhase('phaseB', s)} />
        )}
        {currentStep === 'PhaseC' && (
          <PhaseCDeepDive state={state.phaseC} onChange={(s) => updatePhase('phaseC', s)} />
        )}
        {currentStep === 'PhaseD' && (
          <PhaseDTradeoffs state={state.phaseD} onChange={(s) => updatePhase('phaseD', s)} />
        )}
        {currentStep === 'Report' && (
          <InterviewReportCard state={state} />
        )}
      </div>
    </div>
  );
}
