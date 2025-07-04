
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus } from 'lucide-react';

interface AccountSizesManagerProps {
  firmId: string;
}

export const AccountSizesManager: React.FC<AccountSizesManagerProps> = ({ firmId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    account_size: '',
    price: '',
    discount: '',
    payout_rate: '',
    platform: ''
  });

  const queryClient = useQueryClient();

  const { data: accountSizes, isLoading } = useQuery({
    queryKey: ['account_sizes', firmId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('account_sizes')
        .select('*')
        .eq('firm_id', firmId)
        .order('price', { ascending: true });
      
      if (error) {
        console.error('Error fetching account sizes:', error);
        throw error;
      }
      return data;
    },
    enabled: !!firmId,
  });

  const addMutation = useMutation({
    mutationFn: async (data: any) => {
      console.log('Adding account size:', data);
      const { data: result, error } = await supabase
        .from('account_sizes')
        .insert({ ...data, firm_id: firmId })
        .select();
      if (error) {
        console.error('Error adding account size:', error);
        throw error;
      }
      console.log('Account size added successfully:', result);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account_sizes', firmId] });
      resetForm();
    },
    onError: (error) => {
      console.error('Add mutation error:', error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase
        .from('account_sizes')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account_sizes', firmId] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('account_sizes')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account_sizes', firmId] });
    },
  });

  const resetForm = () => {
    setFormData({
      account_size: '',
      price: '',
      discount: '',
      payout_rate: '',
      platform: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with firmId:', firmId);
    console.log('Form data:', formData);
    
    const data = {
      account_size: formData.account_size,
      price: parseFloat(formData.price) || 0,
      discount: parseFloat(formData.discount) || 0,
      payout_rate: parseFloat(formData.payout_rate) || 0,
      platform: formData.platform
    };

    console.log('Processed data to insert:', data);

    if (editingId) {
      console.log('Updating account size with ID:', editingId);
      updateMutation.mutate({ id: editingId, data });
    } else {
      console.log('Adding new account size');
      addMutation.mutate(data);
    }
  };

  const startEdit = (accountSize: any) => {
    setFormData({
      account_size: accountSize.account_size,
      price: accountSize.price?.toString() || '',
      discount: accountSize.discount?.toString() || '',
      payout_rate: accountSize.payout_rate?.toString() || '',
      platform: accountSize.platform || ''
    });
    setEditingId(accountSize.id);
    setIsAdding(true);
  };

  if (isLoading) return <div className="text-white">Loading account sizes...</div>;

  return (
    <Card className="bg-slate-800/60 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-white flex justify-between items-center">
          Account Sizes Management
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Account Size
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-slate-700/50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="account_size" className="text-white">Account Size</Label>
                <Input
                  id="account_size"
                  value={formData.account_size}
                  onChange={(e) => setFormData(prev => ({ ...prev, account_size: e.target.value }))}
                  placeholder="e.g., $10K, $25K"
                  className="bg-slate-700/60 border-slate-600/50 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="price" className="text-white">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="99.00"
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
                  placeholder="15"
                  className="bg-slate-700/60 border-slate-600/50 text-white"
                />
              </div>
              <div>
                <Label htmlFor="payout_rate" className="text-white">Payout Rate (%)</Label>
                <Input
                  id="payout_rate"
                  type="number"
                  step="0.01"
                  value={formData.payout_rate}
                  onChange={(e) => setFormData(prev => ({ ...prev, payout_rate: e.target.value }))}
                  placeholder="90"
                  className="bg-slate-700/60 border-slate-600/50 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="platform" className="text-white">Platform</Label>
                <Input
                  id="platform"
                  value={formData.platform}
                  onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                  placeholder="MetaTrader 4/5"
                  className="bg-slate-700/60 border-slate-600/50 text-white"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {editingId ? 'Update' : 'Add'} Account Size
              </Button>
              <Button
                type="button"
                onClick={resetForm}
                variant="outline"
                className="border-slate-600 text-gray-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {accountSizes?.map((accountSize) => (
            <div key={accountSize.id} className="flex justify-between items-center p-4 bg-slate-700/30 rounded-lg">
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Size:</span>
                    <div className="text-white font-medium">{accountSize.account_size}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Price:</span>
                    <div className="text-white">${accountSize.price}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Discount:</span>
                    <div className="text-green-400">{accountSize.discount}%</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Payout:</span>
                    <div className="text-blue-400">{accountSize.payout_rate}%</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Platform:</span>
                    <div className="text-white">{accountSize.platform}</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  onClick={() => startEdit(accountSize)}
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-gray-300 hover:bg-slate-700"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => deleteMutation.mutate(accountSize.id)}
                  size="sm"
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {(!accountSizes || accountSizes.length === 0) && (
          <div className="text-center py-8 text-gray-400">
            No account sizes configured yet. Click "Add Account Size" to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
