import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auto-login admin user on page load
  useEffect(() => {
    const autoLoginAdmin = async () => {
      if (!user && !isLoading) {
        setIsLoading(true);
        try {
          const { error } = await signIn("immortalwar777@gmail.com", "Hanuman@543");
          
          if (error) {
            console.error("Admin login error:", error);
            toast({
              title: "Auto-login failed",
              description: error.message || "Please contact support",
              variant: "destructive",
            });
            setIsLoading(false);
          }
          // Don't set loading to false here - let the auth state change handle it
        } catch (err) {
          console.error("Login exception:", err);
          setIsLoading(false);
          toast({
            title: "Login error",
            description: "An unexpected error occurred",
            variant: "destructive",
          });
        }
      }
    };

    // Only auto-login if we don't have a user and aren't already loading
    if (!user && !isLoading) {
      autoLoginAdmin();
    }
  }, [user, signIn, toast, isLoading]);

  // Redirect to admin dashboard once logged in and verified as admin
  useEffect(() => {
    if (user && isAdmin) {
      console.log("Admin user verified, redirecting to dashboard");
      toast({
        title: "Welcome Admin!",
        description: "Redirecting to dashboard...",
      });
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } else if (user && !isLoading) {
      // User logged in but not admin
      console.log("User logged in but not admin");
      setIsLoading(false);
    }
  }, [user, isAdmin, navigate, toast, isLoading]);

  const handleManualLogin = async () => {
    setIsLoading(true);
    const { error } = await signIn("immortalwar777@gmail.com", "Hanuman@543");
    
    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="glass-card p-8 w-full max-w-md text-center">
        <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl glow-purple inline-block mb-6">
          <Shield className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold gradient-text mb-4">Admin Access</h1>
        
        {isLoading || loading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-400 animate-spin mr-2" />
              <span className="text-white">
                {!user ? "Logging in admin..." : "Verifying admin privileges..."}
              </span>
            </div>
          </div>
        ) : !user ? (
          <div className="space-y-4">
            <p className="text-white/70">Starting admin login...</p>
            <Button
              onClick={handleManualLogin}
              className="w-full btn-premium glow-purple"
              disabled={isLoading}
            >
              <Lock className="w-4 h-4 mr-2" />
              Manual Admin Login
            </Button>
          </div>
        ) : user && !isAdmin ? (
          <div className="space-y-4">
            <p className="text-red-300">Access denied - Admin privileges required</p>
            <Button
              onClick={() => window.location.href = "/"}
              className="w-full btn-secondary"
            >
              Return to Home
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-green-300">✓ Admin authenticated successfully</p>
            <p className="text-white/70">Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
