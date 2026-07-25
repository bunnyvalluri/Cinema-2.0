import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiFilm, FiStar, FiClock, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { tmdbService } from '../../services/tmdbService';
import { getImageUrl } from '../../utils/helpers';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const quickGenres = ['Action', 'Sci-Fi', 'Drama', 'Thriller', 'Animation', 'Comedy'];

  useEffect(() => {
    const saved = localStorage.getItem('cinema_elk_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await tmdbService.searchMovies(query);
        setResults((res.results || []).slice(0, 6));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const saveRecentSearch = (term) => {
    if (!term) return;
    const updated = [term, ...recentSearches.filter((item) => item !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('cinema_elk_recent_searches', JSON.stringify(updated));
  };

  const handleSelectMovie = (id) => {
    saveRecentSearch(query.trim());
    onClose();
    navigate(`/movie/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query.trim());
      onClose();
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleGenreClick = (genre) => {
    onClose();
    navigate(`/explore?genre=${encodeURIComponent(genre)}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-dark-bg/80 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Background click overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-dark-card/95 border border-slate-700/80 rounded-3xl shadow-spotlight overflow-hidden z-10 animate-scale-in">
        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-slate-800 px-5 py-4">
          <FiSearch className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search movies, directors, cast, genres..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-base sm:text-lg font-medium"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <FiX className="w-5 h-5" />
            </button>
          ) : (
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
              ESC
            </span>
          )}
        </form>

        {/* Live Search Results */}
        {loading ? (
          <div className="p-8 text-center text-slate-400 flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Searching database...</span>
          </div>
        ) : query.trim() && results.length > 0 ? (
          <div className="p-3 max-h-[60vh] overflow-y-auto space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Top Movie Matches
            </div>
            {results.map((movie) => {
              const poster = getImageUrl(movie.poster_path, 'w92');
              return (
                <div
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie.id)}
                  className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-800/70 cursor-pointer transition-all border border-transparent hover:border-slate-700/60 group"
                >
                  <img
                    src={poster}
                    alt={movie.title}
                    className="w-11 h-16 object-cover rounded-xl bg-slate-800 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-slate-100 group-hover:text-primary transition-colors truncate">
                      {movie.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 font-sans">
                      {movie.overview || 'Click to view full movie details.'}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1 text-accent font-bold">
                        <FiStar className="w-3 h-3 fill-accent" />
                        {movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}
                      </span>
                      <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : ''}</span>
                    </div>
                  </div>
                  <FiArrowRight className="w-4 h-4 text-slate-500 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}

            <button
              onClick={handleSearchSubmit}
              className="w-full mt-2 py-3 px-4 rounded-2xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center justify-center gap-2 border border-primary/30 transition-all"
            >
              See all results for "{query}"
            </button>
          </div>
        ) : query.trim() && results.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <FiFilm className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-300">No movies found for "{query}"</p>
            <p className="text-xs text-slate-500 mt-1">Try checking for typos or searching by genre</p>
          </div>
        ) : (
          /* Default state when search input is empty */
          <div className="p-5 space-y-6">
            {/* Quick Genres */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                <FiTrendingUp className="text-primary" /> Popular Genres
              </div>
              <div className="flex flex-wrap gap-2">
                {quickGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreClick(genre)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-primary text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/60 hover:border-primary transition-all"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-2">
                    <FiClock className="text-accent" /> Recent Searches
                  </span>
                  <button
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem('cinema_elk_recent_searches');
                    }}
                    className="text-[10px] text-slate-500 hover:text-rose-400 lowercase"
                  >
                    clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-xs flex items-center gap-2 border border-slate-700/40"
                    >
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="bg-slate-900/60 px-5 py-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Cinema Elk 2.0 Spotlight Search</span>
          <span className="flex items-center gap-2">
            Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 border border-slate-700">ESC</kbd> to exit
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
