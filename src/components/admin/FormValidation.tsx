
import { PropFirmData } from '../../hooks/useAdminOperations';

export const validateForm = (formData: PropFirmData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Firm name is required';
  }

  if (!formData.price || formData.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  if (formData.review_score && (formData.review_score < 1 || formData.review_score > 5)) {
    errors.review_score = 'Review score must be between 1 and 5';
  }

  if (formData.trust_rating && (formData.trust_rating < 1 || formData.trust_rating > 10)) {
    errors.trust_rating = 'Trust rating must be between 1 and 10';
  }

  if (formData.profit_split && (formData.profit_split < 0 || formData.profit_split > 100)) {
    errors.profit_split = 'Profit split must be between 0 and 100';
  }

  if (formData.payout_rate && (formData.payout_rate < 0 || formData.payout_rate > 100)) {
    errors.payout_rate = 'Payout rate must be between 0 and 100';
  }

  return errors;
};
