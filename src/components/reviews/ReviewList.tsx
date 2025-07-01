
import React, { useState } from 'react';
import { useUserReviews } from '@/hooks/useUserReviews';
import { ReviewCard } from './ReviewCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';

interface ReviewListProps {
  firmId: string;
  isDarkMode?: boolean;
}

export const ReviewList: React.FC<ReviewListProps> = ({ firmId, isDarkMode = true }) => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const { data: reviews, isLoading, error } = useUserReviews(firmId);

  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-400">Error loading reviews</div>;

  const sortedReviews = reviews ? [...reviews].sort((a, b) => {
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
  }) : [];

  const averageRating = reviews?.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      {reviews && reviews.length > 0 && (
        <div className={`${isDarkMode ? 'bg-slate-800/60 backdrop-blur-sm border-slate-700/50' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className={`text-3xl font-bold ${textPrimary}`}>{averageRating.toFixed(1)}</div>
              <div className={`text-sm ${textSecondary} mt-1`}>Average Rating</div>
            </div>
            <div>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{reviews.length}</div>
              <div className={`text-sm ${textSecondary} mt-1`}>Total Reviews</div>
            </div>
            <div>
              <div className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                {Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100)}%
              </div>
              <div className={`text-sm ${textSecondary} mt-1`}>Positive Reviews</div>
            </div>
          </div>
        </div>
      )}

      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <h3 className={`text-xl font-bold ${textPrimary}`}>
          Reviews ({reviews?.length || 0})
        </h3>
        
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as any)}
          className={`px-3 py-2 rounded border ${
            isDarkMode 
              ? 'bg-slate-700/60 text-white border-slate-600/50' 
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.length === 0 ? (
          <div className={`${isDarkMode ? 'bg-slate-800/60 backdrop-blur-sm border-slate-700/50' : 'bg-white border-gray-200'} rounded-lg p-8 border text-center`}>
            <p className={textSecondary}>
              Be the first to review this prop firm!
            </p>
          </div>
        ) : (
          sortedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={{
                id: review.id,
                user_name: review.reviewer_name || 'Anonymous',
                rating: review.rating,
                content: review.comment || '',
                created_at: review.created_at
              }}
              isDarkMode={isDarkMode}
            />
          ))
        )}
      </div>
    </div>
  );
};
