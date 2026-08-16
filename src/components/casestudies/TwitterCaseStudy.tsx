import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  { id: 'tw-client', type: 'architectureNode', position: { x: 50, y: 150 }, data: { type: 'client', label: 'User (Tweets)' } },

  { id: 'tw-gateway', type: 'architectureNode', position: { x: 300, y: 150 }, data: { type: 'loadBalancer', label: 'API Gateway' } },
  
  { id: 'tw-write', type: 'architectureNode', position: { x: 550, y: 50 }, data: { type: 'server', label: 'Write API', description: 'Handles new tweets' } },
  { id: 'tw-mq', type: 'architectureNode', position: { x: 800, y: 50 }, data: { type: 'database', label: 'Message Queue', description: 'Fan-out on Write' } },
  
  { id: 'tw-read', type: 'architectureNode', position: { x: 550, y: 250 }, data: { type: 'server', label: 'Read API', description: 'Fetches Timeline' } },
  { id: 'tw-cache', type: 'architectureNode', position: { x: 800, y: 250 }, data: { type: 'cache', label: 'Redis Cluster', description: 'In-memory Timelines' } },
];

const initialEdges = [
  { id: 'e-1', source: 'tw-client', target: 'tw-gateway', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  
  { id: 'e-2', source: 'tw-gateway', target: 'tw-write', animated: true, label: 'POST /tweet', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444' } },
  { id: 'e-3', source: 'tw-write', target: 'tw-mq', animated: true, label: 'Publish Event', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444' } },
  
  { id: 'e-4', source: 'tw-gateway', target: 'tw-read', animated: true, label: 'GET /timeline', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
  { id: 'e-5', source: 'tw-read', target: 'tw-cache', animated: true, label: 'Fetch Pre-computed Feed', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },
  
  // Background worker filling cache
  { id: 'e-6', source: 'tw-mq', target: 'tw-cache', animated: true, label: 'Workers push to followers', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6', strokeDasharray: '5,5' } },
];

export default function TwitterCaseStudy() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <div className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-bold tracking-wide mb-3">
          CASE STUDY
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Design a Twitter / News Feed</h1>
        <p className="text-lg text-slate-600">
          A system where users can post short messages and view a chronological feed of messages from people they follow. The ultimate test of fan-out architectures.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Timeline Architecture (Fan-out on Write)</h2>
        <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-sky-300 border-b border-white/20 pb-4">Concept Mapping: Why are we using these?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
              <span className="bg-emerald-400/20 px-2 py-0.5 rounded text-xs text-emerald-300 border border-emerald-400/30">Concept</span>
              Caching (Pre-computation)
            </h4>
            <p className="text-sm text-slate-300">
              Generating a timeline via SQL `JOIN`s on every request is too slow (Read-Heavy). Instead, we maintain a pre-computed "Timeline Cache" (List in Redis) for every active user. Reading a feed is just an O(1) fetch from Redis.
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-2">
              <span className="bg-rose-400/20 px-2 py-0.5 rounded text-xs text-rose-300 border border-rose-400/30">Concept</span>
              Message Queues
            </h4>
            <p className="text-sm text-slate-300">
              When a user tweets, it must be inserted into the timelines of all their followers. This background work (Fan-out) is decoupled using Message Queues (Kafka) so the tweeter gets an instant "Success" response.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
              <span className="bg-amber-400/20 px-2 py-0.5 rounded text-xs text-amber-300 border border-amber-400/30">Concept</span>
              CDN & Edge
            </h4>
            <p className="text-sm text-slate-300">
              Images and Videos attached to tweets consume massive bandwidth. By serving these static assets from a CDN (Edge locations near the user), we drastically reduce latency and save Origin server costs.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
              <span className="bg-blue-400/20 px-2 py-0.5 rounded text-xs text-blue-300 border border-blue-400/30">Concept</span>
              Scalability (Hybrid Approach)
            </h4>
            <p className="text-sm text-slate-300">
              The "Justin Bieber Problem": If someone with 100M followers tweets, a push-based Fan-out will crash the cache servers. We must use a <strong>Hybrid approach</strong> (Fan-out on Read) for celebrities, merging their tweets dynamically.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
        <h3 className="text-xl font-bold text-rose-900 mb-4">The Bottleneck: The Celebrity Problem</h3>
        <p className="text-rose-800 mb-4 text-sm">
          A standard user (200 followers) tweets -&gt; Workers push the tweet to 200 Redis lists. This takes milliseconds.
          <br/><br/>
          Ronaldo (100M followers) tweets -&gt; Workers try to update 100,000,000 Redis lists. This causes a massive queue backlog and delays timelines for everyone else.
        </p>
        <div className="bg-white p-4 rounded-lg border border-rose-200">
          <strong className="text-rose-900">The Solution: Pull Model for Celebrities</strong><br/>
          <ul className="list-disc list-inside text-rose-800 text-sm mt-2">
            <li>Don't push celebrity tweets to follower caches.</li>
            <li>When a user loads their timeline, fetch their pre-computed cache.</li>
            <li>Check if they follow any celebrities. If yes, fetch the celebrity's tweets directly from the DB/Cache.</li>
            <li>Merge and sort the two lists in memory before returning to the client.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
