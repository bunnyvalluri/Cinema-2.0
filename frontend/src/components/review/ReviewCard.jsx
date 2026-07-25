import React, { useState } from 'react';
import { RatingStars } from '../common/RatingStars';
import { FiThumbsUp, FiMessageSquare, FiFlag, FiShare2 } from 'react-icons/fi';
import { useMovieContext } from '../../context/MovieContext';

export const ReviewCard = ({ review }) => {
  const { likeReview } = useMovieContext();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(review.likes || 0);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      likeReview(review.id);
    }
  };

  return (
    <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover border border-primary/40"
          />
          <div>
            <h4 className="text-sm font-bold text-slate-100 font-heading">{review.userName}</h4>
            <p className="text-[11px] text-slate-400">Reviewed on {review.createdAt}</p>
          </div>
        </div>
        <RatingStars rating={review.rating} size="sm" />
      </div>

      <p className="text-sm text-slate-300 leading-relaxed font-sans font-normal whitespace-pre-line">
        {review.content}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 font-medium transition-colors ${
              liked ? 'text-primary font-bold' : 'hover:text-slate-200'
            }`}
          >
            <FiThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            <span>{likesCount} Likes</span>
          </button>

          <button className="flex items-center gap-1.5 font-medium hover:text-slate-200 transition-colors">
            <FiMessageSquare className="w-4 h-4" />
            <span>Reply</span>
          </button>
        </div>

        <button className="hover:text-rose-400 transition-colors p-1" title="Report Review">
          <FiFlag className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
