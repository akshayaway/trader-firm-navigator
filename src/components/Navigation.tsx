
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-white">
            PropFirm Knowledge
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/all-firms" className="text-gray-300 hover:text-white transition-colors">
              All Firms
            </Link>
            <Link to="/reviews" className="text-gray-300 hover:text-white transition-colors">
              Reviews
            </Link>
            <Link to="/compare" className="text-gray-300 hover:text-white transition-colors">
              Compare
            </Link>
            <Link to="/admin" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
