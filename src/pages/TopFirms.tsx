
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
    originalPrice: 799,
    discount: 25,
    couponCode: "FTMO25",
    reviewScore: 4.9,
    trustRating: 10,
    profitSplit: 90,
    payoutRate: 99,
    platform: "MetaTrader 4/5",
    description: "Industry leader with highest trust rating and excellent payouts",
    tag: "Top"
  },
  {
    id: "2",
    name: "The Funded Trader",
    price: 499,
    originalPrice: 699,
    discount: 29,
    couponCode: "TFT29",
    reviewScore: 4.8,
    trustRating: 9,
    profitSplit: 85,
    payoutRate: 98,
    platform: "MetaTrader 4/5",
    description: "Premium prop firm with excellent track record",
    tag: "Top"
  },
  {
    id: "6",
    name: "Apex Trader Funding",
    price: 399,
    originalPrice: 599,
    discount: 33,
    couponCode: "APEX33",
    reviewScore: 4.7,
    trustRating: 9,
    profitSplit: 90,
    payoutRate: 97,
    platform: "Ninja Trader",
    description: "Top-rated futures prop firm with excellent support",
    tag: "Top"
  },
  {
    id: "7",
    name: "OneUp Trader",
    price: 349,
    originalPrice: 499,
    discount: 30,
    couponCode: "ONEUP30",
    reviewScore: 4.6,
    trustRating: 8,
    profitSplit: 85,
    payoutRate: 96,
    platform: "Ninja Trader",
    description: "Innovative prop firm with unique evaluation process",
    tag: "Top"
  },
  {
    id: "8",
    name: "Earn2Trade",
    price: 299,
    originalPrice: 449,
    discount: 33,
    couponCode: "E2T33",
    reviewScore: 4.5,
    trustRating: 8,
    profitSplit: 80,
    payoutRate: 95,
    platform: "Ninja Trader",
    description: "Educational focused prop firm with great learning resources",
    tag: "Top"
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
