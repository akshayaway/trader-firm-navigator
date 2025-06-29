
import { supabase } from '../integrations/supabase/client';

export interface PropFirmData {
  name: string;
  brand?: string;
  slug?: string;
  category_id?: string | null;
  price?: number;
  original_price?: number;
  discount?: number;
  coupon_code?: string;
  review_score?: number;
  trust_rating?: number;
  profit_split?: number;
  payout_rate?: number;
  description?: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
  platform?: string;
  regulation?: string;
  evaluation_model?: string;
  max_funding?: string;
  starting_fee?: number;
  funding_amount?: string;
}

export const useAdminOperations = () => {
  const addFirm = async (firmData: PropFirmData) => {
    try {
      console.log('Adding firm with data:', firmData);
      
      // Clean data structure to match database schema exactly
      const completeData = {
        name: firmData.name || '',
        description: firmData.description || null,
        price: firmData.price || 0,
        original_price: firmData.original_price || firmData.price || 0,
        discount: firmData.discount || 0,
        coupon_code: firmData.coupon_code || null,
        review_score: firmData.review_score || 0,
        trust_rating: firmData.trust_rating || 0,
        profit_split: firmData.profit_split || 0,
        payout_rate: firmData.payout_rate || 0,
        features: firmData.features || [],
        pros: firmData.pros || [],
        cons: firmData.cons || [],
        platform: firmData.platform || null,
        max_funding: firmData.max_funding ? parseFloat(firmData.max_funding.replace(/[$,]/g, '')) || null : null,
        tags: [],
        logo_url: null,
        regulation_country: firmData.regulation || null,
        trading_levels: []
      };

      const { data, error } = await supabase
        .from('propfirms')
        .insert(completeData)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      console.log('Firm added successfully:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Error adding firm:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to add firm' 
      };
    }
  };

  const updateFirm = async (id: string, firmData: Partial<PropFirmData>) => {
    try {
      console.log('Updating firm:', id, 'with data:', firmData);
      
      const updateData = {
        ...firmData,
        max_funding: firmData.max_funding ? parseFloat(firmData.max_funding.replace(/[$,]/g, '')) || null : null,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('propfirms')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      console.log('Firm updated successfully:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Error updating firm:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update firm' 
      };
    }
  };

  const deleteFirm = async (id: string) => {
    try {
      console.log('Deleting firm with id:', id);
      
      const { error } = await supabase
        .from('propfirms')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      console.log('Firm deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('Error deleting firm:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete firm' 
      };
    }
  };

  return {
    addFirm,
    updateFirm,
    deleteFirm
  };
};
