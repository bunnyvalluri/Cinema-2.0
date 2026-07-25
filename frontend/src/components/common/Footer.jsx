import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiHeart } from 'react-icons/fi';
import { CinemaElkLogo } from './CinemaElkLogo';

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-slate-800/80 bg-dark-bg/95 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <CinemaElkLogo size="md" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Enterprise-grade movie discovery, community review, and personalized film recommendation architecture powered by TMDB & Firebase.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-800/60 hover:text-primary transition-colors">
                <FiGithub className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800/60 hover:text-primary transition-colors">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800/60 hover:text-primary transition-colors">
                <FiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 font-heading">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-primary transition-colors">Home Page</Link></li>
              <li><Link to="/explore" className="hover:text-primary transition-colors">Explore & Search</Link></li>
              <li><Link to="/community" className="hover:text-primary transition-colors">Community Feed</Link></li>
              <li><Link to="/watchlist" className="hover:text-primary transition-colors">My Watchlist</Link></li>
              <li><Link to="/favorites" className="hover:text-primary transition-colors">Favorite Films</Link></li>
            </ul>
          </div>

          {/* Top Genres */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 font-heading">
              Genres
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/explore?genre=28" className="hover:text-primary transition-colors">Action & Thriller</Link></li>
              <li><Link to="/explore?genre=878" className="hover:text-primary transition-colors">Sci-Fi & Fantasy</Link></li>
              <li><Link to="/explore?genre=18" className="hover:text-primary transition-colors">Drama & Romance</Link></li>
              <li><Link to="/explore?genre=16" className="hover:text-primary transition-colors">Animation</Link></li>
              <li><Link to="/explore?genre=35" className="hover:text-primary transition-colors">Comedy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-2 font-heading">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400">
              Subscribe to get curated film recommendations and weekly top community reviews.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-slate-800/80 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-glow-primary hover:bg-primary-hover transition-all"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CINEMA ELK 2.0. Built with React, Tailwind, Express & Firebase.</p>
          <p className="flex items-center gap-1">
            Crafted with <FiHeart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for movie lovers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
