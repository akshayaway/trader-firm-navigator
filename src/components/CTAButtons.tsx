
import { Link } from "react-router-dom";

export const CTAButtons = () => {
  return (
    <div className="px-4 mb-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/all-firms"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg text-center font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Explore All Firms
          </Link>
          <Link
            to="/compare"
            className="bg-slate-700/60 hover:bg-slate-600/60 text-white px-6 py-4 rounded-lg text-center font-semibold transition-all transform hover:scale-105 border border-slate-600/50 backdrop-blur-sm"
          >
            Compare Firms
          </Link>
          <Link
            to="/cheap-firms"
            className="bg-green-600/80 hover:bg-green-700/80 text-white px-6 py-4 rounded-lg text-center font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            💰 Cheap Cost PropFirms
          </Link>
          <Link
            to="/top-firms"
            className="bg-orange-600/80 hover:bg-orange-700/80 text-white px-6 py-4 rounded-lg text-center font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            🔥 Top 5 PropFirms
          </Link>
        </div>
      </div>
    </div>
  );
};
