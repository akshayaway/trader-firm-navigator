
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const { user, signOut } = useAuth();

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
              Top Firms
            </Link>
            <Link to="/reviews" className="text-gray-300 hover:text-white transition-colors">
              Reviews
            </Link>
            <Link to="/compare" className="text-gray-300 hover:text-white transition-colors">
              Compare
            </Link>
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
