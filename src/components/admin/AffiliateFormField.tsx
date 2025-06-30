
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AffiliateFormFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const AffiliateFormField: React.FC<AffiliateFormFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="affiliate_link" className="text-white">Affiliate Link</Label>
      <Input
        id="affiliate_link"
        type="url"
        placeholder="https://example.com/affiliate/..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-700/60 border-slate-600/50 text-white placeholder-gray-400"
      />
      <p className="text-sm text-gray-400">
        Enter the affiliate link for this prop firm (optional)
      </p>
    </div>
  );
};
