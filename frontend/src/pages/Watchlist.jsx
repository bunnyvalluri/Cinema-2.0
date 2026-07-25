import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import { MovieGrid } from '../components/movie/MovieGrid';
import { FiBookmark } from 'react-icons/fi';

export const Watchlist = () => {
  const { watchlist } = useMovieContext();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-100 flex items-center gap-3">
            <FiBookmark className="text-primary" /> My Film Watchlist
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track and organize movies you intend to watch next. ({watchlist.length} saved)
          </p>
        </div>
      </div>

      <MovieGrid movies={watchlist} />
    </div>
  );
};
