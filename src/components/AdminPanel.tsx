
import React, { useState, useEffect } from 'react';
import { AdminFormPanel } from './AdminFormPanel';
import { AdminFirmsList } from './AdminFirmsList';
import { Button } from './ui/button';
import { RefreshCw, LogOut } from 'lucide-react';
import { usePropFirms } from '../hooks/usePropFirms';

export const AdminPanel = () => {
  const { data: firms, isLoading, refetch } = usePropFirms();
  const [operationStatus, setOperationStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleRefresh = async () => {
    await refetch();
    setOperationStatus({ type: 'success', message: 'Data refreshed successfully!' });
    setTimeout(() => setOperationStatus({ type: null, message: '' }), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.reload();
  };

  const handleOperationStatus = (type: 'success' | 'error', message: string) => {
    setOperationStatus({ type, message });
    setTimeout(() => setOperationStatus({ type: null, message: '' }), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-white">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        <div className="flex gap-2">
          <Button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700"
            size="sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {operationStatus.type && (
        <div className={`p-3 rounded mb-4 ${
          operationStatus.type === 'success' 
            ? 'bg-green-900/50 border border-green-500 text-green-300' 
            : 'bg-red-900/50 border border-red-500 text-red-300'
        }`}>
          {operationStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminFormPanel onOperationComplete={handleOperationStatus} />
        <AdminFirmsList firms={firms || []} onOperationComplete={handleOperationStatus} />
      </div>
    </div>
  );
};
