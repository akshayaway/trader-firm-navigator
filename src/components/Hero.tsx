
export const Hero = () => {
  return (
    <div className="relative py-20 px-4 text-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Find the
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Perfect Prop Trading Firm
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Compare top proprietary trading firms, read verified reviews, and discover the best
          funding opportunities. Make informed decisions with our comprehensive prop firm
          directory.
        </p>
        
        {/* Button Row */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <a
            href="/all-firms"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
          >
            Explore All Firms
          </a>
          <a
            href="/compare"
            className="bg-slate-700/60 hover:bg-slate-600/60 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-slate-600/50"
          >
            Compare Firms
          </a>
          <a
            href="/cheap-firms"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/25 hover:scale-105 flex items-center gap-2"
          >
            💰 Cheap Cost PropFirms
          </a>
          <a
            href="/top-firms"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-orange-500/25 hover:scale-105 flex items-center gap-2"
          >
            🔥 Top 5 PropFirms
          </a>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
            <div className="text-gray-300">Active Traders</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">$2.5B+</div>
            <div className="text-gray-300">Funded Capital</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
            <div className="text-gray-300">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};
