
import { useState } from "react";

export const TradingLevelSelector = () => {
  const [activeLevel, setActiveLevel] = useState("All Levels");

  const levels = [
    "All Levels",
    "Beginner Traders", 
    "Intermediate Traders",
    "Pro Traders"
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Choose Your Trading Level</h2>
        <p className="text-gray-300 text-lg mb-8">Find the perfect prop firm based on your experience level and trading goals</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeLevel === level
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700/60 text-gray-300 hover:bg-slate-600/60"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        
        <div className="flex justify-center items-center gap-4 mb-8">
          <span className="text-gray-300">Sort by:</span>
          <select className="bg-slate-700/60 text-white px-4 py-2 rounded border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <option>Review Score</option>
            <option>Trust Rating</option>
            <option>Price</option>
            <option>Profit Split</option>
          </select>
        </div>
      </div>
    </div>
  );
};
