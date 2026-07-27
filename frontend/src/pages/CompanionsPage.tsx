import React from 'react';
import { useNavigate } from 'react-router-dom';

const companions = [
  {
    id: 'krishna',
    name: 'Krishna',
    subtitle: 'THE WISE GUIDE',
    description: "Philosophy, emotional balance, and personal growth — a calm voice through life's noise.",
    traits: ['Wise', 'Compassionate', 'Playful', 'Serene'],
    quote: '"You are not your thoughts, dear one. You are the awareness behind them."',
    avatarGradient: 'from-blue-400 to-green-300',
    emoji: '🦚',
  },
  {
    id: 'fyodor',
    name: 'Fyodor',
    subtitle: 'THE DEEP THINKER',
    description: 'Psychology, strategy, and critical thinking — descend into the depths of your own mind.',
    traits: ['Introspective', 'Sharp', 'Honest', 'Intense'],
    quote: '"To live is to suffer, to survive is to find some meaning in the suffering."',
    avatarGradient: 'from-red-900 to-black',
    emoji: '🖤',
  },
  {
    id: 'rasputin',
    name: 'Rasputin',
    subtitle: 'THE MASTER STRATEGIST',
    description: 'Leadership, ambition, and resilience — sharpen your will and command your path.',
    traits: ['Cunning', 'Fearless', 'Magnetic', 'Unyielding'],
    quote: '"Power is not given. It is taken by those unafraid to reach for it."',
    avatarGradient: 'from-amber-600 to-stone-800',
    emoji: '👑',
  }
];

const CompanionsPage = () => {
  const navigate = useNavigate();

  const handleChoose = (id: string) => {
    // Save to local storage for now, will connect to auth/onboarding later
    localStorage.setItem('selectedPersona', id);
    navigate('/onboarding');
  };

  return (
    <div className="flex-grow flex flex-col items-center pt-32 pb-20 px-6 min-h-screen relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-text-primary text-center">
        Choose Your Companion
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
        {companions.map((c) => (
          <div key={c.id} className="glass-card p-8 flex flex-col gap-6 relative group overflow-hidden">
            {/* Subtle background glow effect based on persona */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.avatarGradient} opacity-10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:opacity-20 transition-opacity duration-500`} />
            
            {/* Avatar */}
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${c.avatarGradient} p-[2px] flex-shrink-0`}>
              <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center text-4xl">
                {c.emoji}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-text-primary">{c.name}</h2>
              <span className="text-[10px] tracking-widest text-text-secondary uppercase font-semibold mt-1 mb-4">{c.subtitle}</span>
              <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">{c.description}</p>
              
              {/* Traits */}
              <div className="flex flex-wrap gap-2 mb-6">
                {c.traits.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full border border-border bg-surface text-xs text-text-secondary">
                    {t}
                  </span>
                ))}
              </div>

              {/* Quote */}
              <div className="border-l-2 border-primary/50 pl-4 py-1 mb-8">
                <p className="text-sm font-medium italic text-text-primary/90">{c.quote}</p>
              </div>

              <button 
                onClick={() => handleChoose(c.id)}
                className="w-full primary-button"
              >
                Choose {c.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanionsPage;
