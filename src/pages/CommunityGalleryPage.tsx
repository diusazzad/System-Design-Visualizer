import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, ExternalLink, Hash, Search } from 'lucide-react';
import { communityDesigns } from '../utils/mockCommunityData';
import { encodeStateToUrl } from '../utils/exportUtils';
import { Helmet } from 'react-helmet-async';

export default function CommunityGalleryPage() {
  const navigate = useNavigate();
  const [upvotes, setUpvotes] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');

  // Load upvotes from local storage
  useEffect(() => {
    const saved = localStorage.getItem('system_design_upvotes');
    if (saved) {
      try {
        setUpvotes(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleUpvote = (id: string) => {
    const newUpvotes = { ...upvotes, [id]: !upvotes[id] };
    setUpvotes(newUpvotes);
    localStorage.setItem('system_design_upvotes', JSON.stringify(newUpvotes));
  };

  const openInBuilder = (design: any) => {
    // Generate form state based on the community design
    const fakeForm = {
      systemName: design.title,
      dau: '10M+',
      workload: 'Balanced',
      realtime: false,
      consistency: 'Eventual',
      geoDistributed: true,
      budget: 'High ($$$)'
    };
    const state = {
      name: design.title,
      nodes: design.nodes,
      edges: design.edges,
      formState: fakeForm
    };
    const encoded = encodeStateToUrl(state);
    navigate(`/builder?state=${encoded}`);
  };

  const filteredDesigns = communityDesigns.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) || 
    d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Community Gallery | System Design Visualizer</title>
        <meta name="description" content="Explore system design architectures submitted by the community." />
      </Helmet>

      <div className="bg-slate-900 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-500/20 rounded-full inline-block">
              <Users size={48} className="text-indigo-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Community Gallery</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Explore, learn from, and upvote system architectures designed by the community. Open any design in the Scenario Builder to modify it!
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name (e.g., Netflix) or tag (e.g., CDN)..."
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigns.map(design => {
            const isUpvoted = upvotes[design.id];
            const displayVotes = design.upvotes + (isUpvoted ? 1 : 0);

            return (
              <div key={design.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-slate-800">{design.title}</h3>
                      <p className="text-sm text-slate-500">by @{design.author}</p>
                    </div>
                    <button 
                      onClick={() => handleUpvote(design.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${isUpvoted ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                      <Heart size={20} className={isUpvoted ? 'fill-rose-600' : ''} />
                      <span className="text-xs font-bold mt-1">{displayVotes}</span>
                    </button>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-6 flex-1">
                    {design.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {design.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md flex items-center gap-1">
                        <Hash size={12} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 p-4 bg-slate-50">
                  <button 
                    onClick={() => openInBuilder(design)}
                    className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={18} /> Open in Builder
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDesigns.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Search size={48} className="mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium">No architectures found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
