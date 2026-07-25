import React, { useState } from 'react';
import { RatingStars } from '../common/RatingStars';
import { useAuth } from '../../context/AuthContext';
import { useMovieContext } from '../../context/MovieContext';
import toast from 'react-hot-toast';

export const ReviewForm = ({ movieId, movieTitle }) => {
  const { user } = useAuth();
  const { addReview } = useMovieContext();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Please write a review before submitting.');
      return;
    }

    addReview({
      movieId,
      movieTitle,
      userName: user ? user.displayName : 'Guest Film Fan',
      userAvatar: user ? user.photoURL : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      rating,
      content,
    });

    setContent('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
      <h3 className="text-lg font-bold text-slate-100 font-heading">Write a Review for {movieTitle}</h3>

      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase text-slate-400">Your Rating</label>
        <RatingStars rating={rating} size="lg" interactive onChange={(val) => setRating(val)} />
      </div>

      <div>
        <textarea
          rows={4}
          placeholder="Share your thoughts on the cinematography, acting, plot twists, and direction... (Markdown supported)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-slate-900/80 text-slate-100 text-sm p-4 rounded-2xl border border-slate-700/60 focus:border-primary focus:outline-none placeholder-slate-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-primary text-white font-bold text-sm rounded-xl shadow-glow-primary hover:bg-primary-hover transition-all"
      >
        Submit Review
      </button>
    </form>
  );
};
