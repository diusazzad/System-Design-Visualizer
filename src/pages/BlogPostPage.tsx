import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { blogPosts } from '../utils/mockBlogData';
import NewsletterSignup from '../components/NewsletterSignup';
import NotFoundPage from './NotFoundPage';
import { Helmet } from 'react-helmet-async';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }

  // A very simple markdown-to-html renderer for our mock data
  const renderContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-4xl font-extrabold text-slate-900 mt-12 mb-6">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl font-bold text-slate-800 mt-10 mb-4">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
        // Very hacky bold parsing for MVP
        const parts = line.split('**');
        return (
          <div key={idx} className="flex gap-3 mb-4 text-slate-700 text-lg">
            <span className="font-bold text-indigo-600">{line.substring(0, 2)}</span>
            <p>
              {parts.length > 1 ? (
                <>
                  <span className="font-bold text-slate-900">{parts[1]}</span>
                  {parts[2]}
                </>
              ) : (
                line.substring(3)
              )}
            </p>
          </div>
        );
      }
      if (line.startsWith('**Use it when:**')) {
        return <p key={idx} className="mb-4 text-slate-700 text-lg"><strong className="text-slate-900">Use it when:</strong>{line.replace('**Use it when:**', '')}</p>;
      }
      if (line.trim() === '') return <br key={idx} />;
      
      return <p key={idx} className="mb-4 text-slate-700 text-lg leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{post.title} | System Design Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Header */}
      <div className="bg-slate-900 text-white pt-24 pb-32 px-8 text-center relative">
        <NavLink to="/blog" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Blog
        </NavLink>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 text-sm font-bold text-indigo-300 uppercase tracking-wider mb-6">
            <span>{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={16} /> {post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
              {post.author[0]}
            </div>
            <span className="text-lg font-medium text-slate-300">By {post.author}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 border border-slate-100 mb-16">
          {renderContent(post.content)}
        </div>

        <NewsletterSignup />
      </div>
    </div>
  );
}
