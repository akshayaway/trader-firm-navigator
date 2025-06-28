
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useAdminOperations } from '../hooks/useAdminOperations';
import { usePropFirms } from '../hooks/usePropFirms';

interface PropFirm {
  id: string;
  name: string;
  brand?: string;
  price?: number;
  original_price?: number;
  review_score?: number;
  trust_rating?: number;
  platform?: string;
  regulation?: string;
  description?: string;
}

interface AdminFirmsListProps {
  firms: PropFirm[];
  onOperationComplete: (type: 'success' | 'error', message: string) => void;
}

export const AdminFirmsList: React.FC<AdminFirmsListProps> = ({ 
  firms, 
  onOperationComplete 
}) => {
  const { deleteFirm } = useAdminOperations();
  const { refetch } = usePropFirms();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const result = await deleteFirm(id);
      
      if (result.success) {
        onOperationComplete('success', `"${name}" has been deleted successfully!`);
        // Refresh the data
        await refetch();
      } else {
        onOperationComplete('error', result.error || 'Failed to delete firm');
      }
    } catch (error) {
      onOperationComplete('error', 'An unexpected error occurred while deleting the firm');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (firm: PropFirm) => {
    // For now, just show the firm data in console - you can implement edit modal later
    console.log('Edit firm:', firm);
    onOperationComplete('success', `Edit functionality for "${firm.name}" - check console for data`);
  };

  if (!firms || firms.length === 0) {
    return (
      <div className="bg-slate-700 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Current Prop Firms</h3>
        <p className="text-gray-300">No prop firms found. Add one using the form on the left.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-700 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-white mb-4">
        Current Prop Firms ({firms.length})
      </h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {firms.map((firm) => (
          <div key={firm.id} className="bg-slate-600 p-4 rounded-lg border border-slate-500">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-white">{firm.name}</h4>
                <p className="text-sm text-gray-300">{firm.brand || 'No Brand'}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleEdit(firm)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDelete(firm.id, firm.name)}
                  disabled={deletingId === firm.id}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  {deletingId === firm.id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <div>Price: ${firm.price || 0}</div>
              <div>Rating: {firm.review_score || 0}/5</div>
              <div>Platform: {firm.platform || 'N/A'}</div>
              <div>Trust: {firm.trust_rating || 0}/10</div>
            </div>
            {firm.description && (
              <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                {firm.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
