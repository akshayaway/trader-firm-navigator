
import { Link } from "react-router-dom";

interface FirmCardProps {
  firm: {
    id: string;
    name: string;
    price: number;
    original_price: number;
    discount: number;
    coupon_code: string;
    review_score: number;
    trust_rating: number;
    profit_split: number;
    payout_rate: number;
    platform: string;
    description: string;
    tags: string[];
  };
}

export const FirmCard = ({ firm }: FirmCardProps) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20 hover:shadow-2xl">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{firm.name}</h3>
        {firm.tags && firm.tags.length > 0 && (
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
            firm.tags.includes('top') ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' :
            firm.tags.includes('cheap') ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
            'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
          }`}>
            {firm.tags[0].toUpperCase()}
          </span>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            ${firm.price}
          </span>
          <span className="text-gray-400 line-through">${firm.original_price}</span>
          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            -{firm.discount}%
          </span>
        </div>
        <div className="bg-gradient-to-r from-slate-700/60 to-slate-600/60 rounded-lg px-3 py-2 mb-3 border border-white/10">
          <span className="text-sm text-gray-300">Coupon Code</span>
          <div className="font-mono text-white font-bold text-lg">{firm.coupon_code}</div>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{firm.description}</p>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Review Score</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 font-bold">⭐</span>
            <span className="text-white font-bold">{firm.review_score}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Trust Rating</span>
          <span className="text-emerald-400 font-bold">{firm.trust_rating}/10</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Profit Split</span>
          <span className="text-blue-400 font-bold">{firm.profit_split}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Payout Rate</span>
          <span className="text-purple-400 font-bold">{firm.payout_rate}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Platform</span>
          <span className="text-gray-300">{firm.platform}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href="#"
          className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 text-center shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
        >
          Buy Now
        </a>
        <Link
          to={`/firm/${firm.id}`}
          className="flex-1 bg-gradient-to-r from-slate-600/80 to-slate-700/80 hover:from-slate-500/80 hover:to-slate-600/80 text-white py-3 rounded-xl font-semibold transition-all duration-300 text-center border border-white/10 hover:border-white/20 shadow-lg hover:shadow-slate-500/25 hover:scale-105"
        >
          View Review
        </Link>
      </div>
    </div>
  );
};
