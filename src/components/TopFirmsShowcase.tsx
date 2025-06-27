
import { Link } from "react-router-dom";
import { usePropFirms } from "@/hooks/usePropFirms";
import { FirmCard } from "./FirmCard";

export const TopFirmsShowcase = () => {
  const { data: firms, isLoading } = usePropFirms();
  
  const topFirms = firms?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="px-4 mb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            🔥 Top Rated Prop Firms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-800/60 rounded-2xl p-6 animate-pulse">
                <div className="h-48 bg-slate-700/50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            🔥 Top Rated Prop Firms
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the highest-rated prop trading firms trusted by thousands of traders worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topFirms.map((firm) => (
            <FirmCard key={firm.id} firm={firm} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/top-firms"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-orange-500/25 hover:scale-105"
          >
            View All Top Firms
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
