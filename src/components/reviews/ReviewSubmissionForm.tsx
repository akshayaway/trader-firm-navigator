import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { useAddUserReview } from '@/hooks/useUserReviews';
import { usePropFirms } from '@/hooks/usePropFirms';
import { useToast } from '@/hooks/use-toast';

export const ReviewSubmissionForm = () => {
  const [formData, setFormData] = useState({
    firm_id: '',
    reviewer_name: '',
    title: '',
    comment: '',
    rating: 0
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const { data: firms } = usePropFirms();
  const addReview = useAddUserReview();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firm_id || !formData.rating) {
      toast({
        title: "Error",
        description: "Please select a firm and provide a rating",
        variant: "destructive"
      });
      return;
    }

    try {
      await addReview.mutateAsync(formData);
      toast({
        title: "Success",
        description: "Your review has been submitted successfully!"
      });
      
      // Reset form
      setFormData({
        firm_id: '',
        reviewer_name: '',
        title: '',
        comment: '',
        rating: 0
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-2xl font-bold text-white mb-6">Submit Your Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firm_id" className="text-white">Select Prop Firm *</Label>
            <Select value={formData.firm_id} onValueChange={(value) => setFormData(prev => ({ ...prev, firm_id: value }))}>
              <SelectTrigger className="bg-slate-700/60 border-slate-600/50 text-white">
                <SelectValue placeholder="Choose a firm to review" />
              </SelectTrigger>
              <SelectContent>
                {firms?.map((firm) => (
                  <SelectItem key={firm.id} value={firm.id}>
                    {firm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviewer_name" className="text-white">Your Name</Label>
            <Input
              id="reviewer_name"
              value={formData.reviewer_name}
              onChange={(e) => setFormData(prev => ({ ...prev, reviewer_name: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white placeholder-gray-400"
              placeholder="Enter your name (optional)"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className="text-white">Review Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="bg-slate-700/60 border-slate-600/50 text-white placeholder-gray-400"
            placeholder="Brief title for your review"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Rating *</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-all hover:scale-110"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || formData.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment" className="text-white">Your Review</Label>
          <Textarea
            id="comment"
            value={formData.comment}
            onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
            className="bg-slate-700/60 border-slate-600/50 text-white placeholder-gray-400"
            placeholder="Share your experience with this prop firm..."
            rows={5}
          />
        </div>

        <Button 
          type="submit" 
          disabled={addReview.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
        >
          {addReview.isPending ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
};