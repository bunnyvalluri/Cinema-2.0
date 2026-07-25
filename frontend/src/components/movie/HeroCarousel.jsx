import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FiPlay, FiInfo, FiStar, FiBookmark, FiX } from 'react-icons/fi';
import { getImageUrl } from '../../utils/helpers';
import { Badge } from '../common/Badge';
import { useMovieContext } from '../../context/MovieContext';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export const HeroCarousel = ({ movies = [] }) => {
  const [trailerModalUrl, setTrailerModalUrl] = useState(null);
  const { toggleWatchlist, isInWatchlist } = useMovieContext();

  if (!movies.length) return null;

  return (
    <div className="relative w-full h-[75vh] min-h-[500px] max-h-[800px] overflow-hidden rounded-3xl mb-12 shadow-2xl border border-slate-800">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {movies.slice(0, 5).map((movie) => {
          const backdrop = getImageUrl(movie.backdrop_path, 'original');
          const inWatchlist = isInWatchlist(movie.id);

          return (
            <SwiperSlide key={movie.id} className="relative w-full h-full">
              {/* Background Backdrop Image */}
              <div className="absolute inset-0 bg-dark-bg">
                <img
                  src={backdrop}
                  alt={movie.title}
                  className="w-full h-full object-cover object-top opacity-60 scale-105 transition-transform duration-10000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-dark-bg/40" />
              </div>

              {/* Slide Content */}
              <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-12 flex flex-col justify-center items-start">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl space-y-4"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="accent" size="sm">
                      Featured Film
                    </Badge>
                    <div className="flex items-center gap-1 text-accent bg-dark-bg/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-slate-700">
                      <FiStar className="fill-accent w-3.5 h-3.5" />
                      <span>{movie.vote_average ? movie.vote_average.toFixed(1) : '8.5'} Rating</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-300">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : '2024'}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight text-glow">
                    {movie.title}
                  </h1>

                  <p className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed font-sans max-w-xl">
                    {movie.overview}
                  </p>

                  <div className="flex items-center gap-4 pt-4 flex-wrap">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="px-6 py-3.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-glow-primary hover:bg-primary-hover flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <FiPlay className="w-5 h-5 fill-current" /> Watch Trailer & Details
                    </Link>

                    <button
                      onClick={() => toggleWatchlist(movie)}
                      className={`px-5 py-3.5 rounded-2xl font-bold text-sm border backdrop-blur-md flex items-center gap-2 transition-all ${
                        inWatchlist
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-slate-800/60 text-slate-200 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <FiBookmark className="w-4 h-4 fill-current" />
                      {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                    </button>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
