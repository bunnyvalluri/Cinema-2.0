import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovieContext } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import { ReviewCard } from '../components/review/ReviewCard';
import { ReviewForm } from '../components/review/ReviewForm';
import {
  FiUsers,
  FiAward,
  FiMessageSquare,
  FiPlus,
  FiStar,
  FiTrendingUp,
  FiCheck,
  FiX,
  FiCompass,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export const Community = () => {
  const { customReviews } = useMovieContext();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [followingMap, setFollowingMap] = useState({});

  const initialTopReviewers = [
    { id: 'rev_usr_1', name: 'Alex Rivers', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', reviewsCount: 142, badge: '🥇 Lead Critic', upvotes: '14.2k' },
    { id: 'rev_usr_2', name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80', reviewsCount: 98, badge: '🥈 Sci-Fi Buff', upvotes: '9.8k' },
    { id: 'rev_usr_3', name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80', reviewsCount: 76, badge: '🥉 Classic Director', upvotes: '7.6k' },
  ];

  const toggleFollow = (id, name) => {
    setFollowingMap((prev) => {
      const isFollowing = !prev[id];
      if (isFollowing) {
        toast.success(`You are now following ${name}!`);
      } else {
        toast.success(`Unfollowed ${name}`);
      }
      return { ...prev, [id]: isFollowing };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Community Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-elevated border border-slate-800 p-6 sm:p-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-dark-bg/90 to-purple-900/20" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold">
              <FiUsers className="w-3.5 h-3.5" /> CINEMA ELK CRITIC CLUB
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight text-glow">
              Film Critic Community
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
              Connect with passion-driven film lovers, follow top verified critics, discuss cinematography, and publish your film reviews.
            </p>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 pt-2 justify-center md:justify-start text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <FiUsers className="text-primary" /> 18.4K Active Critics
              </span>
              <span className="flex items-center gap-1.5">
                <FiMessageSquare className="text-accent" /> {customReviews.length + 120} Reviews Published
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-hover text-white font-bold text-xs sm:text-sm shadow-glow-primary hover:scale-105 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <FiPlus className="w-5 h-5" /> Write a Review
          </button>
        </div>
      </div>

      {/* Main Grid: Feed & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Feed Filter Tabs & Reviews */}
        <div className="lg:col-span-2 space-y-6">
          {/* Feed Filter Bar */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <h2 className="text-base sm:text-lg font-bold font-heading text-slate-100 flex items-center gap-2">
              <FiTrendingUp className="text-accent" /> Trending Reviews Feed
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-primary text-white shadow-glow-primary'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                All Reviews
              </button>
              <button
                onClick={() => setActiveFilter('critics')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === 'critics'
                    ? 'bg-primary text-white shadow-glow-primary'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                Top Critics
              </button>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-4">
            {customReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* Right Col: Leaderboard */}
        <div className="space-y-6">
          <div className="p-4 sm:p-6 rounded-3xl glass-panel-elevated border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs sm:text-sm font-bold font-heading text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <FiAward className="text-accent" /> Top Community Reviewers
              </h3>
            </div>

            <div className="space-y-3">
              {initialTopReviewers.map((reviewer) => {
                const isFollowing = followingMap[reviewer.id];
                return (
                  <div
                    key={reviewer.id}
                    className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={reviewer.avatar}
                        alt={reviewer.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-primary/40 flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1">
                          {reviewer.name}
                        </h4>
                        <p className="text-[10px] text-accent font-semibold">{reviewer.badge}</p>
                        <p className="text-[10px] text-slate-400">{reviewer.reviewsCount} Reviews ({reviewer.upvotes} likes)</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFollow(reviewer.id, reviewer.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isFollowing
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-primary/20 text-primary border border-primary/40 hover:bg-primary hover:text-white'
                      }`}
                    >
                      {isFollowing ? <FiCheck className="w-4 h-4 inline" /> : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Write Review Modal Overlay */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl p-6 rounded-3xl glass-panel-elevated border border-slate-700 shadow-spotlight space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-heading flex items-center gap-2">
                  <FiPlus className="text-primary" /> Publish Community Review
                </h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <ReviewForm movieId={157336} movieTitle="Interstellar" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;
