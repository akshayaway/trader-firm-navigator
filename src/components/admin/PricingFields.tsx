
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { PropFirmData } from '../../hooks/useAdminOperations';

interface PricingFieldsProps {
  formData: PropFirmData;
  updateFormData: (field: keyof PropFirmData, value: any) => void;
  errors: Record<string, string>;
}

export const PricingFields: React.FC<PricingFieldsProps> = ({ 
  formData, 
  updateFormData, 
  errors 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="price" className="text-white">Price *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price || ''}
          onChange={(e) => updateFormData('price', parseFloat(e.target.value) || 0)}
          className={`bg-slate-600 border-slate-500 text-white ${errors.price ? 'border-red-500' : ''}`}
          placeholder="Enter price"
        />
        {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
      </div>

      <div>
        <Label htmlFor="original_price" className="text-white">Original Price</Label>
        <Input
          id="original_price"
          type="number"
          step="0.01"
          value={formData.original_price || ''}
          onChange={(e) => updateFormData('original_price', parseFloat(e.target.value) || 0)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter original price"
        />
      </div>

      <div>
        <Label htmlFor="discount" className="text-white">Discount (%)</Label>
        <Input
          id="discount"
          type="number"
          value={formData.discount || ''}
          onChange={(e) => updateFormData('discount', parseFloat(e.target.value) || 0)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter discount percentage"
        />
      </div>

      <div>
        <Label htmlFor="coupon_code" className="text-white">Coupon Code</Label>
        <Input
          id="coupon_code"
          type="text"
          value={formData.coupon_code || ''}
          onChange={(e) => updateFormData('coupon_code', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter coupon code"
        />
      </div>

      <div>
        <Label htmlFor="starting_fee" className="text-white">Starting Fee</Label>
        <Input
          id="starting_fee"
          type="number"
          step="0.01"
          value={formData.starting_fee || ''}
          onChange={(e) => updateFormData('starting_fee', parseFloat(e.target.value) || 0)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter starting fee"
        />
      </div>
    </div>
  );
};
