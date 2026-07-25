import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { MovieCard } from './MovieCard';
import { FiChevronRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/navigation';

export const MovieRow = ({ title, movies = [], explorePath = '/explore', onQuickView }) => {
  if (!movies.length) return null;

  return (
    <div className="space-y-3 sm:space-y-4 my-6 sm:my-10 w-full overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-2xl font-bold font-heading text-slate-100 flex items-center gap-2">
          <span className="w-1.5 h-5 sm:h-6 bg-gradient-to-b from-primary to-accent rounded-full inline-block shadow-glow-primary" />
          {title}
        </h2>
        <Link
          to={explorePath}
          className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1 transition-colors px-2.5 py-1 rounded-xl hover:bg-slate-800/50 border border-transparent hover:border-slate-700/50"
        >
          View All <FiChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={12}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 24 },
          1280: { slidesPerView: 6, spaceBetween: 24 },
        }}
        className="py-3 px-0.5 w-full rounded-2xl overflow-hidden"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} onQuickView={onQuickView} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieRow;
