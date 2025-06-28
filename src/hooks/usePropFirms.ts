
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePropFirms = () => {
  return useQuery({
    queryKey: ["propfirms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("propfirms")
        .select("*")
        .order("review_score", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};
