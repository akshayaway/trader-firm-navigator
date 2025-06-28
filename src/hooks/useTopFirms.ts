
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTopFirms = () => {
  return useQuery({
    queryKey: ["top-firms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("top_firms")
        .select(`
          id,
          rank,
          propfirms (*)
        `)
        .order("rank", { ascending: true });
      
      if (error) throw error;
      return data?.map(item => item.propfirms).filter(Boolean) || [];
    },
  });
};
