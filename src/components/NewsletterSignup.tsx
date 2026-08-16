import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Mock API call
    console.log(`Subscribed: ${email}`);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 5000);
  };

  return (
    <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500 blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-700 blur-3xl opacity-50 pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h3 className="text-3xl font-extrabold mb-4">Level up your System Design</h3>
        <p className="text-indigo-100 mb-8 text-lg">
          Join 15,000+ engineers receiving weekly deep-dives into real-world architectures, interview tips, and scalability patterns.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center justify-center space-y-3 animate-fade-in bg-indigo-700/50 p-6 rounded-2xl border border-indigo-400/30">
            <CheckCircle2 size={48} className="text-emerald-400" />
            <div className="text-xl font-bold">You're in!</div>
            <p className="text-indigo-200 text-sm">Check your inbox for the welcome email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="engineer@company.com" 
              required
              className="flex-1 bg-indigo-700/50 border border-indigo-400/30 text-white placeholder-indigo-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/10"
            >
              Subscribe <Send size={16} />
            </button>
          </form>
        )}
        <p className="text-indigo-300 text-xs mt-4">No spam. Unsubscribe at any time.</p>
      </div>
    </div>
  );
}
