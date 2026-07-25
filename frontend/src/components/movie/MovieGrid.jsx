import React from 'react';
import { MovieCard } from './MovieCard';

export const MovieGrid = ({ movies = [], loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] rounded-2xl bg-slate-800/50 animate-pulse border border-slate-700/40"
          />
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="text-center py-16 px-4 glass-panel rounded-3xl border border-slate-800">
        <p className="text-lg font-semibold text-slate-300">No movies found matching your criteria</p>
        <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
