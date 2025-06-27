
import { Link } from "react-router-dom";

interface FirmCardProps {
  firm: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    discount: number;
    couponCode: string;
    reviewScore: number;
    trustRating: number;
    profitSplit: number;
    payoutRate: number;
    platform: string;
    description: string;
    tag: string;
  };
}

export const FirmCard = ({ firm }: FirmCardProps) => {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all transform hover:scale-105 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{firm.name}</h3>
        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">{firm.tag}</span>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold text-white">${firm.price}</span>
          <span className="text-gray-400 line-through">${firm.originalPrice}</span>
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">-{firm.discount}%</span>
        </div>
        <div className="bg-slate-700/60 rounded px-3 py-1 mb-3">
          <span className="text-sm text-gray-300">Coupon Code</span>
          <div className="font-mono text-white font-bold">{firm.couponCode}</div>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4">{firm.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Review Score</span>
          <span className="text-yellow-400 font-bold">⭐ {firm.reviewScore}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Trust Rating</span>
          <span className="text-green-400 font-bold">{firm.trustRating}/10</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Profit Split</span>
          <span className="text-blue-400 font-bold">{firm.profitSplit}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Payout Rate</span>
          <span className="text-purple-400 font-bold">{firm.payoutRate}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Platform</span>
          <span className="text-gray-300">{firm.platform}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors">
          Buy Now
        </button>
        <Link
          to={`/firm/${firm.id}`}
          className="flex-1 bg-slate-600/60 hover:bg-slate-500/60 text-white py-2 rounded-lg font-semibold transition-colors text-center"
        >
          View Review
        </Link>
      </div>
    </div>
  );
};
