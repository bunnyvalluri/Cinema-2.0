import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { MovieCard } from './MovieCard';
import { FiChevronRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/navigation';

export const MovieRow = ({ title, movies = [], explorePath = '/explore' }) => {
  if (!movies.length) return null;

  return (
    <div className="space-y-4 my-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-100 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full inline-block" />
          {title}
        </h2>
        <Link
          to={explorePath}
          className="text-xs font-semibold text-primary hover:text-accent flex items-center gap-1 transition-colors"
        >
          View All <FiChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 24 },
          1280: { slidesPerView: 6, spaceBetween: 24 },
        }}
        className="py-3 px-1 !overflow-visible"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
