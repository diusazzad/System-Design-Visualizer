import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'mq-client1', type: 'architectureNode', position: { x: 50, y: 100 }, data: { type: 'client', label: 'Producer 1', description: 'Web App' } },
  { id: 'mq-client2', type: 'architectureNode', position: { x: 50, y: 250 }, data: { type: 'client', label: 'Producer 2', description: 'Mobile App' } },

  { id: 'mq-broker', type: 'architectureNode', position: { x: 350, y: 175 }, data: { type: 'database', label: 'Message Broker', description: 'Kafka / RabbitMQ / SQS' } },
  
  { id: 'mq-worker1', type: 'architectureNode', position: { x: 650, y: 50 }, data: { type: 'server', label: 'Consumer 1', description: 'Email Service' } },
  { id: 'mq-worker2', type: 'architectureNode', position: { x: 650, y: 175 }, data: { type: 'server', label: 'Consumer 2', description: 'Analytics Service' } },
  { id: 'mq-worker3', type: 'architectureNode', position: { x: 650, y: 300 }, data: { type: 'server', label: 'Consumer 3', description: 'Push Notification' } },
];

const initialEdges = [
  { id: 'e-p1', source: 'mq-client1', target: 'mq-broker', label: 'Publish Event', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
  { id: 'e-p2', source: 'mq-client2', target: 'mq-broker', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
  
  { id: 'e-c1', source: 'mq-broker', target: 'mq-worker1', label: 'Pull / Push', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
  { id: 'e-c2', source: 'mq-broker', target: 'mq-worker2', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
  { id: 'e-c3', source: 'mq-broker', target: 'mq-worker3', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6' } },
];

export default function MessageQueuesConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Message Queues & Event Streaming</h1>
        <p className="text-lg text-slate-600">
          Asynchronous communication protocols that allow distributed systems to communicate reliably without being tightly coupled.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Pub/Sub Architecture</h2>
        <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <h3 className="text-xl font-bold text-orange-900 mb-2">Message Queues (RabbitMQ / SQS)</h3>
          <p className="text-orange-800 mb-4">Designed for point-to-point communication. Once a message is consumed, it is typically deleted.</p>
          <ul className="list-disc list-inside text-orange-700 space-y-2">
            <li><strong>Smart Broker, Dumb Consumer:</strong> Broker tracks who read what.</li>
            <li><strong>Push Model:</strong> Broker pushes data to consumers.</li>
            <li><strong>Use Case:</strong> Task processing, Email sending, Video rendering.</li>
          </ul>
        </div>
        <div className="bg-cyan-50 p-6 rounded-2xl border border-cyan-100">
          <h3 className="text-xl font-bold text-cyan-900 mb-2">Event Streaming (Kafka / Kinesis)</h3>
          <p className="text-cyan-800 mb-4">Designed for high-throughput pub/sub. Messages are persisted and can be read by multiple consumers.</p>
          <ul className="list-disc list-inside text-cyan-700 space-y-2">
            <li><strong>Dumb Broker, Smart Consumer:</strong> Consumers track their own offset.</li>
            <li><strong>Pull Model:</strong> Consumers pull data at their own pace.</li>
            <li><strong>Use Case:</strong> Analytics pipeline, Real-time logs, Event sourcing.</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 mt-8">
        <h3 className="text-xl font-bold text-rose-900 mb-2">Why use Message Queues?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-semibold text-rose-800">Decoupling</h4>
            <p className="text-sm text-rose-700">Producers don't need to know who the consumers are or if they are currently online.</p>
          </div>
          <div>
            <h4 className="font-semibold text-rose-800">Spike Smoothing (Buffering)</h4>
            <p className="text-sm text-rose-700">If 10,000 orders arrive in 1 second, the DB won't crash. The queue absorbs the burst, and workers process them slowly.</p>
          </div>
          <div>
            <h4 className="font-semibold text-rose-800">Asynchronous Processing</h4>
            <p className="text-sm text-rose-700">User uploads a video, gets instant response "Processing...". The heavy lifting is done in the background by a worker.</p>
          </div>
          <div>
            <h4 className="font-semibold text-rose-800">Reliability & Retries</h4>
            <p className="text-sm text-rose-700">If a consumer crashes while processing, the message isn't lost. It goes back to the queue (or a Dead Letter Queue) to be retried.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
