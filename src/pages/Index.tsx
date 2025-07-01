
import React, { useState } from 'react';
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { TradingLevelSelector } from "@/components/TradingLevelSelector";
import { PropFirmShowcase } from "@/components/PropFirmShowcase";
import { Footer } from "@/components/Footer";
import { AdminPanel } from "@/components/AdminPanel";

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  React.useEffect(() => {
    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAdminMode(isAdmin);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <Hero />
      <TradingLevelSelector />
      <PropFirmShowcase />
      
      {isAdminMode && (
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Quick Admin Access</h2>
              <p className="text-white/70 mb-4">You're logged in as admin. Access the full dashboard for advanced management.</p>
              <a 
                href="/admin" 
                className="btn-premium inline-flex items-center"
              >
                Go to Admin Dashboard
              </a>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
