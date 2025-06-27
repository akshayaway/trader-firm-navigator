
import { Navigation } from "@/components/Navigation";
import { FirmFilters } from "@/components/FirmFilters";
import { FirmCard } from "@/components/FirmCard";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { usePropFirms } from "@/hooks/usePropFirms";

const AllFirms = () => {
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("Review Score");
  const { data: firms, isLoading } = usePropFirms();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-white mb-4">All Prop Firms</h1>
              <p className="text-xl text-gray-300">Loading prop trading firms...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              All Prop Firms
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Browse and compare the best prop trading firms from our comprehensive database
            </p>
          </div>
          
          <FirmFilters 
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="mb-6">
            <p className="text-gray-400">Showing {firms?.length || 0} prop firms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {firms?.map((firm) => (
              <FirmCard key={firm.id} firm={firm} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllFirms;
