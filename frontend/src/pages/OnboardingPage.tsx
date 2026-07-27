import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    preferredName: '',
    goals: '',
    context: '',
    communicationStyle: 'balanced'
  });

  const selectedPersona = localStorage.getItem('selectedPersona') || 'krishna';

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleComplete();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    // In the future this will trigger API to update user profile
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="flex-grow flex items-center justify-center p-6 min-h-screen relative z-10">
      <div className="glass-card w-full max-w-2xl p-8 md:p-12 relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary">Personalize Your Experience</h1>
            <span className="text-sm text-text-secondary font-medium">Step {step} of 4</span>
          </div>

          <div className="mb-10 min-h-[200px]">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-semibold mb-2">What should I call you?</h2>
                <p className="text-sm text-text-secondary mb-6">This helps me address you properly.</p>
                <input 
                  type="text" 
                  value={formData.preferredName}
                  onChange={(e) => setFormData({...formData, preferredName: e.target.value})}
                  placeholder="Your preferred name..." 
                  className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-primary transition-colors"
                />
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-semibold mb-2">What are your main goals?</h2>
                <p className="text-sm text-text-secondary mb-6">Select or describe what you want to achieve together.</p>
                <textarea 
                  value={formData.goals}
                  onChange={(e) => setFormData({...formData, goals: e.target.value})}
                  placeholder="E.g., Improve my focus, learn philosophical concepts, manage stress..." 
                  className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-primary transition-colors min-h-[120px] resize-none"
                />
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-semibold mb-2">Any personal context I should know?</h2>
                <p className="text-sm text-text-secondary mb-6">Share anything about your background, work, or current situation.</p>
                <textarea 
                  value={formData.context}
                  onChange={(e) => setFormData({...formData, context: e.target.value})}
                  placeholder="E.g., I'm a software engineer working long hours, I have two kids..." 
                  className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-primary transition-colors min-h-[120px] resize-none"
                />
              </div>
            )}

            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-semibold mb-2">Preferred Communication Style</h2>
                <p className="text-sm text-text-secondary mb-6">How would you like me to respond?</p>
                <div className="flex flex-col gap-3">
                  {['Direct & concise', 'Balanced & conversational', 'Detailed & philosophical'].map((style, i) => (
                    <label key={i} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.communicationStyle === style ? 'bg-primary/10 border-primary text-primary' : 'bg-surface hover:bg-surface-hover border-border text-text-primary'}`}>
                      <input 
                        type="radio" 
                        name="style" 
                        value={style}
                        checked={formData.communicationStyle === style}
                        onChange={(e) => setFormData({...formData, communicationStyle: e.target.value})}
                        className="hidden" 
                      />
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.communicationStyle === style ? 'border-primary' : 'border-text-secondary'}`}>
                        {formData.communicationStyle === style && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                      <span className="font-medium">{style}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-border">
            <button 
              onClick={step === 1 ? () => navigate('/companions') : handleBack}
              className="text-text-secondary hover:text-text-primary px-4 py-2 transition-colors"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleComplete}
                className="text-text-secondary hover:text-text-primary px-4 py-2 transition-colors text-sm"
              >
                Skip Setup
              </button>
              <button 
                onClick={handleNext}
                className="primary-button"
              >
                {step === 4 ? 'Complete Setup' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
