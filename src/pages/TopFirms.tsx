
import { Navigation } from "@/components/Navigation";
import { FirmFilters } from "@/components/FirmFilters";
import { FirmCard } from "@/components/FirmCard";
import { useState } from "react";

// Mock data for top 5 firms
const mockTopFirms = [
  {
    id: "1",
    name: "FTMO",
    price: 599,
    original_price: 799,
    discount: 25,
    coupon_code: "FTMO25",
    review_score: 4.9,
    trust_rating: 10,
    profit_split: 90,
    payout_rate: 99,
    platform: "MetaTrader 4/5",
    description: "Industry leader with highest trust rating and excellent payouts",
    tags: ["top"]
  },
  {
    id: "2",
    name: "The Funded Trader",
    price: 499,
    original_price: 699,
    discount: 29,
    coupon_code: "TFT29",
    review_score: 4.8,
    trust_rating: 9,
    profit_split: 85,
    payout_rate: 98,
    platform: "MetaTrader 4/5",
    description: "Premium prop firm with excellent track record",
    tags: ["top"]
  },
  {
    id: "6",
    name: "Apex Trader Funding",
    price: 399,
    original_price: 599,
    discount: 33,
    coupon_code: "APEX33",
    review_score: 4.7,
    trust_rating: 9,
    profit_split: 90,
    payout_rate: 97,
    platform: "Ninja Trader",
    description: "Top-rated futures prop firm with excellent support",
    tags: ["top"]
  },
  {
    id: "7",
    name: "OneUp Trader",
    price: 349,
    original_price: 499,
    discount: 30,
    coupon_code: "ONEUP30",
    review_score: 4.6,
    trust_rating: 8,
    profit_split: 85,
    payout_rate: 96,
    platform: "Ninja Trader",
    description: "Innovative prop firm with unique evaluation process",
    tags: ["top"]
  },
  {
    id: "8",
    name: "Earn2Trade",
    price: 299,
    original_price: 449,
    discount: 33,
    coupon_code: "E2T33",
    review_score: 4.5,
    trust_rating: 8,
    profit_split: 80,
    payout_rate: 95,
    platform: "Ninja Trader",
    description: "Educational focused prop firm with great learning resources",
    tags: ["top"]
  }
];

const TopFirms = () => {
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("Review Score");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">🔥 Top 5 PropFirms</h1>
            <p className="text-gray-300 text-lg">The highest rated prop trading firms in the industry</p>
          </div>
          
          <FirmFilters 
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="mb-6">
            <p className="text-gray-400">Showing top {mockTopFirms.length} prop firms ranked by review score</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTopFirms.map((firm) => (
              <FirmCard key={firm.id} firm={firm} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFirms;
