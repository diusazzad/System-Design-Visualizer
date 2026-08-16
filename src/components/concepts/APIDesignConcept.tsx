import { ArrowRightLeft, FileJson, Zap, Link } from 'lucide-react';

export default function APIDesignConcept() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">API Design (REST vs gRPC vs GraphQL)</h1>
        <p className="text-lg text-slate-600">
          How clients and servers talk to each other. Choosing the right API paradigm drastically affects your system's performance, flexibility, and developer experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* REST */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Link className="text-indigo-600" size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">REST</h2>
          <p className="text-sm text-slate-500 mb-4 font-mono">GET /users/123/posts</p>
          <p className="text-slate-600 mb-4 text-sm">
            Representational State Transfer. Uses standard HTTP methods (GET, POST, PUT, DELETE) to interact with resources (URLs).
          </p>
          <ul className="text-sm text-slate-700 space-y-2 mb-4">
            <li className="flex items-center gap-2">✅ Highly cacheable</li>
            <li className="flex items-center gap-2">✅ Universally understood</li>
            <li className="flex items-center gap-2">❌ Over-fetching / Under-fetching</li>
          </ul>
          <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-600">
            {'{ "id": 123, "name": "John" }'}
          </div>
        </div>

        {/* GraphQL */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <FileJson className="text-pink-600" size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">GraphQL</h2>
          <p className="text-sm text-slate-500 mb-4 font-mono">POST /graphql</p>
          <p className="text-slate-600 mb-4 text-sm">
            A query language for your API. The client specifies exactly what data it wants, and the server responds with exactly that data.
          </p>
          <ul className="text-sm text-slate-700 space-y-2 mb-4">
            <li className="flex items-center gap-2">✅ No over-fetching</li>
            <li className="flex items-center gap-2">✅ Single endpoint</li>
            <li className="flex items-center gap-2">❌ Hard to cache at network level</li>
          </ul>
          <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-600">
            query {'{ user(id: 123) { name } }'}
          </div>
        </div>

        {/* gRPC */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="bg-cyan-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Zap className="text-cyan-600" size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">gRPC</h2>
          <p className="text-sm text-slate-500 mb-4 font-mono">HTTP/2 Binary Stream</p>
          <p className="text-slate-600 mb-4 text-sm">
            Remote Procedure Call framework by Google. Uses Protocol Buffers (Protobuf) to serialize structured data into binary format.
          </p>
          <ul className="text-sm text-slate-700 space-y-2 mb-4">
            <li className="flex items-center gap-2">✅ Extremely fast & compact</li>
            <li className="flex items-center gap-2">✅ Strict typing (Contracts)</li>
            <li className="flex items-center gap-2">❌ Not natively readable in browser</li>
          </ul>
          <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-600">
            0A 0B 4A 6F 68 6E 20 44 6F 65 (Binary)
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl mt-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ArrowRightLeft className="text-amber-400" />
          When to use what?
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-3 px-4 text-slate-300">Scenario</th>
                <th className="py-3 px-4 text-slate-300">Recommended</th>
                <th className="py-3 px-4 text-slate-300">Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Public API for 3rd Party Developers</td>
                <td className="py-4 px-4 text-indigo-400 font-bold">REST</td>
                <td className="py-4 px-4 text-slate-400 text-sm">Universal standard, easy to understand without specific tooling.</td>
              </tr>
              <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Mobile App / Complex Web Dashboard</td>
                <td className="py-4 px-4 text-pink-400 font-bold">GraphQL</td>
                <td className="py-4 px-4 text-slate-400 text-sm">Reduces network roundtrips. UI can request exactly what it needs for the current view.</td>
              </tr>
              <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Microservice to Microservice (Internal)</td>
                <td className="py-4 px-4 text-cyan-400 font-bold">gRPC</td>
                <td className="py-4 px-4 text-slate-400 text-sm">Low latency, low CPU usage, strict contracts prevent breaking changes across teams.</td>
              </tr>
              <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">Real-time Chat Application</td>
                <td className="py-4 px-4 text-emerald-400 font-bold">WebSockets / gRPC Streams</td>
                <td className="py-4 px-4 text-slate-400 text-sm">Persistent bi-directional connection. No need to constantly poll the server.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
