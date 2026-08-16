import React, { useState, useMemo } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import ArchitectureNode from '../components/ArchitectureNode';
import 'reactflow/dist/style.css';
import type { 
  ScenarioFormState 
} from '../utils/scenarioTypes';
import { generateArchitecture } from '../utils/rulesEngine';
import { buildFlow } from '../utils/layoutEngine';
import { AlertCircle, CheckCircle2, Info, Save, RotateCcw, RotateCw, Image, Download, Share2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorageGallery } from '../utils/useLocalStorageGallery';
import { useHistory } from '../utils/useHistory';
import { exportToImage, encodeStateToUrl, decodeStateFromUrl } from '../utils/exportUtils';

const nodeTypes = { architectureNode: ArchitectureNode };

const defaultForm: ScenarioFormState = {
  systemName: 'Design a System',
  dau: '100K-1M',
  workload: 'Balanced',
  realtime: false,
  consistency: 'Strong',
  geoDistributed: false,
  budget: 'Medium ($$)'
};

export default function ScenarioBuilderPage() {
  const [searchParams] = useSearchParams();
  const loadId = searchParams.get('load');
  const sharedStateUrl = searchParams.get('state');
    const { saveDesign, getDesign } = useLocalStorageGallery();
  const [toastMessage, setToastMessage] = useState('');
  
  // Load initial form from query param or use default
  const initialForm = useMemo(() => {
    if (sharedStateUrl) {
      const decoded = decodeStateFromUrl(sharedStateUrl);
      if (decoded) return decoded as ScenarioFormState;
    }
    if (loadId) {
      const saved = getDesign(loadId);
      if (saved?.formState) return saved.formState as ScenarioFormState;
    }
    return defaultForm;
  }, [loadId]);

  const { state: form, set: setForm, undo, redo, canUndo, canRedo } = useHistory<ScenarioFormState>(initialForm);

  // Auto-run rules engine when form changes
  const { nodes, edges, justifications } = useMemo(() => {
    const arch = generateArchitecture(form);
    const flow = buildFlow(arch.components, arch.edges);
    return { nodes: flow.nodes, edges: flow.flowEdges, justifications: arch.justifications };
  }, [form]);

  const updateForm = (key: keyof ScenarioFormState, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = () => {
    const saved = saveDesign({
      name: form.systemName,
      nodes,
      edges,
      formState: form
    });
    alert(`Saved ${saved.name} to Gallery!`);
  };

  const handleShare = () => {
    const encoded = encodeStateToUrl(form);
    const url = `${window.location.origin}/builder?state=${encoded}`;
    navigator.clipboard.writeText(url);
    setToastMessage('Link copied to clipboard!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Keyboard Shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [form, nodes, edges]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden">
      
      {/* Left Panel: Form & Controls */}
      <div className="w-full md:w-96 h-[40vh] md:h-full bg-white border-b md:border-r border-slate-200 shadow-sm flex flex-col overflow-y-auto shrink-0 z-20">
        <div className="p-6 bg-slate-900 text-white flex justify-between items-start sticky top-0 z-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-1">Scenario Builder</div>
            <h2 className="text-xl font-bold">Auto-Architecture</h2>
            <p className="text-sm text-slate-400 mt-2">Adjust parameters to instantly generate the optimal architecture.</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 bg-slate-800 p-1 rounded-lg">
              <button 
                onClick={() => exportToImage('png', form.systemName)}
                className="text-slate-300 p-1.5 rounded-md hover:bg-slate-700 hover:text-white transition-colors"
                title="Export PNG"
              >
                <Image size={16} />
              </button>
              <button 
                onClick={() => exportToImage('svg', form.systemName)}
                className="text-slate-300 p-1.5 rounded-md hover:bg-slate-700 hover:text-white transition-colors"
                title="Export SVG"
              >
                <Download size={16} />
              </button>
              <div className="w-px bg-slate-600 mx-1"></div>
              <button 
                onClick={handleShare}
                className="text-indigo-300 p-1.5 rounded-md hover:bg-slate-700 hover:text-indigo-200 transition-colors"
                title="Share via URL"
              >
                <Share2 size={16} />
              </button>
            </div>
            
            <button 
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center shadow-lg"
              title="Save Design (Ctrl+S)"
            >
              <Save size={18} />
            </button>
            <div className="flex gap-1">
              <button 
                onClick={undo} disabled={!canUndo}
                className="bg-slate-800 disabled:opacity-50 text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
                title="Undo (Ctrl+Z)"
              >
                <RotateCcw size={16} />
              </button>
              <button 
                onClick={redo} disabled={!canRedo}
                className="bg-slate-800 disabled:opacity-50 text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
                title="Redo (Ctrl+Shift+Z)"
              >
                <RotateCw size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* System Name */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">System Name</label>
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={form.systemName}
              onChange={(e) => updateForm('systemName', e.target.value)}
            />
          </div>

          {/* DAU */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Daily Active Users (DAU)</label>
            <select 
              className="w-full border border-slate-300 rounded-lg p-2"
              value={form.dau}
              onChange={(e) => updateForm('dau', e.target.value)}
            >
              <option value="<10K">&lt;10K (Small)</option>
              <option value="10K-100K">10K-100K (Startup)</option>
              <option value="100K-1M">100K-1M (Growth)</option>
              <option value="1M-10M">1M-10M (Enterprise)</option>
              <option value="10M+">10M+ (Global Scale)</option>
            </select>
          </div>

          {/* Workload */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Workload Type</label>
            <div className="flex gap-2">
              {['Read-Heavy', 'Balanced', 'Write-Heavy'].map(type => (
                <button 
                  key={type}
                  className={`flex-1 text-xs py-2 rounded-lg font-medium border ${form.workload === type ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}
                  onClick={() => updateForm('workload', type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Realtime & Geo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Real-time?</label>
              <button 
                className={`w-full py-2 rounded-lg text-sm font-medium border ${form.realtime ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-600'}`}
                onClick={() => updateForm('realtime', !form.realtime)}
              >
                {form.realtime ? 'Yes (WebSockets)' : 'No (REST only)'}
              </button>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Geo-Distributed?</label>
              <button 
                className={`w-full py-2 rounded-lg text-sm font-medium border ${form.geoDistributed ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-slate-200 text-slate-600'}`}
                onClick={() => updateForm('geoDistributed', !form.geoDistributed)}
              >
                {form.geoDistributed ? 'Yes (Global)' : 'No (Single Region)'}
              </button>
            </div>
          </div>

          {/* Consistency */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Data Consistency</label>
            <div className="flex gap-2">
              <button 
                className={`flex-1 text-xs py-2 rounded-lg font-medium border ${form.consistency === 'Strong' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-600'}`}
                onClick={() => updateForm('consistency', 'Strong')}
              >
                Strong (ACID)
              </button>
              <button 
                className={`flex-1 text-xs py-2 rounded-lg font-medium border ${form.consistency === 'Eventual' ? 'bg-purple-50 border-purple-500 text-purple-700' : 'bg-white border-slate-200 text-slate-600'}`}
                onClick={() => updateForm('consistency', 'Eventual')}
              >
                Eventual (BASE)
              </button>
            </div>
          </div>
          
          {/* Budget */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Budget Sensitivity</label>
            <input 
              type="range" min="1" max="3" 
              className="w-full accent-indigo-600"
              value={form.budget === 'Low ($)' ? 1 : form.budget === 'Medium ($$)' ? 2 : 3}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                updateForm('budget', val === 1 ? 'Low ($)' : val === 2 ? 'Medium ($$)' : 'High ($$$)');
              }}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Low ($)</span><span>Medium ($$)</span><span>High ($$$)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Architecture & Justifications */}
      <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden relative">
        {toastMessage && (
          <div className="absolute top-4 right-4 z-50 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl animate-fade-in">
            {toastMessage}
          </div>
        )}
        <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur px-4 py-2 rounded-lg shadow-sm border border-slate-200 pointer-events-none">
          <h1 className="text-xl font-extrabold text-slate-800">{form.systemName}</h1>
          <div className="text-xs text-slate-500 font-mono mt-1">Generated based on {form.dau} DAU • {form.workload}</div>
        </div>

        {/* React Flow Canvas */}
        <div className="flex-1 min-h-[500px]">
          <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            nodeTypes={nodeTypes}
            fitView 
            fitViewOptions={{ padding: 0.2 }}
            className="bg-slate-50"
          >
            <Background color="#cbd5e1" gap={16} />
            <Controls className="mb-8" />
            <div className="absolute bottom-1 right-2 text-[10px] text-slate-400 font-medium z-10 pointer-events-none">
              Shortcuts: Ctrl+S (Save), Ctrl+Z (Undo)
            </div>
          </ReactFlow>
        </div>

        {/* Justification Panel */}
        <div className="h-64 bg-white border-t border-slate-200 overflow-y-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="p-4 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Info size={18} className="text-indigo-600" />
              Architecture Decisions & Justifications
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {justifications.map((just, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-xl border ${
                  just.type === 'success' ? 'bg-emerald-50 border-emerald-100' :
                  just.type === 'warning' ? 'bg-amber-50 border-amber-200' :
                  'bg-blue-50 border-blue-100'
                }`}
              >
                <h4 className="font-bold mb-2 flex items-center gap-2 text-slate-800">
                  {just.type === 'success' && <CheckCircle2 size={16} className="text-emerald-600" />}
                  {just.type === 'warning' && <AlertCircle size={16} className="text-amber-600" />}
                  {just.type === 'info' && <Info size={16} className="text-blue-600" />}
                  {just.title}
                </h4>
                <p className="text-sm text-slate-700">{just.rationale}</p>
                {just.tradeoff && (
                  <div className="mt-3 pt-3 border-t border-slate-200/50 text-xs font-medium text-slate-600">
                    <span className="text-amber-700 font-bold uppercase tracking-wider text-[10px] mr-1">Trade-off:</span>
                    {just.tradeoff}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
