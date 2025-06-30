
import { PropFirmCard } from "./PropFirmCard";

export const PropFirmShowcase = () => {
  // Mock data matching the reference images
  const mockFirms = [
    {
      id: "1",
      name: "E8 Funding",
      price: 25,
      originalPrice: 50,
      discount: 50,
      couponCode: "E8SAVE",
      reviewScore: 4.1,
      trustRating: 7,
      profitSplit: 80,
      payoutRate: 88,
      platform: "MetaTrader 4/5",
      keyFeatures: [
        "MetaTrader 4/5",
        "Copy Trading", 
        "Expert Advisors"
      ],
      tag: "E8"
    },
    {
      id: "2", 
      name: "ffsfads",
      price: 1,
      originalPrice: 11,
      discount: 31,
      couponCode: "2",
      reviewScore: 1,
      trustRating: 1,
      profitSplit: 1,
      payoutRate: 2,
      platform: "MetaTrader 4/5",
      keyFeatures: [
        "Fast Execution",
        "Low Spreads",
        "24/7 Support"
      ],
      tag: "default"
    },
    {
      id: "3",
      name: "theSers",
      price: 0,
      originalPrice: 0,
      discount: 0,
      couponCode: "promocode", 
      reviewScore: 0.1,
      trustRating: 1,
      profitSplit: 90,
      payoutRate: 96,
      platform: "cffbjk",
      keyFeatures: [
        "Advanced Tools",
        "Risk Management",
        "Portfolio Analytics"
      ],
      tag: "theSers"
    }
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockFirms.map((firm) => (
            <PropFirmCard key={firm.id} {...firm} />
          ))}
        </div>
      </div>
    </div>
  );
};
