
interface FirmFiltersProps {
  activeLevel: string;
  setActiveLevel: (level: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const FirmFilters = ({ activeLevel, setActiveLevel, sortBy, setSortBy }: FirmFiltersProps) => {
  const levels = ["All Levels", "Beginner Traders", "Intermediate Traders", "Pro Traders"];
  const sortOptions = ["Review Score", "Price", "Trust Rating", "Profit Split"];

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeLevel === level
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700/60 text-gray-300 hover:bg-slate-600/60"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-gray-300">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-700/60 text-white px-4 py-2 rounded-lg border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
