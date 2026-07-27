import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Settings, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const VoicePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(0);

  const personaId = localStorage.getItem('selectedPersona') || 'krishna';
  
  const getPersonaColors = () => {
    switch(personaId) {
      case 'krishna': return { core: 'from-blue-500 to-green-400', glow: 'bg-blue-500', name: 'Krishna' };
      case 'fyodor': return { core: 'from-red-900 to-black', glow: 'bg-red-800', name: 'Fyodor' };
      case 'rasputin': return { core: 'from-amber-600 to-stone-800', glow: 'bg-amber-600', name: 'Rasputin' };
      default: return { core: 'from-secondary to-primary', glow: 'bg-primary', name: 'Companion' };
    }
  };

  const colors = getPersonaColors();

  // Simulate audio volume changes for the visualizer
  useEffect(() => {
    if (!isRecording) {
      setVolume(1);
      return;
    }
    
    const interval = setInterval(() => {
      setVolume(Math.random() * 0.5 + 1); // Scale between 1 and 1.5
    }, 150);
    
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col h-full relative items-center justify-center">
      
      {/* Top Bar */}
      <div className="absolute top-0 w-full flex items-center justify-between pb-6 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-bold text-text-primary capitalize flex items-center gap-2">
            <Sparkles className={clsx("w-5 h-5", `text-${colors.glow.split('-')[1]}-500`)} />
            Voice Session
          </h1>
          <p className="text-sm text-text-secondary mt-1">Talking with {colors.name}</p>
        </div>
        <button className="p-2 rounded-full hover:bg-surface-hover text-text-secondary transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Main Interactive Visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mt-16">
        
        <div className="relative w-64 h-64 flex items-center justify-center mb-16">
          
          {/* Outer ripples when speaking/recording */}
          {isRecording && (
            <>
              <motion.div 
                className={`absolute w-full h-full rounded-full ${colors.glow}/20 blur-[20px]`}
                animate={{ scale: volume * 1.5, opacity: 0.5 - (volume - 1) }}
                transition={{ duration: 0.15 }}
              />
              <motion.div 
                className={`absolute w-full h-full rounded-full ${colors.glow}/10 blur-[40px]`}
                animate={{ scale: volume * 2, opacity: 0.3 - (volume - 1) / 2 }}
                transition={{ duration: 0.15 }}
              />
            </>
          )}

          {/* Idle pulse */}
          {!isRecording && (
            <motion.div 
              className={`absolute w-48 h-48 rounded-full ${colors.glow}/20 blur-[30px]`}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Core Orb */}
          <motion.div 
            className={`relative z-10 w-32 h-32 rounded-full bg-gradient-to-br ${colors.core} shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden`}
            animate={isRecording ? { scale: volume } : { scale: 1 }}
            transition={{ duration: 0.1 }}
          >
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply rounded-full border-[1px] border-white/20"></div>
          </motion.div>
        </div>

        {/* Status Text */}
        <div className="h-12 flex items-center justify-center mb-8">
          <p className="text-xl text-text-secondary tracking-wide font-medium">
            {isRecording ? "Listening..." : "Tap to speak"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleRecording}
            className={clsx(
              "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl",
              isRecording 
                ? "bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                : "bg-surface text-text-primary border border-border hover:bg-surface-hover hover:scale-105"
            )}
          >
            {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>
        </div>

      </div>

    </div>
  );
};

export default VoicePage;
