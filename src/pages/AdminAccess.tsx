
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";

const AdminAccess = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in as admin
    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
    if (isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Admin password check - you have permanent access
    if (password === 'admin123' || password === 'masteradmin2024') {
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminPermanent', 'true'); // Permanent access flag
      navigate('/admin');
    } else {
      setError('Invalid password. Use admin123 or masteradmin2024 for access.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="glass-card p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl glow-purple inline-block mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Secure Admin Access</h1>
            <p className="text-white/70">Enter your admin credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-semibold">
                Admin Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input pr-12"
                  placeholder="Enter admin password"
                  required
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-white/10 p-2"
                  size="sm"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-white/60" />
                  ) : (
                    <Eye className="w-4 h-4 text-white/60" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-premium glow-purple py-3"
            >
              {isLoading ? (
                <>
                  <Lock className="w-4 h-4 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Access Admin Dashboard
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              Admin Passwords: <code className="bg-white/10 px-2 py-1 rounded text-white/80">admin123</code> or <code className="bg-white/10 px-2 py-1 rounded text-white/80">masteradmin2024</code>
            </p>
            <p className="text-green-400 text-xs mt-2">✓ Permanent access enabled for owner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccess;
