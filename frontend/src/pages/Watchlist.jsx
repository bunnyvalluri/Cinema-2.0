import React, { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { MovieGrid } from '../components/movie/MovieGrid';
import { QuickViewModal } from '../components/movie/QuickViewModal';
import { FiBookmark } from 'react-icons/fi';

export const Watchlist = () => {
  const { watchlist } = useMovieContext();
  const [quickViewMovie, setQuickViewMovie] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const handleOpenQuickView = (movie) => {
    setQuickViewMovie(movie);
    setQuickViewOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 gap-2">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100 flex items-center gap-3">
            <FiBookmark className="text-primary flex-shrink-0" /> My Film Watchlist
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track and organize movies you intend to watch next. ({watchlist.length} saved)
          </p>
        </div>
      </div>

      <MovieGrid movies={watchlist} onQuickView={handleOpenQuickView} />

      <QuickViewModal
        movie={quickViewMovie}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </div>
  );
};

export default Watchlist;
