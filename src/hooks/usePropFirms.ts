
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePropFirms = () => {
  return useQuery({
    queryKey: ["propfirms"],
    queryFn: async () => {
      console.log('Fetching prop firms from Supabase...');
      const { data, error } = await supabase
        .from("propfirms")
        .select("*")
        .order("review_score", { ascending: false });
      
      if (error) {
        console.error('Error fetching prop firms:', error);
        throw error;
      }
      
      console.log('Fetched prop firms:', data);
      return data;
    },
    staleTime: 0, // Always refetch when requested
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });
};
