
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminFirms } from "@/components/admin/AdminFirms";
import { AdminReviews } from "@/components/admin/AdminReviews";
import { AdminCheapFirms } from "@/components/admin/AdminCheapFirms";
import { AdminTopFirms } from "@/components/admin/AdminTopFirms";
import { AdminAccountSizes } from "@/components/admin/AdminAccountSizes";
import { Shield, LogOut, Database, Users, Star, TrendingUp, Calculator } from "lucide-react";

const Admin = () => {
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Professional Header */}
          <div className="glass-header p-8 mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl glow-purple">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text mb-2">
                    Admin Dashboard
                  </h1>
                  <p className="text-white/70 text-lg">Manage your prop trading platform with ease</p>
                </div>
              </div>
              <Button 
                onClick={handleLogout} 
                className="btn-danger"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="stats-card text-center">
              <Database className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">12</h3>
              <p className="text-white/60">Total Firms</p>
            </div>
            <div className="stats-card text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">1,234</h3>
              <p className="text-white/60">Active Users</p>
            </div>
            <div className="stats-card text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">4.8</h3>
              <p className="text-white/60">Avg Rating</p>
            </div>
            <div className="stats-card text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">+23%</h3>
              <p className="text-white/60">Growth</p>
            </div>
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="firms" className="w-full">
            <TabsList className="grid w-full grid-cols-5 glass-header mb-8 p-2">
              <TabsTrigger 
                value="firms" 
                className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-6 font-semibold transition-all duration-300"
              >
                <Database className="w-4 h-4 mr-2" />
                All Firms
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-6 font-semibold transition-all duration-300"
              >
                <Star className="w-4 h-4 mr-2" />
                Reviews
              </TabsTrigger>
              <TabsTrigger 
                value="cheap" 
                className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-6 font-semibold transition-all duration-300"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Cheap Firms
              </TabsTrigger>
              <TabsTrigger 
                value="top" 
                className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-6 font-semibold transition-all duration-300"
              >
                <Users className="w-4 h-4 mr-2" />
                Top Firms
              </TabsTrigger>
              <TabsTrigger 
                value="accounts" 
                className="text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-6 font-semibold transition-all duration-300"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Account Sizes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="firms" className="mt-0">
              <AdminFirms />
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <AdminReviews />
            </TabsContent>

            <TabsContent value="cheap" className="mt-0">
              <AdminCheapFirms />
            </TabsContent>

            <TabsContent value="top" className="mt-0">
              <AdminTopFirms />
            </TabsContent>

            <TabsContent value="accounts" className="mt-0">
              <AdminAccountSizes />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
