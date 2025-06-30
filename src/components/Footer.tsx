
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-2xl font-bold text-blue-400 mb-4 block">
              PropFirm Knowledge
            </Link>
            <p className="text-gray-400 leading-relaxed mb-4">
              Your ultimate destination for prop trading firm reviews, 
              comparisons, and insights. Make informed decisions with our 
              comprehensive analysis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                📘
              </a>
              <a href="#" className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                🐦
              </a>
              <a href="#" className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                📺
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/all-firms" className="text-gray-400 hover:text-white transition-colors">All Firms</Link></li>
              <li><Link to="/compare" className="text-gray-400 hover:text-white transition-colors">Compare</Link></li>
              <li><Link to="/reviews" className="text-gray-400 hover:text-white transition-colors">Reviews</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Beginner Traders</span></li>
              <li><span className="text-gray-400">Intermediate Traders</span></li>
              <li><span className="text-gray-400">Pro Traders</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 PropFirmHub. All rights reserved. Trading involves risk. Please trade responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};
