import { useState } from 'react';
import { ShieldCheck, Activity, SplitSquareVertical } from 'lucide-react';

type CAPNode = 'C' | 'A' | 'P';

export default function CAPTheoremConcept() {
  const [selectedNodes, setSelectedNodes] = useState<CAPNode[]>(['C', 'P']);

  const toggleNode = (node: CAPNode) => {
    if (selectedNodes.includes(node)) {
      // Don't allow unselecting if it leaves less than 2, actually let them unselect to play around
      setSelectedNodes(selectedNodes.filter(n => n !== node));
    } else {
      // If they try to select a 3rd node, we must deselect the oldest one (FIFO) to enforce the "Pick 2" rule
      if (selectedNodes.length >= 2) {
        setSelectedNodes([selectedNodes[1], node]);
      } else {
        setSelectedNodes([...selectedNodes, node]);
      }
    }
  };

  const isSelected = (node: CAPNode) => selectedNodes.includes(node);
  const getSystemType = () => {
    if (selectedNodes.includes('C') && selectedNodes.includes('A')) return 'CA';
    if (selectedNodes.includes('C') && selectedNodes.includes('P')) return 'CP';
    if (selectedNodes.includes('A') && selectedNodes.includes('P')) return 'AP';
    return 'INCOMPLETE';
  };

  const systemType = getSystemType();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-4">CAP Theorem</h1>
        <p className="text-lg text-slate-600">
          In a distributed data store, it is impossible to simultaneously guarantee more than two out of the three properties: Consistency, Availability, and Partition Tolerance.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Interactive Triangle (Pick any 2)</h2>
        
        <div className="flex flex-col items-center justify-center py-8">
          {/* Top Node (Consistency) */}
          <button
            onClick={() => toggleNode('C')}
            className={`flex flex-col items-center justify-center p-6 rounded-full w-32 h-32 transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isSelected('C') ? 'bg-indigo-600 text-white ring-4 ring-indigo-200' : 'bg-slate-100 text-slate-500 opacity-50 grayscale'
            }`}
          >
            <ShieldCheck size={32} className="mb-2" />
            <span className="font-bold">Consistency</span>
          </button>

          {/* Bottom Nodes */}
          <div className="flex gap-32 mt-12">
            <button
              onClick={() => toggleNode('A')}
              className={`flex flex-col items-center justify-center p-6 rounded-full w-32 h-32 transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isSelected('A') ? 'bg-emerald-600 text-white ring-4 ring-emerald-200' : 'bg-slate-100 text-slate-500 opacity-50 grayscale'
              }`}
            >
              <Activity size={32} className="mb-2" />
              <span className="font-bold">Availability</span>
            </button>

            <button
              onClick={() => toggleNode('P')}
              className={`flex flex-col items-center justify-center p-6 rounded-full w-32 h-32 transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isSelected('P') ? 'bg-rose-600 text-white ring-4 ring-rose-200' : 'bg-slate-100 text-slate-500 opacity-50 grayscale'
              }`}
            >
              <SplitSquareVertical size={32} className="mb-2" />
              <span className="font-bold">Partition Tolerance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Content based on selection */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl min-h-[300px] transition-all">
        {systemType === 'INCOMPLETE' ? (
          <div className="flex items-center justify-center h-full text-slate-400 italic">
            Select exactly two properties from the triangle above to see the system type.
          </div>
        ) : (
          <div>
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold tracking-wide mb-4">
              {systemType} SYSTEM
            </div>
            
            {systemType === 'CP' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold mb-4 text-indigo-300">Consistency + Partition Tolerance</h3>
                <p className="text-slate-300 mb-6 text-lg">
                  When a network partition occurs (nodes cannot talk to each other), the system prioritizes keeping data consistent. To do this, it will <strong>reject write requests</strong> (sacrificing Availability) until the network is healed.
                </p>
                <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Examples of CP Databases:</h4>
                  <ul className="list-disc list-inside text-slate-300">
                    <li>MongoDB (Single primary node)</li>
                    <li>HBase</li>
                    <li>Redis (in some cluster modes)</li>
                    <li>Etcd / ZooKeeper</li>
                  </ul>
                </div>
              </div>
            )}

            {systemType === 'AP' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold mb-4 text-emerald-300">Availability + Partition Tolerance</h3>
                <p className="text-slate-300 mb-6 text-lg">
                  When a network partition occurs, the system prioritizes remaining online. It will accept reads and writes on all nodes, even if they can't sync. This means users might see <strong>stale or conflicting data</strong> (sacrificing Consistency) until the network heals (Eventual Consistency).
                </p>
                <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Examples of AP Databases:</h4>
                  <ul className="list-disc list-inside text-slate-300">
                    <li>Cassandra</li>
                    <li>DynamoDB (Default mode)</li>
                    <li>CouchDB</li>
                    <li>Riak</li>
                  </ul>
                </div>
              </div>
            )}

            {systemType === 'CA' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold mb-4 text-rose-300">Consistency + Availability</h3>
                <p className="text-slate-300 mb-6 text-lg">
                  The system guarantees that all data is consistent and the system is always available. <strong>HOWEVER</strong>, in a distributed system, network partitions (P) are inevitable (cables get cut, switches fail). Therefore, <strong>true CA systems cannot exist in a distributed network.</strong>
                </p>
                <p className="text-slate-300 mb-6">
                  CA systems only exist in single-node databases (where network partitions are impossible).
                </p>
                <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Examples of CA Databases:</h4>
                  <ul className="list-disc list-inside text-slate-300">
                    <li>Single-node PostgreSQL</li>
                    <li>Single-node MySQL</li>
                    <li>SQLite</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mt-8">
        <h3 className="text-xl font-bold text-amber-900 mb-2">The Modern Reality: PACELC Theorem</h3>
        <p className="text-amber-800">
          CAP theorem is too binary. In reality, networks are not always partitioned. The <strong>PACELC theorem</strong> extends CAP:
          <br /><br />
          If there is a <strong>P</strong>artition, how does the system trade off <strong>A</strong>vailability and <strong>C</strong>onsistency (PAC)?<br />
          <strong>E</strong>lse (when the network is running normally), how does the system trade off <strong>L</strong>atency and <strong>C</strong>onsistency (ELC)?
        </p>
      </div>
    </div>
  );
}
