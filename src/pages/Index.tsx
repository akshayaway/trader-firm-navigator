
import React, { useState, useEffect } from 'react';
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";
import { TopFirmsShowcase } from "@/components/TopFirmsShowcase";
import { Footer } from "@/components/Footer";
import { AdminPanel } from "@/components/AdminPanel";

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAdminMode(isAdmin);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <Hero />
      
      {isAdminMode && (
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <AdminPanel />
          </div>
        </div>
      )}
      
      <StatsSection />
      <TopFirmsShowcase />
      <Footer />
    </div>
  );
};

export default Index;
