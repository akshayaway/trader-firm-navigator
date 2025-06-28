
import { useAuth } from "@/hooks/useAuth";
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
  const { user, isAdmin, signOut } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Access Denied</CardTitle>
                <CardDescription className="text-gray-400">
                  You don't have admin privileges to access this dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Contact an administrator to request admin access.
                </p>
                <Button onClick={() => signOut()} variant="outline">
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
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
            <Button onClick={() => signOut()} variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
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
