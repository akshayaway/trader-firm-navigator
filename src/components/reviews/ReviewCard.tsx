
import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: {
    id: string;
    user_name: string;
    rating: number;
    content: string;
    created_at: string;
  };
  isDarkMode?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, isDarkMode = true }) => {
  const cardBg = isDarkMode 
    ? 'bg-slate-800/60 backdrop-blur-sm border-slate-700/50' 
    : 'bg-white border-gray-200';
  
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const textMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500';

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

  return (
    <div className={`${cardBg} rounded-lg p-6 border shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className={`font-semibold ${textPrimary} mb-2`}>{review.user_name}</h4>
          {renderStars(review.rating)}
        </div>
        <span className={`text-sm ${textMuted}`}>
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>
      
      <p className={`${textSecondary} leading-relaxed`}>{review.content}</p>
    </div>
  );
};
