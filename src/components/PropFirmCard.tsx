
import React, { memo } from "react";
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
  isDarkMode?: boolean;
}

export const PropFirmCard = memo(({ 
  id, name, price, originalPrice, discount, couponCode, 
  reviewScore, trustRating, profitSplit, payoutRate, 
  platform, keyFeatures, tag, isDarkMode = true 
}: PropFirmCardProps) => {
  const cardBg = isDarkMode 
    ? 'bg-slate-800/80 backdrop-blur-sm border-slate-700/50' 
    : 'bg-white border-gray-200';
  
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const textMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  const handleBuyNow = () => {
    // Will be implemented with actual buy URLs from database
    console.log(`Buy now clicked for ${name}`);
  };

  return (
    <div className={`${cardBg} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border group`}>
      {/* Header with name and tag */}
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-xl font-bold ${textPrimary} group-hover:text-blue-400 transition-colors`}>{name}</h3>
        {tag && (
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
            isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
          }`}>
            {tag}
          </span>
        )}
      </div>

      {/* Price Section */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-3xl font-bold ${textPrimary} group-hover:text-green-400 transition-colors`}>${price}</span>
          {originalPrice > price && (
            <>
              <span className={`${textMuted} line-through`}>${originalPrice}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
              }`}>
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Coupon Code */}
      {couponCode && (
        <div className={`${isDarkMode ? 'bg-slate-700/60' : 'bg-gray-100'} rounded-lg px-3 py-2 mb-4 transition-colors`}>
          <span className={`text-xs ${textSecondary}`}>Coupon Code</span>
          <div className={`font-mono ${textPrimary} font-bold text-lg`}>{couponCode}</div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className={textMuted}>Review Score</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span className={`${textPrimary} font-bold`}>{reviewScore}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className={textMuted}>Trust Rating</span>
          <span className={`${textPrimary} font-bold`}>{trustRating}/10</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={textMuted}>Profit Split</span>
          <span className={`${textPrimary} font-bold`}>{profitSplit}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={textMuted}>Payout Rate</span>
          <span className={`${textPrimary} font-bold`}>{payoutRate}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={textMuted}>Platform</span>
          <span className={textPrimary}>{platform}</span>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-6">
        <h4 className={`${textPrimary} font-semibold mb-2`}>Key Features:</h4>
        <ul className={`${textSecondary} text-sm space-y-1`}>
          {keyFeatures.slice(0, 3).map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={handleBuyNow}
          className={`flex-1 ${
            isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'
          } text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
        >
          Buy Now
        </button>
        <Link
          to={`/review/${id}`}
          className={`flex-1 ${
            isDarkMode 
              ? 'bg-slate-600/60 hover:bg-slate-500/60 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          } py-3 rounded-xl font-semibold transition-all duration-300 text-center transform hover:scale-105`}
        >
          View Review
        </Link>
      </div>
    </div>
  );
});

PropFirmCard.displayName = 'PropFirmCard';
