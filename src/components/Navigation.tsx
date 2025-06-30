
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Navigation = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [isLocalAdmin, setIsLocalAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('adminLoggedIn');
    setIsLocalAdmin(adminStatus === 'true');
  }, []);

  return (
    <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-400">
            PropFirm Knowledge
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/all-firms" className="text-gray-300 hover:text-white transition-colors">
              All Firms
            </Link>
            <Link to="/top-firms" className="text-gray-300 hover:text-white transition-colors">
              Reviews
            </Link>
            <Link to="/reviews" className="text-gray-300 hover:text-white transition-colors">
              Compare
            </Link>
            <Link to="/compare" className="text-gray-300 hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/admin-access" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              Admin
            </Link>
            {(isAdmin || isLocalAdmin) && (
              <Link to="/admin" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <Button onClick={() => signOut()} variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
