
import { useState } from "react";
import { usePropFirms } from "@/hooks/usePropFirms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, Plus } from "lucide-react";

export const AdminFirms = () => {
  const { data: firms, isLoading } = usePropFirms();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    original_price: "",
    discount: "",
    coupon_code: "",
    review_score: "",
    trust_rating: "",
    profit_split: "",
    payout_rate: "",
    platform: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      original_price: "",
      discount: "",
      coupon_code: "",
      review_score: "",
      trust_rating: "",
      profit_split: "",
      payout_rate: "",
      platform: "",
      description: "",
    });
    setIsEditing(null);
    setIsAdding(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const firmData = {
      name: formData.name,
      price: formData.price ? parseFloat(formData.price) : null,
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      discount: formData.discount ? parseFloat(formData.discount) : null,
      coupon_code: formData.coupon_code || null,
      review_score: formData.review_score ? parseFloat(formData.review_score) : null,
      trust_rating: formData.trust_rating ? parseFloat(formData.trust_rating) : null,
      profit_split: formData.profit_split ? parseFloat(formData.profit_split) : null,
      payout_rate: formData.payout_rate ? parseFloat(formData.payout_rate) : null,
      platform: formData.platform || null,
      description: formData.description || null,
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from("propfirms")
          .update(firmData)
          .eq("id", isEditing);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Firm updated successfully!",
        });
      } else {
        const { error } = await supabase
          .from("propfirms")
          .insert([firmData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Firm added successfully!",
        });
      }
      
      queryClient.invalidateQueries({ queryKey: ["propfirms"] });
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (firm: any) => {
    setFormData({
      name: firm.name || "",
      price: firm.price?.toString() || "",
      original_price: firm.original_price?.toString() || "",
      discount: firm.discount?.toString() || "",
      coupon_code: firm.coupon_code || "",
      review_score: firm.review_score?.toString() || "",
      trust_rating: firm.trust_rating?.toString() || "",
      profit_split: firm.profit_split?.toString() || "",
      payout_rate: firm.payout_rate?.toString() || "",
      platform: firm.platform || "",
      description: firm.description || "",
    });
    setIsEditing(firm.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this firm?")) return;
    
    try {
      const { error } = await supabase
        .from("propfirms")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Firm deleted successfully!",
      });
      
      queryClient.invalidateQueries({ queryKey: ["propfirms"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading firms...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Prop Firms</h2>
        <Button
          onClick={() => setIsAdding(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Firm
        </Button>
      </div>

      {(isAdding || isEditing) && (
        <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
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
                  required
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform" className="text-white">Platform</Label>
                <Input
                  id="platform"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-white">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="original_price" className="text-white">Original Price</Label>
                <Input
                  id="original_price"
                  type="number"
                  step="0.01"
                  value={formData.original_price}
                  onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount" className="text-white">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  step="0.01"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coupon_code" className="text-white">Coupon Code</Label>
                <Input
                  id="coupon_code"
                  value={formData.coupon_code}
                  onChange={(e) => setFormData({ ...formData, coupon_code: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review_score" className="text-white">Review Score</Label>
                <Input
                  id="review_score"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.review_score}
                  onChange={(e) => setFormData({ ...formData, review_score: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trust_rating" className="text-white">Trust Rating</Label>
                <Input
                  id="trust_rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.trust_rating}
                  onChange={(e) => setFormData({ ...formData, trust_rating: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profit_split" className="text-white">Profit Split (%)</Label>
                <Input
                  id="profit_split"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.profit_split}
                  onChange={(e) => setFormData({ ...formData, profit_split: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payout_rate" className="text-white">Payout Rate (%)</Label>
                <Input
                  id="payout_rate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.payout_rate}
                  onChange={(e) => setFormData({ ...formData, payout_rate: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={3}
                />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {isEditing ? "Update Firm" : "Add Firm"}
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
        {firms?.map((firm) => (
          <Card key={firm.id} className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-white">{firm.name}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(firm)}
                    className="text-blue-400 hover:bg-slate-700"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(firm.id)}
                    className="text-red-400 hover:bg-slate-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-gray-400">
                {firm.platform} • ${firm.price} • ⭐ {firm.review_score}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">{firm.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
