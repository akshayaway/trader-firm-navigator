
import { Navigation } from "@/components/Navigation";
import { Search } from "lucide-react";

const Reviews = () => {
  const mockReviews = [
    {
      id: "1",
      firmName: "FTMO",
      expertScore: 4.8,
      category: "Big",
      trustScore: "9.2/10",
      profitSplit: "90%",
      payoutSpeed: "1-3 days",
      tag: "Most Popular",
      tagColor: "blue"
    },
    {
      id: "2",
      firmName: "The Funded Trader",
      expertScore: 4.6,
      category: "Big",
      trustScore: "8.8/10",
      profitSplit: "85%",
      payoutSpeed: "2-5 days",
      tag: "Editor's Choice",
      tagColor: "purple"
    },
    {
      id: "3",
      firmName: "MyForexFunds",
      expertScore: 4.5,
      category: "Big",
      trustScore: "8.5/10",
      profitSplit: "85%",
      payoutSpeed: "1-2 days",
      tag: "Fast Growing",
      tagColor: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Expert Reviews</h1>
            <p className="text-gray-300 text-lg">In-depth reviews of prop trading firms written by our trading experts</p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews by firm name..."
                className="w-full pl-12 pr-4 py-3 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{review.firmName.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{review.firmName}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                      <span className="text-white font-bold">{review.expertScore}</span>
                      <span className="text-gray-400">Expert Rating</span>
                    </div>
                  </div>
                </div>

                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  review.tagColor === 'blue' ? 'bg-blue-600 text-white' :
                  review.tagColor === 'purple' ? 'bg-purple-600 text-white' :
                  'bg-green-600 text-white'
                }`}>
                  {review.tag}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{review.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trust Score:</span>
                    <span className="text-green-400 font-bold">{review.trustScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Profit Split:</span>
                    <span className="text-blue-400 font-bold">{review.profitSplit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payout Speed:</span>
                    <span className="text-purple-400 font-bold">{review.payoutSpeed}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors">
                  Read Full Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
