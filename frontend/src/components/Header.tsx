import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

const Header = () => {
  return (
    <header className="w-full fixed top-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none">
      <div className="glass-card flex items-center justify-between px-6 py-3 w-full max-w-5xl pointer-events-auto">
        
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary p-[2px]">
            <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center group-hover:bg-opacity-0 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-text-primary group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg leading-tight tracking-wide text-text-primary">AI Persona</span>
            <span className="text-[10px] font-medium tracking-widest text-text-secondary">BY ORIGEN</span>
          </div>
        </NavLink>

        {/* Navigation Section */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink 
            to="/" 
            className={({ isActive }) => clsx("nav-link", isActive && "active")}
          >
            Home
          </NavLink>
          <NavLink 
            to="/companions" 
            className={({ isActive }) => clsx("nav-link", isActive && "active")}
          >
            Companions
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => clsx("nav-link", isActive && "active")}
          >
            Dashboard
          </NavLink>
        </nav>
        
      </div>
    </header>
  );
};

export default Header;
