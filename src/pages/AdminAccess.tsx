
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminAccess = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white text-center">Admin Access</CardTitle>
              <CardDescription className="text-gray-300 text-center">
                Enter admin password to access dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                
                {error && (
                  <div className="text-red-400 text-sm text-center">{error}</div>
                )}
                
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Login as Admin
                </Button>
              </form>
              
              <div className="mt-6 text-sm text-gray-400 text-center">
                <p>Demo password: <code className="bg-white/10 px-2 py-1 rounded text-blue-300">admin123</code></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminAccess;
