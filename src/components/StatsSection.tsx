
export const StatsSection = () => {
  return (
    <div className="px-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50">
            <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
            <div className="text-gray-300">Active Traders</div>
          </div>
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50">
            <div className="text-4xl font-bold text-purple-400 mb-2">$2.5B+</div>
            <div className="text-gray-300">Total Payouts</div>
          </div>
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50">
            <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
            <div className="text-gray-300">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};
