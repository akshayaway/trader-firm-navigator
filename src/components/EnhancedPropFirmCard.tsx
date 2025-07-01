
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, DollarSign, Award, ExternalLink, Eye } from 'lucide-react';
import { LazyImage } from './LazyImage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface EnhancedPropFirmCardProps {
  id: string;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  couponCode?: string;
  reviewScore: number;
  trustRating: number;
  profitSplit: number;
  payoutRate: number;
  platform?: string;
  features?: string[];
  logoUrl?: string;
  affiliateLink?: string;
  buyNowUrl?: string;
  maxFunding?: number;
  isDarkMode?: boolean;
}

export const EnhancedPropFirmCard: React.FC<EnhancedPropFirmCardProps> = ({
  id,
  name,
  brand,
  price,
  originalPrice,
  discount,
  couponCode,
  reviewScore,
  trustRating,
  profitSplit,
  payoutRate,
  platform,
  features = [],
  logoUrl,
  affiliateLink,
  buyNowUrl,
  maxFunding,
  isDarkMode = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardBg = isDarkMode 
    ? 'bg-slate-800/80 backdrop-blur-sm border-slate-700/50' 
    : 'bg-white border-gray-200 shadow-lg';
  
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const textMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  const discountPercentage = originalPrice && originalPrice > price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount;

  const handleBuyNowClick = () => {
    const targetUrl = buyNowUrl || affiliateLink;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : isDarkMode ? 'text-gray-600' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border transition-all duration-500 group
        ${cardBg} 
        ${isHovered ? 'transform scale-105 shadow-2xl' : isDarkMode ? 'shadow-lg' : 'shadow-md'}
        hover:shadow-2xl
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-blue-600/5 via-purple-600/5 to-transparent' : 'from-blue-50 via-purple-50 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Discount Badge */}
      {discountPercentage && discountPercentage > 0 && (
        <div className="absolute top-4 right-4 z-10 animate-pulse">
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-3 py-1 shadow-lg">
            -{discountPercentage}% OFF
          </Badge>
        </div>
      )}

      {/* Brand Tag */}
      {brand && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="outline" className={`${isDarkMode ? 'border-blue-400 text-blue-400 bg-slate-800/50' : 'border-blue-600 text-blue-600 bg-blue-50'} font-semibold backdrop-blur-sm`}>
            {brand}
          </Badge>
        </div>
      )}

      <div className="p-6 relative z-10">
        {/* Header with Logo */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
            {logoUrl ? (
              <LazyImage src={logoUrl} alt={`${name} logo`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-white">{name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${textPrimary} mb-2 group-hover:text-blue-400 transition-colors`}>{name}</h3>
            <div className="flex items-center gap-2">
              {renderStars(Math.round(reviewScore))}
              <span className={`text-sm ${textMuted}`}>({reviewScore})</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-3xl font-bold ${textPrimary} group-hover:text-green-400 transition-colors`}>${price}</span>
            {originalPrice && originalPrice > price && (
              <span className={`text-lg line-through ${textMuted}`}>${originalPrice}</span>
            )}
          </div>
          {couponCode && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-green-900/30 text-green-400 border-green-400/30 hover:bg-green-900/50' 
                : 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200'
            }`}>
              <span>Code:</span>
              <span className="font-bold">{couponCode}</span>
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`text-center p-4 rounded-lg transition-all duration-300 ${
            isDarkMode ? 'bg-slate-700/50 hover:bg-slate-600/50' : 'bg-gray-100 hover:bg-gray-200'
          }`}>
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-xl font-bold text-green-400">{profitSplit}%</span>
            </div>
            <span className={`text-xs ${textMuted}`}>Profit Split</span>
          </div>
          <div className={`text-center p-4 rounded-lg transition-all duration-300 ${
            isDarkMode ? 'bg-slate-700/50 hover:bg-slate-600/50' : 'bg-gray-100 hover:bg-gray-200'
          }`}>
            <div className="flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-xl font-bold text-blue-400">{trustRating}/10</span>
            </div>
            <span className={`text-xs ${textMuted}`}>Trust Rating</span>
          </div>
        </div>

        {/* Trust Rating Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className={`text-sm ${textSecondary}`}>Trust Score</span>
            <span className={`text-sm font-semibold ${textPrimary}`}>{trustRating}/10</span>
          </div>
          <Progress 
            value={trustRating * 10} 
            className={`h-3 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`} 
          />
        </div>

        {/* Additional Info */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className={textMuted}>Payout Rate:</span>
            <span className={`font-semibold ${textPrimary}`}>{payoutRate}%</span>
          </div>
          {platform && (
            <div className="flex justify-between">
              <span className={textMuted}>Platform:</span>
              <span className={`font-semibold ${textPrimary}`}>{platform}</span>
            </div>
          )}
          {maxFunding && (
            <div className="flex justify-between">
              <span className={textMuted}>Max Funding:</span>
              <span className="font-semibold text-purple-400">${maxFunding.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-8">
            <h4 className={`text-sm font-semibold ${textSecondary} mb-3`}>Key Features</h4>
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 3).map((feature, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className={`text-xs transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {feature}
                </Badge>
              ))}
              {features.length > 3 && (
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  +{features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {(buyNowUrl || affiliateLink) && (
            <Button
              onClick={handleBuyNowClick}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Get Started Now
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <Link to={`/firm/${id}`}>
              <Button 
                variant="outline" 
                className={`w-full transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-slate-500' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                <Eye className="w-4 h-4 mr-2" />
                Details
              </Button>
            </Link>
            <Link to={`/full-review/${id}`}>
              <Button 
                variant="outline" 
                className={`w-full transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-slate-500' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                <Star className="w-4 h-4 mr-2" />
                Review
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${
        isDarkMode ? 'from-blue-600/5 to-transparent' : 'from-blue-50/50 to-transparent'
      } opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />
      
      {/* Animated border */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        isDarkMode ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20' : 'bg-gradient-to-r from-blue-200/50 via-purple-200/50 to-blue-200/50'
      } p-0.5`}>
        <div className={`w-full h-full rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`} />
      </div>
    </div>
  );
};
