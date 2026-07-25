import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiFilm,
  FiSearch,
  FiSun,
  FiMoon,
  FiBookmark,
  FiHeart,
  FiUser,
  FiShield,
  FiLogOut,
  FiMenu,
  FiX,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useMovieContext } from '../../context/MovieContext';

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { watchlist, favorites } = useMovieContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore', path: '/explore' },
    { label: 'Community', path: '/community' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-header py-3 shadow-lg' : 'bg-gradient-to-b from-dark-bg/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-primary group-hover:scale-105 transition-transform duration-300">
              <FiFilm className="w-6 h-6 text-dark-bg stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-heading font-extrabold tracking-wider text-slate-100 flex items-center">
                CINEMA<span className="text-primary ml-1">ELK</span>
                <span className="ml-1.5 text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-sans font-bold">
                  2.0
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-md relative group"
          >
            <input
              type="text"
              placeholder="Search movies, directors, actors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/60 dark:bg-dark-card/80 text-slate-100 placeholder-slate-400 pl-11 pr-4 py-2.5 rounded-full border border-slate-700/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm backdrop-blur-md"
            />
            <FiSearch className="absolute left-4 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    active ? 'text-primary font-semibold' : 'text-slate-300 hover:text-slate-100'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Tools & User Profile */}
          <div className="flex items-center gap-3">
            {/* Watchlist Quick Button */}
            <Link
              to="/watchlist"
              className="relative p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 text-slate-300 hover:text-primary border border-slate-700/50 transition-all"
              title="Watchlist"
            >
              <FiBookmark className="w-5 h-5" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {watchlist.length}
                </span>
              )}
            </Link>

            {/* Favorites Quick Button */}
            <Link
              to="/favorites"
              className="relative p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 text-slate-300 hover:text-rose-500 border border-slate-700/50 transition-all"
              title="Favorites"
            >
              <FiHeart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 text-accent border border-slate-700/50 transition-all"
              title="Toggle Theme"
            >
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* User Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 hover:border-primary/50 transition-all"
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full object-cover border border-primary/50"
                  />
                  <span className="hidden sm:inline text-xs font-semibold text-slate-200 max-w-[100px] truncate">
                    {user.displayName}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-3 w-56 rounded-2xl glass-panel shadow-2xl py-2 border border-slate-700/60 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-700/50">
                      <p className="text-sm font-semibold text-slate-100 truncate">{user.displayName}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary/20 text-primary">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-white"
                    >
                      <FiUser className="w-4 h-4 text-primary" /> Profile
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-accent hover:bg-slate-800/60"
                      >
                        <FiShield className="w-4 h-4 text-accent" /> Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-400 hover:bg-slate-800/60 hover:text-rose-300"
                    >
                      <FiLogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-primary to-primary-hover text-white shadow-glow-primary hover:scale-105 transition-all"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-800/40 text-slate-300 border border-slate-700/50"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 p-4 rounded-2xl glass-panel border border-slate-700/60 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2 rounded-xl border border-slate-700 text-sm"
              />
              <FiSearch className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
            </form>

            <nav className="flex flex-col space-y-2 pt-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800/60"
              >
                Home
              </Link>
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800/60"
              >
                Explore & Search
              </Link>
              <Link
                to="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800/60"
              >
                Community
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-accent hover:bg-slate-800/60"
                >
                  Admin Dashboard
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
