import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiBookmark, FiHeart, FiPlay } from 'react-icons/fi';
import { getImageUrl, formatDate } from '../../utils/helpers';
import { useMovieContext } from '../../context/MovieContext';

export const MovieCard = ({ movie }) => {
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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden glass-panel border border-slate-800 flex flex-col justify-between shadow-lg hover:shadow-glow-primary transition-all"
    >
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          {/* Top Quick Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWatchlist(movie);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                inWatchlist
                  ? 'bg-primary text-white shadow-glow-primary'
                  : 'bg-dark-bg/70 text-slate-200 hover:text-primary border border-slate-700/60'
              }`}
              title="Toggle Watchlist"
            >
              <FiBookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(movie);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                inFavorites
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-dark-bg/70 text-slate-200 hover:text-rose-500 border border-slate-700/60'
              }`}
              title="Toggle Favorite"
            >
              <FiHeart className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Center Play Trailer Link */}
          <Link
            to={`/movie/${movie.id}`}
            className="self-center w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-glow-primary hover:scale-110 transition-transform"
          >
            <FiPlay className="w-5 h-5 ml-0.5" />
          </Link>

          {/* Bottom Tags */}
          <div className="text-xs text-slate-300 font-medium line-clamp-2">
            {movie.overview || 'Click to explore full synopsis, cast, and trailers.'}
          </div>
        </div>

        {/* Rating Badge Top Right */}
        <div className="absolute top-3 right-3 bg-dark-bg/85 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/60 flex items-center gap-1 shadow-md">
          <FiStar className="w-3.5 h-3.5 text-accent fill-accent" />
          <span className="text-xs font-bold text-slate-100">{rating}</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3.5 flex flex-col justify-between flex-1 bg-dark-card/60">
        <Link to={`/movie/${movie.id}`} className="group-hover:text-primary transition-colors">
          <h3 className="font-heading font-bold text-sm text-slate-100 line-clamp-1">
            {movie.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400 font-medium">
          <span>{releaseYear || 'TBA'}</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300 uppercase font-semibold text-[9px]">
            Movie
          </span>
        </div>
      </div>
    </motion.div>
  );
};
