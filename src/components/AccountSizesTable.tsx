import React from 'react';
import { useAccountSizes } from '@/hooks/useAccountSizes';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface AccountSizesTableProps {
  firmId: string;
}

export const AccountSizesTable: React.FC<AccountSizesTableProps> = ({ firmId }) => {
  const { data: accountSizes, isLoading } = useAccountSizes(firmId);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white">
        <h3 className="text-2xl font-bold mb-4">Account Sizes & Pricing</h3>
        <p className="text-blue-100 mb-6">Choose the account size that fits your trading capital and goals</p>
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!accountSizes || accountSizes.length === 0) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white">
        <h3 className="text-2xl font-bold mb-4">Account Sizes & Pricing</h3>
        <p className="text-blue-100 mb-6">Choose the account size that fits your trading capital and goals</p>
        <div className="text-center py-8">
          <p className="text-blue-100">No account sizes available for this firm.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl text-white mb-8">
      <h3 className="text-2xl font-bold mb-4">Account Sizes & Pricing</h3>
      <p className="text-gray-300 mb-6">Choose the account size that fits your trading capital and goals</p>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Account Size</th>
              <th className="text-center py-3 px-4 text-gray-400 font-medium">Price</th>
              <th className="text-center py-3 px-4 text-gray-400 font-medium">Discount</th>
              <th className="text-center py-3 px-4 text-gray-400 font-medium">Platform</th>
              <th className="text-center py-3 px-4 text-gray-400 font-medium">Payout Rate</th>
              <th className="text-center py-3 px-4 text-gray-400 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {accountSizes.map((accountSize, index) => (
              <tr key={accountSize.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-semibold text-lg">{accountSize.account_size}</div>
                </td>
                <td className="text-center py-4 px-4">
                  <div className="font-bold text-lg">${accountSize.price}</div>
                </td>
                <td className="text-center py-4 px-4">
                  {accountSize.discount > 0 ? (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                      {accountSize.discount}% OFF
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="text-center py-4 px-4 text-gray-300">
                  {accountSize.platform || 'sfgd'}
                </td>
                <td className="text-center py-4 px-4 text-blue-400 font-semibold">
                  {accountSize.payout_rate}%
                </td>
                <td className="text-center py-4 px-4">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    Buy Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};