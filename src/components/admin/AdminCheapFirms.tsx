
import { useState } from "react";
import { useCheapFirms } from "@/hooks/useCheapFirms";
import { usePropFirms } from "@/hooks/usePropFirms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2, Plus } from "lucide-react";

export const AdminCheapFirms = () => {
  const { data: cheapFirms, isLoading: cheapLoading } = useCheapFirms();
  const { data: allFirms, isLoading: firmsLoading } = usePropFirms();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFirmId, setSelectedFirmId] = useState("");

  const availableFirms = allFirms?.filter(firm => 
    !cheapFirms?.some(cheapFirm => cheapFirm.id === firm.id)
  ) || [];

  const handleAdd = async () => {
    if (!selectedFirmId) {
      toast({
        title: "Error",
        description: "Please select a firm to add.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("cheap_firms")
        .insert([{ firm_id: selectedFirmId }]);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Firm added to cheap firms successfully!",
      });
      
      queryClient.invalidateQueries({ queryKey: ["cheap-firms"] });
      setSelectedFirmId("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRemove = async (firmId: string) => {
    if (!confirm("Are you sure you want to remove this firm from cheap firms?")) return;
    
    try {
      const { error } = await supabase
        .from("cheap_firms")
        .delete()
        .eq("firm_id", firmId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Firm removed from cheap firms successfully!",
      });
      
      queryClient.invalidateQueries({ queryKey: ["cheap-firms"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (cheapLoading || firmsLoading) {
    return <div className="text-white">Loading cheap firms...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Cheap Firms</h2>
      </div>

      <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Add Firm to Cheap Category</CardTitle>
          <CardDescription className="text-gray-400">
            Select a firm to add to the cheap firms section
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
                      {firm.name} - ${firm.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700"
              disabled={!selectedFirmId}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Cheap Firms
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cheapFirms?.map((firm) => (
          <Card key={firm.id} className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-white">{firm.name}</CardTitle>
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
                ${firm.price} • ⭐ {firm.review_score}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">{firm.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {cheapFirms?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No firms in cheap category yet.</p>
        </div>
      )}
    </div>
  );
};
