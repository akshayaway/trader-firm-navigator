
import { Navigation } from "@/components/Navigation";
import { ChevronDown, Star, TrendingUp, Award, DollarSign } from "lucide-react";
import { useState } from "react";
import { usePropFirms } from "@/hooks/usePropFirms";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Compare = () => {
  const { data: firms, isLoading } = usePropFirms();
  const [selectedFirms, setSelectedFirms] = useState<{[key: string]: any}>({
    firm1: null,
    firm2: null,
    firm3: null
  });
  const [isDarkMode] = useState(true); // Using dark mode to match website

  const handleFirmSelect = (firmKey: string, firmId: string) => {
    const selectedFirm = firms?.find(f => f.id === firmId);
    setSelectedFirms(prev => ({
      ...prev,
      [firmKey]: selectedFirm
    }));
  };

  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );

  const renderComparisonCard = (firm: any, firmKey: string) => {
    if (!firm) {
      return (
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center group hover:bg-slate-800/80 transition-all duration-300">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <DollarSign className="w-10 h-10 text-gray-500" />
          </div>
          <p className="text-gray-400">Select a prop firm to compare</p>
        </div>
      );
    }

    return (
      <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
              {firm.logo_url ? (
                <img src={firm.logo_url} alt={`${firm.name} logo`} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <span className="text-3xl font-bold text-white">{firm.name.charAt(0)}</span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{firm.name}</h3>
            <div className="flex items-center justify-center gap-2">
              {renderStars(Math.round(firm.review_score || 0))}
              <span className="text-sm text-gray-400">({firm.review_score || 'N/A'})</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform">
              ${firm.price?.toLocaleString() || 'N/A'}
            </div>
            {firm.original_price && firm.original_price > firm.price && (
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg line-through text-gray-500">${firm.original_price}</span>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  -{Math.round(((firm.original_price - firm.price) / firm.original_price) * 100)}% OFF
                </Badge>
              </div>
            )}
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-700/50 rounded-lg p-4 text-center hover:bg-slate-600/50 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-xl font-bold text-green-400">{firm.profit_split || 'N/A'}%</span>
              </div>
              <span className="text-xs text-gray-400">Profit Split</span>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center hover:bg-slate-600/50 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-xl font-bold text-blue-400">{firm.trust_rating || 'N/A'}/10</span>
              </div>
              <span className="text-xs text-gray-400">Trust Rating</span>
            </div>
          </div>

          {/* Trust Rating Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Trust Score</span>
              <span className="text-sm font-semibold text-white">{firm.trust_rating || 0}/10</span>
            </div>
            <Progress 
              value={(firm.trust_rating || 0) * 10} 
              className="h-2 bg-slate-700" 
            />
          </div>

          {/* Detailed Metrics */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border-b border-slate-600/30">
              <span className="text-gray-400">Payout Rate</span>
              <span className="font-semibold text-white">{firm.payout_rate || 'N/A'}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border-b border-slate-600/30">
              <span className="text-gray-400">Platform</span>
              <span className="font-semibold text-white">{firm.platform || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border-b border-slate-600/30">
              <span className="text-gray-400">Max Funding</span>
              <span className="font-semibold text-purple-400">${firm.max_funding?.toLocaleString() || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
              <span className="text-gray-400">Review Score</span>
              <span className="font-semibold text-yellow-400">{firm.review_score || 'N/A'}/5</span>
            </div>
          </div>

          {/* Features */}
          {firm.features && firm.features.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-3">Key Features</h4>
              <div className="flex flex-wrap gap-2">
                {firm.features.slice(0, 4).map((feature: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-slate-700 text-gray-300 hover:bg-slate-600 transition-colors"
                  >
                    {feature}
                  </Badge>
                ))}
                {firm.features.length > 4 && (
                  <Badge variant="secondary" className="text-xs bg-slate-700 text-gray-300">
                    +{firm.features.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <DollarSign className="w-5 h-5 inline mr-2" />
            Get Started
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Compare PropFirms
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Compare up to 3 prop firms side by side to find the perfect match for your trading needs
            </p>
          </div>

          {/* Firm Selection Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {['firm1', 'firm2', 'firm3'].map((firmKey, index) => (
              <div key={firmKey} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/80 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  Select Firm {index + 1}
                </h3>
                <div className="relative">
                  <select
                    className="w-full bg-slate-700/60 text-white px-4 py-4 rounded-xl border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent appearance-none cursor-pointer transition-all duration-300 hover:bg-slate-600/60"
                    onChange={(e) => handleFirmSelect(firmKey, e.target.value)}
                    defaultValue=""
                  >
                    <option value="">Choose a prop firm...</option>
                    {firms?.map(firm => (
                      <option key={firm.id} value={firm.id}>{firm.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(selectedFirms).map((firm, index) => (
              <div key={index} className="relative">
                {renderComparisonCard(firm, `firm${index + 1}`)}
              </div>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
              <p className="text-gray-300 text-lg">Loading prop firms...</p>
            </div>
          )}

          {/* Help Text */}
          <div className="text-center mt-12">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-slate-700/30">
              <h3 className="text-lg font-semibold text-white mb-2">How to Compare</h3>
              <p className="text-gray-300">
                Select up to 3 prop firms from the dropdowns above to see a detailed side-by-side comparison. 
                Compare key metrics like profit split, trust rating, pricing, and features to make an informed decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
