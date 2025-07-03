
import { useState, useCallback } from "react";
import { usePropFirms } from "@/hooks/usePropFirms";
import { useAdminOperations } from "@/hooks/useAdminOperations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, Plus, Loader2, Star, DollarSign, TrendingUp } from "lucide-react";
import { AffiliateFormField } from "./AffiliateFormField";

export const AdminFirms = () => {
  const { data: firms, isLoading, error } = usePropFirms();
  const { addFirm, updateFirm, deleteFirm } = useAdminOperations();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    review_score: "",
    trust_rating: "",
    platform: "",
    payout_rate: "",
    profit_split: "",
    max_funding: "",
    original_price: "",
    discount: "",
    affiliate_link: "",
  });

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      description: "",
      price: "",
      review_score: "",
      trust_rating: "",
      platform: "",
      payout_rate: "",
      profit_split: "",
      max_funding: "",
      original_price: "",
      discount: "",
      affiliate_link: "",
    });
    setIsEditing(null);
    setIsAdding(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({ 
        title: "Error", 
        description: "Firm name is required", 
        variant: "destructive" 
      });
      return;
    }

    setIsSubmitting(true);
    
    const firmData = {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      price: formData.price ? parseFloat(formData.price) : 0,
      original_price: formData.original_price ? parseFloat(formData.original_price) : parseFloat(formData.price) || 0,
      discount: formData.discount ? parseFloat(formData.discount) : 0,
      review_score: formData.review_score ? parseFloat(formData.review_score) : 0,
      trust_rating: formData.trust_rating ? parseFloat(formData.trust_rating) : 0,
      platform: formData.platform.trim() || undefined,
      payout_rate: formData.payout_rate ? parseFloat(formData.payout_rate) : 0,
      profit_split: formData.profit_split ? parseFloat(formData.profit_split) : 0,
      max_funding: formData.max_funding || undefined,
      affiliate_link: formData.affiliate_link.trim() || undefined,
    };

    try {
      let result;
      if (isEditing) {
        result = await updateFirm(isEditing, firmData);
        if (result.success) {
          toast({ title: "Success", description: "Firm updated successfully!" });
        }
      } else {
        result = await addFirm(firmData);
        if (result.success) {
          toast({ title: "Success", description: "Firm added successfully!" });
        }
      }
      
      if (!result.success) {
        toast({ 
          title: "Error", 
          description: result.error || "Operation failed", 
          variant: "destructive" 
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ["propfirms"] });
        resetForm();
      }
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message || "An unexpected error occurred", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (firm: any) => {
    setFormData({
      name: firm.name || "",
      description: firm.description || "",
      price: firm.price?.toString() || "",
      original_price: firm.original_price?.toString() || "",
      discount: firm.discount?.toString() || "",
      review_score: firm.review_score?.toString() || "",
      trust_rating: firm.trust_rating?.toString() || "",
      platform: firm.platform || "",
      payout_rate: firm.payout_rate?.toString() || "",
      profit_split: firm.profit_split?.toString() || "",
      max_funding: firm.max_funding?.toString() || "",
      affiliate_link: firm.affiliate_link || "",
    });
    setIsEditing(firm.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    
    try {
      const result = await deleteFirm(id);
      if (result.success) {
        toast({ title: "Success", description: "Firm deleted successfully!" });
        await queryClient.invalidateQueries({ queryKey: ["propfirms"] });
      } else {
        toast({ 
          title: "Error", 
          description: result.error || "Failed to delete firm", 
          variant: "destructive" 
        });
      }
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message || "An unexpected error occurred", 
        variant: "destructive" 
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="glass-card p-8 text-center">
          <div className="loading-dots mx-auto mb-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span className="text-white/80 text-lg">Loading firms...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-red-400 mb-4 text-lg">Error loading firms</p>
        <p className="text-white/60 mb-4">Please try refreshing the page</p>
        <Button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ["propfirms"] })}
          className="btn-premium"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gradient-text-purple">Manage Prop Firms</h2>
        <Button
          onClick={() => setIsAdding(true)}
          className="btn-premium glow-purple"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Firm
        </Button>
      </div>

      {(isAdding || isEditing) && (
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            {isEditing ? "Edit Firm" : "Add New Firm"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-semibold">Firm Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="glass-input"
                placeholder="Enter firm name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform" className="text-white font-semibold">Platform</Label>
              <Input
                id="platform"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="glass-input"
                placeholder="e.g., MetaTrader 4/5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-white font-semibold">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="glass-input"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="original_price" className="text-white font-semibold">Original Price ($)</Label>
              <Input
                id="original_price"
                type="number"
                step="0.01"
                value={formData.original_price}
                onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                className="glass-input"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount" className="text-white font-semibold">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                step="0.01"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className="glass-input"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payout_rate" className="text-white font-semibold">Payout Rate (%)</Label>
              <Input
                id="payout_rate"
                type="number"
                step="0.01"
                value={formData.payout_rate}
                onChange={(e) => setFormData({ ...formData, payout_rate: e.target.value })}
                className="glass-input"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profit_split" className="text-white font-semibold">Profit Split (%)</Label>
              <Input
                id="profit_split"
                type="number"
                step="0.01"
                value={formData.profit_split}
                onChange={(e) => setFormData({ ...formData, profit_split: e.target.value })}
                className="glass-input"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_funding" className="text-white font-semibold">Max Funding</Label>
              <Input
                id="max_funding"
                value={formData.max_funding}
                onChange={(e) => setFormData({ ...formData, max_funding: e.target.value })}
                className="glass-input"
                placeholder="e.g., 100000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review_score" className="text-white font-semibold">Review Score (1-5)</Label>
              <Input
                id="review_score"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.review_score}
                onChange={(e) => setFormData({ ...formData, review_score: e.target.value })}
                className="glass-input"
                placeholder="0.0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trust_rating" className="text-white font-semibold">Trust Rating (1-10)</Label>
              <Input
                id="trust_rating"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.trust_rating}
                onChange={(e) => setFormData({ ...formData, trust_rating: e.target.value })}
                className="glass-input"
                placeholder="0.0"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description" className="text-white font-semibold">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="glass-input"
                placeholder="Enter firm description"
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <AffiliateFormField
                value={formData.affiliate_link}
                onChange={(value) => setFormData({ ...formData, affiliate_link: value })}
              />
            </div>

            <div className="md:col-span-2 flex gap-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-success glow-green"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isEditing ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  isEditing ? "Update Firm" : "Add Firm"
                )}
              </Button>
              <Button 
                type="button" 
                onClick={resetForm} 
                className="glass-input border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {firms?.map((firm) => (
          <div key={firm.id} className="glass-card p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{firm.name}</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleEdit(firm)}
                  className="btn-premium p-2"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDelete(firm.id, firm.name)}
                  className="btn-danger p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-white/80">${firm.price}</span>
                {firm.discount > 0 && (
                  <span className="text-green-400 text-sm">({firm.discount}% off)</span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white/80">{firm.review_score}/5</span>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-white/80">Trust: {firm.trust_rating}/10</span>
              </div>
              
              <p className="text-white/60 text-sm line-clamp-3">{firm.description}</p>
              <p className="text-white/50 text-xs">Platform: {firm.platform}</p>
            </div>
          </div>
        ))}
      </div>

      {firms?.length === 0 && (
        <div className="text-center py-12">
          <div className="glass-card p-8">
            <p className="text-white/60 text-lg mb-4">No firms found. Add one to get started!</p>
            <Button
              onClick={() => setIsAdding(true)}
              className="btn-premium glow-purple"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Firm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
