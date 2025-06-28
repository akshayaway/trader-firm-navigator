
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useAdminOperations, PropFirmData } from '../hooks/useAdminOperations';
import { usePropFirms } from '../hooks/usePropFirms';
import { BasicInfoFields } from './admin/BasicInfoFields';
import { PricingFields } from './admin/PricingFields';
import { RatingFields } from './admin/RatingFields';
import { TradingFields } from './admin/TradingFields';
import { ContentFields } from './admin/ContentFields';
import { validateForm } from './admin/FormValidation';

interface AdminFormPanelProps {
  onOperationComplete: (type: 'success' | 'error', message: string) => void;
}

export const AdminFormPanel: React.FC<AdminFormPanelProps> = ({ onOperationComplete }) => {
  const { addFirm } = useAdminOperations();
  const { refetch } = usePropFirms();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PropFirmData>({
    name: '',
    brand: '',
    slug: '',
    category_id: null,
    price: 0,
    original_price: 0,
    discount: 0,
    coupon_code: '',
    review_score: 0,
    trust_rating: 0,
    profit_split: 0,
    payout_rate: 0,
    description: '',
    features: [],
    pros: [],
    cons: [],
    platform: '',
    regulation: '',
    evaluation_model: '',
    max_funding: '',
    starting_fee: 0,
    funding_amount: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      slug: '',
      category_id: null,
      price: 0,
      original_price: 0,
      discount: 0,
      coupon_code: '',
      review_score: 0,
      trust_rating: 0,
      profit_split: 0,
      payout_rate: 0,
      description: '',
      features: [],
      pros: [],
      cons: [],
      platform: '',
      regulation: '',
      evaluation_model: '',
      max_funding: '',
      starting_fee: 0,
      funding_amount: ''
    });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      onOperationComplete('error', 'Please fix the validation errors before submitting.');
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      console.log('Submitting form data:', formData);
      const result = await addFirm(formData);
      
      if (result.success) {
        onOperationComplete('success', 'Prop firm added successfully!');
        resetForm();
        // Refresh the firms list
        await refetch();
      } else {
        onOperationComplete('error', result.error || 'Failed to add prop firm');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      onOperationComplete('error', 'An unexpected error occurred while adding the firm');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof PropFirmData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-slate-700 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Add New Prop Firm</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <BasicInfoFields 
          formData={formData} 
          updateFormData={updateFormData} 
          errors={errors} 
        />
        <PricingFields 
          formData={formData} 
          updateFormData={updateFormData} 
          errors={errors} 
        />
        <RatingFields 
          formData={formData} 
          updateFormData={updateFormData} 
          errors={errors} 
        />
        <TradingFields 
          formData={formData} 
          updateFormData={updateFormData} 
          errors={errors} 
        />
        <ContentFields 
          formData={formData} 
          updateFormData={updateFormData} 
          errors={errors} 
        />
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Adding Prop Firm...' : 'Add Prop Firm'}
        </Button>
      </form>
    </div>
  );
};
