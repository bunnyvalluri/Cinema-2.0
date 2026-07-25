import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPlay,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiShield,
  FiCheckCircle,
  FiFilm,
  FiCompass,
  FiBookmark,
  FiArrowRight,
  FiZap,
  FiSearch,
  FiAward,
} from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { tmdbService } from '../services/tmdbService';
import { HeroCarousel } from '../components/movie/HeroCarousel';
import { MovieRow } from '../components/movie/MovieRow';
import { MOVIE_GENRES } from '../utils/constants';

export const Landing = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const genreGradients = [
    'from-rose-500/20 to-orange-500/20 hover:border-rose-500/60',
    'from-blue-500/20 to-cyan-500/20 hover:border-blue-500/60',
    'from-purple-500/20 to-pink-500/20 hover:border-purple-500/60',
    'from-emerald-500/20 to-teal-500/20 hover:border-emerald-500/60',
    'from-amber-500/20 to-yellow-500/20 hover:border-amber-500/60',
    'from-indigo-500/20 to-violet-500/20 hover:border-indigo-500/60',
  ];

  return (
    <div className="space-y-16 pb-12 overflow-hidden">
      {/* Top Hero Marketing CTA Section */}
      <section className="relative pt-6 sm:pt-12 pb-4 text-center max-w-5xl mx-auto px-4">
        {/* Animated Radial Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/30 via-accent/20 to-purple-600/30 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold shadow-glow-primary">
            <FiZap className="w-4 h-4 fill-primary" /> NEXT-GEN ENTERPRISE FILM DISCOVERY
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-tight text-glow">
            Unlimited Cinema, 4K Trailers & Critic Reviews.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Discover over 50,000+ movies, directors, and series. Watch official 4K trailers, save watchlists, and connect with 500,000+ critics worldwide.
          </p>

          {/* Integrated Live Hero Search Bar */}
          <form onSubmit={handleHeroSearchSubmit} className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search any movie title, director, or actor (e.g. Inception)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 text-slate-100 text-xs sm:text-sm pl-11 pr-28 py-3.5 sm:py-4 rounded-full border border-slate-700/80 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all shadow-spotlight backdrop-blur-xl"
              />
              <FiSearch className="absolute left-4 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 sm:py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-glow-primary transition-all flex items-center gap-1"
              >
                Search <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Fast CTA Action Pills */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2 flex-wrap">
            <Link
              to="/explore"
              className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-hover text-white font-extrabold text-xs sm:text-sm shadow-glow-primary hover:scale-105 transition-all flex items-center gap-2"
            >
              <FiCompass className="w-5 h-5" /> Explore Film Catalog <FiArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/register"
              className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-extrabold text-xs sm:text-sm border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2 shadow-spotlight"
            >
              <FiUsers className="w-4 h-4 text-accent" /> Join Critic Club
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Hero Carousel Banner */}
      <HeroCarousel movies={trending} />

      {/* 4K Platform Feature Cards */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-slate-800 space-y-3 hover:border-primary/60 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiFilm className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-100">50,000+ TMDB Catalog</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Search live titles across genres, release years, cast members, and user rating metrics updated in real-time.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-slate-800 space-y-3 hover:border-accent/60 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent border border-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiPlay className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-100">Instant 4K YouTube Trailers</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Watch crisp high-definition official movie trailers directly inside smooth floating video overlays.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-slate-800 space-y-3 hover:border-purple-500/60 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiBookmark className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-100">Smart Watchlist & Favorites</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Organize your personal movie watchlists and favorites synced to your profile account with 1-tap controls.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl glass-panel-elevated border border-slate-800 text-center shadow-spotlight">
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

      {/* Genre Grid with Tailored Ambient Gradients */}
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
          {MOVIE_GENRES.slice(0, 12).map((genre, idx) => {
            const gradClass = genreGradients[idx % genreGradients.length];
            return (
              <Link
                key={genre.id}
                to={`/explore?genre=${genre.id}`}
                className={`p-5 rounded-2xl glass-panel border border-slate-800 text-center bg-gradient-to-br ${gradClass} hover:scale-105 transition-all group shadow-md`}
              >
                <h4 className="font-heading font-bold text-sm text-slate-200 group-hover:text-white">
                  {genre.name}
                </h4>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Community Testimonials */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="p-10 rounded-3xl glass-panel-elevated border border-slate-800 space-y-8 text-center bg-gradient-to-b from-slate-900 to-dark-bg">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100">
            Loved By Film Enthusiasts & Directors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-md">
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-accent w-4 h-4" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic font-sans leading-relaxed">
                "CINEMA ELK 2.0 has completely redefined how our cinephile community discusses new releases. The UI is sleek, fast, and gorgeous!"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Reviewer"
                  className="w-8 h-8 rounded-full border border-primary/40 object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Elena Rostova</h4>
                  <p className="text-[10px] text-slate-400">Film Critic @ CinemaMag</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-md">
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-accent w-4 h-4" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic font-sans leading-relaxed">
                "The TMDB live integration paired with custom rating distributions makes analyzing film popularity effortless."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Reviewer"
                  className="w-8 h-8 rounded-full border border-primary/40 object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Marcus Vance</h4>
                  <p className="text-[10px] text-slate-400">Director & Writer</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-md">
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-accent w-4 h-4" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic font-sans leading-relaxed">
                "The watchlist sync and personalized recommendations mean I never spend 30 minutes scrolling trying to decide what to watch."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                  alt="Reviewer"
                  className="w-8 h-8 rounded-full border border-primary/40 object-cover"
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

      {/* Bottom Conversion CTA Banner */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/20 to-purple-600/30 border border-primary/40 text-center space-y-6 shadow-spotlight backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-glow-primary">
            <FiAward className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Ready for the Ultimate Cinematic Experience?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
            Create your account in under 30 seconds to start saving watchlists, writing critic reviews, and receiving personalized AI movie recommendations.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-xs sm:text-sm shadow-glow-primary hover:scale-105 transition-all flex items-center gap-2"
            >
              🚀 Create Free Account
            </Link>

            <Link
              to="/login"
              className="px-8 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-extrabold text-xs sm:text-sm border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2"
            >
              <FaGoogle className="text-rose-500" /> Sign In With Google
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
