
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Link } from "react-router-dom";

const Blog = () => {
  const { data: blogPosts, isLoading, error } = useBlogPosts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-4">
                Trading Insights & News
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Loading latest trading insights...
              </p>
            </div>
            <LoadingSpinner size="lg" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Trading Insights & News
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest trends, strategies, and news in prop trading
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts && blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <article key={post.id} className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <h3 className="text-xl font-bold text-white mb-4">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Read More →
                  </Link>
                </article>
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3">
                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 shadow-lg text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Coming Soon</h3>
                  <p className="text-gray-300 text-lg">
                    Our trading experts are working on comprehensive guides and insights. 
                    Check back soon for the latest in prop trading strategies and market analysis.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
