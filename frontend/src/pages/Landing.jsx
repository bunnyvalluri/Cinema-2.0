import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiStar, FiTrendingUp, FiUsers, FiShield, FiCheckCircle } from 'react-icons/fi';
import { tmdbService } from '../services/tmdbService';
import { HeroCarousel } from '../components/movie/HeroCarousel';
import { MovieRow } from '../components/movie/MovieRow';
import { MOVIE_GENRES } from '../utils/constants';

export const Landing = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendRes, popRes, topRes] = await Promise.all([
          tmdbService.getTrending('day'),
          tmdbService.getPopular(1),
          tmdbService.getTopRated(1),
        ]);
        setTrending(trendRes || []);
        setPopular(popRes.results || []);
        setTopRated(topRes.results || []);
      } catch (err) {
        console.error('Landing page data error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-16 pb-12">
      {/* Featured Hero Carousel Banner */}
      <HeroCarousel movies={trending} />

      {/* Stats Counter Bar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl glass-panel border border-slate-800 text-center shadow-xl">
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-primary font-heading">100K+</h3>
            <p className="text-xs text-slate-400 font-semibold uppercase mt-1">Movies & Series</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-accent font-heading">500K+</h3>
            <p className="text-xs text-slate-400 font-semibold uppercase mt-1">Active Critics</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-heading">2M+</h3>
            <p className="text-xs text-slate-400 font-semibold uppercase mt-1">Film Reviews</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-rose-500 font-heading">99.9%</h3>
            <p className="text-xs text-slate-400 font-semibold uppercase mt-1">Platform Uptime</p>
          </div>
        </div>
      </div>

      {/* Trending Row */}
      <div className="max-w-7xl mx-auto px-4">
        <MovieRow title="🔥 Trending Worldwide" movies={trending} explorePath="/explore?category=trending" />
      </div>

      {/* Popular Movies */}
      <div className="max-w-7xl mx-auto px-4">
        <MovieRow title="⭐ Most Popular Films" movies={popular} explorePath="/explore?category=popular" />
      </div>

      {/* Top Rated Movies */}
      <div className="max-w-7xl mx-auto px-4">
        <MovieRow title="🏆 Top Rated All Time" movies={topRated} explorePath="/explore?category=top_rated" />
      </div>

      {/* Genre Grid */}
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100">
            Explore By Cinema Genres
          </h2>
          <p className="text-xs text-slate-400">
            From pulse-pounding Action to breathtaking Sci-Fi, find your next favorite story.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {MOVIE_GENRES.slice(0, 12).map((genre) => (
            <Link
              key={genre.id}
              to={`/explore?genre=${genre.id}`}
              className="p-5 rounded-2xl glass-panel border border-slate-800 text-center hover:border-primary hover:scale-105 transition-all group"
            >
              <h4 className="font-heading font-bold text-sm text-slate-200 group-hover:text-primary">
                {genre.name}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Community Testimonials */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="p-10 rounded-3xl glass-panel border border-slate-800 space-y-8 text-center bg-gradient-to-b from-dark-card to-dark-bg">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100">
            Loved By Film Enthusiasts & Directors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-accent w-4 h-4" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic">
                "CINEMA ELK 2.0 has completely redefined how our cinephile community discusses new releases. The UI is sleek, fast, and gorgeous!"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Reviewer"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Elena Rostova</h4>
                  <p className="text-[10px] text-slate-400">Film Critic @ CinemaMag</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-accent w-4 h-4" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic">
                "The TMDB live integration paired with custom rating distributions makes analyzing film popularity effortless."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Reviewer"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Marcus Vance</h4>
                  <p className="text-[10px] text-slate-400">Director & Writer</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-accent w-4 h-4" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic">
                "The watchlist sync and personalized recommendations mean I never spend 30 minutes scrolling trying to decide what to watch."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                  alt="Reviewer"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Chloe Chen</h4>
                  <p className="text-[10px] text-slate-400">Community Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
