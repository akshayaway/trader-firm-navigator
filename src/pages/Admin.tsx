
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminFirms } from "@/components/admin/AdminFirms";
import { AdminReviews } from "@/components/admin/AdminReviews";
import { AdminCheapFirms } from "@/components/admin/AdminCheapFirms";
import { AdminTopFirms } from "@/components/admin/AdminTopFirms";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('adminLoggedIn');
    setIsLoggedIn(adminStatus === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  if (!isLoggedIn) {
    return <Navigate to="/admin-access" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-300">Manage prop firms, reviews, and categories</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="firms" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/60 mb-8">
              <TabsTrigger value="firms" className="text-white data-[state=active]:bg-blue-600">
                All Firms
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-blue-600">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="cheap" className="text-white data-[state=active]:bg-blue-600">
                Cheap Firms
              </TabsTrigger>
              <TabsTrigger value="top" className="text-white data-[state=active]:bg-blue-600">
                Top Firms
              </TabsTrigger>
            </TabsList>

            <TabsContent value="firms">
              <AdminFirms />
            </TabsContent>

            <TabsContent value="reviews">
              <AdminReviews />
            </TabsContent>

            <TabsContent value="cheap">
              <AdminCheapFirms />
            </TabsContent>

            <TabsContent value="top">
              <AdminTopFirms />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
