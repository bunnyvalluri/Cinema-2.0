import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import { MovieGrid } from '../components/movie/MovieGrid';
import { QuickViewModal } from '../components/movie/QuickViewModal';
import { MOVIE_GENRES, SORT_OPTIONS } from '../utils/constants';
import { FiSearch, FiFilter, FiRotateCcw, FiCompass, FiChevronDown, FiX, FiFilm } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Quick view state
  const [quickViewMovie, setQuickViewMovie] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  useEffect(() => {
    const fetchExploreData = async () => {
      setLoading(true);
      setPage(1);
      try {
        const searchQueryParam = searchParams.get('search');
        const genreQueryParam = searchParams.get('genre');

        if (searchQueryParam) {
          const res = await tmdbService.searchMovies(searchQueryParam, 1);
          setMovies(res.results || []);
          setHasMore(res.page < res.total_pages);
        } else if (genreQueryParam) {
          let genreId = genreQueryParam;
          const found = MOVIE_GENRES.find(
            (g) => g.name.toLowerCase() === genreQueryParam.toLowerCase() || String(g.id) === genreQueryParam
          );
          if (found) genreId = found.id;

          const res = await tmdbService.discoverMovies({ with_genres: genreId, sort_by: sortBy, page: 1 });
          setMovies(res.results || []);
          setHasMore(res.page < res.total_pages);
        } else {
          const res = await tmdbService.discoverMovies({ sort_by: sortBy, page: 1 });
          setMovies(res.results || []);
          setHasMore(res.page < res.total_pages);
        }
      } catch (err) {
        console.error('Explore fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreData();
  }, [searchParams, sortBy]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const searchQueryParam = searchParams.get('search');
      const genreQueryParam = searchParams.get('genre');

      let res;
      if (searchQueryParam) {
        res = await tmdbService.searchMovies(searchQueryParam, nextPage);
      } else if (genreQueryParam) {
        let genreId = genreQueryParam;
        const found = MOVIE_GENRES.find(
          (g) => g.name.toLowerCase() === genreQueryParam.toLowerCase() || String(g.id) === genreQueryParam
        );
        if (found) genreId = found.id;
        res = await tmdbService.discoverMovies({ with_genres: genreId, sort_by: sortBy, page: nextPage });
      } else {
        res = await tmdbService.discoverMovies({ sort_by: sortBy, page: nextPage });
      }

      const newResults = res.results || [];
      setMovies((prev) => [...prev, ...newResults]);
      setPage(nextPage);
      setHasMore(res.page < res.total_pages);
      toast.success(`Loaded page ${nextPage}`);
    } catch (err) {
      console.error('Load more error:', err);
    } finally {
      setLoadingMore(false);
    }
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Search Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-elevated border border-slate-800 p-6 sm:p-10 text-center max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-dark-bg/90 to-dark-bg" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/15 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold">
            <FiCompass className="w-3.5 h-3.5" /> CINEMA ELK EXPLORER
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight text-glow">
            Explore Film Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
            Discover thousands of movies, directors, and actors with live multi-criteria filtering and instant trailers.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative group max-w-xl mx-auto pt-2">
            <input
              type="text"
              placeholder="Search by title, overview, cast, director..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-400 pl-12 pr-32 py-3.5 rounded-full border border-slate-700/80 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none shadow-spotlight text-xs sm:text-sm backdrop-blur-xl transition-all"
            />
            <FiSearch className="absolute left-4 top-6 sm:top-6.5 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
            <button
              type="submit"
              className="absolute right-2 top-4 bottom-2 px-6 bg-gradient-to-r from-primary to-primary-hover text-white text-xs font-bold rounded-full shadow-glow-primary hover:scale-105 transition-all"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="p-4 sm:p-5 rounded-3xl glass-panel-elevated border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Genre Scroll Strip */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider pr-2 flex-shrink-0">
              <FiFilter className="text-primary" /> Genres:
            </div>

            <button
              onClick={() => handleGenreChange('')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                !selectedGenre
                  ? 'bg-primary text-white shadow-glow-primary'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
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
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-primary text-white shadow-glow-primary'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {g.name}
                </button>
              );
            })}
          </div>

          {/* Sort & Reset Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 text-slate-200 text-xs px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary font-semibold shadow-inner"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-700/80 transition-all hover:bg-slate-800"
              title="Reset Filters"
            >
              <FiRotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Counter & Active Filter Pills */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-glow-primary animate-pulse" />
            <span>Showing <strong className="text-slate-100 font-bold">{movies.length}</strong> Films</span>
          </div>

          {(selectedGenre || searchParams.get('search')) && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400">Active Filter:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold text-[11px]">
                {selectedGenre || searchParams.get('search')}
                <button onClick={handleReset} className="hover:text-white">
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Movie Results Grid */}
      <MovieGrid movies={movies} loading={loading} onQuickView={handleOpenQuickView} />

      {/* Load More Button */}
      {!loading && movies.length > 0 && hasMore && (
        <div className="text-center pt-6 pb-4">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 hover:border-primary shadow-spotlight transition-all hover:scale-105 disabled:opacity-50 inline-flex items-center gap-2"
          >
            {loadingMore ? (
              <span>Loading more films...</span>
            ) : (
              <>
                <span>Load More Films</span>
                <FiChevronDown className="w-4 h-4 text-primary" />
              </>
            )}
          </button>
        </div>
      )}

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
