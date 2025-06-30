
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAddUserReview } from '@/hooks/useUserReviews';
import { toast } from 'sonner';

interface ReviewSubmissionFormProps {
  firmId: string;
  firmName: string;
  onSuccess?: () => void;
}

export const ReviewSubmissionForm: React.FC<ReviewSubmissionFormProps> = ({
  firmId,
  firmName,
  onSuccess
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  const addReviewMutation = useAddUserReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    try {
      await addReviewMutation.mutateAsync({
        firm_id: firmId,
        rating,
        title: title.trim() || undefined,
        comment: comment.trim() || undefined,
        reviewer_name: reviewerName.trim() || 'Anonymous'
      });

      toast.success('Review submitted successfully!');
      
      // Reset form
      setRating(0);
      setTitle('');
      setComment('');
      setReviewerName('');
      
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
      <h3 className="text-xl font-bold text-white mb-4">Write a Review for {firmName}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div>
          <Label className="text-white mb-2 block">Rating *</Label>
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
          <p className="text-sm text-gray-400 mt-1">
            {rating > 0 && `You rated this ${rating} star${rating !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Reviewer Name */}
        <div>
          <Label htmlFor="reviewer_name" className="text-white">Your Name (Optional)</Label>
          <Input
            id="reviewer_name"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            placeholder="Leave blank to post as Anonymous"
            className="bg-slate-700/60 border-slate-600/50 text-white placeholder-gray-400"
          />
        </div>

        {/* Review Title */}
        <div>
          <Label htmlFor="title" className="text-white">Review Title (Optional)</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience..."
            className="bg-slate-700/60 border-slate-600/50 text-white placeholder-gray-400"
          />
        </div>

        {/* Review Comment */}
        <div>
          <Label htmlFor="comment" className="text-white">Your Review (Optional)</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell others about your experience with this prop firm..."
            rows={4}
            className="bg-slate-700/60 border-slate-600/50 text-white placeholder-gray-400"
          />
        </div>

        <Button
          type="submit"
          disabled={rating === 0 || addReviewMutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {addReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
};
