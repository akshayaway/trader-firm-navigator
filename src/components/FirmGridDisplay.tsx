
import React from 'react';
import { FirmCard } from './FirmCard';

interface Firm {
  id: string;
  name: string;
  logo_url?: string;
  payout_rate: number;
  price: number;
  platform: string;
  coupon_code?: string;
  review_score: number;
  trust_rating: number;
  profit_split: number;
  discount: number;
  original_price: number;
  description: string;
  tags: string[];
}

interface FirmGridDisplayProps {
  firms: Firm[];
  title: string;
  onClose: () => void;
}

export const FirmGridDisplay: React.FC<FirmGridDisplayProps> = ({ firms, title, onClose }) => {
  return (
    <div className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {firms.map((firm) => (
            <FirmCard 
              key={firm.id} 
              firm={{
                ...firm,
                coupon_code: firm.coupon_code || 'NO_CODE'
              }} 
            />
          ))}
        </div>
        
        {firms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No firms found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
