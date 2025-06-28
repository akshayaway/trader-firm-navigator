
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCheapFirms = () => {
  return useQuery({
    queryKey: ["cheap-firms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cheap_firms")
        .select(`
          id,
          propfirms (*)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data?.map(item => item.propfirms).filter(Boolean) || [];
    },
  });
};
