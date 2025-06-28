
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { PropFirmData } from '../../hooks/useAdminOperations';

interface RatingFieldsProps {
  formData: PropFirmData;
  updateFormData: (field: keyof PropFirmData, value: any) => void;
  errors: Record<string, string>;
}

export const RatingFields: React.FC<RatingFieldsProps> = ({ 
  formData, 
  updateFormData, 
  errors 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="review_score" className="text-white">Review Score (1-5)</Label>
        <Input
          id="review_score"
          type="number"
          min="1"
          max="5"
          step="0.1"
          value={formData.review_score || ''}
          onChange={(e) => updateFormData('review_score', parseFloat(e.target.value) || 0)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter review score"
        />
      </div>

      <div>
        <Label htmlFor="trust_rating" className="text-white">Trust Rating (1-10)</Label>
        <Input
          id="trust_rating"
          type="number"
          min="1"
          max="10"
          value={formData.trust_rating || ''}
          onChange={(e) => updateFormData('trust_rating', parseFloat(e.target.value) || 0)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter trust rating"
        />
      </div>

      <div>
        <Label htmlFor="profit_split" className="text-white">Profit Split (%)</Label>
        <Input
          id="profit_split"
          type="number"
          min="0"
          max="100"
          value={formData.profit_split || ''}
          onChange={(e) => updateFormData('profit_split', parseFloat(e.target.value) || 0)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter profit split"
        />
      </div>

      <div>
        <Label htmlFor="payout_rate" className="text-white">Payout Rate (%)</Label>
        <Input
          id="payout_rate"
          type="number"
          min="0"
          max="100"
          value={formData.payout_rate || ''}
          onChange={(e) => updateFormData('payout_rate', parseFloat(e.target.value) || 0)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter payout rate"
        />
      </div>
    </div>
  );
};
