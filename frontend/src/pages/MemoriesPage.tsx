import React, { useState } from 'react';
import { BrainCircuit, Search, Calendar, Tag, Trash2, Edit2, Shield } from 'lucide-react';
import { clsx } from 'clsx';

interface Memory {
  id: string;
  category: 'preference' | 'fact' | 'goal' | 'event';
  content: string;
  date: string;
  importance: 'high' | 'medium' | 'low';
}

const mockMemories: Memory[] = [
  { id: '1', category: 'preference', content: 'Prefers direct and philosophical communication', date: '2026-07-21', importance: 'high' },
  { id: '2', category: 'fact', content: 'Works as a software engineer, often feels burnt out by 6PM', date: '2026-07-21', importance: 'medium' },
  { id: '3', category: 'goal', content: 'Wants to improve focus and reduce anxiety', date: '2026-07-21', importance: 'high' },
  { id: '4', category: 'event', content: 'Mentioned an important meeting coming up next Tuesday', date: '2026-07-20', importance: 'low' },
];

const MemoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'preference': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'fact': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'goal': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'event': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-surface text-text-secondary';
    }
  };

  const filteredMemories = mockMemories.filter(m => 
    (filter === 'all' || m.category === filter) &&
    m.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-border/50 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-primary" />
            Memory Timeline
          </h1>
          <p className="text-sm text-text-secondary mt-1">What your companion remembers about you</p>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-surface border border-border text-text-secondary self-start md:self-auto">
          <Shield className="w-3.5 h-3.5 text-accent" />
          End-to-End Encrypted
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input 
            type="text"
            placeholder="Search memories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-hover border border-border rounded-xl pl-10 pr-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:border-primary transition-colors text-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          {['all', 'preference', 'fact', 'goal', 'event'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors capitalize",
                filter === f 
                  ? "bg-primary text-white" 
                  : "bg-surface border border-border text-text-secondary hover:bg-surface-hover"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Memory Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMemories.map(memory => (
            <div key={memory.id} className="glass-card p-5 group flex flex-col relative overflow-hidden">
              
              <div className="flex justify-between items-start mb-4">
                <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-md border", getCategoryColor(memory.category))}>
                  {memory.category.toUpperCase()}
                </span>
                
                {/* Actions (appear on hover) */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg hover:bg-surface-hover text-text-secondary hover:text-primary transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-secondary hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-text-primary text-[15px] leading-relaxed flex-grow">
                "{memory.content}"
              </p>

              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border/50 text-xs text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {memory.date}
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                  <Tag className="w-3.5 h-3.5" />
                  {memory.importance} impact
                </div>
              </div>

            </div>
          ))}
          
          {filteredMemories.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-text-secondary">
              <BrainCircuit className="w-12 h-12 mb-4 opacity-20" />
              <p>No memories found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default MemoriesPage;
