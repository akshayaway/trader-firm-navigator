
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
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{firm.name}</h3>
        {firm.tags && firm.tags.length > 0 && (
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
            firm.tags.includes('top') ? 'bg-orange-100 text-orange-800' :
            firm.tags.includes('cheap') ? 'bg-green-100 text-green-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {firm.tags[0]?.toUpperCase() || 'FEATURED'}
          </span>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl font-bold text-green-600">
            ${firm.price}
          </span>
          <span className="text-gray-400 line-through">${firm.original_price}</span>
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
            -{firm.discount}%
          </span>
        </div>
        <div className="bg-gray-100 rounded-lg px-3 py-2 mb-3">
          <span className="text-sm text-gray-600">Coupon Code</span>
          <div className="font-mono text-gray-900 font-bold text-lg">{firm.coupon_code}</div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{firm.description}</p>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Review Score</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 font-bold">⭐</span>
            <span className="text-gray-900 font-bold">{firm.review_score}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Trust Rating</span>
          <span className="text-green-600 font-bold">{firm.trust_rating}/10</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Profit Split</span>
          <span className="text-blue-600 font-bold">{firm.profit_split}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Payout Rate</span>
          <span className="text-purple-600 font-bold">{firm.payout_rate}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Platform</span>
          <span className="text-gray-700">{firm.platform}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href="#"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 text-center"
        >
          Buy Now
        </a>
        <Link
          to={`/firm/${firm.id}`}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-xl font-semibold transition-all duration-300 text-center"
        >
          View Review
        </Link>
      </div>
    </div>
  );
};
