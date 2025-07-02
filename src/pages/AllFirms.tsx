
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PropFirmCard } from "@/components/PropFirmCard";
import { usePropFirms } from "@/hooks/useSupabaseData";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const AllFirms = () => {
  const [sortBy, setSortBy] = useState<'price' | 'review' | 'trust'>('review');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'beginner' | 'intermediate' | 'pro'>('all');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { data: propFirms, isLoading: loading, error } = usePropFirms();

  // Filter by category
  const filteredFirms = selectedCategory === 'all'
    ? propFirms || []
    : (propFirms || []).filter(firm => {
        if (selectedCategory === 'beginner') return (firm.price || 0) < 200;
        if (selectedCategory === 'intermediate') return (firm.price || 0) >= 200 && (firm.price || 0) <= 500;
        if (selectedCategory === 'pro') return (firm.price || 0) > 500;
        return true;
      });

  // Sort by selected option
  const sortedFirms = [...filteredFirms].sort((a, b) => {
    if (sortBy === 'price') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'trust') return (b.trust_rating || 0) - (a.trust_rating || 0);
    // Default: review
    return (b.review_score || 0) - (a.review_score || 0);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <LoadingSpinner size="lg" />
            <div className="text-white text-lg mt-4">Loading all prop firms...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-red-400 text-lg">Error loading firms</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-4xl font-bold text-white">Explore All Prop Firms</h1>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value as any)}
              className="px-3 py-2 rounded bg-slate-800 text-white border border-blue-500/20"
            >
              <option value="all">All</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="pro">Pro</option>
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded bg-slate-800 text-white border border-blue-500/20"
            >
              <option value="review">Top Rated</option>
              <option value="price">Lowest Price</option>
              <option value="trust">Trust Score</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedFirms.map((firm, index) => (
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
              affiliateLink={firm.affiliate_link || ''}
              buyNowUrl={firm.buy_now_url || ''}
            />
          ))}
        </div>
        {sortedFirms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No prop firms found.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllFirms;
