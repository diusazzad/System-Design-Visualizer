

export default function PhaseDetailsPanel() {
  // We can add selected node state to the store later.
  // For now, this is a placeholder.
  return (
    <div className="absolute right-0 top-0 h-full w-80 bg-white/90 backdrop-blur-md shadow-2xl border-l border-slate-200 transform transition-transform duration-300 translate-x-full">
      <div className="p-6 h-full overflow-y-auto">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Node Details</h3>
        <p className="text-slate-600">Select a component to view details.</p>
      </div>
    </div>
  );
}
