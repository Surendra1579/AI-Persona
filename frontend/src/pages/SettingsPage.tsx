import React from 'react';
import { Settings, User, Bell, Lock } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between pb-6 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            Settings
          </h1>
          <p className="text-sm text-text-secondary mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="flex-1 mt-8 max-w-3xl">
        <div className="glass-card divide-y divide-border/50">
          
          <div className="p-6 flex items-start gap-4">
            <div className="p-3 bg-surface rounded-xl text-primary">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-text-primary mb-1">Profile Information</h3>
              <p className="text-sm text-text-secondary mb-4">Update your preferred name and personal context.</p>
              <button className="outline-button px-4 py-1.5 text-sm">Edit Profile</button>
            </div>
          </div>

          <div className="p-6 flex items-start gap-4">
            <div className="p-3 bg-surface rounded-xl text-primary">
              <Bell className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-text-primary mb-1">Notifications</h3>
              <p className="text-sm text-text-secondary mb-4">Configure when and how your companion can reach out to you.</p>
              <button className="outline-button px-4 py-1.5 text-sm">Manage Notifications</button>
            </div>
          </div>

          <div className="p-6 flex items-start gap-4">
            <div className="p-3 bg-surface rounded-xl text-primary">
              <Lock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-text-primary mb-1">Privacy & Data</h3>
              <p className="text-sm text-text-secondary mb-4">Manage your data, export memories, or delete your account.</p>
              <button className="outline-button px-4 py-1.5 text-sm border-red-500/50 text-red-400 hover:border-red-400">Manage Data</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
