import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auto-login admin user on page load
  useEffect(() => {
    const autoLoginAdmin = async () => {
      if (!user) {
        setIsLoading(true);
        const { error } = await signIn("immortalwar777@gmail.com", "Hanuman@543");
        
        if (error) {
          toast({
            title: "Auto-login failed",
            description: "Please contact support",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Admin logged in successfully",
            description: "Welcome to the admin dashboard",
          });
        }
        setIsLoading(false);
      }
    };

    autoLoginAdmin();
  }, [user, signIn, toast]);

  // Redirect to admin dashboard once logged in and verified as admin
  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, navigate]);

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
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-400 animate-spin mr-2" />
              <span className="text-white">Authenticating admin...</span>
            </div>
          </div>
        ) : !user ? (
          <div className="space-y-4">
            <p className="text-white/70">Auto-login in progress...</p>
            <Button
              onClick={handleManualLogin}
              className="w-full btn-premium glow-purple"
              disabled={isLoading}
            >
              <Lock className="w-4 h-4 mr-2" />
              Manual Admin Login
            </Button>
          </div>
        ) : !isAdmin ? (
          <div className="space-y-4">
            <p className="text-red-300">Verifying admin privileges...</p>
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
