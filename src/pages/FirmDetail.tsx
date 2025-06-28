
import React from 'react';
import { useParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { usePropFirms } from '@/hooks/usePropFirms';

const FirmDetail = () => {
  const { firmId } = useParams();
  const { data: firms, isLoading } = usePropFirms();
  
  const firm = firms?.find(f => f.id === firmId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-white text-xl">Loading...</div>
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

  // Dummy account sizes data
  const accountSizes = [
    { size: '$10K', discount: '15%', launchDate: '2024-01-15', price: '$89', discountPrice: '$76' },
    { size: '$25K', discount: '20%', launchDate: '2024-01-15', price: '$149', discountPrice: '$119' },
    { size: '$50K', discount: '25%', launchDate: '2024-01-15', price: '$249', discountPrice: '$187' },
    { size: '$100K', discount: '30%', launchDate: '2024-01-15', price: '$449', discountPrice: '$314' },
    { size: '$200K', discount: '35%', launchDate: '2024-01-15', price: '$799', discountPrice: '$519' },
  ];

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
                  <span className="text-gray-400 line-through text-xl">${firm.original_price}</span>
                  <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-semibold">
                    -{firm.discount}% OFF
                  </span>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 mb-4">
                  <span className="text-sm text-gray-600">Coupon Code</span>
                  <div className="font-mono text-gray-900 font-bold text-xl">{firm.coupon_code}</div>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>

          {/* Account Sizes Table */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Account Sizes & Pricing</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Account Size</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Discount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Launch Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Original Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Discounted Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {accountSizes.map((account, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{account.size}</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-semibold">{account.discount}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{account.launchDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-400 line-through">{account.price}</td>
                      <td className="px-6 py-4 text-sm font-bold text-green-600">{account.discountPrice}</td>
                      <td className="px-6 py-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Reviews Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">User Reviews</h2>
            
            {/* Dummy reviews */}
            <div className="space-y-6">
              {[
                { reviewer: 'John D.', rating: 5, review: 'Excellent prop firm with fast payouts and great support team.', date: '2024-01-15' },
                { reviewer: 'Sarah M.', rating: 4, review: 'Good platform and competitive rates. Highly recommended for beginners.', date: '2024-01-10' },
                { reviewer: 'Anonymous', rating: 5, review: 'Been trading with them for 6 months. Very satisfied with the service.', date: '2024-01-05' }
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">{review.reviewer}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.review}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FirmDetail;
