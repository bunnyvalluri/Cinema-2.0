import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiInfo, FiStar, FiBookmark, FiX, FiCheck } from 'react-icons/fi';
import { getImageUrl } from '../../utils/helpers';
import { Badge } from '../common/Badge';
import { useMovieContext } from '../../context/MovieContext';
import { tmdbService } from '../../services/tmdbService';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export const HeroCarousel = ({ movies = [] }) => {
  const [activeTrailerKey, setActiveTrailerKey] = useState(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const { toggleWatchlist, isInWatchlist } = useMovieContext();

  const handlePlayTrailer = async (movie) => {
    setTrailerLoading(true);
    try {
      const res = await tmdbService.getMovieDetails(movie.id);
      const trailer = res.videos?.results?.find(
        (v) => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
      );
      if (trailer) {
        setActiveTrailerKey(trailer.key);
        setShowTrailerModal(true);
      } else {
        alert('Trailer not available for this title.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTrailerLoading(false);
    }
  };

  if (!movies.length) return null;

  return (
    <div className="relative w-full h-[65vh] xs:h-[70vh] sm:h-[75vh] min-h-[440px] max-h-[820px] overflow-hidden rounded-2xl sm:rounded-3xl mb-8 sm:mb-12 shadow-glass-elevated border border-slate-800/80">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1200}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {movies.slice(0, 5).map((movie) => {
          const backdrop = getImageUrl(movie.backdrop_path, 'original');
          const inWatchlist = isInWatchlist(movie.id);

          return (
            <SwiperSlide key={movie.id} className="relative w-full h-full">
              {/* Background Backdrop Image */}
              <div className="absolute inset-0 bg-dark-bg">
                <img
                  src={backdrop}
                  alt={movie.title}
                  className="w-full h-full object-cover object-center sm:object-top opacity-50 sm:opacity-60 scale-105 transition-transform duration-10000 ease-out"
                />
                {/* Dynamic Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/90 sm:via-dark-bg/85 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-dark-bg/60 sm:to-dark-bg/40" />
              </div>

              {/* Slide Content */}
              <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-8 md:px-12 flex flex-col justify-end sm:justify-center pb-12 sm:pb-0 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl space-y-3 sm:space-y-4"
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <Badge variant="accent" size="xs">
                      FEATURED
                    </Badge>
                    <div className="flex items-center gap-1 text-accent bg-dark-bg/90 backdrop-blur-xl px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold border border-slate-700/80 shadow-md">
                      <FiStar className="fill-accent w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{movie.vote_average ? movie.vote_average.toFixed(1) : '8.5'} IMDb</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-300">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : '2024'}
                    </span>
                    <span className="hidden xs:inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-bold tracking-wider">
                      98% MATCH
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700 text-[10px] font-bold">
                      ULTRA HD 4K
                    </span>
                  </div>

                  <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight text-glow line-clamp-2">
                    {movie.title}
                  </h1>

                  <p className="text-xs sm:text-sm lg:text-base text-slate-300 line-clamp-2 sm:line-clamp-3 leading-relaxed font-sans max-w-xl">
                    {movie.overview}
                  </p>

                  <div className="flex items-center gap-2.5 sm:gap-4 pt-2 sm:pt-4 flex-wrap">
                    <button
                      onClick={() => handlePlayTrailer(movie)}
                      disabled={trailerLoading}
                      className="px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-primary-hover text-white font-bold text-xs sm:text-sm shadow-glow-primary hover:scale-105 flex items-center gap-2 transition-all"
                    >
                      <FiPlay className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      {trailerLoading ? 'Loading...' : 'Watch Trailer'}
                    </button>

                    <Link
                      to={`/movie/${movie.id}`}
                      className="px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700/80 backdrop-blur-md flex items-center gap-1.5 sm:gap-2 transition-all hover:border-slate-500"
                    >
                      <FiInfo className="w-4 h-4" /> <span className="hidden xs:inline">Full</span> Details
                    </Link>

                    <button
                      onClick={() => toggleWatchlist(movie)}
                      className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm border backdrop-blur-md flex items-center gap-2 transition-all ${
                        inWatchlist
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-slate-800/60 text-slate-200 border-slate-700/60 hover:border-slate-500'
                      }`}
                      title={inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                    >
                      {inWatchlist ? <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiBookmark className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Trailer Video Player Overlay Modal */}
      <AnimatePresence>
        {showTrailerModal && activeTrailerKey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8 bg-dark-bg/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-spotlight border border-slate-700"
            >
              <button
                onClick={() => setShowTrailerModal(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-dark-bg/80 hover:bg-rose-500 text-white backdrop-blur-md transition-all shadow-lg border border-slate-700"
              >
                <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeTrailerKey}?autoplay=1`}
                title="Trailer"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;
