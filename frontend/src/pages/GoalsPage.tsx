import React from 'react';
import { Target, Plus } from 'lucide-react';

const GoalsPage = () => {
  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between pb-6 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Goals & Milestones
          </h1>
          <p className="text-sm text-text-secondary mt-1">Track your progress and aspirations</p>
        </div>
        <button className="primary-button flex items-center gap-2 px-4 py-2 rounded-xl text-sm">
          <Plus className="w-4 h-4" /> New Goal
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-text-secondary mt-10">
        <Target className="w-16 h-16 mb-4 opacity-20" />
        <h2 className="text-xl font-semibold text-text-primary mb-2">No active goals yet</h2>
        <p className="max-w-md text-center">Set your first goal to start tracking progress. Your AI companion will help you stay on track and break it down into manageable steps.</p>
      </div>
    </div>
  );
};

export default GoalsPage;
