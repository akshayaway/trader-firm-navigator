
import { Navigation } from "@/components/Navigation";
import { FirmFilters } from "@/components/FirmFilters";
import { LazyFirmCard, LazyLoadWrapper } from "@/components/LazyLoadWrapper";
import { useState } from "react";
import { useCheapFirms } from "@/hooks/useCheapFirms";

const CheapFirms = () => {
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("Review Score");
  const { data: firms, isLoading } = useCheapFirms();

  // Filter by level
  const filteredFirms = firms?.filter(firm => {
    if (activeLevel === "All Levels") return true;
    if (activeLevel === "Beginner Traders") return (firm.price || 0) < 50;
    if (activeLevel === "Intermediate Traders") return (firm.price || 0) >= 50 && (firm.price || 0) < 100;
    if (activeLevel === "Pro Traders") return (firm.price || 0) >= 100;
    return true;
  }) || [];

  // Sort firms
  const sortedFirms = [...filteredFirms].sort((a, b) => {
    switch (sortBy) {
      case "Price":
        return (a.price || 0) - (b.price || 0);
      case "Trust Rating":
        return (b.trust_rating || 0) - (a.trust_rating || 0);
      case "Profit Split":
        return (b.profit_split || 0) - (a.profit_split || 0);
      case "Review Score":
      default:
        return (b.review_score || 0) - (a.review_score || 0);
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">💰 Cheap Cost PropFirms</h1>
              <p className="text-gray-300 text-lg">Loading affordable prop trading firms...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-800/60 rounded-2xl p-6 animate-pulse">
                  <div className="h-64 bg-slate-700/50 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">💰 Cheap Cost PropFirms</h1>
            <p className="text-gray-300 text-lg">Affordable prop trading firms under $100</p>
          </div>
          
          <FirmFilters 
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="mb-6">
            <p className="text-gray-400">Showing {sortedFirms.length} cheap prop firms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFirms.map((firm) => (
              <LazyLoadWrapper key={firm.id}>
                <LazyFirmCard firm={firm} isDarkMode={true} />
              </LazyLoadWrapper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheapFirms;
