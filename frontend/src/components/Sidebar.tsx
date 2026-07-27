import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, Mic, BrainCircuit, Target, BookOpen, Settings, LogOut, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

const Sidebar = () => {
  const navItems = [
    { icon: MessageSquare, label: 'Chat', to: '/dashboard/chat' },
    { icon: Mic, label: 'Voice Chat', to: '/dashboard/voice' },
    { icon: BrainCircuit, label: 'Memories', to: '/dashboard/memories' },
    { icon: Target, label: 'Goals', to: '/dashboard/goals' },
    { icon: BookOpen, label: 'Reflection', to: '/dashboard/reflection' },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 flex flex-col glass-card border-l-0 border-t-0 border-b-0 rounded-none z-40 p-4">
      
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-2 mb-10 mt-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-primary p-[2px]">
          <div className="w-full h-full bg-background rounded-md flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-text-primary" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm leading-tight text-text-primary">AI Persona</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 px-2">Menu</span>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Area */}
      <div className="flex flex-col gap-2 mt-auto border-t border-border pt-4">
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) => clsx(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
            isActive 
              ? "bg-primary/10 text-primary font-medium" 
              : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </NavLink>
        
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 text-left">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
