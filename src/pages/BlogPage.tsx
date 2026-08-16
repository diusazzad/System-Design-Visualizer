import { NavLink } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../utils/mockBlogData';
import NewsletterSignup from '../components/NewsletterSignup';
import { Helmet } from 'react-helmet-async';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Blog | System Design Visualizer</title>
        <meta name="description" content="Read articles on system design, scalable architectures, and engineering best practices." />
      </Helmet>

      <div className="bg-slate-900 text-white py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-rose-500/20 rounded-full inline-block">
              <BookOpen size={48} className="text-rose-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Engineering Blog</h1>
          <p className="text-xl text-slate-400 mb-8">
            Deep dives into scalable systems, interview strategies, and architectural patterns.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {blogPosts.map((post, idx) => (
            <NavLink 
              key={post.slug} 
              to={`/blog/${post.slug}`}
              className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group ${idx === 0 ? 'md:col-span-2 md:flex-row' : ''}`}
            >
              <div className={`bg-indigo-50 flex items-center justify-center text-indigo-200 ${idx === 0 ? 'md:w-2/5' : 'h-48'}`}>
                <BookOpen size={idx === 0 ? 64 : 40} className="opacity-50 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className={`p-8 flex flex-col justify-center flex-1`}>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                </div>
                
                <h2 className={`${idx === 0 ? 'text-3xl' : 'text-2xl'} font-extrabold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors`}>
                  {post.title}
                </h2>
                
                <p className="text-slate-600 mb-6 flex-1 text-lg leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                      {post.author[0]}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{post.author}</span>
                  </div>
                  <span className="text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        <NewsletterSignup />
      </div>
    </div>
  );
}
