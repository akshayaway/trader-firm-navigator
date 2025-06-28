import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminControls, setShowAdminControls] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
    setShowAdminControls(isAdmin);
  }, []);

  const toggleAdminMode = () => {
    const currentPath = window.location.pathname;
    if (currentPath === '/admin-dashboard-2024') {
      // If on admin dashboard, go back to home
      window.location.href = '/';
    } else {
      // If not on admin dashboard, go to admin dashboard
      window.location.href = '/admin-dashboard-2024';
    }
  };

  return (
    <nav className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              PropFirm Knowledge
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/all-firms" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
              All Firms
            </Link>
            <Link to="/cheap-firms" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
              Cheap Firms
            </Link>
            <Link to="/top-firms" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
              Top Firms
            </Link>
            <Link to="/reviews" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
              Reviews
            </Link>
            <Link to="/compare" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
              Compare
            </Link>
            {showAdminControls && (
              <>
                <button
                  onClick={toggleAdminMode}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                >
                  Admin Dashboard
                </button>
                <Link to="/admin-login" className="text-yellow-400 hover:text-yellow-300 px-3 py-2 text-sm font-medium transition-colors">
                  Admin Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors">
              Home
            </Link>
            <Link to="/all-firms" className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors">
              All Firms
            </Link>
            <Link to="/cheap-firms" className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors">
              Cheap Firms
            </Link>
            <Link to="/top-firms" className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors">
              Top Firms
            </Link>
            <Link to="/reviews" className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors">
              Reviews
            </Link>
            <Link to="/compare" className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors">
              Compare
            </Link>
            {showAdminControls && (
              <>
                <button
                  onClick={toggleAdminMode}
                  className="bg-red-600 hover:bg-red-700 text-white block w-full text-left px-3 py-2 text-base font-medium transition-colors rounded"
                >
                  Admin Dashboard
                </button>
                <Link to="/admin-login" className="text-yellow-400 hover:text-yellow-300 block px-3 py-2 text-base font-medium transition-colors">
                  Admin Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
