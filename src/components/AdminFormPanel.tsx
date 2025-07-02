
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { AffiliateFormField } from './admin/AffiliateFormField';
import { useAdminOperations } from '../hooks/useAdminOperations';

interface AdminFormPanelProps {
  onOperationComplete: (type: 'success' | 'error', message: string) => void;
}

export const AdminFormPanel: React.FC<AdminFormPanelProps> = ({ onOperationComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    discount: '',
    coupon_code: '',
    review_score: '',
    trust_rating: '',
    profit_split: '',
    payout_rate: '',
    platform: '',
    regulation_country: '',
    max_funding: '',
    affiliate_link: '',
    buy_now_url: '',
    features: [] as string[],
    pros: [] as string[],
    cons: [] as string[]
  });

  const [featureInput, setFeatureInput] = useState('');
  const [prosInput, setProsInput] = useState('');
  const [consInput, setConsInput] = useState('');

  const { addFirm } = useAdminOperations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await addFirm({
      name: formData.name,
      description: formData.description || undefined,
      price: parseFloat(formData.price) || 0,
      original_price: parseFloat(formData.original_price) || undefined,
      discount: parseFloat(formData.discount) || 0,
      coupon_code: formData.coupon_code || undefined,
      review_score: parseFloat(formData.review_score) || 0,
      trust_rating: parseFloat(formData.trust_rating) || 0,
      profit_split: parseFloat(formData.profit_split) || 0,
      payout_rate: parseFloat(formData.payout_rate) || 0,
      platform: formData.platform || undefined,
      regulation: formData.regulation_country || undefined,
      max_funding: formData.max_funding || undefined,
      features: formData.features,
      pros: formData.pros,
      cons: formData.cons,
      affiliate_link: formData.affiliate_link || undefined,
      buy_now_url: formData.buy_now_url || undefined
    });

    if (result.success) {
      onOperationComplete('success', 'Prop firm added successfully!');
      // Reset form
      setFormData({
        name: '', description: '', price: '', original_price: '', discount: '',
        coupon_code: '', review_score: '', trust_rating: '', profit_split: '',
        payout_rate: '', platform: '', regulation_country: '', max_funding: '',
        affiliate_link: '', buy_now_url: '', features: [], pros: [], cons: []
      });
      setFeatureInput('');
      setProsInput('');
      setConsInput('');
    } else {
      onOperationComplete('error', result.error || 'Failed to add prop firm');
    }
  };

  const addToArray = (arrayName: 'features' | 'pros' | 'cons', value: string, setValue: (val: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [arrayName]: [...prev[arrayName], value.trim()]
      }));
      setValue('');
    }
  };

  const removeFromArray = (arrayName: 'features' | 'pros' | 'cons', index: number) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Add New Prop Firm</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-white">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="platform" className="text-white">Platform</Label>
            <Input
              id="platform"
              value={formData.platform}
              onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white"
              placeholder="MetaTrader 4/5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="text-white">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="bg-slate-700/60 border-slate-600/50 text-white"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="price" className="text-white">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="original_price" className="text-white">Original Price</Label>
            <Input
              id="original_price"
              type="number"
              step="0.01"
              value={formData.original_price}
              onChange={(e) => setFormData(prev => ({ ...prev, original_price: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="discount" className="text-white">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              step="0.01"
              value={formData.discount}
              onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="coupon_code" className="text-white">Coupon Code</Label>
            <Input
              id="coupon_code"
              value={formData.coupon_code}
              onChange={(e) => setFormData(prev => ({ ...prev, coupon_code: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="max_funding" className="text-white">Max Funding</Label>
            <Input
              id="max_funding"
              value={formData.max_funding}
              onChange={(e) => setFormData(prev => ({ ...prev, max_funding: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white"
              placeholder="400000"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="review_score" className="text-white">Review Score</Label>
            <Input
              id="review_score"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.review_score}
              onChange={(e) => setFormData(prev => ({ ...prev, review_score: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="trust_rating" className="text-white">Trust Rating</Label>
            <Input
              id="trust_rating"
              type="number"
              min="0"
              max="10"
              value={formData.trust_rating}
              onChange={(e) => setFormData(prev => ({ ...prev, trust_rating: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="profit_split" className="text-white">Profit Split (%)</Label>
            <Input
              id="profit_split"
              type="number"
              min="0"
              max="100"
              value={formData.profit_split}
              onChange={(e) => setFormData(prev => ({ ...prev, profit_split: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="payout_rate" className="text-white">Payout Rate (%)</Label>
            <Input
              id="payout_rate"
              type="number"
              min="0"
              max="100"
              value={formData.payout_rate}
              onChange={(e) => setFormData(prev => ({ ...prev, payout_rate: e.target.value }))}
              className="bg-slate-700/60 border-slate-600/50 text-white"
            />
          </div>
        </div>

        <AffiliateFormField
          value={formData.affiliate_link}
          onChange={(value) => setFormData(prev => ({ ...prev, affiliate_link: value }))}
        />

        <div>
          <Label htmlFor="buy_now_url" className="text-white">Buy Now URL</Label>
          <Input
            id="buy_now_url"
            type="url"
            value={formData.buy_now_url}
            onChange={(e) => setFormData(prev => ({ ...prev, buy_now_url: e.target.value }))}
            className="bg-slate-700/60 border-slate-600/50 text-white"
            placeholder="https://example.com/buy-now"
          />
        </div>

        <div>
          <Label htmlFor="regulation_country" className="text-white">Regulation Country</Label>
          <Input
            id="regulation_country"
            value={formData.regulation_country}
            onChange={(e) => setFormData(prev => ({ ...prev, regulation_country: e.target.value }))}
            className="bg-slate-700/60 border-slate-600/50 text-white"
            placeholder="United States"
          />
        </div>

        {/* Features */}
        <div>
          <Label className="text-white">Features</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              className="bg-slate-700/60 border-slate-600/50 text-white"
              placeholder="Add a feature"
            />
            <Button
              type="button"
              onClick={() => addToArray('features', featureInput, setFeatureInput)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-900/50 hover:text-red-300"
                onClick={() => removeFromArray('features', index)}
              >
                {feature} ×
              </span>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
        >
          Add Prop Firm
        </Button>
      </form>
    </div>
  );
};
