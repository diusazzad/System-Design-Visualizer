import { MarkerType, type Edge, type Node } from 'reactflow';

export interface CommunityDesign {
  id: string;
  title: string;
  author: string;
  description: string;
  upvotes: number;
  tags: string[];
  nodes: Node[];
  edges: Edge[];
}

export const communityDesigns: CommunityDesign[] = [
  {
    id: 'netflix',
    title: 'Netflix Video Streaming',
    author: 'sys-design-guru',
    description: 'Global video streaming architecture using Open Connect CDN, microservices for user management, and Cassandra for viewing history.',
    upvotes: 342,
    tags: ['CDN', 'Microservices', 'Streaming'],
    nodes: [
      { id: 'c', type: 'architectureNode', position: { x: 400, y: 50 }, data: { label: 'Clients (TV, Mobile)', type: 'client', description: 'Millions of concurrent viewers' } },
      { id: 'cdn', type: 'architectureNode', position: { x: 200, y: 200 }, data: { label: 'Open Connect CDN', type: 'cdn', description: 'Edge video caching' } },
      { id: 'zuul', type: 'architectureNode', position: { x: 600, y: 200 }, data: { label: 'Zuul API Gateway', type: 'loadBalancer', description: 'Dynamic routing' } },
      { id: 'auth', type: 'architectureNode', position: { x: 500, y: 350 }, data: { label: 'Auth Service', type: 'server', description: 'Handles login' } },
      { id: 'hist', type: 'architectureNode', position: { x: 700, y: 350 }, data: { label: 'History Service', type: 'server', description: 'Tracks watch time' } },
      { id: 'cass', type: 'architectureNode', position: { x: 700, y: 500 }, data: { label: 'Cassandra DB', type: 'database', description: 'Viewing history data' } },
    ],
    edges: [
      { id: 'e1', source: 'c', target: 'cdn', label: 'Stream Video', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e2', source: 'c', target: 'zuul', label: 'API Requests', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e3', source: 'zuul', target: 'auth', markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e4', source: 'zuul', target: 'hist', markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e5', source: 'hist', target: 'cass', markerEnd: { type: MarkerType.ArrowClosed } },
    ]
  },
  {
    id: 'spotify',
    title: 'Spotify Audio Streaming',
    author: 'audio_architect',
    description: 'Music streaming with Google Cloud Storage for audio files, Postgres for metadata, and Kafka for analytics.',
    upvotes: 289,
    tags: ['Audio', 'GCP', 'Kafka'],
    nodes: [
      { id: 'c', type: 'architectureNode', position: { x: 400, y: 50 }, data: { label: 'Desktop/Mobile Apps', type: 'client', description: 'Listeners' } },
      { id: 'lb', type: 'architectureNode', position: { x: 400, y: 200 }, data: { label: 'Global Load Balancer', type: 'loadBalancer', description: 'Traffic distribution' } },
      { id: 'cdn', type: 'architectureNode', position: { x: 200, y: 350 }, data: { label: 'CDN', type: 'cdn', description: 'Cached popular songs' } },
      { id: 'meta', type: 'architectureNode', position: { x: 600, y: 350 }, data: { label: 'Metadata Service', type: 'server', description: 'Song data & playlists' } },
      { id: 'pg', type: 'architectureNode', position: { x: 600, y: 500 }, data: { label: 'PostgreSQL', type: 'database', description: 'User & playlist data' } },
      { id: 'kafka', type: 'architectureNode', position: { x: 800, y: 350 }, data: { label: 'Kafka', type: 'queue', description: 'Listening history events' } },
    ],
    edges: [
      { id: 'e1', source: 'c', target: 'lb', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e2', source: 'lb', target: 'cdn', label: 'Fetch Audio', animated: true },
      { id: 'e3', source: 'lb', target: 'meta', label: 'Fetch Playlists' },
      { id: 'e4', source: 'meta', target: 'pg' },
      { id: 'e5', source: 'lb', target: 'kafka', label: 'Play events', animated: true },
    ]
  },
  {
    id: 'dropbox',
    title: 'Dropbox File Sync',
    author: 'sync_master',
    description: 'Block-level file syncing architecture using Meta Servers, Block Servers, and S3 for object storage.',
    upvotes: 415,
    tags: ['Storage', 'Sync', 'S3'],
    nodes: [
      { id: 'c', type: 'architectureNode', position: { x: 400, y: 50 }, data: { label: 'Desktop Client', type: 'client', description: 'Local file watcher' } },
      { id: 'meta', type: 'architectureNode', position: { x: 300, y: 200 }, data: { label: 'Meta Server', type: 'server', description: 'Handles file metadata' } },
      { id: 'block', type: 'architectureNode', position: { x: 500, y: 200 }, data: { label: 'Block Server', type: 'server', description: 'Chunks files to 4MB blocks' } },
      { id: 'db', type: 'architectureNode', position: { x: 300, y: 350 }, data: { label: 'Metadata DB', type: 'database', description: 'File tree structure' } },
      { id: 's3', type: 'architectureNode', position: { x: 500, y: 350 }, data: { label: 'Amazon S3', type: 'database', description: 'Block storage' } },
      { id: 'noti', type: 'architectureNode', position: { x: 100, y: 200 }, data: { label: 'Notification Service', type: 'queue', description: 'Long polling / WebSockets' } },
    ],
    edges: [
      { id: 'e1', source: 'c', target: 'meta', label: 'Meta updates' },
      { id: 'e2', source: 'c', target: 'block', label: 'Upload blocks' },
      { id: 'e3', source: 'meta', target: 'db' },
      { id: 'e4', source: 'block', target: 's3' },
      { id: 'e5', source: 'meta', target: 'noti', label: 'Trigger sync' },
      { id: 'e6', source: 'noti', target: 'c', animated: true },
    ]
  }
];
