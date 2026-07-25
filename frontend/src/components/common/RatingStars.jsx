import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export const RatingStars = ({ rating = 0, max = 5, size = 'sm', interactive = false, onChange }) => {
  const normalizedRating = rating > 5 ? rating / 2 : rating;

  const starSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const currentSize = starSizes[size] || starSizes.sm;

  return (
    <div className="flex items-center gap-1 text-accent">
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        const isHalf = normalizedRating >= starValue - 0.5 && normalizedRating < starValue;
        const isFull = normalizedRating >= starValue;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(starValue)}
            className={`${interactive ? 'cursor-pointer hover:scale-125 transition-transform' : 'cursor-default'}`}
          >
            {isFull ? (
              <FaStar className={currentSize} />
            ) : isHalf ? (
              <FaStarHalfAlt className={currentSize} />
            ) : (
              <FaRegStar className={`${currentSize} text-slate-600`} />
            )}
          </button>
        );
      })}
    </div>
  );
};
