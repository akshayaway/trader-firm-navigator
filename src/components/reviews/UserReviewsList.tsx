import React from 'react';
import { Star, User } from 'lucide-react';
import { useUserReviews } from '@/hooks/useUserReviews';

interface UserReviewsListProps {
  firmId?: string;
}

export const UserReviewsList: React.FC<UserReviewsListProps> = ({ firmId }) => {
  const { data: reviews, isLoading } = useUserReviews(firmId);

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-800/60 rounded-2xl p-6 animate-pulse">
            <div className="h-32 bg-slate-700/50 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No user reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6">
        User Reviews ({reviews.length})
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    {review.reviewer_name || 'Anonymous User'}
                  </h4>
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-400">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {review.title && (
              <h5 className="text-lg font-semibold text-white mb-2">
                {review.title}
              </h5>
            )}

            {review.comment && (
              <p className="text-gray-300 leading-relaxed mb-4">
                {review.comment}
              </p>
            )}

            {review.propfirms && (
              <div className="bg-slate-700/40 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-400">Reviewed: </span>
                <span className="text-blue-400 font-medium">
                  {review.propfirms.name}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};