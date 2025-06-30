
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export const useAccountSizes = (firmId?: string) => {
  const queryClient = useQueryClient();

  // Set up real-time subscription for account sizes
  useEffect(() => {
    if (!firmId) return;

    const channel = supabase
      .channel(`account-sizes-${firmId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'account_sizes',
          filter: `firm_id=eq.${firmId}`
        },
        () => {
          // Invalidate and refetch the data when changes occur
          queryClient.invalidateQueries({ queryKey: ["account_sizes", firmId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [firmId, queryClient]);

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
