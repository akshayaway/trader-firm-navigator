
import { Navigation } from "@/components/Navigation";
import { FirmFilters } from "@/components/FirmFilters";
import { FirmCard } from "@/components/FirmCard";
import { useState } from "react";
import { useTopFirms } from "@/hooks/useTopFirms";

const TopFirms = () => {
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("Review Score");
  const { data: firms, isLoading } = useTopFirms();

  // Filter by level based on review score ranges
  const filteredFirms = firms?.filter(firm => {
    if (activeLevel === "All Levels") return true;
    if (activeLevel === "Beginner Traders") return (firm.review_score || 0) >= 3.5 && (firm.review_score || 0) < 4.0;
    if (activeLevel === "Intermediate Traders") return (firm.review_score || 0) >= 4.0 && (firm.review_score || 0) < 4.5;
    if (activeLevel === "Pro Traders") return (firm.review_score || 0) >= 4.5;
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
              <h1 className="text-4xl font-bold text-white mb-4">🔥 Top 5 PropFirms</h1>
              <p className="text-gray-300 text-lg">Loading the highest rated prop trading firms...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
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
            <h1 className="text-4xl font-bold text-white mb-4">🔥 Top 5 PropFirms</h1>
            <p className="text-gray-300 text-lg">The highest rated prop trading firms in the industry</p>
          </div>
          
          <FirmFilters 
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="mb-6">
            <p className="text-gray-400">Showing top {sortedFirms.length} prop firms ranked by review score</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFirms.map((firm) => (
              <FirmCard key={firm.id} firm={firm} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFirms;
