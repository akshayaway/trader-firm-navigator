
import { Link } from "react-router-dom";

interface PropFirmCardProps {
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
  keyFeatures: string[];
  tag?: string;
}

export const PropFirmCard = ({ 
  id, name, price, originalPrice, discount, couponCode, 
  reviewScore, trustRating, profitSplit, payoutRate, 
  platform, keyFeatures, tag 
}: PropFirmCardProps) => {
  return (
    <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      {/* Header with name and tag */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        {tag && (
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            {tag}
          </span>
        )}
      </div>

      {/* Price Section */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl font-bold text-white">${price}</span>
          <span className="text-gray-400 line-through">${originalPrice}</span>
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            -{discount}%
          </span>
        </div>
      </div>

      {/* Coupon Code */}
      <div className="bg-slate-700/60 rounded-lg px-3 py-2 mb-4">
        <span className="text-xs text-gray-400">Coupon Code</span>
        <div className="font-mono text-white font-bold text-lg">{couponCode}</div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4">Low-cost entry point with competitive features</p>

      {/* Stats Grid */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Review Score</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-white font-bold">{reviewScore}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Trust Rating</span>
          <span className="text-white font-bold">{trustRating}/10</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Profit Split</span>
          <span className="text-white font-bold">{profitSplit}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Payout Rate</span>
          <span className="text-white font-bold">{payoutRate}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Platform</span>
          <span className="text-white">{platform}</span>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-2">Key Features:</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          {keyFeatures.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors">
          Buy Now
        </button>
        <Link
          to={`/firm/${id}`}
          className="flex-1 bg-slate-600/60 hover:bg-slate-500/60 text-white py-3 rounded-xl font-semibold transition-colors text-center"
        >
          View Review
        </Link>
      </div>
    </div>
  );
};
