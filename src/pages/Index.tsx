
import React, { useState, useEffect } from 'react';
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";
import { TopFirmsShowcase } from "@/components/TopFirmsShowcase";
import { Footer } from "@/components/Footer";
import { AdminPanel } from "@/components/AdminPanel";
import { FirmGridDisplay } from "@/components/FirmGridDisplay";
import { usePropFirms } from "@/hooks/usePropFirms";

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showCheapest, setShowCheapest] = useState(false);
  const [showTop5, setShowTop5] = useState(false);
  const { data: firms, isLoading } = usePropFirms();

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAdminMode(isAdmin);
  }, []);

  useEffect(() => {
    const cheapestBtn = document.getElementById('cheapest-cost-btn');
    const top5Btn = document.getElementById('top5-firms-btn');

    const handleCheapestClick = () => {
      setShowCheapest(true);
      setShowTop5(false);
    };

    const handleTop5Click = () => {
      setShowTop5(true);
      setShowCheapest(false);
    };

    if (cheapestBtn) cheapestBtn.addEventListener('click', handleCheapestClick);
    if (top5Btn) top5Btn.addEventListener('click', handleTop5Click);

    return () => {
      if (cheapestBtn) cheapestBtn.removeEventListener('click', handleCheapestClick);
      if (top5Btn) top5Btn.removeEventListener('click', handleTop5Click);
    };
  }, []);

  // Get cheapest firms (sorted by price)
  const cheapestFirms = firms?.slice().sort((a, b) => a.price - b.price) || [];
  
  // Get top 5 firms (sorted by review score)
  const top5Firms = firms?.slice().sort((a, b) => b.review_score - a.review_score).slice(0, 5) || [];

  if (showCheapest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <FirmGridDisplay
          firms={cheapestFirms}
          title="📉 Cheapest Cost PropFirms"
          onClose={() => setShowCheapest(false)}
        />
        <Footer />
      </div>
    );
  }

  if (showTop5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <FirmGridDisplay
          firms={top5Firms}
          title="🔥 Top 5 PropFirms"
          onClose={() => setShowTop5(false)}
        />
        <Footer />
      </div>
    );
  }

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
