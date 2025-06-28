
import { useState } from "react";
import { useReviews } from "@/hooks/useReviews";
import { usePropFirms } from "@/hooks/usePropFirms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, Plus } from "lucide-react";

export const AdminReviews = () => {
  const { data: reviews, isLoading: reviewsLoading } = useReviews();
  const { data: firms, isLoading: firmsLoading } = usePropFirms();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    firm_id: "",
    expert_score: "",
    trust_score: "",
    category: "",
    payout_speed: "",
    expert_summary: "",
  });

  const resetForm = () => {
    setFormData({
      firm_id: "",
      expert_score: "",
      trust_score: "",
      category: "",
      payout_speed: "",
      expert_summary: "",
    });
    setIsEditing(null);
    setIsAdding(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const reviewData = {
      firm_id: formData.firm_id || null,
      expert_score: formData.expert_score ? parseFloat(formData.expert_score) : null,
      trust_score: formData.trust_score ? parseFloat(formData.trust_score) : null,
      category: formData.category || null,
      payout_speed: formData.payout_speed || null,
      expert_summary: formData.expert_summary || null,
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from("reviews")
          .update(reviewData)
          .eq("id", isEditing);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Review updated successfully!",
        });
      } else {
        const { error } = await supabase
          .from("reviews")
          .insert([reviewData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Review added successfully!",
        });
      }
      
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (review: any) => {
    setFormData({
      firm_id: review.firm_id || "",
      expert_score: review.expert_score?.toString() || "",
      trust_score: review.trust_score?.toString() || "",
      category: review.category || "",
      payout_speed: review.payout_speed || "",
      expert_summary: review.expert_summary || "",
    });
    setIsEditing(review.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Review deleted successfully!",
      });
      
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (reviewsLoading || firmsLoading) {
    return <div className="text-white">Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Reviews</h2>
        <Button
          onClick={() => setIsAdding(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Review
        </Button>
      </div>

      {(isAdding || isEditing) && (
        <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {isEditing ? "Edit Review" : "Add New Review"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firm_id" className="text-white">Prop Firm *</Label>
                <Select value={formData.firm_id} onValueChange={(value) => setFormData({ ...formData, firm_id: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select a firm" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {firms?.map((firm) => (
                      <SelectItem key={firm.id} value={firm.id} className="text-white">
                        {firm.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="e.g., Big, Medium, Small"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expert_score" className="text-white">Expert Score</Label>
                <Input
                  id="expert_score"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.expert_score}
                  onChange={(e) => setFormData({ ...formData, expert_score: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trust_score" className="text-white">Trust Score</Label>
                <Input
                  id="trust_score"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.trust_score}
                  onChange={(e) => setFormData({ ...formData, trust_score: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payout_speed" className="text-white">Payout Speed</Label>
                <Input
                  id="payout_speed"
                  value={formData.payout_speed}
                  onChange={(e) => setFormData({ ...formData, payout_speed: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="e.g., 1-3 days"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="expert_summary" className="text-white">Expert Summary</Label>
                <Textarea
                  id="expert_summary"
                  value={formData.expert_summary}
                  onChange={(e) => setFormData({ ...formData, expert_summary: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={4}
                  placeholder="Write a detailed expert summary..."
                />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {isEditing ? "Update Review" : "Add Review"}
                </Button>
                <Button type="button" onClick={resetForm} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews?.map((review) => (
          <Card key={review.id} className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-white">{review.propfirms?.name || "Unknown Firm"}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(review)}
                    className="text-blue-400 hover:bg-slate-700"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(review.id)}
                    className="text-red-400 hover:bg-slate-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-gray-400">
                {review.category} • Expert: {review.expert_score} • Trust: {review.trust_score}/10
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm line-clamp-3">{review.expert_summary}</p>
              <p className="text-gray-400 text-xs mt-2">Payout: {review.payout_speed}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
