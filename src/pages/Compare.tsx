
import { Navigation } from "@/components/Navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { usePropFirms } from "@/hooks/usePropFirms";

const Compare = () => {
  const { data: firms, isLoading } = usePropFirms();
  const [selectedFirms, setSelectedFirms] = useState<{[key: string]: any}>({
    firm1: null,
    firm2: null,
    firm3: null
  });

  const handleFirmSelect = (firmKey: string, firmId: string) => {
    const selectedFirm = firms?.find(f => f.id === firmId);
    setSelectedFirms(prev => ({
      ...prev,
      [firmKey]: selectedFirm
    }));
  };

  const renderComparisonCard = (firm: any, firmKey: string) => {
    if (!firm) {
      return (
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <p className="text-gray-500">Select a prop firm to compare</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl font-bold text-white">{firm.name.charAt(0)}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{firm.name}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Max Funding</span>
            <span className="font-semibold text-gray-900">${firm.max_funding?.toLocaleString() || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Profit Split</span>
            <span className="font-semibold text-green-600">{firm.profit_split || 'N/A'}%</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Starting Fee</span>
            <span className="font-semibold text-blue-600">${firm.price || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Platform</span>
            <span className="font-semibold text-gray-900">{firm.platform || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Review Score</span>
            <span className="font-semibold text-yellow-600">{firm.review_score || 'N/A'}/5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trust Rating</span>
            <span className="font-semibold text-green-600">{firm.trust_rating || 'N/A'}/10</span>
          </div>
        </div>

        {firm.features && firm.features.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
            <div className="flex flex-wrap gap-2">
              {firm.features.slice(0, 4).map((feature: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Compare PropFirms</h1>
            <p className="text-gray-300 text-lg">Compare up to 3 prop firms side by side to find the perfect match for your trading needs</p>
          </div>

          {/* Firm Selection Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {['firm1', 'firm2', 'firm3'].map((firmKey, index) => (
              <div key={firmKey} className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-4">Firm {index + 1}</h3>
                <div className="relative">
                  <select
                    className="w-full bg-slate-700/60 text-white px-4 py-3 rounded-lg border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                    onChange={(e) => handleFirmSelect(firmKey, e.target.value)}
                    defaultValue=""
                  >
                    <option value="">Select a prop firm</option>
                    {firms?.map(firm => (
                      <option key={firm.id} value={firm.id}>{firm.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(selectedFirms).map((firm, index) => (
              <div key={index}>
                {renderComparisonCard(firm, `firm${index + 1}`)}
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-300">Loading prop firms...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compare;
