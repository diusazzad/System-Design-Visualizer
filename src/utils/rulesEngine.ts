import type { ScenarioFormState, ArchitectureResult, GeneratedComponent, GeneratedEdge, Justification } from './scenarioTypes';

export function generateArchitecture(form: ScenarioFormState): ArchitectureResult {
  const components: GeneratedComponent[] = [];
  const edges: GeneratedEdge[] = [];
  const justifications: Justification[] = [];

  const isHighTraffic = form.dau === '1M-10M' || form.dau === '10M+';
  const isMedTraffic = form.dau === '100K-1M' || isHighTraffic;

  // 1. Edge Layer
  components.push({ id: 'c-client', type: 'client', layer: 'edge', label: 'Clients / Users' });
  
  if (form.geoDistributed || form.workload === 'Read-Heavy' || isHighTraffic) {
    components.push({ id: 'c-cdn', type: 'cache', layer: 'edge', label: 'CDN / Edge Network', description: 'Serves static assets & caches reads' });
    edges.push({ id: 'e-cdn', source: 'c-client', target: 'c-cdn', animated: true });
    
    justifications.push({
      componentId: 'c-cdn',
      title: 'CDN (Content Delivery Network)',
      rationale: form.geoDistributed 
        ? 'Since you need Geo-distribution, a CDN is essential to serve users from edge nodes close to their location, reducing latency.'
        : 'For High Traffic / Read-Heavy workloads, a CDN offloads massive traffic from your origin servers.',
      type: 'success'
    });
  }

  // 2. Gateway Layer
  if (isMedTraffic) {
    components.push({ id: 'c-lb', type: 'loadBalancer', layer: 'gateway', label: 'Load Balancer / API Gateway', description: 'Routes & scales traffic' });
    edges.push({ id: 'e-lb-in', source: form.geoDistributed || form.workload === 'Read-Heavy' || isHighTraffic ? 'c-cdn' : 'c-client', target: 'c-lb', animated: true });
    
    justifications.push({
      componentId: 'c-lb',
      title: 'Load Balancer',
      rationale: `Handling ${form.dau} DAU requires multiple servers. The Load Balancer distributes traffic to prevent any single server from being overwhelmed.`,
      type: 'success'
    });
  }

  // 3. App Layer
  const appTarget = isMedTraffic ? 'c-lb' : (components.find(c => c.id === 'c-cdn') ? 'c-cdn' : 'c-client');
  
  if (isHighTraffic || form.budget === 'High ($$$)') {
    components.push({ id: 'c-app-micro', type: 'server', layer: 'app', label: 'Microservices', description: 'Auto-scaling stateless services' });
    edges.push({ id: 'e-app-in', source: appTarget, target: 'c-app-micro', animated: true });
  } else {
    components.push({ id: 'c-app-mono', type: 'server', layer: 'app', label: 'Monolithic App Server', description: 'Handles core logic' });
    edges.push({ id: 'e-app-in', source: appTarget, target: 'c-app-mono', animated: true });
  }

  const activeApp = isHighTraffic || form.budget === 'High ($$$)' ? 'c-app-micro' : 'c-app-mono';

  if (form.realtime) {
    components.push({ id: 'c-app-ws', type: 'server', layer: 'app', label: 'WebSocket Servers', description: 'Maintains persistent connections' });
    edges.push({ id: 'e-ws-in', source: appTarget, target: 'c-app-ws', animated: true });
    
    justifications.push({
      componentId: 'c-app-ws',
      title: 'Stateful WebSocket Servers',
      rationale: 'Real-time requirements necessitate persistent connections rather than HTTP polling.',
      tradeoff: 'WebSocket servers are stateful, making them harder to autoscale and load balance than stateless REST APIs.',
      type: 'info'
    });
  }

  // 4. Data Layer (Caching & Queues)
  if (form.workload === 'Read-Heavy' || isMedTraffic || form.realtime) {
    components.push({ id: 'c-cache', type: 'cache', layer: 'data', label: 'Redis Cache Cluster', description: 'In-memory fast reads/sessions' });
    edges.push({ id: 'e-cache-in', source: activeApp, target: 'c-cache', animated: true, label: 'Read/Write Cache' });
    if (form.realtime) edges.push({ id: 'e-ws-cache', source: 'c-app-ws', target: 'c-cache', animated: true });

    justifications.push({
      componentId: 'c-cache',
      title: 'In-Memory Cache',
      rationale: form.workload === 'Read-Heavy' 
        ? 'Read-heavy systems must protect the database. Redis serves frequent queries in sub-millisecond times.'
        : 'Required for session management and fast ephemeral data access across scaled application servers.',
      type: 'success'
    });
  }

  if (form.workload === 'Write-Heavy' || form.realtime || isHighTraffic) {
    components.push({ id: 'c-mq', type: 'database', layer: 'data', label: 'Message Queue (Kafka)', description: 'Asynchronous event streaming' });
    edges.push({ id: 'e-mq-in', source: activeApp, target: 'c-mq', animated: true, label: 'Publish Event' });
    if (form.realtime) edges.push({ id: 'e-ws-mq', source: 'c-app-ws', target: 'c-mq', animated: true });

    justifications.push({
      componentId: 'c-mq',
      title: 'Message Queues',
      rationale: form.workload === 'Write-Heavy'
        ? 'Write-heavy workloads will lock up databases if synchronous. Queues decouple writes and smooth out traffic spikes (Buffer).'
        : 'Essential for Pub/Sub messaging in real-time systems and inter-service communication.',
      type: 'success'
    });
  }

  // 5. Storage Layer (Databases)
  if (form.consistency === 'Strong') {
    components.push({ id: 'c-db-sql', type: 'database', layer: 'storage', label: 'Relational DB (SQL)', description: 'ACID Compliant' });
    edges.push({ id: 'e-db-in', source: activeApp, target: 'c-db-sql', animated: true });
    
    if (form.workload === 'Read-Heavy' && isMedTraffic) {
      components.push({ id: 'c-db-repl', type: 'database', layer: 'storage', label: 'Read Replicas', description: 'Offloads read queries' });
      edges.push({ id: 'e-repl-sync', source: 'c-db-sql', target: 'c-db-repl', animated: true, label: 'Async Sync' });
      edges.push({ id: 'e-repl-read', source: activeApp, target: 'c-db-repl', animated: true, label: 'Reads' });
    }

    justifications.push({
      componentId: 'c-db-sql',
      title: 'SQL Database (ACID)',
      rationale: 'Strong consistency requires ACID guarantees (Atomicity, Consistency, Isolation, Durability) provided by SQL engines like PostgreSQL.',
      tradeoff: form.geoDistributed ? 'Achieving Strong Consistency across Geo-distributed regions will cause high latency (CAP Theorem: Picking C+P over A).' : undefined,
      type: form.geoDistributed ? 'warning' : 'success'
    });
  } else {
    // Eventual Consistency
    components.push({ id: 'c-db-nosql', type: 'database', layer: 'storage', label: 'NoSQL Database', description: 'Highly Scalable, Eventual' });
    edges.push({ id: 'e-db-in', source: activeApp, target: 'c-db-nosql', animated: true });
    
    if (form.geoDistributed) {
      justifications.push({
        componentId: 'c-db-nosql',
        title: 'Distributed NoSQL',
        rationale: 'Eventual Consistency is perfect for Geo-distributed systems. It prioritizes Availability and Partition Tolerance (AP from CAP theorem).',
        type: 'success'
      });
    }
  }

  // Worker layer if MQ exists
  if (components.find(c => c.id === 'c-mq')) {
    components.push({ id: 'c-worker', type: 'server', layer: 'app', label: 'Worker Nodes', description: 'Consumes queue asynchronously' });
    edges.push({ id: 'e-worker-pull', source: 'c-mq', target: 'c-worker', animated: true, label: 'Consume' });
    edges.push({ id: 'e-worker-db', source: 'c-worker', target: form.consistency === 'Strong' ? 'c-db-sql' : 'c-db-nosql', animated: true, label: 'Write' });
  }

  return { components, edges, justifications };
}
