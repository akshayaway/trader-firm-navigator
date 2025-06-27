
import { Navigation } from "@/components/Navigation";
import { ChevronDown } from "lucide-react";

const Compare = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Compare PropFirms</h1>
            <p className="text-gray-300 text-lg">Compare up to 3 prop firms side by side to find the perfect match for your trading needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-4">Firm {num}</h3>
                <div className="relative">
                  <select className="w-full bg-slate-700/60 text-white px-4 py-3 rounded-lg border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none">
                    <option>Select a prop firm</option>
                    <option>MyForexFunds</option>
                    <option>Funded Next</option>
                    <option>E8 Funding</option>
                    <option>FTMO</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                <div className="mt-8 h-32 flex items-center justify-center text-gray-400">
                  Select a prop firm to compare
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">PropFirm Knowledge</h3>
            <p className="text-gray-300 mb-6">Your ultimate destination for prop trading firm reviews, comparisons, and insights. Make informed decisions with our comprehensive analysis.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>Home</div>
                  <div>All Firms</div>
                  <div>Compare</div>
                  <div>Reviews</div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Categories</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>Beginner Traders</div>
                  <div>Intermediate Traders</div>
                  <div>Pro Traders</div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Features</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>Expert Reviews</div>
                  <div>Comparison Tools</div>
                  <div>Real-time Data</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
