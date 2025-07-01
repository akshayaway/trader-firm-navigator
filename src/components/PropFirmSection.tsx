
import { useState } from "react";
import { PropFirmCard } from "./PropFirmCard";
import { LoadingSpinner } from "./LoadingSpinner";

interface PropFirm {
  id: string;
  name: string;
  description?: string;
  price?: number;
  original_price?: number;
  discount?: number;
  coupon_code?: string;
  review_score?: number;
  trust_rating?: number;
  profit_split?: number;
  payout_rate?: number;
  max_funding?: number;
  platform?: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
  regulation_country?: string;
  trading_levels?: string[];
  tags?: string[];
  logo_url?: string;
  affiliate_link?: string;
  buy_now_url?: string;
  slug?: string;
  brand?: string;
  category_id?: string;
  evaluation_model?: string;
  starting_fee?: number;
  funding_amount?: string;
  created_at?: string;
  updated_at?: string;
}

interface PropFirmSectionProps {
  propFirms: PropFirm[];
  loading: boolean;
  sortBy: 'price' | 'review' | 'trust' | 'profit';
  setSortBy: (sort: 'price' | 'review' | 'trust' | 'profit') => void;
}

export const PropFirmSection = ({ propFirms, loading, sortBy, setSortBy }: PropFirmSectionProps) => {
  const [activeLevel, setActiveLevel] = useState<'all' | 'beginner' | 'intermediate' | 'pro'>('all');

  // Filter firms by trading level
  const filteredFirms = activeLevel === 'all'
    ? propFirms
    : propFirms.filter(firm => {
        if (activeLevel === 'beginner') return (firm.price || 0) < 200;
        if (activeLevel === 'intermediate') return (firm.price || 0) >= 200 && (firm.price || 0) <= 500;
        if (activeLevel === 'pro') return (firm.price || 0) > 500;
        return true;
      });

  // Sort firms based on selected criteria
  const sortedFirms = [...filteredFirms].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return (a.price || 0) - (b.price || 0);
      case 'trust':
        return (b.trust_rating || 0) - (a.trust_rating || 0);
      case 'profit':
        return (b.profit_split || 0) - (a.profit_split || 0);
      case 'review':
      default:
        return (b.review_score || 0) - (a.review_score || 0);
    }
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="lg" />
        <div className="text-white text-lg mt-4">Loading prop firms...</div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Trading Level</h2>
          <p className="text-gray-300 text-lg mb-8">Find the perfect prop firm based on your experience level and trading goals</p>
        </div>

        {/* Level Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { key: 'all', label: 'All Levels' },
            { key: 'beginner', label: 'Beginner Traders' },
            { key: 'intermediate', label: 'Intermediate Traders' },
            { key: 'pro', label: 'Pro Traders' }
          ].map((level) => (
            <button
              key={level.key}
              onClick={() => setActiveLevel(level.key as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeLevel === level.key
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700/60 text-gray-300 hover:bg-slate-600/60"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <span className="text-gray-300">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-700/60 text-white px-4 py-2 rounded border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="review">Review Score</option>
            <option value="price">Price</option>
            <option value="trust">Trust Rating</option>
            <option value="profit">Profit Split</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            Showing {sortedFirms.length} {activeLevel === 'all' ? '' : activeLevel} prop firms
          </p>
        </div>

        {/* Prop Firms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedFirms.map((firm) => (
            <PropFirmCard 
              key={firm.id} 
              id={firm.id}
              name={firm.name}
              price={firm.price || 0}
              originalPrice={firm.original_price || 0}
              discount={firm.discount || 0}
              couponCode={firm.coupon_code || ''}
              reviewScore={firm.review_score || 0}
              trustRating={firm.trust_rating || 0}
              profitSplit={firm.profit_split || 0}
              payoutRate={firm.payout_rate || 0}
              platform={firm.platform || ''}
              keyFeatures={firm.features || []}
              tag={firm.tags?.[0]}
            />
          ))}
        </div>

        {sortedFirms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No prop firms found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
