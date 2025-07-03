import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccountSizesManager } from './AccountSizesManager';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const AdminAccountSizes = () => {
  const [selectedFirmId, setSelectedFirmId] = useState<string>('');

  const { data: firms, isLoading: firmsLoading } = useQuery({
    queryKey: ['firms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('propfirms')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  if (firmsLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            Account Sizes & Pricing Management
          </CardTitle>
          <p className="text-white/70">Manage account sizes and pricing for each prop firm</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <label className="block text-white/80 text-sm font-medium mb-2">
              Select Firm to Manage
            </label>
            <Select value={selectedFirmId} onValueChange={setSelectedFirmId}>
              <SelectTrigger className="bg-slate-700/60 border-slate-600/50 text-white">
                <SelectValue placeholder="Choose a firm to manage its account sizes..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {firms?.map((firm) => (
                  <SelectItem 
                    key={firm.id} 
                    value={firm.id}
                    className="text-white hover:bg-slate-700 focus:bg-slate-700"
                  >
                    {firm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedFirmId ? (
            <AccountSizesManager firmId={selectedFirmId} />
          ) : (
            <div className="text-center py-12 text-white/60">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium mb-2">Select a Firm</p>
              <p className="text-sm">Choose a prop firm from the dropdown above to manage its account sizes and pricing</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};