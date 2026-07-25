import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiCompass,
  FiUsers,
  FiBookmark,
  FiHeart,
  FiUser,
  FiShield,
  FiLogOut,
  FiMenu,
  FiX,
  FiSearch,
  FiCommand,
  FiFilm,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useMovieContext } from '../../context/MovieContext';
import { CinemaElkLogo } from './CinemaElkLogo';
import { SearchModal } from './SearchModal';

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { watchlist, favorites } = useMovieContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'Movies', path: '/home' },
    { label: 'Explore', path: '/explore' },
    { label: 'Community', path: '/community' },
  ];

  const mobileBottomTabs = [
    { label: 'Overview', path: '/', icon: FiHome },
    { label: 'Movies', path: '/home', icon: FiFilm },
    { label: 'Explore', path: '/explore', icon: FiCompass },
    { label: 'Saved', path: '/watchlist', icon: FiBookmark, badge: watchlist.length },
    { label: 'Profile', path: user ? '/profile' : '/login', icon: FiUser },
  ];

  return (
    <>
      {/* Top Header - Full Edge-to-Edge Width */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass-header py-2.5 sm:py-3 shadow-glass' : 'bg-gradient-to-b from-dark-bg via-dark-bg/95 to-transparent py-2.5 sm:py-4'
        }`}
      >
        <div className="w-full px-3 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand Logo - Pinned to Far Left */}
            <div className="flex-shrink-0">
              <CinemaElkLogo size="md" />
            </div>

            {/* Spotlight Search Trigger Button (Desktop & Tablet) */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="hidden md:flex items-center justify-between flex-1 max-w-md bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-4 py-2 rounded-full border border-slate-700/60 hover:border-primary/60 transition-all shadow-inner text-xs sm:text-sm backdrop-blur-md group mx-4"
            >
              <span className="flex items-center gap-2.5">
                <FiSearch className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="truncate">Search movies, cast, genres...</span>
              </span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-bold uppercase text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-md shadow-sm">
                <FiCommand className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* Desktop Navigation Links - Single-Line Pill Layout */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xs font-semibold px-4 py-2 rounded-full transition-all relative whitespace-nowrap inline-flex items-center shrink-0 ${
                      active
                        ? 'bg-primary text-white shadow-glow-primary'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Tools & User Profile - Pinned to Far Right */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Search Icon Trigger for Mobile */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="md:hidden p-2 sm:p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-primary border border-slate-700/60 transition-all shadow-md"
                title="Search"
              >
                <FiSearch className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Watchlist Quick Button - ALWAYS VISIBLE */}
              <Link
                to="/watchlist"
                className="relative p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-primary border border-slate-700/60 transition-all shadow-md"
                title="Watchlist"
              >
                <FiBookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {watchlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary text-white text-[8px] sm:text-[10px] font-bold rounded-full flex items-center justify-center shadow-glow-primary animate-pulse-slow">
                    {watchlist.length}
                  </span>
                )}
              </Link>

              {/* Favorites Quick Button - ALWAYS VISIBLE */}
              <Link
                to="/favorites"
                className="relative p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-rose-400 border border-slate-700/60 transition-all shadow-md"
                title="Favorites"
              >
                <FiHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-rose-500 text-white text-[8px] sm:text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-1.5 p-0.5 sm:p-1 rounded-full bg-slate-900/80 border border-slate-700/80 hover:border-primary/60 transition-all"
                  >
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-primary/60"
                    />
                    <span className="hidden sm:inline text-xs font-semibold text-slate-200 max-w-[90px] truncate pr-2">
                      {user.displayName}
                    </span>
                  </button>

                  {profileDropdownOpen && (
                    <div
                      className="absolute right-0 mt-3 w-56 rounded-2xl glass-panel-elevated shadow-spotlight py-2 border border-slate-700/80 z-50"
                      onMouseLeave={() => setProfileDropdownOpen(false)}
                    >
                      <div className="px-4 py-2.5 border-b border-slate-800">
                        <p className="text-sm font-semibold text-slate-100 truncate">{user.displayName}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                          {user.role}
                        </span>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      >
                        <FiUser className="w-4 h-4 text-primary" /> Profile Settings
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-accent hover:bg-slate-800/80"
                        >
                          <FiShield className="w-4 h-4 text-accent" /> Admin Dashboard
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-400 hover:bg-slate-800/80 hover:text-rose-300"
                      >
                        <FiLogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold rounded-full bg-gradient-to-r from-primary to-primary-hover text-white shadow-glow-primary hover:scale-105 transition-all"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2.5 rounded-full bg-slate-900/80 text-slate-300 border border-slate-700/60"
              >
                {mobileMenuOpen ? <FiX className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiMenu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 p-4 rounded-3xl glass-panel-elevated border border-slate-700/80 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                className="w-full flex items-center gap-3 bg-slate-900/90 text-slate-300 px-4 py-2.5 rounded-2xl border border-slate-700 text-xs font-medium"
              >
                <FiSearch className="text-primary w-4 h-4" />
                <span>Search movies...</span>
              </button>

              <nav className="flex flex-col space-y-2 pt-1">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-200 hover:bg-slate-800/80"
                >
                  Overview
                </Link>
                <Link
                  to="/home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-200 hover:bg-slate-800/80"
                >
                  Movies
                </Link>
                <Link
                  to="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-200 hover:bg-slate-800/80"
                >
                  Explore & Search
                </Link>
                <Link
                  to="/community"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-200 hover:bg-slate-800/80"
                >
                  Community
                </Link>
                <Link
                  to="/watchlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-200 hover:bg-slate-800/80"
                >
                  My Watchlist ({watchlist.length})
                </Link>
                <Link
                  to="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-200 hover:bg-slate-800/80"
                >
                  My Favorites ({favorites.length})
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-accent hover:bg-slate-800/80"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Floating Bottom Navigation Bar for Mobile Screens (lg:hidden) */}
      <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-40 bg-slate-950/90 backdrop-blur-2xl border border-slate-700/80 rounded-full px-3 py-2 shadow-spotlight flex items-center justify-around">
        {mobileBottomTabs.map((tab) => {
          const Icon = tab.icon;
          const active = location.pathname === tab.path;
          return (
            <Link
              key={tab.label}
              to={tab.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl transition-all relative ${
                active ? 'text-primary font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-primary shadow-glow-primary" />
              )}
              {tab.badge > 0 && (
                <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Spotlight Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};

export default Navbar;
