import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RatingStars } from '../common/RatingStars';
import { FiThumbsUp, FiMessageSquare, FiFlag, FiShare2, FiFilm, FiSend, FiCheck } from 'react-icons/fi';
import { useMovieContext } from '../../context/MovieContext';
import toast from 'react-hot-toast';

export const ReviewCard = ({ review, onQuickView }) => {
  const { likeReview } = useMovieContext();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(review.likes || 0);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState(review.replies || []);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      likeReview(review.id);
      toast.success('Liked review!');
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const newReply = {
      id: 'rep_' + Date.now(),
      userName: 'You',
      content: replyText.trim(),
      createdAt: 'Just now',
    };
    setReplies((prev) => [...prev, newReply]);
    setReplyText('');
    toast.success('Reply published!');
  };

  const handleReport = () => {
    toast.success('Review flagged for community moderation.');
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel-elevated border border-slate-800 space-y-4 hover:border-slate-700/80 transition-all shadow-lg group">
      {/* Top Bar: Reviewer Info & Movie Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-3">
          <img
            src={review.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary/40 group-hover:border-primary transition-colors flex-shrink-0"
          />
          <div>
            <h4 className="text-sm font-bold text-slate-100 font-heading flex items-center gap-2">
              {review.userName}
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                CRITIC
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">Published on {review.createdAt}</p>
          </div>
        </div>

        {/* Reviewed Movie Tag & Score */}
        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          {review.movieTitle && (
            <Link
              to={`/movie/${review.movieId}`}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 text-primary hover:text-white border border-primary/30 hover:border-primary text-xs font-bold transition-all shadow-md"
            >
              <FiFilm className="w-3.5 h-3.5" />
              <span className="max-w-[140px] truncate">{review.movieTitle}</span>
            </Link>
          )}
          <RatingStars rating={review.rating} size="sm" />
        </div>
      </div>

      {/* Review Content */}
      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-normal whitespace-pre-line">
        {review.content}
      </p>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 font-bold transition-all ${
              liked ? 'text-primary' : 'hover:text-slate-200'
            }`}
          >
            <FiThumbsUp className={`w-4 h-4 ${liked ? 'fill-current scale-110' : ''}`} />
            <span>{likesCount} Likes</span>
          </button>

          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="flex items-center gap-1.5 font-bold hover:text-slate-200 transition-colors"
          >
            <FiMessageSquare className="w-4 h-4 text-accent" />
            <span>{replies.length} Replies</span>
          </button>
        </div>

        <button
          onClick={handleReport}
          className="hover:text-rose-400 transition-colors p-1"
          title="Report Review"
        >
          <FiFlag className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Reply Section */}
      {showReplyBox && (
        <div className="pt-3 space-y-3 border-t border-slate-800/60 animate-in fade-in duration-200">
          {/* Previous Replies */}
          {replies.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto pl-3 border-l-2 border-primary/40">
              {replies.map((r, idx) => (
                <div key={idx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <span className="font-bold text-slate-200 mr-2">{r.userName}:</span>
                  <span className="text-slate-300">{r.content}</span>
                </div>
              ))}
            </div>
          )}

          {/* New Reply Form */}
          <form onSubmit={handleSendReply} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Write a constructive reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 bg-slate-900 text-slate-100 text-xs px-3.5 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-glow-primary hover:bg-primary-hover transition-all flex items-center gap-1"
            >
              <FiSend className="w-3.5 h-3.5" /> Reply
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
