
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePropFirms = () => {
  return useQuery({
    queryKey: ["propfirms"],
    queryFn: async () => {
      console.log('Fetching prop firms from Supabase...');
      
      const { data, error } = await supabase
        .from("propfirms")
        .select(`
          id,
          name,
          description,
          price,
          original_price,
          discount,
          coupon_code,
          review_score,
          trust_rating,
          profit_split,
          payout_rate,
          max_funding,
          platform,
          features,
          pros,
          cons,
          regulation_country,
          trading_levels,
          tags,
          logo_url,
          affiliate_link,
          buy_now_url,
          slug,
          brand,
          category_id,
          evaluation_model,
          starting_fee,
          funding_amount,
          created_at,
          updated_at
        `)
        .order("review_score", { ascending: false });
      
      if (error) {
        console.error('Error fetching prop firms:', error);
        throw error;
      }
      
      console.log('Fetched prop firms:', data);
      return data || [];
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
