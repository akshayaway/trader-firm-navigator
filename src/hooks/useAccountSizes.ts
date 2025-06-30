
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAccountSizes = (firmId?: string) => {
  return useQuery({
    queryKey: ["account_sizes", firmId],
    queryFn: async () => {
      console.log('Fetching account sizes from Supabase...');
      
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
      
      console.log('Fetched account sizes:', data);
      return data || [];
    },
    enabled: !!firmId,
  });
};
