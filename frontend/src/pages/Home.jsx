import React, { useEffect, useState } from 'react';
import { tmdbService } from '../services/tmdbService';
import { HeroCarousel } from '../components/movie/HeroCarousel';
import { MovieRow } from '../components/movie/MovieRow';
import { ReviewCard } from '../components/review/ReviewCard';
import { useMovieContext } from '../context/MovieContext';

export const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const { customReviews, recentlyViewed } = useMovieContext();

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

  return (
    <div className="space-y-12 pb-16">
      {/* Featured Header Hero */}
      <HeroCarousel movies={trending} />

      {/* Now Playing Row */}
      <div className="max-w-7xl mx-auto px-4">
        <MovieRow title="🎬 In Theaters & Now Playing" movies={nowPlaying} explorePath="/explore?category=now_playing" />
      </div>

      {/* Recently Viewed (If any) */}
      {recentlyViewed.length > 0 && (
        <div className="max-w-7xl mx-auto px-4">
          <MovieRow title="🕒 Recently Viewed Films" movies={recentlyViewed} explorePath="/explore" />
        </div>
      )}

      {/* Popular Movies */}
      <div className="max-w-7xl mx-auto px-4">
        <MovieRow title="🔥 Trending This Week" movies={trending} explorePath="/explore?category=trending" />
      </div>

      {/* Recommended Films */}
      <div className="max-w-7xl mx-auto px-4">
        <MovieRow title="🌟 Highly Recommended For You" movies={popular} explorePath="/explore?category=popular" />
      </div>

      {/* Top Rated Row */}
      <div className="max-w-7xl mx-auto px-4">
        <MovieRow title="🏆 Top Rated Masterpieces" movies={topRated} explorePath="/explore?category=top_rated" />
      </div>

      {/* Upcoming Releases */}
      <div className="max-w-7xl mx-auto px-4">
        <MovieRow title="🚀 Upcoming Anticipated Movies" movies={upcoming} explorePath="/explore?category=upcoming" />
      </div>

      {/* Latest Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-100 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-accent rounded-full inline-block" />
          Latest Community Reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customReviews.slice(0, 4).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};
