import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiBookmark, FiHeart, FiPlay, FiEye } from 'react-icons/fi';
import { getImageUrl } from '../../utils/helpers';
import { useMovieContext } from '../../context/MovieContext';

export const MovieCard = ({ movie, onQuickView }) => {
  const { toggleWatchlist, toggleFavorite, isInWatchlist, isFavorite } = useMovieContext();
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const inWatchlist = isInWatchlist(movie.id);
  const inFavorites = isFavorite(movie.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl flex flex-col justify-between"
    >
      {/* Ambient Poster Blur Glow Cast */}
      <div
        className="poster-glow-bg"
        style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Main Card Surface */}
      <div className="relative z-10 w-full rounded-2xl overflow-hidden glass-card border border-slate-800/80 flex flex-col justify-between shadow-xl">
        {/* Poster Container */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
          <img
            src={posterUrl}
            alt={movie.title}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3.5 backdrop-blur-[2px]">
            {/* Top Quick Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWatchlist(movie);
                }}
                className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 ${
                  inWatchlist
                    ? 'bg-primary text-white shadow-glow-primary'
                    : 'bg-dark-bg/80 text-slate-200 hover:text-primary border border-slate-700/60'
                }`}
                title="Watchlist"
              >
                <FiBookmark className="w-4 h-4 fill-current" />
              </button>

              <div className="flex items-center gap-1.5">
                {onQuickView && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onQuickView(movie);
                    }}
                    className="p-2 rounded-xl bg-dark-bg/80 hover:bg-slate-800 text-slate-200 hover:text-accent border border-slate-700/60 backdrop-blur-md transition-all"
                    title="Quick Preview"
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(movie);
                  }}
                  className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 ${
                    inFavorites
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-dark-bg/80 text-slate-200 hover:text-rose-400 border border-slate-700/60'
                  }`}
                  title="Favorite"
                >
                  <FiHeart className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            {/* Center Play Play Button */}
            <Link
              to={`/movie/${movie.id}`}
              className="self-center w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-glow-primary hover:scale-115 transition-all"
            >
              <FiPlay className="w-5 h-5 ml-0.5 fill-current" />
            </Link>

            {/* Bottom Synopsis Snippet */}
            <div className="text-[11px] text-slate-300 font-medium line-clamp-2 leading-snug">
              {movie.overview || 'Click to view full synopsis, cast, and trailers.'}
            </div>
          </div>

          {/* Rating Badge Top Right */}
          <div className="absolute top-2.5 right-2.5 bg-dark-bg/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/80 flex items-center gap-1 shadow-lg z-10">
            <FiStar className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="text-xs font-bold text-slate-100">{rating}</span>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-3 flex flex-col justify-between flex-1 bg-slate-900/60">
          <Link to={`/movie/${movie.id}`} className="group-hover:text-primary transition-colors">
            <h3 className="font-heading font-bold text-sm text-slate-100 line-clamp-1">
              {movie.title}
            </h3>
          </Link>
          <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400 font-medium">
            <span>{releaseYear || 'TBA'}</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700/60 text-slate-300 uppercase font-bold text-[9px] tracking-wider">
              HD 4K
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
