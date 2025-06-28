
import { Navigation } from "@/components/Navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import { useReviews } from "@/hooks/useReviews";
import { Link } from "react-router-dom";

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: reviews, isLoading } = useReviews();

  const filteredReviews = reviews?.filter(review =>
    review.propfirms?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-600"}>
        ⭐
      </span>
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Expert Reviews</h1>
              <p className="text-gray-300 text-lg">Loading expert reviews...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-800/60 rounded-2xl p-6 animate-pulse">
                  <div className="h-64 bg-slate-700/50 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Expert Reviews</h1>
            <p className="text-gray-300 text-lg">In-depth reviews of prop trading firms written by our trading experts</p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews by firm name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-400">Showing {filteredReviews.length} reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {review.propfirms?.name?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div>
                    <Link
                      to={`/firm/${review.propfirms?.id}`}
                      className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {review.propfirms?.name}
                    </Link>
                    <div className="flex items-center gap-2">
                      {renderStars(review.expert_score || 0)}
                      <span className="text-gray-600 text-sm">({review.expert_score || "N/A"})</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-100 inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 text-blue-800">
                  {review.category || "Review"}
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">
                  {review.expert_summary || "No summary available"}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trust Score:</span>
                    <span className="text-green-600 font-bold">{review.trust_score || "N/A"}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payout Speed:</span>
                    <span className="text-purple-600 font-bold">{review.payout_speed || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviewer:</span>
                    <span className="text-gray-800 font-medium">Expert Review</span>
                  </div>
                </div>

                <Link
                  to={`/firm/${review.propfirms?.id}`}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors text-center"
                >
                  Read Full Review
                </Link>
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No reviews found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
