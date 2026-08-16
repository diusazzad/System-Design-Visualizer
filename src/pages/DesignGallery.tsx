import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Copy, Trash2, Clock, Play } from 'lucide-react';
import { useLocalStorageGallery } from '../utils/useLocalStorageGallery';

export default function DesignGallery() {
  const { designs, deleteDesign, duplicateDesign } = useLocalStorageGallery();

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
              <LayoutDashboard className="text-indigo-600" size={32} />
              Design Gallery
            </h1>
            <p className="text-slate-500 mt-2">View and manage your saved system architectures.</p>
          </div>
          <NavLink 
            to="/builder"
            className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            + Create New Design
          </NavLink>
        </header>

        {designs.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-16 text-center">
            <LayoutDashboard size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-xl font-bold text-slate-700 mb-2">No saved designs yet</h2>
            <p className="text-slate-500 mb-6">Head over to the Scenario Builder to create your first architecture!</p>
            <NavLink to="/builder" className="text-indigo-600 font-bold hover:underline">
              Go to Scenario Builder &rarr;
            </NavLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map(design => (
              <div key={design.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                {/* Thumbnail placeholder */}
                <div className="h-40 bg-slate-100 border-b border-slate-200 relative">
                  {design.thumbnailUrl ? (
                    <img src={design.thumbnailUrl} alt={design.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      No Thumbnail
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <NavLink to={`/builder?load=${design.id}`} className="bg-white text-slate-800 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-50">
                      <Play size={16} /> Open Design
                    </NavLink>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-800 mb-1 truncate">{design.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <Clock size={14} />
                    <span>Updated {formatDate(design.updatedAt)}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                      {design.nodes.length} Components
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => duplicateDesign(design.id)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title="Duplicate"
                      >
                        <Copy size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this design?')) {
                            deleteDesign(design.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
