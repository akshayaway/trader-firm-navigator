
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminRoute } from "./components/AdminRoute";
import Index from "./pages/Index";
import AllFirms from "./pages/AllFirms";
import Reviews from "./pages/Reviews";
import Compare from "./pages/Compare";
import CheapFirms from "./pages/CheapFirms";
import TopFirms from "./pages/TopFirms";
import Blog from "./pages/Blog";
import FullReview from "./pages/FullReview";
import FirmDetail from "./pages/FirmDetail";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/firm/:firmId" element={<FirmDetail />} />
            <Route path="/review/:firmId" element={<FullReview />} />
            <Route path="/full-review/:firmId" element={<FullReview />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
