import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  FiChevronDown,
  FiCpu,
  FiClock,
  FiTv,
  FiHeart,
  FiSmile,
  FiMusic,
  FiVideo,
  FiEye,
  FiBookOpen,
  FiSun,
  FiActivity,
} from 'react-icons/fi';
import { FaGoogle, FaImdb } from 'react-icons/fa';
import { tmdbService } from '../services/tmdbService';
import { HeroCarousel } from '../components/movie/HeroCarousel';
import { MovieRow } from '../components/movie/MovieRow';
import { MOVIE_GENRES } from '../utils/constants';

// Distinct, vibrant color palettes and icons for each genre
const GENRE_STYLES = {
  28: { bg: 'from-red-600/40 via-red-500/25 to-orange-500/30', border: 'border-red-500/50 hover:border-red-400', icon: FiZap, iconColor: 'text-red-400', titleColor: 'group-hover:text-red-300' }, // Action
  12: { bg: 'from-amber-500/40 via-amber-400/25 to-yellow-500/30', border: 'border-amber-500/50 hover:border-amber-300', icon: FiCompass, iconColor: 'text-amber-400', titleColor: 'group-hover:text-amber-300' }, // Adventure
  16: { bg: 'from-pink-500/40 via-pink-400/25 to-rose-400/30', border: 'border-pink-500/50 hover:border-pink-300', icon: FiSmile, iconColor: 'text-pink-400', titleColor: 'group-hover:text-pink-300' }, // Animation
  35: { bg: 'from-yellow-400/40 via-yellow-300/25 to-lime-400/30', border: 'border-yellow-400/50 hover:border-yellow-200', icon: FiSmile, iconColor: 'text-yellow-300', titleColor: 'group-hover:text-yellow-200' }, // Comedy
  80: { bg: 'from-slate-700/60 via-indigo-900/40 to-slate-900/40', border: 'border-slate-500/50 hover:border-indigo-400', icon: FiShield, iconColor: 'text-indigo-400', titleColor: 'group-hover:text-indigo-300' }, // Crime
  99: { bg: 'from-teal-500/40 via-emerald-400/25 to-cyan-500/30', border: 'border-teal-500/50 hover:border-teal-300', icon: FiVideo, iconColor: 'text-teal-300', titleColor: 'group-hover:text-teal-200' }, // Documentary
  18: { bg: 'from-purple-600/40 via-indigo-600/25 to-violet-500/30', border: 'border-purple-500/50 hover:border-purple-300', icon: FiFilm, iconColor: 'text-purple-400', titleColor: 'group-hover:text-purple-300' }, // Drama
  10751: { bg: 'from-sky-400/40 via-blue-500/25 to-cyan-400/30', border: 'border-sky-400/50 hover:border-sky-300', icon: FiUsers, iconColor: 'text-sky-300', titleColor: 'group-hover:text-sky-200' }, // Family
  14: { bg: 'from-emerald-500/40 via-teal-500/25 to-emerald-400/30', border: 'border-emerald-500/50 hover:border-emerald-300', icon: FiStar, iconColor: 'text-emerald-400', titleColor: 'group-hover:text-emerald-300' }, // Fantasy
  36: { bg: 'from-amber-700/40 via-orange-600/25 to-amber-500/30', border: 'border-amber-600/50 hover:border-amber-400', icon: FiBookOpen, iconColor: 'text-amber-400', titleColor: 'group-hover:text-amber-300' }, // History
  27: { bg: 'from-rose-900/60 via-red-800/40 to-rose-700/30', border: 'border-rose-600/60 hover:border-rose-400', icon: FiEye, iconColor: 'text-rose-400', titleColor: 'group-hover:text-rose-300' }, // Horror
  10402: { bg: 'from-fuchsia-600/40 via-pink-500/25 to-purple-600/30', border: 'border-fuchsia-500/50 hover:border-fuchsia-300', icon: FiMusic, iconColor: 'text-fuchsia-400', titleColor: 'group-hover:text-fuchsia-300' }, // Music
  9648: { bg: 'from-violet-700/40 via-indigo-600/25 to-blue-700/30', border: 'border-violet-500/50 hover:border-violet-300', icon: FiSearch, iconColor: 'text-violet-400', titleColor: 'group-hover:text-violet-300' }, // Mystery
  10749: { bg: 'from-rose-500/40 via-pink-600/25 to-red-500/30', border: 'border-rose-400/50 hover:border-rose-300', icon: FiHeart, iconColor: 'text-rose-300', titleColor: 'group-hover:text-rose-200' }, // Romance
  878: { bg: 'from-cyan-500/40 via-blue-600/25 to-teal-400/30', border: 'border-cyan-400/50 hover:border-cyan-300', icon: FiCpu, iconColor: 'text-cyan-300', titleColor: 'group-hover:text-cyan-200' }, // Sci-Fi
  10770: { bg: 'from-indigo-500/40 via-purple-600/25 to-slate-700/30', border: 'border-indigo-400/50 hover:border-indigo-300', icon: FiTv, iconColor: 'text-indigo-300', titleColor: 'group-hover:text-indigo-200' }, // TV Movie
  53: { bg: 'from-lime-500/40 via-emerald-600/25 to-green-500/30', border: 'border-lime-400/50 hover:border-lime-300', icon: FiActivity, iconColor: 'text-lime-300', titleColor: 'group-hover:text-lime-200' }, // Thriller
  10752: { bg: 'from-stone-700/50 via-amber-900/40 to-stone-800/40', border: 'border-stone-500/50 hover:border-amber-400', icon: FiShield, iconColor: 'text-amber-400', titleColor: 'group-hover:text-amber-300' }, // War
  37: { bg: 'from-orange-600/40 via-yellow-600/25 to-amber-700/30', border: 'border-orange-500/50 hover:border-orange-300', icon: FiSun, iconColor: 'text-orange-400', titleColor: 'group-hover:text-orange-300' }, // Western
};


// Framer motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is Cinema 2.0 and how does it work?',
    answer:
      'Cinema 2.0 is a next-generation film discovery platform powered by the TMDB real-time API. It provides 4K YouTube movie trailers, live ratings, critic reviews, and cloud-synced watchlists in a high-performance web experience.',
  },
  {
    question: 'Is Cinema 2.0 free to use?',
    answer:
      'Yes! Cinema 2.0 is 100% free. You can search over 50,000+ movies, watch trailers, explore genres, and create an account to save personal watchlists without paying anything.',
  },
  {
    question: 'How do Watchlists and Favorites work?',
    answer:
      'Simply click the bookmark or heart icon on any movie card or detail page while signed in. Your saved films sync instantly across all your devices and appear in your personal Profile dashboard.',
  },
  {
    question: 'Where does the movie data and trailer content come from?',
    answer:
      'We aggregate real-time movie details, cast members, user ratings, and backdrop artwork directly from The Movie Database (TMDB) and official YouTube 4K trailer streams.',
  },
];

export const Landing = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendRes, popRes, topRes, upRes] = await Promise.all([
          tmdbService.getTrending('day'),
          tmdbService.getPopular(1),
          tmdbService.getTopRated(1),
          tmdbService.getUpcoming(1),
        ]);
        setTrending(trendRes || []);
        setPopular(popRes.results || []);
        setTopRated(topRes.results || []);
        setUpcoming(upRes.results || []);
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

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    navigate(`/explore?search=${encodeURIComponent(tag)}`);
  };

  const genreGradients = [
    'from-rose-500/20 to-orange-500/20 hover:border-rose-500/60',
    'from-blue-500/20 to-cyan-500/20 hover:border-blue-500/60',
    'from-purple-500/20 to-pink-500/20 hover:border-purple-500/60',
    'from-emerald-500/20 to-teal-500/20 hover:border-emerald-500/60',
    'from-amber-500/20 to-yellow-500/20 hover:border-amber-500/60',
    'from-indigo-500/20 to-violet-500/20 hover:border-indigo-500/60',
  ];

  // Map active tab to movies list
  const getTabMovies = () => {
    switch (activeTab) {
      case 'popular':
        return popular;
      case 'top_rated':
        return topRated;
      case 'upcoming':
        return upcoming;
      case 'trending':
      default:
        return trending;
    }
  };

  return (
    <div className="space-y-20 pb-16 overflow-hidden">
      {/* Top Hero Marketing CTA Section */}
      <section className="relative pt-8 sm:pt-16 pb-6 text-center max-w-6xl mx-auto px-4">
        {/* Animated Ambient Glow Effects */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/25 via-accent/20 to-purple-600/25 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/2 -left-32 w-72 h-72 bg-blue-600/15 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-72 h-72 bg-primary/15 rounded-full filter blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 space-y-6"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-primary/40 text-slate-200 text-xs font-bold shadow-glow-primary backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <FiZap className="w-4 h-4 text-primary fill-primary/30" />
            <span className="tracking-wider uppercase text-[11px] font-extrabold text-primary">CINEMA 2.0 • NEXT-GEN FILM DISCOVERY</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            Discover Cinema That Speaks To Your{' '}
            <span className="text-gradient-brand underline decoration-primary/40 decoration-wavy decoration-2">
              Soul
            </span>.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Search over 50,000+ movies & series. Experience 4K trailers, live IMDb ratings, personalized recommendations, and cloud watchlists.
          </motion.p>

          {/* Integrated Search Input with Glassmorphic styling */}
          <motion.form
            variants={fadeInUp}
            onSubmit={handleHeroSearchSubmit}
            className="max-w-2xl mx-auto pt-2"
          >
            <div className="relative flex items-center group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative w-full flex items-center bg-slate-900/95 rounded-full border border-slate-700/80 focus-within:border-primary transition-all">
                <FiSearch className="absolute left-5 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search title, actor, or director (e.g. Inception, Nolan)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-slate-100 text-sm pl-12 pr-32 py-4 rounded-full focus:outline-none placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-hover text-white text-xs font-extrabold shadow-glow-primary hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  Search <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Search Suggestion Pills */}
            <div className="flex items-center justify-center gap-2 pt-3 flex-wrap text-xs text-slate-400 font-medium">
              <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider">Popular:</span>
              {['Sci-Fi Thrillers', 'Christopher Nolan', 'Top Rated 2024', 'Marvel Universe'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="glass-pill px-3 py-1 rounded-full text-slate-300 hover:text-white text-[11px] transition-all flex items-center gap-1"
                >
                  <FiZap className="w-3 h-3 text-accent" /> {tag}
                </button>
              ))}
            </div>
          </motion.form>

          {/* Action CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-3 sm:gap-4 pt-3 flex-wrap"
          >
            <Link
              to="/explore"
              className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-gradient-to-r from-primary via-orange-500 to-primary-hover text-white font-extrabold text-xs sm:text-sm shadow-glow-primary hover:scale-105 transition-all flex items-center gap-2"
            >
              <FiCompass className="w-5 h-5" /> Explore Full Catalog <FiArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/register"
              className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-extrabold text-xs sm:text-sm border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2 shadow-spotlight"
            >
              <FiUsers className="w-4 h-4 text-accent" /> Join Cinephile Club
            </Link>
          </motion.div>

          {/* Trust Metric Badges */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto border-t border-slate-800/80 text-xs font-semibold text-slate-400"
          >
            <div className="flex items-center justify-center gap-2">
              <FiStar className="w-4 h-4 text-accent fill-accent" />
              <span>4.9/5 Cinephile Score</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiFilm className="w-4 h-4 text-primary" />
              <span>50,000+ Film Titles</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiPlay className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Instant 4K Previews</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiShield className="w-4 h-4 text-purple-400" />
              <span>100% Free Forever</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Hero Carousel Banner */}
      <div className="max-w-7xl mx-auto px-4">
        <HeroCarousel movies={trending} />
      </div>

      {/* Interactive Platform Showcase Cards */}
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-extrabold uppercase tracking-wider">
            Engineered For Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-100">
            Why Film Lovers Trust Cinema 2.0
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Designed from the ground up for movie buffs, critics, and casual stream lovers.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl glass-panel-elevated border border-slate-800 space-y-4 hover:border-primary/60 transition-all shadow-xl group"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiCpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-100">AI Taste Matcher</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Discover hidden gems tailored to your favorite genres, directors, and actors with smart algorithms.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl glass-panel-elevated border border-slate-800 space-y-4 hover:border-accent/60 transition-all shadow-xl group"
          >
            <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent border border-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiPlay className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-100">Instant 4K Trailers</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Watch official high-definition trailers directly inside crisp floating video overlays without leaving the page.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl glass-panel-elevated border border-slate-800 space-y-4 hover:border-emerald-500/60 transition-all shadow-xl group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaImdb className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-100">Real-time TMDB Metrics</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Access up-to-date IMDb score averages, release dates, budget metrics, and complete cast lists.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl glass-panel-elevated border border-slate-800 space-y-4 hover:border-purple-500/60 transition-all shadow-xl group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiBookmark className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-100">Cloud Watchlist Sync</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Organize personal movie watchlists and favorites synced to your profile account with 1-tap controls.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Category Showcase Tabs */}
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100 flex items-center gap-2">
              <FiFilm className="text-primary" /> Curated Movie Collection
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Switch categories to inspect trending titles, top rated classics, and upcoming blockbusters.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {[
              { id: 'trending', label: '🔥 Trending', icon: FiTrendingUp },
              { id: 'top_rated', label: '⭐ Top Rated', icon: FiStar },
              { id: 'popular', label: '🍿 Popular', icon: FiTv },
              { id: 'upcoming', label: '🎬 Upcoming', icon: FiClock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-glow-primary'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Movie Row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <MovieRow
              title={
                activeTab === 'trending'
                  ? 'Trending Worldwide Today'
                  : activeTab === 'top_rated'
                  ? 'All-Time Highest Rated Films'
                  : activeTab === 'popular'
                  ? 'Popular Cinema Hits'
                  : 'Upcoming Highly Anticipated Movies'
              }
              movies={getTabMovies()}
              explorePath={`/explore?category=${activeTab}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats Counter Bar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl glass-panel-elevated border border-slate-800 text-center shadow-spotlight">
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-primary font-heading">100K+</h3>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Movies & Series</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-accent font-heading">500K+</h3>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Critics</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-heading">2M+</h3>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Film Reviews</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-rose-500 font-heading">99.9%</h3>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Platform Uptime</p>
          </div>
        </div>
      </div>

      {/* Infinite Rotating Genre Carousel */}
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-accent text-[11px] font-bold uppercase tracking-wider">
            <FiZap className="w-3.5 h-3.5" /> INFINITE EXPLORER
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100">
            Explore By Cinema Genres
          </h2>
          <p className="text-xs text-slate-400">
            Hover to pause & click any genre to discover matching titles.
          </p>
        </div>

        <div className="relative overflow-hidden w-full space-y-4 py-2">
          {/* Side Vignette Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-dark-bg via-dark-bg/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-dark-bg via-dark-bg/90 to-transparent z-10 pointer-events-none" />

          {/* Row 1: First 10 unique genres (Leftward Infinite Rotation) */}
          <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] py-1">
            {(() => {
              const firstHalf = MOVIE_GENRES.slice(0, 10);
              return [...firstHalf, ...firstHalf].map((genre, idx) => {
                const style = GENRE_STYLES[genre.id] || {
                  bg: 'from-slate-800/40 to-slate-900/40',
                  border: 'border-slate-700/50 hover:border-slate-400',
                  icon: FiCompass,
                  iconColor: 'text-slate-400',
                  titleColor: 'group-hover:text-white',
                };
                const IconComp = style.icon;
                return (
                  <Link
                    key={`row1-${genre.id}-${idx}`}
                    to={`/explore?genre=${genre.id}`}
                    className={`w-36 sm:w-44 p-4 rounded-2xl glass-panel border ${style.border} text-center bg-gradient-to-br ${style.bg} hover:scale-105 transition-all shadow-lg flex flex-col items-center justify-center gap-2 shrink-0 group`}
                  >
                    <IconComp className={`w-5 h-5 ${style.iconColor} group-hover:scale-110 transition-transform`} />
                    <h4 className={`font-heading font-bold text-sm text-slate-200 ${style.titleColor} transition-colors`}>
                      {genre.name}
                    </h4>
                  </Link>
                );
              });
            })()}
          </div>

          {/* Row 2: Remaining 9 unique genres (Rightward Infinite Rotation) */}
          <div className="flex w-max gap-4 animate-marquee-reverse hover:[animation-play-state:paused] py-1">
            {(() => {
              const secondHalf = MOVIE_GENRES.slice(10);
              return [...secondHalf, ...secondHalf].map((genre, idx) => {
                const style = GENRE_STYLES[genre.id] || {
                  bg: 'from-slate-800/40 to-slate-900/40',
                  border: 'border-slate-700/50 hover:border-slate-400',
                  icon: FiCompass,
                  iconColor: 'text-slate-400',
                  titleColor: 'group-hover:text-white',
                };
                const IconComp = style.icon;
                return (
                  <Link
                    key={`row2-${genre.id}-${idx}`}
                    to={`/explore?genre=${genre.id}`}
                    className={`w-36 sm:w-44 p-4 rounded-2xl glass-panel border ${style.border} text-center bg-gradient-to-br ${style.bg} hover:scale-105 transition-all shadow-lg flex flex-col items-center justify-center gap-2 shrink-0 group`}
                  >
                    <IconComp className={`w-5 h-5 ${style.iconColor} group-hover:scale-110 transition-transform`} />
                    <h4 className={`font-heading font-bold text-sm text-slate-200 ${style.titleColor} transition-colors`}>
                      {genre.name}
                    </h4>
                  </Link>
                );
              });
            })()}
          </div>


        </div>
      </div>


      {/* Interactive FAQ Accordion */}
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-accent text-[11px] font-bold uppercase tracking-wider">
            Got Questions?
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-200 hover:text-white focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <FiChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed border-t border-slate-800/60 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Community & Critic Testimonials */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-elevated border border-slate-800 space-y-8 text-center bg-gradient-to-b from-slate-900 to-dark-bg">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-100">
              Loved By Film Enthusiasts & Directors
            </h2>
            <p className="text-xs text-slate-400">See what our community members have to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-md hover:border-slate-700 transition-all">
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-accent w-4 h-4" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic font-sans leading-relaxed">
                "CINEMA ELK 2.0 has completely redefined how our cinephile community discusses new releases. The UI is sleek, fast, and gorgeous!"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Reviewer"
                  className="w-9 h-9 rounded-full border border-primary/40 object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Elena Rostova</h4>
                  <p className="text-[10px] text-slate-400">Film Critic @ CinemaMag</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-md hover:border-slate-700 transition-all">
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-accent w-4 h-4" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic font-sans leading-relaxed">
                "The TMDB live integration paired with custom rating distributions makes analyzing film popularity effortless."
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Reviewer"
                  className="w-9 h-9 rounded-full border border-primary/40 object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">Marcus Vance</h4>
                  <p className="text-[10px] text-slate-400">Independent Film Director</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-md hover:border-slate-700 transition-all">
              <div className="flex items-center gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-accent w-4 h-4" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic font-sans leading-relaxed">
                "The watchlist sync and personalized recommendations mean I never spend 30 minutes scrolling trying to decide what to watch."
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                  alt="Reviewer"
                  className="w-9 h-9 rounded-full border border-primary/40 object-cover"
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
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/20 to-purple-600/30 border border-primary/40 text-center space-y-6 shadow-spotlight backdrop-blur-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
          <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-glow-primary">
            <FiAward className="w-7 h-7" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Ready for the Ultimate Cinematic Experience?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
            Create your account in under 30 seconds to start saving watchlists, writing critic reviews, and receiving personalized AI movie recommendations.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap pt-3 z-10 relative">
            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-extrabold text-xs sm:text-sm shadow-glow-primary hover:scale-105 transition-all flex items-center gap-2"
            >
              🚀 Create Free Account
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-extrabold text-xs sm:text-sm border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2"
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
