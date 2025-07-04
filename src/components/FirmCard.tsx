
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
    affiliate_link?: string;
    buy_now_url?: string;
  };
  isDarkMode?: boolean;
}

export const FirmCard = ({ firm, isDarkMode = false }: FirmCardProps) => {
  const cardBg = isDarkMode 
    ? 'bg-slate-800/80 backdrop-blur-sm border-slate-700/50' 
    : 'bg-white border-gray-200';
  
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const textMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  const handleBuyNow = () => {
    const targetUrl = firm.buy_now_url || firm.affiliate_link;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.log(`No buy/affiliate URL available for ${firm.name}`);
    }
  };

  return (
    <div className={`${cardBg} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border group`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-xl font-bold ${textPrimary} group-hover:text-blue-400 transition-colors`}>{firm.name}</h3>
        {firm.tags && firm.tags.length > 0 && (
          <span className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${
            firm.tags.includes('top') ? (isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-800') :
            firm.tags.includes('cheap') ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800') :
            (isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800')
          }`}>
            {firm.tags[0]?.toUpperCase() || 'FEATURED'}
          </span>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'} group-hover:scale-110 transition-transform`}>
            ${firm.price}
          </span>
          <span className={`line-through ${textMuted}`}>${firm.original_price}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
            isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
          }`}>
            -{firm.discount}%
          </span>
        </div>
        <div className={`${isDarkMode ? 'bg-slate-700/60' : 'bg-gray-100'} rounded-lg px-3 py-2 mb-3 transition-colors`}>
          <span className={`text-sm ${textSecondary}`}>Coupon Code</span>
          <div className={`font-mono ${textPrimary} font-bold text-lg`}>{firm.coupon_code}</div>
        </div>
      </div>

      <p className={`${textSecondary} text-sm mb-4 leading-relaxed`}>{firm.description}</p>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className={textMuted}>Review Score</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 font-bold">⭐</span>
            <span className={`${textPrimary} font-bold`}>{firm.review_score}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className={textMuted}>Trust Rating</span>
          <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} font-bold`}>{firm.trust_rating}/10</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={textMuted}>Profit Split</span>
          <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-bold`}>{firm.profit_split}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={textMuted}>Payout Rate</span>
          <span className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} font-bold`}>{firm.payout_rate}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={textMuted}>Platform</span>
          <span className={textPrimary}>{firm.platform}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleBuyNow}
          className={`flex-1 ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white py-3 rounded-xl font-semibold transition-all duration-300 text-center transform hover:scale-105 shadow-lg hover:shadow-xl ${!(firm.buy_now_url || firm.affiliate_link) ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!(firm.buy_now_url || firm.affiliate_link)}
        >
          Buy Now
        </button>
        <Link
          to={`/firm/${firm.id}`}
          className={`flex-1 ${
            isDarkMode 
              ? 'bg-slate-700/60 hover:bg-slate-600/60 text-gray-300' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          } py-3 rounded-xl font-semibold transition-all duration-300 text-center transform hover:scale-105`}
        >
          View Review
        </Link>
      </div>
    </div>
  );
};
