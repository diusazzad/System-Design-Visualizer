import ReactFlow, { Background, MarkerType } from 'reactflow';
import ArchitectureNode from '../ArchitectureNode';
import 'reactflow/dist/style.css';

const nodeTypes = { architectureNode: ArchitectureNode };

const initialNodes = [
  // Upload Flow
  { id: 'yt-creator', type: 'architectureNode', position: { x: 50, y: 50 }, data: { type: 'client', label: 'Creator (Upload)' } },
  { id: 'yt-s3-raw', type: 'architectureNode', position: { x: 300, y: 50 }, data: { type: 'database', label: 'Raw Storage (S3)' } },
  { id: 'yt-queue', type: 'architectureNode', position: { x: 550, y: 50 }, data: { type: 'database', label: 'Processing Queue', description: 'Video tasks' } },
  { id: 'yt-workers', type: 'architectureNode', position: { x: 800, y: 50 }, data: { type: 'server', label: 'Transcoding Workers', description: '1080p, 720p, 480p' } },

  // Storage & CDN
  { id: 'yt-s3-proc', type: 'architectureNode', position: { x: 800, y: 200 }, data: { type: 'database', label: 'Processed Storage' } },
  { id: 'yt-cdn', type: 'architectureNode', position: { x: 550, y: 250 }, data: { type: 'cache', label: 'CDN (Edge Nodes)' } },
  
  // Viewing Flow
  { id: 'yt-viewer', type: 'architectureNode', position: { x: 50, y: 250 }, data: { type: 'client', label: 'Viewer (Watch)' } },
  { id: 'yt-api', type: 'architectureNode', position: { x: 300, y: 250 }, data: { type: 'server', label: 'API Server', description: 'Returns CDN URLs' } },
];

const initialEdges = [
  // Upload
  { id: 'e-1', source: 'yt-creator', target: 'yt-s3-raw', animated: true, label: 'Upload Chunked Video', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-2', source: 'yt-s3-raw', target: 'yt-queue', animated: true, label: 'Trigger Event', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#8b5cf6' } },
  { id: 'e-3', source: 'yt-queue', target: 'yt-workers', animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#ef4444' } },
  { id: 'e-4', source: 'yt-workers', target: 'yt-s3-proc', animated: true, label: 'Save formats', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981' } },

  // Propagation
  { id: 'e-5', source: 'yt-s3-proc', target: 'yt-cdn', animated: true, label: 'Push/Pull to Edge', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#f59e0b', strokeDasharray: '5,5' } },

  // Viewing
  { id: 'e-6', source: 'yt-viewer', target: 'yt-api', animated: true, label: 'Get Video Metadata', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-7', source: 'yt-api', target: 'yt-cdn', animated: true, label: 'Resolve closest edge', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#3b82f6', strokeDasharray: '5,5' } },
  { id: 'e-8', source: 'yt-cdn', target: 'yt-viewer', animated: true, label: 'Stream DASH/HLS', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#10b981', strokeWidth: 2 } },
];

export default function YouTubeCaseStudy() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <div className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold tracking-wide mb-3">
          CASE STUDY
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Design YouTube (Video Streaming)</h1>
        <p className="text-lg text-slate-600">
          A platform for uploading, processing, and streaming large video files to millions of concurrent users globally. Focuses heavily on storage and bandwidth optimization.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Upload & Streaming Pipeline</h2>
        <div className="h-[400px] border rounded-xl overflow-hidden relative bg-slate-50">
          <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView>
            <Background color="#cbd5e1" gap={16} />
          </ReactFlow>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-red-300 border-b border-white/20 pb-4">Concept Mapping: Why are we using these?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
              <span className="bg-amber-400/20 px-2 py-0.5 rounded text-xs text-amber-300 border border-amber-400/30">Concept</span>
              CDN & Edge
            </h4>
            <p className="text-sm text-slate-300">
              Serving gigabytes of video directly from a central Origin Server (e.g., in US-East) to users in India is slow and incredibly expensive. Videos are aggressively cached in CDNs worldwide. Users stream from the node closest to their ISP.
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-2">
              <span className="bg-rose-400/20 px-2 py-0.5 rounded text-xs text-rose-300 border border-rose-400/30">Concept</span>
              Message Queues
            </h4>
            <p className="text-sm text-slate-300">
              Video processing (transcoding to 1080p, extracting thumbnails, checking copyright) takes a long time. These tasks are pushed to a Message Queue (e.g., RabbitMQ). Worker nodes pull tasks asynchronously so the user's upload request doesn't hang.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
              <span className="bg-blue-400/20 px-2 py-0.5 rounded text-xs text-blue-300 border border-blue-400/30">Concept</span>
              Microservices
            </h4>
            <p className="text-sm text-slate-300">
              YouTube separates concerns strictly: Upload Service, Transcoding Service, Recommendation Service, and Streaming Service. Each scales independently. If Transcoding crashes, users can still watch old videos.
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
              <span className="bg-emerald-400/20 px-2 py-0.5 rounded text-xs text-emerald-300 border border-emerald-400/30">Concept</span>
              Scalability (Chunking)
            </h4>
            <p className="text-sm text-slate-300">
              A 10GB video upload will fail if network drops. Large files are split into small chunks (Chunked Resumable Upload). Similarly, streaming uses Adaptive Bitrate Streaming (HLS/DASH) to fetch small chunks based on internet speed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
