
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { PropFirmData } from '../../hooks/useAdminOperations';

interface BasicInfoFieldsProps {
  formData: PropFirmData;
  updateFormData: (field: keyof PropFirmData, value: any) => void;
  errors: Record<string, string>;
}

export const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ 
  formData, 
  updateFormData, 
  errors 
}) => {
  const handleCategoryChange = (value: string) => {
    updateFormData('category_id', value === 'none' ? null : value);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-white">Firm Name *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name || ''}
          onChange={(e) => updateFormData('name', e.target.value)}
          className={`bg-slate-600 border-slate-500 text-white ${errors.name ? 'border-red-500' : ''}`}
          placeholder="Enter firm name"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="brand" className="text-white">Brand</Label>
        <Input
          id="brand"
          type="text"
          value={formData.brand || ''}
          onChange={(e) => updateFormData('brand', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter brand name"
        />
      </div>

      <div>
        <Label htmlFor="slug" className="text-white">Slug</Label>
        <Input
          id="slug"
          type="text"
          value={formData.slug || ''}
          onChange={(e) => updateFormData('slug', e.target.value)}
          className="bg-slate-600 border-slate-500 text-white"
          placeholder="Enter URL slug"
        />
      </div>

      <div>
        <Label className="text-white">Category</Label>
        <Select value={formData.category_id || "none"} onValueChange={handleCategoryChange}>
          <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-slate-600 border-slate-500">
            <SelectItem value="none" className="text-white hover:bg-slate-700">No Category</SelectItem>
            <SelectItem value="beginner" className="text-white hover:bg-slate-700">Beginner</SelectItem>
            <SelectItem value="intermediate" className="text-white hover:bg-slate-700">Intermediate</SelectItem>
            <SelectItem value="pro" className="text-white hover:bg-slate-700">Pro</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
