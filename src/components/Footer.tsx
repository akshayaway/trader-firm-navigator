
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-bold text-white mb-4 block">
              PropFirm Knowledge
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
              Your trusted source for prop trading firm reviews, comparisons, and insights. 
              Make informed decisions with our comprehensive directory.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                📘
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                🐦
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                📷
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/all-firms" className="text-gray-400 hover:text-white transition-colors">All Firms</Link></li>
              <li><Link to="/top-firms" className="text-gray-400 hover:text-white transition-colors">Top Firms</Link></li>
              <li><Link to="/cheap-firms" className="text-gray-400 hover:text-white transition-colors">Cheap Firms</Link></li>
              <li><Link to="/reviews" className="text-gray-400 hover:text-white transition-colors">Reviews</Link></li>
              <li><Link to="/compare" className="text-gray-400 hover:text-white transition-colors">Compare</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Trading Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><Link to="/admin" className="text-blue-400 hover:text-blue-300 transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/50 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 PropFirm Knowledge. All rights reserved. Trade responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};
