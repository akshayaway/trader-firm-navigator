
import { Search } from "lucide-react";

export const SearchSection = () => {
  return (
    <div className="px-4 mb-12">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search prop firms by name, brand, or features..."
            className="w-full pl-12 pr-4 py-4 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
        </div>
      </div>
    </div>
  );
};
