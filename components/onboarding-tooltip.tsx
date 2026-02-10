"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OnboardingTooltip() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Afficher seulement au premier install
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-2xl border-2 border-indigo-200 p-4 animate-in slide-in-from-bottom-4 z-50">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="pr-6">
        <h3 className="font-bold text-lg mb-2 text-neutral-900">👋 Welcome!</h3>
        <p className="text-sm text-neutral-600 mb-3">
          Click on any notebook to capture the current page. Right-click text to send it directly!
        </p>
        <Button 
          size="sm" 
          onClick={handleClose}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Got it!
        </Button>
      </div>
    </div>
  );
}
