
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAccountSizes = (firmId?: string) => {
  return useQuery({
    queryKey: ["account_sizes", firmId],
    queryFn: async () => {
      let query = supabase
        .from("account_sizes")
        .select("*")
        .order("price", { ascending: true });
      
      if (firmId) {
        query = query.eq("firm_id", firmId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching account sizes:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!firmId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
