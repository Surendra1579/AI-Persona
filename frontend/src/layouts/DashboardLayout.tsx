import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatPage from '../pages/ChatPage';
import VoicePage from '../pages/VoicePage';
import MemoriesPage from '../pages/MemoriesPage';
import GoalsPage from '../pages/GoalsPage';
import ReflectionPage from '../pages/ReflectionPage';
import SettingsPage from '../pages/SettingsPage';

const DashboardLayout = () => {
  return (
    <div className="flex bg-background min-h-screen relative overflow-hidden">
      
      {/* Background Orbs specific to dashboard */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <Sidebar />

      <div className="flex-1 ml-64 p-6 md:p-8 relative z-10 flex flex-col h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/chat" replace />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/voice" element={<VoicePage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/reflection" element={<ReflectionPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Fallback */}
          <Route path="*" element={<div className="flex items-center justify-center h-full"><span className="text-text-secondary">Coming Soon</span></div>} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
