
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllFirms from "./pages/AllFirms";
import Reviews from "./pages/Reviews";
import Compare from "./pages/Compare";
import CheapFirms from "./pages/CheapFirms";
import TopFirms from "./pages/TopFirms";
import FullReview from "./pages/FullReview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/all-firms" element={<AllFirms />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/cheap-firms" element={<CheapFirms />} />
          <Route path="/top-firms" element={<TopFirms />} />
          <Route path="/firm/:firmId" element={<FullReview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
