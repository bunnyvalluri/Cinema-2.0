import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import { MovieGrid } from '../components/movie/MovieGrid';
import { FiHeart } from 'react-icons/fi';

export const Favorites = () => {
  const { favorites } = useMovieContext();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-slate-100 flex items-center gap-3">
            <FiHeart className="text-rose-500 fill-rose-500" /> Favorite Movies
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Your personal hall-of-fame cinema collection. ({favorites.length} saved)
          </p>
        </div>
      </div>

      <MovieGrid movies={favorites} />
    </div>
  );
};
