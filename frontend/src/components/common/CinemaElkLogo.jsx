import React from 'react';
import { Link } from 'react-router-dom';

export const CinemaElkLogo = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <Link to="/" className={`flex items-center gap-3 group focus:outline-none ${className}`}>
      {/* Icon Badge Container with Glow Effect */}
      <div className={`relative ${sizeClasses[size]} flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
        {/* Ambient Glow Backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-primary to-violet-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
        
        {/* Logo Image / Icon Box */}
        <div className="relative w-full h-full rounded-xl bg-slate-950 p-1 border border-cyan-500/40 overflow-hidden flex items-center justify-center shadow-xl">
          <img
            src="/logo.png"
            alt="Cinema Elk Logo"
            className="w-full h-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // Fallback to inline SVG if image fails
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'block';
            }}
          />
          {/* Fallback Vector SVG */}
          <svg
            className="w-full h-full text-cyan-400 hidden stroke-current"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="42" stroke="url(#grad)" strokeWidth="6" />
            <path d="M40 32L68 50L40 68V32Z" fill="#F59E0B" />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Text Header */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizes[size]} font-heading font-extrabold tracking-wider text-slate-100 flex items-center leading-none`}>
            CINEMA
            <span className="bg-gradient-to-r from-cyan-400 via-primary to-purple-400 bg-clip-text text-transparent ml-1.5 font-black">
              ELK
            </span>
            <span className="ml-2 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-sans font-bold shadow-inner">
              2.0
            </span>
          </span>
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-medium opacity-80 group-hover:text-cyan-400 transition-colors">
            Film &amp; Series Discovery
          </span>
        </div>
      )}
    </Link>
  );
};
