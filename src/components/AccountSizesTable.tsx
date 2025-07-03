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
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white mb-8">
      <h3 className="text-2xl font-bold mb-4">Account Sizes & Pricing</h3>
      <p className="text-blue-100 mb-6">Choose the account size that fits your trading capital and goals</p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-2 font-semibold">FIRM / RANK</th>
              <th className="text-center py-3 px-2 font-semibold">ACCOUNT SIZE</th>
              <th className="text-center py-3 px-2 font-semibold">STEPS</th>
              <th className="text-center py-3 px-2 font-semibold">PROFIT TARGET</th>
              <th className="text-center py-3 px-2 font-semibold">DAILY LOSS</th>
              <th className="text-center py-3 px-2 font-semibold">MAX LOSS</th>
              <th className="text-center py-3 px-2 font-semibold">PROFIT SPLIT</th>
              <th className="text-center py-3 px-2 font-semibold">PAYOUT FREQ.</th>
              <th className="text-center py-3 px-2 font-semibold">LOYALTY PTS</th>
              <th className="text-center py-3 px-2 font-semibold">PRICE</th>
              <th className="text-center py-3 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {accountSizes.map((accountSize, index) => (
              <tr key={accountSize.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <div>
                      <div className="font-semibold">Alpha Capital</div>
                      <div className="flex items-center gap-1 text-yellow-300">
                        <span className="text-sm">⭐ 4.4</span>
                        <span className="text-xs bg-red-500 px-1 rounded">690</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center py-4 px-2 font-bold">{accountSize.account_size}</td>
                <td className="text-center py-4 px-2">2 Steps</td>
                <td className="text-center py-4 px-2">10%</td>
                <td className="text-center py-4 px-2">5%</td>
                <td className="text-center py-4 px-2">10%</td>
                <td className="text-center py-4 px-2">
                  <div className="flex items-center justify-center gap-1">
                    <span>{accountSize.payout_rate}%</span>
                    <div className="w-12 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-400 to-red-400 rounded-full"
                        style={{ width: `${accountSize.payout_rate}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="text-center py-4 px-2">14 day...</td>
                <td className="text-center py-4 px-2">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-purple-300">💎</span>
                    <span>261</span>
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <div className="text-right">
                    <div className="font-bold">${accountSize.price}</div>
                    {accountSize.discount > 0 && (
                      <div className="text-xs text-gray-300 line-through">${(accountSize.price * (1 + accountSize.discount / 100)).toFixed(2)}</div>
                    )}
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all">
                    Buy
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