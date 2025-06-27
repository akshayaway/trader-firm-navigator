
import { Hero } from "@/components/Hero";
import { SearchSection } from "@/components/SearchSection";
import { CTAButtons } from "@/components/CTAButtons";
import { StatsSection } from "@/components/StatsSection";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <Hero />
      <SearchSection />
      <CTAButtons />
      <StatsSection />
    </div>
  );
};

export default Index;
