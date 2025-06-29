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
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";

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
      review_score: formData.review_score ? parseFloat(formData.review_score) : 0,
      trust_rating: formData.trust_rating ? parseFloat(formData.trust_rating) : 0,
      platform: formData.platform.trim() || undefined,
      payout_rate: formData.payout_rate ? parseFloat(formData.payout_rate) : 0,
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
      review_score: firm.review_score?.toString() || "",
      trust_rating: firm.trust_rating?.toString() || "",
      platform: firm.platform || "",
      payout_rate: firm.payout_rate?.toString() || "",
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
        <div className="glass-dark rounded-2xl p-8 flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
          <span className="text-white">Loading firms...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-dark rounded-2xl p-8 text-center">
        <p className="text-red-400 mb-4">Error loading firms: {error.message}</p>
        <Button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ["propfirms"] })}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold gradient-text">Manage Prop Firms</h2>
        <Button
          onClick={() => setIsAdding(true)}
          className="btn-gradient glow-blue"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Firm
        </Button>
      </div>

      {(isAdding || isEditing) && (
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="text-white">
              {isEditing ? "Edit Firm" : "Add New Firm"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="glass border-white/20 text-white placeholder-white/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform" className="text-white">Platform</Label>
                <Input
                  id="platform"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="glass border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-white">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="glass border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payout_rate" className="text-white">Payout Rate (%)</Label>
                <Input
                  id="payout_rate"
                  type="number"
                  step="0.01"
                  value={formData.payout_rate}
                  onChange={(e) => setFormData({ ...formData, payout_rate: e.target.value })}
                  className="glass border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review_score" className="text-white">Review Score (1-5)</Label>
                <Input
                  id="review_score"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.review_score}
                  onChange={(e) => setFormData({ ...formData, review_score: e.target.value })}
                  className="glass border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trust_rating" className="text-white">Trust Rating (1-10)</Label>
                <Input
                  id="trust_rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.trust_rating}
                  onChange={(e) => setFormData({ ...formData, trust_rating: e.target.value })}
                  className="glass border-white/20 text-white placeholder-white/50"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="glass border-white/20 text-white placeholder-white/50"
                  rows={3}
                />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-gradient glow-blue"
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
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {firms?.map((firm) => (
          <Card key={firm.id} className="card-professional">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-white">{firm.name}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(firm)}
                    className="text-blue-400 hover:bg-white/10"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(firm.id, firm.name)}
                    className="text-red-400 hover:bg-white/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-gray-400">
                ${firm.price} • ⭐ {firm.review_score} • Trust: {firm.trust_rating}/10
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm line-clamp-3">{firm.description}</p>
              <p className="text-gray-400 text-xs mt-2">Platform: {firm.platform}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {firms?.length === 0 && (
        <div className="text-center py-12">
          <div className="glass-dark rounded-2xl p-8">
            <p className="text-gray-400 text-lg mb-4">No firms found. Add one to get started!</p>
            <Button
              onClick={() => setIsAdding(true)}
              className="btn-gradient glow-blue"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Firm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
