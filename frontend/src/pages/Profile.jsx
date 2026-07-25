import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMovieContext } from '../context/MovieContext';
import { MovieGrid } from '../components/movie/MovieGrid';
import { QuickViewModal } from '../components/movie/QuickViewModal';
import { ReviewCard } from '../components/review/ReviewCard';
import { Badge } from '../components/common/Badge';
import { FiUser, FiEdit3, FiBookmark, FiHeart, FiMessageSquare, FiShield } from 'react-icons/fi';

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
  };

  const handleOpenQuickView = (movie) => {
    setQuickViewMovie(movie);
    setQuickViewOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      {/* Cover Header Banner */}
      <div className="relative h-44 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-slate-800 bg-gradient-to-r from-secondary-dark via-slate-900 to-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(#FF6B35_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      </div>

      {/* User Info Container */}
      <div className="relative -mt-16 sm:-mt-24 px-4 sm:px-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5 text-center md:text-left">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl object-cover border-4 border-dark-bg shadow-2xl"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
              <h1 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-100">{user.displayName}</h1>
              <Badge variant="primary" size="xs">
                {user.role}
              </Badge>
            </div>
            <p className="text-xs text-slate-400">{user.email}</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-md pt-1">{user.bio}</p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2.5 rounded-xl sm:rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 hover:border-primary flex items-center gap-2 transition-all"
        >
          <FiEdit3 className="w-4 h-4 text-primary" /> Edit Profile
        </button>
      </div>

      {/* Edit Form Drawer */}
      {isEditing && (
        <form onSubmit={handleSaveBio} className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-slate-800 space-y-4 max-w-xl mx-auto">
          <h3 className="text-xs sm:text-sm font-bold text-slate-200 uppercase font-heading">Update Bio</h3>
          <textarea
            rows={3}
            value={bioInput}
            onChange={(e) => setBioInput(e.target.value)}
            className="w-full bg-slate-900 text-xs sm:text-sm text-slate-100 p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
          />
          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary text-xs font-bold text-white shadow-glow-primary hover:bg-primary-hover transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 sm:gap-4 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('watchlist')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'watchlist' ? 'bg-primary text-white shadow-glow-primary' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FiBookmark /> Watchlist ({watchlist.length})
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'favorites' ? 'bg-primary text-white shadow-glow-primary' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FiHeart /> Favorites ({favorites.length})
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'reviews' ? 'bg-primary text-white shadow-glow-primary' : 'text-slate-400 hover:text-slate-200'
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
            <p className="text-xs text-slate-400 text-center py-8">You haven't written any reviews yet.</p>
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
