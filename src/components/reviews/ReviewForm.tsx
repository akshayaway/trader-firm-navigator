
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ReviewFormProps {
  firmId: string;
  firmName: string;
  onReviewAdded?: () => void;
  isDarkMode?: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ 
  firmId, 
  firmName, 
  onReviewAdded,
  isDarkMode = true 
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardBg = isDarkMode 
    ? 'bg-slate-800/60 backdrop-blur-sm border-slate-700/50' 
    : 'bg-white border-gray-200';
  
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!userName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!content.trim()) {
      toast.error('Please write a review');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('user_reviews')
        .insert({
          firm_id: firmId,
          rating,
          reviewer_name: userName.trim(),
          comment: content.trim()
        });

      if (error) throw error;

      toast.success('Review submitted successfully!');
      
      // Reset form
      setRating(0);
      setUserName('');
      setContent('');
      
      onReviewAdded?.();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${cardBg} rounded-lg p-6 border shadow-lg`}>
      <h3 className={`text-xl font-bold ${textPrimary} mb-4`}>Write a Review for {firmName}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div>
          <Label className={`${textPrimary} mb-2 block`}>Rating *</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-colors"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className={`text-sm ${textSecondary} mt-1`}>
              You rated this {rating} star{rating !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* User Name */}
        <div>
          <Label htmlFor="user_name" className={textPrimary}>Your Name *</Label>
          <Input
            id="user_name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className={`${isDarkMode ? 'bg-slate-700/60 border-slate-600/50 text-white placeholder-gray-400' : ''}`}
            required
          />
        </div>

        {/* Review Content */}
        <div>
          <Label htmlFor="content" className={textPrimary}>Your Review *</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell others about your experience with this prop firm..."
            rows={4}
            className={`${isDarkMode ? 'bg-slate-700/60 border-slate-600/50 text-white placeholder-gray-400' : ''}`}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={rating === 0 || !userName.trim() || !content.trim() || isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
};
