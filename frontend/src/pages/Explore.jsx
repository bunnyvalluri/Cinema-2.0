import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import { MovieGrid } from '../components/movie/MovieGrid';
import { MOVIE_GENRES, SORT_OPTIONS } from '../utils/constants';
import { FiSearch, FiFilter, FiRotateCcw } from 'react-icons/fi';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExploreData = async () => {
      setLoading(true);
      try {
        const searchQueryParam = searchParams.get('search');
        const genreQueryParam = searchParams.get('genre');

        if (searchQueryParam) {
          const res = await tmdbService.searchMovies(searchQueryParam);
          setMovies(res.results || []);
        } else if (genreQueryParam) {
          const res = await tmdbService.discoverMovies({ with_genres: genreQueryParam, sort_by: sortBy });
          setMovies(res.results || []);
        } else {
          const res = await tmdbService.discoverMovies({ sort_by: sortBy });
          setMovies(res.results || []);
        }
      } catch (err) {
        console.error('Explore fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreData();
  }, [searchParams, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ search: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    if (genreId) {
      setSearchParams({ genre: genreId });
    } else {
      setSearchParams({});
    }
  };

  const handleReset = () => {
    setQuery('');
    setSelectedGenre('');
    setSortBy('popularity.desc');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Search Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-100">
          Explore Film Library
        </h1>
        <p className="text-xs text-slate-400">
          Discover thousands of movies, directors, and actors with live multi-criteria filtering.
        </p>

        <form onSubmit={handleSearchSubmit} className="relative group max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search by title, overview, cast..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-800/80 text-slate-100 placeholder-slate-400 pl-12 pr-28 py-3.5 rounded-full border border-slate-700 focus:border-primary focus:outline-none shadow-xl text-sm"
          />
          <FiSearch className="absolute left-4 top-4 text-slate-400 w-5 h-5 group-focus-within:text-primary" />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-5 bg-primary text-white text-xs font-bold rounded-full shadow-glow-primary hover:bg-primary-hover transition-all"
          >
            Search
          </button>
        </form>
      </div>

      {/* Filter Control Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider pr-2">
            <FiFilter className="text-primary" /> Genres:
          </div>

          <button
            onClick={() => handleGenreChange('')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              !selectedGenre
                ? 'bg-primary text-white shadow-glow-primary'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Genres
          </button>

          {MOVIE_GENRES.slice(0, 8).map((g) => (
            <button
              key={g.id}
              onClick={() => handleGenreChange(String(g.id))}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                String(selectedGenre) === String(g.id)
                  ? 'bg-primary text-white shadow-glow-primary'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Sort & Reset */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800/60 text-slate-400 hover:text-rose-400 border border-slate-700/60"
            title="Reset Filters"
          >
            <FiRotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Movie Results Grid */}
      <MovieGrid movies={movies} loading={loading} />
    </div>
  );
};
