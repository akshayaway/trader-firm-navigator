
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { PropFirmSection } from "../components/PropFirmSection";
import { Footer } from "../components/Footer";
import { usePropFirms } from "../hooks/useSupabaseData";

interface PropFirm {
  id: string;
  name: string;
  description?: string;
  price?: number;
  original_price?: number;
  discount?: number;
  coupon_code?: string;
  review_score?: number;
  trust_rating?: number;
  profit_split?: number;
  payout_rate?: number;
  max_funding?: number;
  platform?: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
  regulation_country?: string;
  trading_levels?: string[];
  tags?: string[];
  logo_url?: string;
  affiliate_link?: string;
  buy_now_url?: string;
  slug?: string;
  brand?: string;
  category_id?: string;
  evaluation_model?: string;
  starting_fee?: number;
  funding_amount?: string;
  created_at?: string;
  updated_at?: string;
}

const Index = () => {
  const { data, isLoading: loading } = usePropFirms();
  const propFirms = data?.propFirms || [];
  const [sortBy, setSortBy] = useState<'price' | 'review' | 'trust' | 'profit'>('review');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchResults, setSearchResults] = useState<PropFirm[] | undefined>(undefined);

  // Optionally, implement search/filter logic here

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <PropFirmSection
          propFirms={searchResults || propFirms}
          loading={loading}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
