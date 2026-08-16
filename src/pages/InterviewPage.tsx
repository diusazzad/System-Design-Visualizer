import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Bot, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import ReactFlow, { Background, MarkerType } from 'reactflow';
import type { Node, Edge } from 'reactflow';
import ArchitectureNode from '../components/ArchitectureNode';
import 'reactflow/dist/style.css';
import { toPng } from 'html-to-image';

const nodeTypes = { architectureNode: ArchitectureNode };

const questions = [
  {
    id: 'scale',
    question: 'How many Daily Active Users (DAU) do you expect?',
    options: ['10,000 (Small)', '1 Million (Medium)', '100 Million+ (Massive)'],
  },
  {
    id: 'ratio',
    question: 'What is the Read-to-Write ratio of the system?',
    options: ['Read-Heavy (e.g. YouTube)', 'Write-Heavy (e.g. IoT telemetry)', 'Balanced (e.g. Chat app)'],
  },
  {
    id: 'consistency',
    question: 'Do you need strong consistency or is eventual consistency fine?',
    options: ['Strong Consistency (Financial)', 'Eventual Consistency (Social Media)'],
  }
];

export default function InterviewPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: answer }));
    if (currentStep < questions.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Rule engine for generating architecture
  const generateArchitecture = () => {
    const nodes: Node[] = [
      { id: 'client', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'Client', description: answers.scale || 'Users' } },
      { id: 'lb', type: 'architectureNode', position: { x: 250, y: 150 }, data: { type: 'loadBalancer', label: 'Load Balancer', description: 'Distributes traffic' } },
    ];
    const edges: Edge[] = [
      { id: 'e1', source: 'client', target: 'lb', animated: true, markerEnd: { type: MarkerType.ArrowClosed } }
    ];

    let currentX = 500;

    // Scale logic
    if (answers.scale === '100 Million+ (Massive)') {
      nodes.push({ id: 'api1', type: 'architectureNode', position: { x: currentX, y: 50 }, data: { type: 'server', label: 'API Fleet (Auto-scaled)', description: 'Stateless servers' } });
      nodes.push({ id: 'api2', type: 'architectureNode', position: { x: currentX, y: 250 }, data: { type: 'server', label: 'API Fleet', description: 'Stateless servers' } });
      edges.push({ id: 'e2', source: 'lb', target: 'api1', animated: true });
      edges.push({ id: 'e3', source: 'lb', target: 'api2', animated: true });
    } else {
      nodes.push({ id: 'api1', type: 'architectureNode', position: { x: currentX, y: 150 }, data: { type: 'server', label: 'API Server', description: 'Main Backend' } });
      edges.push({ id: 'e2', source: 'lb', target: 'api1', animated: true });
    }

    currentX += 250;

    // Read/Write logic
    if (answers.ratio === 'Read-Heavy (e.g. YouTube)') {
      nodes.push({ id: 'cache', type: 'architectureNode', position: { x: currentX, y: 50 }, data: { type: 'cache', label: 'Redis Cluster', description: 'Caches read data' } });
      nodes.push({ id: 'cdn', type: 'architectureNode', position: { x: currentX, y: 250 }, data: { type: 'cdn', label: 'CDN', description: 'Caches static media' } });
      edges.push({ id: 'e4', source: 'api1', target: 'cache', label: 'Cache hit' });
      edges.push({ id: 'e5', source: 'client', target: 'cdn', label: 'Static files', animated: true });
    }

    currentX += 250;

    // Consistency logic
    if (answers.consistency === 'Strong Consistency (Financial)') {
      nodes.push({ id: 'db', type: 'architectureNode', position: { x: currentX, y: 150 }, data: { type: 'database', label: 'Relational DB', description: 'ACID Compliant (SQL)' } });
      edges.push({ id: 'e6', source: 'api1', target: 'db', label: 'Sync Query' });
    } else {
      nodes.push({ id: 'queue', type: 'architectureNode', position: { x: currentX - 100, y: 150 }, data: { type: 'queue', label: 'Message Queue', description: 'Kafka/RabbitMQ' } });
      nodes.push({ id: 'db', type: 'architectureNode', position: { x: currentX + 150, y: 150 }, data: { type: 'database', label: 'NoSQL DB', description: 'Eventual Consistency (Cassandra)' } });
      edges.push({ id: 'e6', source: 'api1', target: 'queue', label: 'Async Write' });
      edges.push({ id: 'e7', source: 'queue', target: 'db', label: 'Worker Process' });
    }

    return { nodes, edges };
  };

  const exportPng = () => {
    const node = document.querySelector('.react-flow') as HTMLElement;
    if (node) {
      toPng(node, { backgroundColor: '#ffffff' }).then((dataUrl) => {
        const a = document.createElement('a');
        a.setAttribute('download', 'system-design.png');
        a.setAttribute('href', dataUrl);
        a.click();
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white p-4 shadow-md shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-indigo-400">SystemDesign</span>
            <span>Interview</span>
          </NavLink>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 flex flex-col items-center">
        {!isFinished ? (
          <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl mt-12 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                <Bot size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">System Design Interview</h2>
                <p className="text-slate-500">Step {currentStep + 1} of {questions.length}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl text-slate-700 font-medium mb-4">{questions[currentStep].question}</h3>
              <div className="space-y-3">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex justify-between items-center group"
                  >
                    <span className="text-slate-700 font-medium">{opt}</span>
                    <ChevronRight size={20} className="text-slate-400 group-hover:text-indigo-500" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              {questions.map((_, idx) => (
                <div key={idx} className={`h-2 flex-1 rounded-full ${idx <= currentStep ? 'bg-indigo-500' : 'bg-slate-200'}`}></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" />
                  Generated Architecture
                </h2>
                <p className="text-slate-600 mt-1">Based on your requirements, here is the suggested system design.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => { setIsFinished(false); setCurrentStep(0); setAnswers({}); }}
                  className="px-4 py-2 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Restart Interview
                </button>
                <button 
                  onClick={exportPng}
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md shadow-indigo-200"
                >
                  <Download size={18} />
                  Export PNG
                </button>
              </div>
            </div>
            <div className="h-[600px] w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden relative">
              <ReactFlow 
                nodes={generateArchitecture().nodes} 
                edges={generateArchitecture().edges} 
                nodeTypes={nodeTypes} 
                fitView
              >
                <Background color="#cbd5e1" gap={16} />
              </ReactFlow>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
