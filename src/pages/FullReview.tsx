
import { Navigation } from "@/components/Navigation";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePropFirms } from "@/hooks/usePropFirms";
import { useAccountSizes } from "@/hooks/useAccountSizes";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const FullReview = () => {
  const { firmId } = useParams();
  const { data: firms, isLoading: firmsLoading, error: firmsError } = usePropFirms();
  const { data: accountSizes, isLoading: accountSizesLoading } = useAccountSizes(firmId);
  
  const firm = firms?.find(f => f.id === firmId);

  if (firmsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-24 px-4 text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-300 mt-4">Loading firm details...</p>
        </div>
      </div>
    );
  }

  if (firmsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-24 px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Error Loading Firm</h1>
          <p className="text-gray-300">Please try refreshing the page or check your connection.</p>
        </div>
      </div>
    );
  }

  if (!firm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-24 px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Firm Not Found</h1>
          <p className="text-gray-300">The requested firm review could not be found.</p>
        </div>
      </div>
    );
  }

  const handleBuyNow = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Firm Header */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50 mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center">
                {firm.logo_url ? (
                  <img src={firm.logo_url} alt={firm.name} className="w-full h-full object-contain rounded-lg" />
                ) : (
                  <span className="text-3xl font-bold text-white">{firm.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{firm.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-yellow-400 text-xl">⭐ {firm.review_score || 'N/A'}</span>
                  <span className="text-green-400 font-bold">Trust: {firm.trust_rating || 'N/A'}/10</span>
                  <span className="text-blue-400 font-bold">Profit Split: {firm.profit_split || 'N/A'}%</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">{firm.description || 'No description available.'}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Pros */}
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-green-400">✅ Pros</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {firm.pros && firm.pros.length > 0 ? (
                    firm.pros.map((pro, index) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        {pro}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">No pros listed</li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Cons */}
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-red-400">❌ Cons</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {firm.cons && firm.cons.length > 0 ? (
                    firm.cons.map((con, index) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        {con}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">No cons listed</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Key Details */}
          <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Key Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Payout Rate</h4>
                  <p className="text-white font-semibold">{firm.payout_rate || 'N/A'}%</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Platform</h4>
                  <p className="text-white font-semibold">{firm.platform || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Regulation</h4>
                  <p className="text-white font-semibold">{firm.regulation_country || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Max Funding</h4>
                  <p className="text-white font-semibold">
                    {firm.max_funding ? `$${firm.max_funding.toLocaleString()}` : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Sizes Table */}
          <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Account Sizes & Pricing</CardTitle>
              <CardDescription className="text-gray-300">
                Choose the account size that fits your trading capital and goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              {accountSizesLoading ? (
                <div className="text-center py-8">
                  <LoadingSpinner />
                  <p className="text-gray-400 mt-2">Loading account sizes...</p>
                </div>
              ) : accountSizes && accountSizes.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-gray-300">Account Size</TableHead>
                      <TableHead className="text-gray-300">Price</TableHead>
                      <TableHead className="text-gray-300">Discount</TableHead>
                      <TableHead className="text-gray-300">Platform</TableHead>
                      <TableHead className="text-gray-300">Payout Rate</TableHead>
                      <TableHead className="text-gray-300">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accountSizes.map((account, index) => (
                      <TableRow key={index} className="border-slate-700 hover:bg-slate-700/30">
                        <TableCell className="text-white font-semibold">{account.account_size}</TableCell>
                        <TableCell className="text-white">${account.price || 'N/A'}</TableCell>
                        <TableCell className="text-green-400">{account.discount ? `${account.discount}% OFF` : 'N/A'}</TableCell>
                        <TableCell className="text-gray-300">{account.platform || 'N/A'}</TableCell>
                        <TableCell className="text-blue-400">{account.payout_rate ? `${account.payout_rate}%` : 'N/A'}</TableCell>
                        <TableCell>
                          <button 
                            onClick={() => handleBuyNow(firm.buy_now_url || firm.affiliate_link)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                          >
                            Buy Now
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No account sizes available for this firm.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FullReview;
