
import { Navigation } from "@/components/Navigation";
import { FirmFilters } from "@/components/FirmFilters";
import { FirmCard } from "@/components/FirmCard";
import { useState } from "react";

// Mock data for demonstration
const mockFirms = [
  {
    id: "1",
    name: "MyForexFunds",
    price: 299,
    originalPrice: 399,
    discount: 25,
    couponCode: "MFF25",
    reviewScore: 4.7,
    trustRating: 9,
    profitSplit: 85,
    payoutRate: 98,
    platform: "MetaTrader 4/5",
    description: "Premium prop firm for experienced traders with high funding",
    tag: "MFF"
  },
  {
    id: "2",
    name: "Funded Next",
    price: 199,
    originalPrice: 299,
    discount: 33,
    couponCode: "NEXT25",
    reviewScore: 4.4,
    trustRating: 8,
    profitSplit: 85,
    payoutRate: 95,
    platform: "TradingView",
    description: "Next-generation prop firm with innovative features",
    tag: "FundedNext"
  },
  {
    id: "3",
    name: "E8 Funding",
    price: 25,
    originalPrice: 50,
    discount: 50,
    couponCode: "E8SAVE",
    reviewScore: 4.1,
    trustRating: 7,
    profitSplit: 80,
    payoutRate: 88,
    platform: "MetaTrader 4/5",
    description: "Low-cost entry point with competitive features",
    tag: "E8"
  }
];

const AllFirms = () => {
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("Review Score");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">All Prop Firms</h1>
            <p className="text-gray-300 text-lg">Browse and compare the best prop trading firms</p>
          </div>
          
          <FirmFilters 
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="mb-6">
            <p className="text-gray-400">Showing {mockFirms.length} of {mockFirms.length} prop firms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFirms.map((firm) => (
              <FirmCard key={firm.id} firm={firm} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFirms;
