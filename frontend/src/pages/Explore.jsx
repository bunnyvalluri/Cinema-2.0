import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import { MovieGrid } from '../components/movie/MovieGrid';
import { QuickViewModal } from '../components/movie/QuickViewModal';
import { MOVIE_GENRES, SORT_OPTIONS } from '../utils/constants';
import { FiSearch, FiFilter, FiRotateCcw, FiCompass } from 'react-icons/fi';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quick view state
  const [quickViewMovie, setQuickViewMovie] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

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
          // Check if genre is name or ID
          let genreId = genreQueryParam;
          const found = MOVIE_GENRES.find(
            (g) => g.name.toLowerCase() === genreQueryParam.toLowerCase() || String(g.id) === genreQueryParam
          );
          if (found) genreId = found.id;

          const res = await tmdbService.discoverMovies({ with_genres: genreId, sort_by: sortBy });
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

  const handleGenreChange = (genreNameOrId) => {
    setSelectedGenre(genreNameOrId);
    if (genreNameOrId) {
      setSearchParams({ genre: genreNameOrId });
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

  const handleOpenQuickView = (movie) => {
    setQuickViewMovie(movie);
    setQuickViewOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Search Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold">
          <FiCompass className="w-3.5 h-3.5" /> CINEMA ELK EXPLORER
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 tracking-tight">
          Explore Film Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Discover thousands of movies, directors, and actors with live multi-criteria filtering.
        </p>

        <form onSubmit={handleSearchSubmit} className="relative group max-w-xl mx-auto pt-2">
          <input
            type="text"
            placeholder="Search by title, overview, cast..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-400 pl-12 pr-32 py-3.5 rounded-full border border-slate-700/80 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none shadow-spotlight text-sm backdrop-blur-xl transition-all"
          />
          <FiSearch className="absolute left-4 top-7 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
          <button
            type="submit"
            className="absolute right-2 top-5 bottom-2 px-6 bg-gradient-to-r from-primary to-primary-hover text-white text-xs font-bold rounded-full shadow-glow-primary hover:scale-105 transition-all"
          >
            Search
          </button>
        </form>
      </div>

      {/* Filter Control Bar */}
      <div className="p-4 rounded-3xl glass-panel-elevated border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider pr-2 flex-shrink-0">
            <FiFilter className="text-primary" /> Genres:
          </div>

          <button
            onClick={() => handleGenreChange('')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              !selectedGenre
                ? 'bg-primary text-white shadow-glow-primary'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
            }`}
          >
            All Genres
          </button>

          {MOVIE_GENRES.map((g) => {
            const active =
              String(selectedGenre).toLowerCase() === String(g.id) ||
              String(selectedGenre).toLowerCase() === g.name.toLowerCase();
            return (
              <button
                key={g.id}
                onClick={() => handleGenreChange(g.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-primary text-white shadow-glow-primary'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                }`}
              >
                {g.name}
              </button>
            );
          })}
        </div>

        {/* Sort & Reset */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs px-3.5 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-primary font-semibold"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition-all hover:bg-slate-800"
            title="Reset Filters"
          >
            <FiRotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Movie Results Grid */}
      <MovieGrid movies={movies} loading={loading} onQuickView={handleOpenQuickView} />

      {/* Quick View Modal */}
      <QuickViewModal
        movie={quickViewMovie}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </div>
  );
};

export default Explore;
