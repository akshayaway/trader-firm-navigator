
import { Navigation } from "@/components/Navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import { ReviewSubmissionForm } from "@/components/reviews/ReviewSubmissionForm";
import { UserReviewsList } from "@/components/reviews/UserReviewsList";

const Reviews = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'view'>('view');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Community Reviews</h1>
            <p className="text-gray-300 text-lg">Share your experience and read reviews from other traders</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-slate-800/60 rounded-lg p-1 flex gap-1">
              <button
                onClick={() => setActiveTab('view')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'view'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                View Reviews
              </button>
              <button
                onClick={() => setActiveTab('submit')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'submit'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Submit Review
              </button>
            </div>
          </div>

          {activeTab === 'submit' ? <ReviewSubmissionForm /> : <UserReviewsList />}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
