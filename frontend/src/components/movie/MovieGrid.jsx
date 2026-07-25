import React from 'react';
import { MovieCard } from './MovieCard';
import { FiFilm } from 'react-icons/fi';

export const MovieGrid = ({ movies = [], loading = false, onQuickView }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] rounded-2xl skeleton-shimmer border border-slate-800"
          />
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="text-center py-20 px-4 glass-panel-elevated rounded-3xl border border-slate-800 space-y-3">
        <FiFilm className="w-12 h-12 text-slate-600 mx-auto" />
        <p className="text-lg font-bold font-heading text-slate-200">No movies found matching your criteria</p>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Try resetting your genre selection or checking for typos in your search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onQuickView={onQuickView} />
      ))}
    </div>
  );
};

export default MovieGrid;
