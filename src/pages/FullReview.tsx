
import { Navigation } from "@/components/Navigation";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for full review
const mockFirmDetails = {
  "1": {
    name: "FTMO",
    logo_url: "",
    reviewScore: 4.9,
    trustRating: 10,
    expertSummary: "FTMO stands out as one of the most reputable prop trading firms in the industry. With a proven track record, excellent customer support, and transparent trading conditions, it's our top recommendation for serious traders.",
    pros: [
      "Highest trust rating in the industry",
      "Fast and reliable payouts",
      "Excellent customer support",
      "Transparent trading conditions",
      "MetaTrader 4/5 platform support"
    ],
    cons: [
      "Higher evaluation fees",
      "Strict risk management rules",
      "Limited platform options"
    ],
    profitSplit: 90,
    payoutSpeed: "1-2 business days",
    platform: "MetaTrader 4/5",
    regulation: "Czech Republic",
    maxFunding: 400000,
    accountSizes: [
      { size: "5K", price: 99, discount: 10, platform: "MT4/MT5", payoutRate: 90 },
      { size: "10K", price: 155, discount: 15, platform: "MT4/MT5", payoutRate: 90 },
      { size: "25K", price: 345, discount: 20, platform: "MT4/MT5", payoutRate: 90 },
      { size: "50K", price: 599, discount: 25, platform: "MT4/MT5", payoutRate: 90 },
      { size: "100K", price: 1080, discount: 30, platform: "MT4/MT5", payoutRate: 90 }
    ]
  }
};

const FullReview = () => {
  const { firmId } = useParams();
  const firm = mockFirmDetails[firmId as keyof typeof mockFirmDetails];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Firm Header */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50 mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{firm.name.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{firm.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-yellow-400 text-xl">⭐ {firm.reviewScore}</span>
                  <span className="text-green-400 font-bold">Trust: {firm.trustRating}/10</span>
                  <span className="text-blue-400 font-bold">Profit Split: {firm.profitSplit}%</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">{firm.expertSummary}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Pros */}
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-green-400">✅ Pros</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {firm.pros.map((pro, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      {pro}
                    </li>
                  ))}
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
                  {firm.cons.map((con, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      {con}
                    </li>
                  ))}
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
                  <h4 className="text-gray-400 text-sm mb-1">Payout Speed</h4>
                  <p className="text-white font-semibold">{firm.payoutSpeed}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Platform</h4>
                  <p className="text-white font-semibold">{firm.platform}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Regulation</h4>
                  <p className="text-white font-semibold">{firm.regulation}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Max Funding</h4>
                  <p className="text-white font-semibold">${firm.maxFunding.toLocaleString()}</p>
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
                  {firm.accountSizes.map((account, index) => (
                    <TableRow key={index} className="border-slate-700 hover:bg-slate-700/30">
                      <TableCell className="text-white font-semibold">${account.size}</TableCell>
                      <TableCell className="text-white">${account.price}</TableCell>
                      <TableCell className="text-green-400">{account.discount}% OFF</TableCell>
                      <TableCell className="text-gray-300">{account.platform}</TableCell>
                      <TableCell className="text-blue-400">{account.payoutRate}%</TableCell>
                      <TableCell>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                          Buy Now
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FullReview;
