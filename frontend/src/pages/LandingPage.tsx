import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="glass-card p-8 flex flex-col gap-4 group hover:bg-surface-hover transition-all duration-300 transform hover:-translate-y-1">
    <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6 text-secondary" />
    </div>
    <h3 className="text-xl font-semibold text-text-primary mt-2">{title}</h3>
    <p className="text-text-secondary leading-relaxed">{description}</p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6 min-h-screen">
      
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto relative z-10">
        
        {/* Abstract Glowing Orbs (Interactive Visuals) */}
        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
          <motion.div 
            className="absolute w-32 h-32 rounded-full bg-primary/40 blur-[40px] mix-blend-screen"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute w-40 h-40 rounded-full bg-secondary/30 blur-[50px] mix-blend-screen -ml-20 -mt-10"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div 
            className="absolute w-24 h-24 rounded-full bg-accent/40 blur-[30px] mix-blend-screen ml-24 mt-16"
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          
          {/* Core Orb */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-secondary via-primary to-accent shadow-[0_0_60px_rgba(96,165,250,0.6)] animate-pulse-glow z-10" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface text-sm font-medium text-text-secondary mb-8">
          <Sparkles className="w-4 h-4 text-accent" />
          Introducing Persona v1 — a new kind of intelligence
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Your AI Companion <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">for Life.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12">
          An AI that remembers, understands, and grows with you — across your goals, moods, and memories.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button 
            onClick={() => navigate('/dashboard')}
            className="primary-button flex items-center gap-2 text-lg px-8 py-3 w-full sm:w-auto justify-center"
          >
            Start Your Journey <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('/companions')}
            className="outline-button text-lg px-8 py-3 w-full sm:w-auto"
          >
            Explore Companions
          </button>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-32 w-full relative z-10">
        <FeatureCard 
          icon={Brain}
          title="Persistent Memory"
          description="Recalls what matters — your goals, moods, preferences, and meaningful moments across conversations."
        />
        <FeatureCard 
          icon={Sparkles}
          title="Grows With You"
          description="Adapts as you evolve and learns your preferred communication style, priorities, and ambitions."
        />
        <FeatureCard 
          icon={Lock}
          title="Private by Design"
          description="Your thoughts and personal information remain completely under your control and ownership."
        />
      </div>

    </div>
  );
};

export default LandingPage;
