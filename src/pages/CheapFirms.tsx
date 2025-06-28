
import { Navigation } from "@/components/Navigation";
import { FirmFilters } from "@/components/FirmFilters";
import { FirmCard } from "@/components/FirmCard";
import { useState } from "react";

// Mock data for cheap firms (price <= 100)
const mockCheapFirms = [
  {
    id: "3",
    name: "E8 Funding",
    price: 25,
    original_price: 50,
    discount: 50,
    coupon_code: "E8SAVE",
    review_score: 4.1,
    trust_rating: 7,
    profit_split: 80,
    payout_rate: 88,
    platform: "MetaTrader 4/5",
    description: "Low-cost entry point with competitive features",
    tags: ["cheap"]
  },
  {
    id: "4",
    name: "Budget Trader",
    price: 89,
    original_price: 149,
    discount: 40,
    coupon_code: "BUDGET40",
    review_score: 3.9,
    trust_rating: 6,
    profit_split: 75,
    payout_rate: 85,
    platform: "TradingView",
    description: "Affordable prop firm for new traders",
    tags: ["cheap"]
  },
  {
    id: "5",
    name: "Starter Props",
    price: 99,
    original_price: 199,
    discount: 50,
    coupon_code: "START50",
    review_score: 4.0,
    trust_rating: 7,
    profit_split: 80,
    payout_rate: 90,
    platform: "MetaTrader 4/5",
    description: "Perfect starting point for beginner traders",
    tags: ["cheap"]
  }
];

const CheapFirms = () => {
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("Review Score");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">💰 Cheap Cost PropFirms</h1>
            <p className="text-gray-300 text-lg">Affordable prop trading firms under $100</p>
          </div>
          
          <FirmFilters 
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="mb-6">
            <p className="text-gray-400">Showing {mockCheapFirms.length} cheap prop firms (price ≤ $100)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCheapFirms.map((firm) => (
              <FirmCard key={firm.id} firm={firm} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheapFirms;
