import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import { HeroCarousel } from '../components/movie/HeroCarousel';
import { MovieRow } from '../components/movie/MovieRow';
import { QuickViewModal } from '../components/movie/QuickViewModal';
import { ReviewCard } from '../components/review/ReviewCard';
import { useMovieContext } from '../context/MovieContext';
import { FiTrendingUp, FiFilter } from 'react-icons/fi';

export const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Quick View Modal state
  const [quickViewMovie, setQuickViewMovie] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const { customReviews, recentlyViewed } = useMovieContext();
  const navigate = useNavigate();

  const genrePills = [
    { name: '🔥 Trending', category: 'trending' },
    { name: '💥 Action', genre: 'Action' },
    { name: '🚀 Sci-Fi', genre: 'Sci-Fi' },
    { name: '🎭 Drama', genre: 'Drama' },
    { name: '🔪 Thriller', genre: 'Thriller' },
    { name: '🎨 Animation', genre: 'Animation' },
    { name: '😂 Comedy', genre: 'Comedy' },
    { name: '🏆 Top Rated', category: 'top_rated' },
  ];

  useEffect(() => {
    const loadAllCategories = async () => {
      try {
        const [nowRes, trendRes, popRes, topRes, upRes] = await Promise.all([
          tmdbService.getNowPlaying(1),
          tmdbService.getTrending('week'),
          tmdbService.getPopular(1),
          tmdbService.getTopRated(1),
          tmdbService.getUpcoming(1),
        ]);

        setNowPlaying(nowRes.results || []);
        setTrending(trendRes || []);
        setPopular(popRes.results || []);
        setTopRated(topRes.results || []);
        setUpcoming(upRes.results || []);
      } catch (error) {
        console.error('Home page load error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllCategories();
  }, []);

  const handleOpenQuickView = (movie) => {
    setQuickViewMovie(movie);
    setQuickViewOpen(true);
  };

  const handlePillClick = (item) => {
    if (item.genre) {
      navigate(`/explore?genre=${encodeURIComponent(item.genre)}`);
    } else if (item.category) {
      navigate(`/explore?category=${encodeURIComponent(item.category)}`);
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Featured Header Hero */}
      {loading ? (
        <div className="w-full h-[70vh] rounded-3xl skeleton-shimmer mb-12" />
      ) : (
        <HeroCarousel movies={trending} />
      )}

      {/* Interactive Category Filter Pills Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 px-2 flex-shrink-0">
          <FiFilter className="text-primary" /> Explore:
        </span>
        {genrePills.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => handlePillClick(pill)}
            className="flex-shrink-0 px-4 py-2 rounded-full glass-panel hover:bg-primary text-slate-200 hover:text-white text-xs font-bold border border-slate-700/60 hover:border-primary transition-all duration-200 shadow-md hover:scale-105"
          >
            {pill.name}
          </button>
        ))}
      </div>

      {/* Loading Skeletons vs Real Content */}
      {loading ? (
        <div className="space-y-12">
          {[1, 2, 3].map((n) => (
            <div key={n} className="space-y-4">
              <div className="w-48 h-6 rounded-lg skeleton-shimmer" />
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-[2/3] rounded-2xl skeleton-shimmer" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Now Playing Row */}
          <MovieRow
            title="🎬 In Theaters & Now Playing"
            movies={nowPlaying}
            explorePath="/explore?category=now_playing"
            onQuickView={handleOpenQuickView}
          />

          {/* Recently Viewed (If any) */}
          {recentlyViewed.length > 0 && (
            <MovieRow
              title="🕒 Recently Viewed Films"
              movies={recentlyViewed}
              explorePath="/explore"
              onQuickView={handleOpenQuickView}
            />
          )}

          {/* Popular Movies */}
          <MovieRow
            title="🔥 Trending This Week"
            movies={trending}
            explorePath="/explore?category=trending"
            onQuickView={handleOpenQuickView}
          />

          {/* Recommended Films */}
          <MovieRow
            title="🌟 Highly Recommended For You"
            movies={popular}
            explorePath="/explore?category=popular"
            onQuickView={handleOpenQuickView}
          />

          {/* Top Rated Row */}
          <MovieRow
            title="🏆 Top Rated Masterpieces"
            movies={topRated}
            explorePath="/explore?category=top_rated"
            onQuickView={handleOpenQuickView}
          />

          {/* Upcoming Releases */}
          <MovieRow
            title="🚀 Upcoming Anticipated Movies"
            movies={upcoming}
            explorePath="/explore?category=upcoming"
            onQuickView={handleOpenQuickView}
          />

          {/* Latest Community Reviews Section */}
          <div className="space-y-6 pt-6 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full inline-block shadow-glow-accent" />
              Latest Community Reviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customReviews.slice(0, 4).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Global Quick View Modal */}
      <QuickViewModal
        movie={quickViewMovie}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </div>
  );
};

export default Home;
