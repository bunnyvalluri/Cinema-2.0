import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import { ReviewCard } from '../components/review/ReviewCard';
import { FiUsers, FiAward, FiMessageSquare } from 'react-icons/fi';

export const Community = () => {
  const { customReviews } = useMovieContext();

  const topReviewers = [
    { name: 'Alex Rivers', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', reviewsCount: 142, badge: 'Lead Critic' },
    { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80', reviewsCount: 98, badge: 'Sci-Fi Buff' },
    { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80', reviewsCount: 76, badge: 'Classic Director' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 sm:space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100 flex items-center justify-center gap-3">
          <FiUsers className="text-primary flex-shrink-0" /> Film Critic Community
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Connect with passion-driven film lovers, follow top reviewers, and join trending film discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Activity & Reviews */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-base sm:text-lg font-bold font-heading text-slate-100 flex items-center gap-2">
            <FiMessageSquare className="text-accent" /> Trending Reviews Feed
          </h2>
          <div className="space-y-4">
            {customReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* Right Col: Leaderboard */}
        <div className="space-y-6">
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold font-heading text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <FiAward className="text-accent" /> Top Community Reviewers
            </h3>

            <div className="space-y-3">
              {topReviewers.map((reviewer, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src={reviewer.avatar} alt={reviewer.name} className="w-10 h-10 rounded-full object-cover border border-primary/40 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">{reviewer.name}</h4>
                      <p className="text-[10px] text-slate-400">{reviewer.reviewsCount} Published Reviews</p>
                    </div>
                  </div>
                  <button className="self-end sm:self-auto px-3 py-1 rounded-xl bg-primary/20 text-primary border border-primary/40 text-[11px] font-bold hover:bg-primary hover:text-white transition-all">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
