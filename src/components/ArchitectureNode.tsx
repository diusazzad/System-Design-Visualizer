
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { Server, Database, Share2, Globe, Inbox, Cpu, Smartphone, Router } from 'lucide-react';
import type { ArchitectureNodeData } from '../types/architecture';

const iconMap = {
  server: <Server className="w-6 h-6 text-indigo-500" />,
  database: <Database className="w-6 h-6 text-orange-500" />,
  loadBalancer: <Share2 className="w-6 h-6 text-green-500" />,
  cdn: <Globe className="w-6 h-6 text-blue-500" />,
  queue: <Inbox className="w-6 h-6 text-purple-500" />,
  cache: <Cpu className="w-6 h-6 text-red-500" />,
  client: <Smartphone className="w-6 h-6 text-slate-500" />,
  gateway: <Router className="w-6 h-6 text-teal-500" />
};

export default function ArchitectureNode({ data }: { data: ArchitectureNodeData }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm min-w-[160px] flex flex-col items-center gap-2 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group"
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-slate-300 group-hover:bg-indigo-400" />
      
      <div className="p-3 bg-slate-50 rounded-full border border-slate-100">
        {iconMap[data.type] || <Server className="w-6 h-6 text-slate-500" />}
      </div>
      
      <div className="text-center">
        <h3 className="font-bold text-slate-800 text-sm">{data.label}</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-[120px] leading-tight">{data.description}</p>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-slate-300 group-hover:bg-indigo-400" />
    </motion.div>
  );
}
