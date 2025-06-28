
import React from 'react';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { PropFirmData } from '../../hooks/useAdminOperations';

interface ContentFieldsProps {
  formData: PropFirmData;
  updateFormData: (field: keyof PropFirmData, value: any) => void;
  errors: Record<string, string>;
}

export const ContentFields: React.FC<ContentFieldsProps> = ({ 
  formData, 
  updateFormData, 
  errors 
}) => {
  const handleArrayChange = (field: 'features' | 'pros' | 'cons', value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    updateFormData(field, array);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="description" className="text-white">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => updateFormData('description', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter firm description"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="features" className="text-white">Features (comma separated)</Label>
        <Textarea
          id="features"
          value={formData.features?.join(', ') || ''}
          onChange={(e) => handleArrayChange('features', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Feature 1, Feature 2, Feature 3"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="pros" className="text-white">Pros (comma separated)</Label>
        <Textarea
          id="pros"
          value={formData.pros?.join(', ') || ''}
          onChange={(e) => handleArrayChange('pros', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Pro 1, Pro 2, Pro 3"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="cons" className="text-white">Cons (comma separated)</Label>
        <Textarea
          id="cons"
          value={formData.cons?.join(', ') || ''}
          onChange={(e) => handleArrayChange('cons', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Con 1, Con 2, Con 3"
          rows={2}
        />
      </div>
    </div>
  );
};
