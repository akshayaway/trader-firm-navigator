
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { PropFirmData } from '../../hooks/useAdminOperations';

interface TradingFieldsProps {
  formData: PropFirmData;
  updateFormData: (field: keyof PropFirmData, value: any) => void;
  errors: Record<string, string>;
}

export const TradingFields: React.FC<TradingFieldsProps> = ({ 
  formData, 
  updateFormData, 
  errors 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="platform" className="text-white">Platform</Label>
        <Input
          id="platform"
          type="text"
          value={formData.platform || ''}
          onChange={(e) => updateFormData('platform', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter trading platform"
        />
      </div>

      <div>
        <Label htmlFor="regulation" className="text-white">Regulation</Label>
        <Input
          id="regulation"
          type="text"
          value={formData.regulation || ''}
          onChange={(e) => updateFormData('regulation', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter regulation info"
        />
      </div>

      <div>
        <Label htmlFor="evaluation_model" className="text-white">Evaluation Model</Label>
        <Input
          id="evaluation_model"
          type="text"
          value={formData.evaluation_model || ''}
          onChange={(e) => updateFormData('evaluation_model', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter evaluation model"
        />
      </div>

      <div>
        <Label htmlFor="max_funding" className="text-white">Max Funding</Label>
        <Input
          id="max_funding"
          type="text"
          value={formData.max_funding || ''}
          onChange={(e) => updateFormData('max_funding', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter max funding (e.g., $100,000)"
        />
      </div>

      <div>
        <Label htmlFor="funding_amount" className="text-white">Funding Amount</Label>
        <Input
          id="funding_amount"
          type="text"
          value={formData.funding_amount || ''}
          onChange={(e) => updateFormData('funding_amount', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter funding amount range"
        />
      </div>
    </div>
  );
};
