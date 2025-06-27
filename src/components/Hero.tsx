
export const Hero = () => {
  return (
    <div className="relative py-20 px-4 text-center">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
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
        
        {/* Trading Level Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/25 hover:scale-105">
            🟢 Beginner Firms
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105">
            🔵 Intermediate Firms
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105">
            🟣 Pro Firms
          </button>
        </div>
      </div>
    </div>
  );
};
