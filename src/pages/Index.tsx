
import { Hero } from "@/components/Hero";
import { SearchSection } from "@/components/SearchSection";
import { CTAButtons } from "@/components/CTAButtons";
import { StatsSection } from "@/components/StatsSection";
import { TopFirmsShowcase } from "@/components/TopFirmsShowcase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <Hero />
      <SearchSection />
      <TopFirmsShowcase />
      <CTAButtons />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
