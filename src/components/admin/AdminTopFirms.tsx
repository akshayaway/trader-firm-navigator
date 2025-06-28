
import { useState } from "react";
import { useTopFirms } from "@/hooks/useTopFirms";
import { usePropFirms } from "@/hooks/usePropFirms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2, Plus } from "lucide-react";

export const AdminTopFirms = () => {
  const { data: topFirms, isLoading: topLoading } = useTopFirms();
  const { data: allFirms, isLoading: firmsLoading } = usePropFirms();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFirmId, setSelectedFirmId] = useState("");
  const [rank, setRank] = useState("");

  const availableFirms = allFirms?.filter(firm => 
    !topFirms?.some(topFirm => topFirm.id === firm.id)
  ) || [];

  const handleAdd = async () => {
    if (!selectedFirmId || !rank) {
      toast({
        title: "Error",
        description: "Please select a firm and enter a rank.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("top_firms")
        .insert([{ 
          firm_id: selectedFirmId,
          rank: parseInt(rank)
        }]);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Firm added to top firms successfully!",
      });
      
      queryClient.invalidateQueries({ queryKey: ["top-firms"] });
      setSelectedFirmId("");
      setRank("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRemove = async (firmId: string) => {
    if (!confirm("Are you sure you want to remove this firm from top firms?")) return;
    
    try {
      const { error } = await supabase
        .from("top_firms")
        .delete()
        .eq("firm_id", firmId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Firm removed from top firms successfully!",
      });
      
      queryClient.invalidateQueries({ queryKey: ["top-firms"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (topLoading || firmsLoading) {
    return <div className="text-white">Loading top firms...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Top Firms</h2>
      </div>

      <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Add Firm to Top Category</CardTitle>
          <CardDescription className="text-gray-400">
            Select a firm and set its rank in the top firms section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={selectedFirmId} onValueChange={setSelectedFirmId}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select a firm to add" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {availableFirms.map((firm) => (
                    <SelectItem key={firm.id} value={firm.id} className="text-white">
                      {firm.name} - ⭐ {firm.review_score}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-24">
              <Input
                type="number"
                placeholder="Rank"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                min="1"
                max="10"
              />
            </div>
            <Button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700"
              disabled={!selectedFirmId || !rank}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Top Firms
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topFirms?.map((firm, index) => (
          <Card key={firm.id} className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      #{index + 1}
                    </span>
                    {firm.name}
                  </CardTitle>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemove(firm.id)}
                  className="text-red-400 hover:bg-slate-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription className="text-gray-400">
                ${firm.price} • ⭐ {firm.review_score} • Trust: {firm.trust_rating}/10
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">{firm.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {topFirms?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No firms in top category yet.</p>
        </div>
      )}
    </div>
  );
};
