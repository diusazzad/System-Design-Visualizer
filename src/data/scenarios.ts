import type { SystemScenario } from '../types/architecture';

export const scenarios: SystemScenario[] = [
  {
    id: 'url-shortener',
    name: 'URL Shortener (bit.ly)',
    description: 'A service that takes a long URL and generates a short and easy to share alias.',
    nodes: [
      {
        id: 'client',
        type: 'architectureNode',
        position: { x: 50, y: 250 },
        data: { id: 'client', label: 'User Client', type: 'client', description: 'Browser or mobile app.' }
      },
      {
        id: 'lb',
        type: 'architectureNode',
        position: { x: 250, y: 250 },
        data: { id: 'lb', label: 'Load Balancer', type: 'loadBalancer', description: 'Distributes traffic across servers.' }
      },
      {
        id: 'api1',
        type: 'architectureNode',
        position: { x: 450, y: 150 },
        data: { id: 'api1', label: 'API Server 1', type: 'server', description: 'Handles short URL generation.' }
      },
      {
        id: 'api2',
        type: 'architectureNode',
        position: { x: 450, y: 350 },
        data: { id: 'api2', label: 'API Server 2', type: 'server', description: 'Handles short URL generation.' }
      },
      {
        id: 'cache',
        type: 'architectureNode',
        position: { x: 650, y: 150 },
        data: { id: 'cache', label: 'Redis Cache', type: 'cache', description: 'Caches frequently accessed short URLs.' }
      },
      {
        id: 'db',
        type: 'architectureNode',
        position: { x: 650, y: 350 },
        data: { id: 'db', label: 'SQL Database', type: 'database', description: 'Stores short-to-long URL mappings.' }
      }
    ],
    edges: [
      { id: 'e1', source: 'client', target: 'lb', label: 'HTTP Request' },
      { id: 'e2', source: 'lb', target: 'api1' },
      { id: 'e3', source: 'lb', target: 'api2' },
      { id: 'e4', source: 'api1', target: 'cache', label: 'Check Cache' },
      { id: 'e5', source: 'api2', target: 'cache', label: 'Check Cache' },
      { id: 'e6', source: 'api1', target: 'db', label: 'DB Query' },
      { id: 'e7', source: 'api2', target: 'db', label: 'DB Query' }
    ]
  }
];
