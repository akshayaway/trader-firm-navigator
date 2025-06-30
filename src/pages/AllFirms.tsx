
import { Navigation } from "@/components/Navigation";
import { FirmFilters } from "@/components/FirmFilters";
import { EnhancedPropFirmCard } from "@/components/EnhancedPropFirmCard";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { Footer } from "@/components/Footer";
import { useState, useCallback } from "react";
import { usePropFirms } from "@/hooks/usePropFirms";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const AllFirms = () => {
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const { data: firms, isLoading } = usePropFirms();

  const handleFilteredData = useCallback((data: any[]) => {
    setFilteredData(data);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-white mb-4">All Prop Firms</h1>
              <p className="text-xl text-gray-300">Loading prop trading firms...</p>
            </div>
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  const searchFields = ['name', 'platform', 'regulation_country'];
  const sortOptions = [
    { label: 'Review Score', value: 'review_score' },
    { label: 'Trust Rating', value: 'trust_rating' },
    { label: 'Price', value: 'price' },
    { label: 'Profit Split', value: 'profit_split' },
    { label: 'Max Funding', value: 'max_funding' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              All Prop Firms
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Browse and compare the best prop trading firms from our comprehensive database
            </p>
          </div>
          
          <FirmFilters 
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
            sortBy="Review Score"
            setSortBy={() => {}}
          />

          <SearchAndFilter
            data={firms || []}
            onFilteredData={handleFilteredData}
            searchFields={searchFields}
            sortOptions={sortOptions}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((firm) => (
              <EnhancedPropFirmCard
                key={firm.id}
                id={firm.id}
                name={firm.name}
                brand={firm.brand}
                price={firm.price || 0}
                originalPrice={firm.original_price}
                discount={firm.discount}
                couponCode={firm.coupon_code}
                reviewScore={firm.review_score || 0}
                trustRating={firm.trust_rating || 0}
                profitSplit={firm.profit_split || 0}
                payoutRate={firm.payout_rate || 0}
                platform={firm.platform}
                features={firm.features}
                logoUrl={firm.logo_url}
                affiliateLink={firm.affiliate_link}
                buyNowUrl={firm.buy_now_url}
                maxFunding={firm.max_funding}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllFirms;
