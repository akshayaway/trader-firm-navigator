
import React, { useState } from 'react';
import { Star, Filter } from 'lucide-react';
import { useUserReviews } from '@/hooks/useUserReviews';
import { LoadingSpinner } from './LoadingSpinner';
import { Button } from '@/components/ui/button';

interface ReviewsListProps {
  firmId?: string;
  showFirmName?: boolean;
}

export const ReviewsList: React.FC<ReviewsListProps> = ({ 
  firmId, 
  showFirmName = false 
}) => {
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  
  const { data: reviews, isLoading, error } = useUserReviews(firmId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-400">Error loading reviews</div>;

  const filteredReviews = reviews?.filter(review => 
    ratingFilter ? review.rating === ratingFilter : true
  ) || [];

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
          }`}
        />
      ))}
    </div>
  );

  const averageRating = reviews?.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      {reviews && reviews.length > 0 && (
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-white">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mt-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-sm text-gray-400 mt-1">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">{reviews.length}</div>
              <div className="text-sm text-gray-400 mt-1">Total Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">
                {Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100)}%
              </div>
              <div className="text-sm text-gray-400 mt-1">Positive Reviews</div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-white text-sm">Filter by rating:</span>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setRatingFilter(null)}
              size="sm"
              variant={ratingFilter === null ? "default" : "outline"}
              className={ratingFilter === null ? "bg-blue-600" : "border-slate-600 text-gray-300"}
            >
              All
            </Button>
            {[5, 4, 3, 2, 1].map(rating => (
              <Button
                key={rating}
                onClick={() => setRatingFilter(rating)}
                size="sm"
                variant={ratingFilter === rating ? "default" : "outline"}
                className={ratingFilter === rating ? "bg-blue-600" : "border-slate-600 text-gray-300"}
              >
                {rating} ⭐
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-white text-sm">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="px-3 py-1 bg-slate-700/60 text-white rounded border border-slate-600/50 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.length === 0 ? (
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50 text-center">
            <p className="text-gray-400">
              {ratingFilter ? `No ${ratingFilter}-star reviews found.` : 'No reviews yet. Be the first to share your experience!'}
            </p>
          </div>
        ) : (
          sortedReviews.map((review) => (
            <div key={review.id} className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-white font-medium">
                      {review.reviewer_name || 'Anonymous'}
                    </span>
                    {showFirmName && review.propfirms && (
                      <span className="text-blue-400">• {review.propfirms.name}</span>
                    )}
                  </div>
                  {review.title && (
                    <h4 className="text-white font-semibold mb-2">{review.title}</h4>
                  )}
                </div>
                <span className="text-gray-400 text-sm">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              
              {review.comment && (
                <p className="text-gray-300 leading-relaxed">{review.comment}</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Results Summary */}
      {reviews && reviews.length > 0 && (
        <div className="text-center text-gray-400 text-sm">
          Showing {sortedReviews.length} of {reviews.length} reviews
          {ratingFilter && ` with ${ratingFilter} star${ratingFilter !== 1 ? 's' : ''}`}
        </div>
      )}
    </div>
  );
};
