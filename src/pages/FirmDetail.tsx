
import { Navigation } from "@/components/Navigation";
import { useParams, Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePropFirms } from "@/hooks/usePropFirms";
import { useReviews } from "@/hooks/useReviews";
import { useState } from "react";

const FirmDetail = () => {
  const { firmId } = useParams();
  const { data: firms, isLoading: firmsLoading } = usePropFirms();
  const { data: reviews, isLoading: reviewsLoading } = useReviews();
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const firm = firms?.find(f => f.id === firmId);
  const firmReviews = reviews?.filter(r => r.firm_id === firmId) || [];

  // Mock account sizes data
  const accountSizes = [
    { size: "10K", price: 99, discount: 10, platform: "MT4/MT5", payoutRate: 80 },
    { size: "25K", price: 155, discount: 15, platform: "MT4/MT5", payoutRate: 80 },
    { size: "50K", price: 345, discount: 20, platform: "MT4/MT5", payoutRate: 85 },
    { size: "100K", price: 599, discount: 25, platform: "MT4/MT5", payoutRate: 90 },
    { size: "200K", price: 1080, discount: 30, platform: "MT4/MT5", payoutRate: 90 }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ⭐
      </span>
    ));
  };

  if (firmsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-24 px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!firm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-24 px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Firm Not Found</h1>
          <p className="text-gray-300 mb-6">The requested firm review could not be found.</p>
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Firm Header */}
          <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{firm.name.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{firm.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {renderStars(firm.review_score)}
                    <span className="text-gray-600 ml-2">({firm.review_score})</span>
                  </div>
                  <span className="text-green-600 font-bold">Trust: {firm.trust_rating}/10</span>
                  <span className="text-blue-600 font-bold">Profit Split: {firm.profit_split}%</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{firm.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Pros */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-green-600">✅ Pros</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {firm.pros && firm.pros.length > 0 ? firm.pros.map((pro, index) => (
                    <li key={index} className="text-gray-700 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {pro}
                    </li>
                  )) : (
                    <li className="text-gray-500">No pros listed</li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Cons */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-red-600">❌ Cons</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {firm.cons && firm.cons.length > 0 ? firm.cons.map((con, index) => (
                    <li key={index} className="text-gray-700 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      {con}
                    </li>
                  )) : (
                    <li className="text-gray-500">No cons listed</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Key Details */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-gray-900">Key Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="text-gray-600 text-sm mb-1">Platform</h4>
                  <p className="text-gray-900 font-semibold">{firm.platform || "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-gray-600 text-sm mb-1">Max Funding</h4>
                  <p className="text-gray-900 font-semibold">${firm.max_funding?.toLocaleString() || "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-gray-600 text-sm mb-1">Payout Rate</h4>
                  <p className="text-gray-900 font-semibold">{firm.payout_rate || "N/A"}%</p>
                </div>
                <div>
                  <h4 className="text-gray-600 text-sm mb-1">Starting Fee</h4>
                  <p className="text-gray-900 font-semibold">${firm.price || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Sizes Table */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-gray-900">Account Sizes & Pricing</CardTitle>
              <CardDescription className="text-gray-600">
                Choose the account size that fits your trading capital and goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-700">Account Size</TableHead>
                    <TableHead className="text-gray-700">Price</TableHead>
                    <TableHead className="text-gray-700">Discount</TableHead>
                    <TableHead className="text-gray-700">Platform</TableHead>
                    <TableHead className="text-gray-700">Payout Rate</TableHead>
                    <TableHead className="text-gray-700">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accountSizes.map((account, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="text-gray-900 font-semibold">${account.size}</TableCell>
                      <TableCell className="text-gray-900">${account.price}</TableCell>
                      <TableCell className="text-green-600">{account.discount}% OFF</TableCell>
                      <TableCell className="text-gray-700">{account.platform}</TableCell>
                      <TableCell className="text-blue-600">{account.payoutRate}%</TableCell>
                      <TableCell>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          Buy Now
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* User Reviews Section */}
          <Card className="bg-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-900">User Reviews</CardTitle>
                  <CardDescription className="text-gray-600">
                    What other traders are saying about {firm.name}
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Write Review
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showReviewForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Write a Review</h4>
                  <p className="text-gray-600 text-sm">Review submission form will be implemented here.</p>
                </div>
              )}
              
              {reviewsLoading ? (
                <p className="text-gray-600">Loading reviews...</p>
              ) : firmReviews.length > 0 ? (
                <div className="space-y-4">
                  {firmReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.expert_score || 0)}
                        <span className="text-gray-600 text-sm">by Expert Review</span>
                      </div>
                      <p className="text-gray-700 mb-2">{review.expert_summary}</p>
                      <div className="text-sm text-gray-500">
                        Category: {review.category} | Trust Score: {review.trust_score}/10
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet. Be the first to review {firm.name}!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FirmDetail;
