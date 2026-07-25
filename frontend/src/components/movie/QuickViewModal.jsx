import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiStar, FiBookmark, FiHeart, FiPlay, FiCalendar, FiClock, FiFilm } from 'react-icons/fi';
import { getImageUrl } from '../../utils/helpers';
import { useMovieContext } from '../../context/MovieContext';
import { tmdbService } from '../../services/tmdbService';

export const QuickViewModal = ({ movie, isOpen, onClose }) => {
  const { toggleWatchlist, toggleFavorite, isInWatchlist, isFavorite } = useMovieContext();
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (movie && isOpen) {
      setShowTrailer(false);
      const fetchFullDetails = async () => {
        try {
          const res = await tmdbService.getMovieDetails(movie.id);
          setDetails(res);
          const trailer = res.videos?.results?.find(
            (v) => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
          );
          setTrailerKey(trailer ? trailer.key : null);
        } catch (err) {
          console.error('Quick view detail error:', err);
          setDetails(null);
        }
      };
      fetchFullDetails();
    }
  }, [movie, isOpen]);

  if (!isOpen || !movie) return null;

  const inWatchlist = isInWatchlist(movie.id);
  const inFavorites = isFavorite(movie.id);
  const backdropUrl = getImageUrl(movie.backdrop_path || movie.poster_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const runtime = details?.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-dark-bg/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-dark-card/95 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-glass-elevated overflow-hidden z-10 max-h-[92vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-dark-bg/80 hover:bg-rose-500 text-slate-300 hover:text-white backdrop-blur-md border border-slate-700/60 transition-all shadow-lg"
          >
            <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Modal Header Backdrop / Trailer */}
          <div className="relative w-full aspect-video sm:aspect-[21/9] bg-slate-900 overflow-hidden flex-shrink-0">
            {showTrailer && trailerKey ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title={`${movie.title} Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img src={backdropUrl} alt={movie.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/50 to-transparent" />

                {trailerKey && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-glow-primary group-hover:scale-110 transition-transform">
                      <FiPlay className="w-5 h-5 sm:w-7 sm:h-7 ml-1 fill-current" />
                    </div>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-28 sm:w-40 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700/60 object-cover flex-shrink-0 hidden sm:block -mt-14 relative z-10"
              />

              <div className="flex-1 space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="flex items-center gap-1 bg-accent/20 text-accent font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs border border-accent/30">
                    <FiStar className="fill-accent w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {rating} Rating
                  </span>
                  {releaseYear && (
                    <span className="flex items-center gap-1 text-slate-300 text-[11px] sm:text-xs font-semibold">
                      <FiCalendar className="text-primary w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {releaseYear}
                    </span>
                  )}
                  {runtime && (
                    <span className="flex items-center gap-1 text-slate-300 text-[11px] sm:text-xs font-semibold">
                      <FiClock className="text-emerald-400 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {runtime}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[9px] sm:text-[10px] uppercase font-bold text-slate-300">
                    HD 4K
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-white">{movie.title}</h2>

                {/* Genres */}
                {details?.genres && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {details.genres.map((g) => (
                      <span key={g.id} className="text-[11px] sm:text-xs px-2 py-0.5 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50">
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-4 sm:line-clamp-none">
                  {movie.overview || 'No synopsis available for this title.'}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWatchlist(movie)}
                  className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    inWatchlist
                      ? 'bg-primary text-white border-primary shadow-glow-primary'
                      : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:border-primary'
                  }`}
                >
                  <FiBookmark className="w-4 h-4 fill-current" />
                  {inWatchlist ? 'Saved' : 'Watchlist'}
                </button>

                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                    inFavorites
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:text-rose-400'
                  }`}
                  title="Favorite"
                >
                  <FiHeart className="w-4 h-4 fill-current" />
                </button>
              </div>

              <Link
                to={`/movie/${movie.id}`}
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white text-xs font-bold shadow-glow-primary hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <FiFilm className="w-4 h-4" /> Full Details Page
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
