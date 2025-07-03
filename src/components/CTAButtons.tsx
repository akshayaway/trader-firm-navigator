
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
            className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-4 rounded-lg text-center font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Compare Firms
          </Link>
          <Link
            to="/cheap-firms"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg text-center font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            💰 Cheap Cost PropFirms
          </Link>
          <Link
            to="/top-firms"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-lg text-center font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            🔥 Top 5 PropFirms
          </Link>
        </div>
      </div>
    </div>
  );
};
