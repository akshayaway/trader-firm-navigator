
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useUserReviews = (firmId?: string) => {
  return useQuery({
    queryKey: ['user_reviews', firmId],
    queryFn: async () => {
      let query = supabase
        .from('user_reviews')
        .select('*, propfirms(name)')
        .order('created_at', { ascending: false });
      
      if (firmId) {
        query = query.eq('firm_id', firmId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};

export const useAddUserReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reviewData: {
      firm_id: string;
      rating: number;
      title?: string;
      comment?: string;
      reviewer_name?: string;
    }) => {
      const { data, error } = await supabase
        .from('user_reviews')
        .insert(reviewData)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_reviews'] });
    },
  });
};
