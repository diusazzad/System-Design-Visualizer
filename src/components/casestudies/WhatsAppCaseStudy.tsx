import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'wa-user-a', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'Alice', description: 'Sender' } },
  { id: 'wa-user-b', type: 'architectureNode', position: { x: 850, y: 150 }, data: { type: 'client', label: 'Bob', description: 'Receiver (Online)' } },

  { id: 'wa-conn-a', type: 'architectureNode', position: { x: 300, y: 50 }, data: { type: 'server', label: 'Chat Server A', description: 'WebSocket (Alice)' } },
  { id: 'wa-conn-b', type: 'architectureNode', position: { x: 600, y: 50 }, data: { type: 'server', label: 'Chat Server B', description: 'WebSocket (Bob)' } },
  
  { id: 'wa-session', type: 'architectureNode', position: { x: 450, y: 250 }, data: { type: 'cache', label: 'Session Cache', description: 'Alice -> Server A\nBob -> Server B' } },
  { id: 'wa-mq', type: 'architectureNode', position: { x: 450, y: -50 }, data: { type: 'database', label: 'Message Queue', description: 'Pub/Sub Routing' } },
];

const initialEdges = [
  // WebSockets
  { id: 'e-1', source: 'wa-user-a', target: 'wa-conn-a', animated: true, label: 'WebSocket (TLS)', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-2', source: 'wa-user-b', target: 'wa-conn-b', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  
  // Message Flow
  { id: 'e-3', source: 'wa-conn-a', target: 'wa-session', animated: true, label: 'Lookup Bob', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6' } },
  { id: 'e-4', source: 'wa-session', target: 'wa-conn-a', animated: true, label: 'Bob is on Server B', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6' } },
  
  { id: 'e-5', source: 'wa-conn-a', target: 'wa-mq', animated: true, label: 'Forward Message', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444' } },
  { id: 'e-6', source: 'wa-mq', target: 'wa-conn-b', animated: true, label: 'Push to Server B', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444' } },
  { id: 'e-7', source: 'wa-conn-b', target: 'wa-user-b', animated: true, label: 'Deliver Message', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
];

export default function WhatsAppCaseStudy() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold tracking-wide mb-3">
          CASE STUDY
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Design WhatsApp (Real-time Chat)</h1>
        <p className="text-lg text-slate-600">
          A real-time messaging system supporting billions of users. Low latency, high reliability, and End-to-End Encryption (E2EE) are critical.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Real-time Delivery Architecture</h2>
        <div className="h-[450px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-emerald-300 border-b border-white/20 pb-4">Concept Mapping: Why are we using these?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
              <span className="bg-amber-400/20 px-2 py-0.5 rounded text-xs text-amber-300 border border-amber-400/30">Concept</span>
              Microservices (Stateful)
            </h4>
            <p className="text-sm text-slate-300">
              Unlike normal APIs which are stateless, Chat Servers must hold persistent WebSocket connections (Stateful). We need a dedicated Microservice (Session Service) just to track which user is connected to which Chat Server.
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-2">
              <span className="bg-rose-400/20 px-2 py-0.5 rounded text-xs text-rose-300 border border-rose-400/30">Concept</span>
              Message Queues
            </h4>
            <p className="text-sm text-slate-300">
              Chat Servers don't talk directly to each other (that would require a massive mesh network). Instead, Server A pushes the message to a Queue/PubSub channel. Server B is subscribed to Bob's channel and pulls the message.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-indigo-400 mb-2 flex items-center gap-2">
              <span className="bg-indigo-400/20 px-2 py-0.5 rounded text-xs text-indigo-300 border border-indigo-400/30">Concept</span>
              Authentication (E2EE)
            </h4>
            <p className="text-sm text-slate-300">
              Authentication ensures only Alice and Bob can read the message. The server NEVER sees plain text. It only routes encrypted blobs. The keys are stored locally on the users' devices.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
              <span className="bg-blue-400/20 px-2 py-0.5 rounded text-xs text-blue-300 border border-blue-400/30">Concept</span>
              Data Replication (NoSQL)
            </h4>
            <p className="text-sm text-slate-300">
              What if Bob is offline? Server A writes the message to a NoSQL "Undelivered Messages" database (Cassandra/DynamoDB) which is highly replicated for durability. When Bob comes online, he fetches from this DB.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Handling Media (Images & Video)</h3>
        <p className="text-slate-600 mb-4 text-sm">
          You cannot send a 50MB video through a WebSocket efficiently. The pipeline differs for large media:
        </p>
        <ol className="list-decimal list-inside text-slate-700 text-sm space-y-2">
          <li>Alice requests an S3 Pre-signed URL from the Asset Service.</li>
          <li>Alice uploads the encrypted video directly to S3 (bypassing the chat servers).</li>
          <li>Alice sends a small WebSocket message to Bob: <code className="bg-slate-200 px-1 rounded">{"{ type: 'video', url: 's3://...', key: 'xxx' }"}</code></li>
          <li>Bob downloads the video from S3 via CDN and decrypts it locally.</li>
        </ol>
      </div>
    </div>
  );
}
