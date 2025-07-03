
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { ReviewList } from '@/components/reviews/ReviewList';
import { AccountSizesManager } from '@/components/admin/AccountSizesManager';
import { AccountSizesTable } from '@/components/AccountSizesTable';
import { usePropFirms } from '@/hooks/usePropFirms';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FirmDetail = () => {
  const { firmId } = useParams();
  const { data: firms, isLoading } = usePropFirms();
  const { isAdmin } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  
  const firm = firms?.find(f => f.id === firmId);

  const handleReviewAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!firm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-white text-xl">Firm not found</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBuyNow = () => {
    const targetUrl = firm.buy_now_url || firm.affiliate_link;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Firm Info Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{firm.name}</h1>
                <p className="text-gray-600 text-lg mb-6">{firm.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{firm.review_score}</div>
                    <div className="text-sm text-gray-600">Review Score</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{firm.trust_rating}/10</div>
                    <div className="text-sm text-gray-600">Trust Rating</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{firm.profit_split}%</div>
                    <div className="text-sm text-gray-600">Profit Split</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{firm.payout_rate}%</div>
                    <div className="text-sm text-gray-600">Payout Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Current Offer</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-bold text-green-600">${firm.price}</span>
                  {firm.original_price && firm.original_price > (firm.price || 0) && (
                    <>
                      <span className="text-gray-400 line-through text-xl">${firm.original_price}</span>
                      <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-semibold">
                        -{firm.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                {firm.coupon_code && (
                  <div className="bg-white rounded-lg px-4 py-3 mb-4">
                    <span className="text-sm text-gray-600">Coupon Code</span>
                    <div className="font-mono text-gray-900 font-bold text-xl">{firm.coupon_code}</div>
                  </div>
                )}
                {(firm.buy_now_url || firm.affiliate_link) && (
                  <button 
                    onClick={handleBuyNow}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
                  >
                    Get Started Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Account Sizes Table */}
          <AccountSizesTable firmId={firmId!} />

          {/* Tabs for different sections */}
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="write-review">Write Review</TabsTrigger>
              {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="reviews">
              <ReviewList key={refreshKey} firmId={firmId!} />
            </TabsContent>
            
            <TabsContent value="write-review">
              <ReviewForm 
                firmId={firmId!} 
                firmName={firm.name}
                onReviewAdded={handleReviewAdded}
              />
            </TabsContent>
            
            {isAdmin && (
              <TabsContent value="admin">
                <AccountSizesManager firmId={firmId!} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FirmDetail;
