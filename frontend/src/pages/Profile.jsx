import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useMovieContext } from '../context/MovieContext';
import { MovieGrid } from '../components/movie/MovieGrid';
import { QuickViewModal } from '../components/movie/QuickViewModal';
import { ReviewCard } from '../components/review/ReviewCard';
import { Badge } from '../components/common/Badge';
import {
  FiUser,
  FiEdit3,
  FiBookmark,
  FiHeart,
  FiMessageSquare,
  FiShield,
  FiStar,
  FiFilm,
  FiAward,
  FiCheck,
  FiX,
  FiActivity,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { watchlist, favorites, customReviews } = useMovieContext();
  const [activeTab, setActiveTab] = useState('watchlist');
  const [isEditing, setIsEditing] = useState(false);
  const [bioInput, setBioInput] = useState(user?.bio || '');

  // Quick view state
  const [quickViewMovie, setQuickViewMovie] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  if (!user) return null;

  const userReviews = customReviews.filter((r) => r.userName === user.displayName);

  const handleSaveBio = (e) => {
    e.preventDefault();
    updateUserProfile({ bio: bioInput });
    setIsEditing(false);
    toast.success('Profile bio updated successfully!');
  };

  const handleOpenQuickView = (movie) => {
    setQuickViewMovie(movie);
    setQuickViewOpen(true);
  };

  const statsMetrics = [
    { label: 'Watchlist Titles', value: watchlist.length, icon: FiBookmark, color: 'text-primary' },
    { label: 'Favorite Films', value: favorites.length, icon: FiHeart, color: 'text-rose-500' },
    { label: 'Published Reviews', value: userReviews.length, icon: FiMessageSquare, color: 'text-accent' },
    { label: 'Critic Rank Score', value: '9.8 / 10', icon: FiAward, color: 'text-emerald-400' },
  ];

  const bioTags = ['Sci-Fi Fanatic', '4K Ultra HD Enthusiast', 'IMDb Top Contributor', 'Classic Cinema'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Cover Header Banner */}
      <div className="relative h-48 sm:h-72 rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-glass-elevated">
        {/* Cover Background Wallpaper */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-dark-bg/40" />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-4 left-10 w-48 h-48 bg-primary/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-4 right-10 w-48 h-48 bg-accent/15 rounded-full filter blur-3xl" />

        {/* Header Cover Tag */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
          <Badge variant="accent" size="sm">
            <FiAward className="w-3.5 h-3.5 mr-1 inline" /> VERIFIED CRITIC
          </Badge>
        </div>
      </div>

      {/* User Info Container */}
      <div className="relative -mt-20 sm:-mt-28 px-4 sm:px-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-left">
          {/* Glowing Profile Avatar */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-purple-600 rounded-3xl blur-md opacity-80 group-hover:opacity-100 transition duration-500 animate-pulse" />
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-dark-bg shadow-spotlight"
            />
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
              <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight text-glow">
                {user.displayName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs uppercase font-bold tracking-wider">
                {user.role}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-lg font-sans leading-relaxed">
              {user.bio}
            </p>

            {/* Quick Bio Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1 justify-center md:justify-start">
              {bioTags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-900/80 text-slate-300 border border-slate-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700/80 hover:border-primary flex items-center gap-2 transition-all shadow-lg hover:scale-105"
        >
          <FiEdit3 className="w-4 h-4 text-primary" /> Edit Profile Bio
        </button>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        {statsMetrics.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl glass-panel-elevated border border-slate-800/80 flex items-center gap-3.5 shadow-md hover:border-slate-700 transition-all"
            >
              <div className={`p-3 rounded-xl bg-slate-900/80 border border-slate-800 ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{stat.label}</p>
                <h4 className="text-base sm:text-xl font-extrabold font-heading text-slate-100 mt-0.5">{stat.value}</h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Form Modal Overlay */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 rounded-3xl glass-panel-elevated border border-slate-700 shadow-spotlight space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-heading flex items-center gap-2">
                  <FiEdit3 className="text-primary" /> Update Profile Bio
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <textarea
                rows={4}
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                placeholder="Write a brief overview of your film preferences, favorite directors, or critic credentials..."
                className="w-full bg-slate-900 text-xs sm:text-sm text-slate-100 p-4 rounded-2xl border border-slate-700 focus:outline-none focus:border-primary font-sans leading-relaxed"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500 font-mono">{bioInput.length} characters</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveBio}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-xs font-bold text-white shadow-glow-primary hover:scale-105 transition-all flex items-center gap-1.5"
                  >
                    <FiCheck className="w-4 h-4" /> Save Bio
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 sm:gap-3 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar pt-2">
        <button
          onClick={() => setActiveTab('watchlist')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-2xl whitespace-nowrap transition-all ${
            activeTab === 'watchlist'
              ? 'bg-primary text-white shadow-glow-primary'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <FiBookmark /> My Watchlist ({watchlist.length})
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-2xl whitespace-nowrap transition-all ${
            activeTab === 'favorites'
              ? 'bg-primary text-white shadow-glow-primary'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <FiHeart /> Favorite Films ({favorites.length})
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-2xl whitespace-nowrap transition-all ${
            activeTab === 'reviews'
              ? 'bg-primary text-white shadow-glow-primary'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <FiMessageSquare /> My Reviews ({userReviews.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'watchlist' && <MovieGrid movies={watchlist} onQuickView={handleOpenQuickView} />}
      {activeTab === 'favorites' && <MovieGrid movies={favorites} onQuickView={handleOpenQuickView} />}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {userReviews.length ? (
            userReviews.map((r) => <ReviewCard key={r.id} review={r} />)
          ) : (
            <div className="p-8 rounded-3xl glass-panel text-center text-slate-400 text-xs">
              You haven't written any movie reviews yet. Explore film details pages to publish reviews!
            </div>
          )}
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        movie={quickViewMovie}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </div>
  );
};

export default Profile;
