import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import { getImageUrl, formatRuntime, formatCurrency, formatDate } from '../utils/helpers';
import { RatingStars } from '../components/common/RatingStars';
import { Badge } from '../components/common/Badge';
import { MovieRow } from '../components/movie/MovieRow';
import { ReviewCard } from '../components/review/ReviewCard';
import { ReviewForm } from '../components/review/ReviewForm';
import { RatingDistribution } from '../components/review/RatingDistribution';
import { useMovieContext } from '../context/MovieContext';
import { STREAMING_PLATFORMS } from '../utils/constants';
import { FiStar, FiBookmark, FiHeart, FiPlay, FiX, FiClock, FiCalendar, FiDollarSign } from 'react-icons/fi';

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const { toggleWatchlist, toggleFavorite, isInWatchlist, isFavorite, addRecentlyViewed, customReviews } = useMovieContext();

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const details = await tmdbService.getMovieDetails(id);
        setMovie(details);
        if (details) addRecentlyViewed(details);
      } catch (err) {
        console.error('Movie details fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-400">Loading film details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-200">Movie Not Found</h2>
        <Link to="/" className="mt-4 inline-block text-sm text-primary font-bold">Return Home</Link>
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const inWatchlist = isInWatchlist(movie.id);
  const inFavorites = isFavorite(movie.id);

  const trailerVideo = movie.videos?.results?.find(
    (v) => v.type === 'Trailer' || v.type === 'Teaser'
  );
  const trailerKey = trailerVideo ? trailerVideo.key : 'YoHD9XEInc0';

  const castList = movie.credits?.cast?.slice(0, 10) || [];
  const director = movie.credits?.crew?.find((c) => c.job === 'Director');
  const movieReviews = customReviews.filter((r) => String(r.movieId) === String(movie.id));

  return (
    <div className="space-y-12 pb-20">
      {/* Backdrop Header Section */}
      <div className="relative w-full min-h-[550px] overflow-hidden rounded-b-3xl">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 pb-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 items-end">
          {/* Poster Card */}
          <div className="relative aspect-[2/3] w-full max-w-[280px] mx-auto md:mx-0 rounded-3xl overflow-hidden glass-panel border border-slate-700 shadow-2xl">
            <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
          </div>

          {/* Detailed Info */}
          <div className="md:col-span-2 lg:col-span-3 space-y-4 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              {movie.genres?.map((g) => (
                <Badge key={g.id} variant="primary" size="sm">
                  {g.name}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-sm italic text-accent font-serif font-medium">"{movie.tagline}"</p>
            )}

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-6 text-xs text-slate-300 font-medium flex-wrap">
              <div className="flex items-center gap-1.5 text-accent font-bold text-sm bg-dark-bg/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
                <FiStar className="fill-accent w-4 h-4" />
                <span>{movie.vote_average ? movie.vote_average.toFixed(1) : '8.5'} / 10</span>
              </div>
              <span className="flex items-center gap-1">
                <FiClock className="w-4 h-4 text-primary" /> {formatRuntime(movie.runtime)}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar className="w-4 h-4 text-primary" /> {formatDate(movie.release_date)}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl pt-2">{movie.overview}</p>

            {/* Action CTAs */}
            <div className="flex items-center gap-4 pt-4 flex-wrap">
              <button
                onClick={() => setShowTrailerModal(true)}
                className="px-6 py-3.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-glow-primary hover:bg-primary-hover flex items-center gap-2 transition-all hover:scale-105"
              >
                <FiPlay className="w-5 h-5 fill-current" /> Watch Trailer
              </button>

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

              <button
                onClick={() => toggleFavorite(movie)}
                className={`px-5 py-3.5 rounded-2xl font-bold text-sm border backdrop-blur-md flex items-center gap-2 transition-all ${
                  inFavorites
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-slate-800/60 text-slate-200 border-slate-700 hover:border-slate-500'
                }`}
              >
                <FiHeart className="w-4 h-4 fill-current" />
                {inFavorites ? 'Favorited' : 'Favorite'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Details */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Cast, Director, Streaming Providers */}
        <div className="lg:col-span-2 space-y-10">
          {/* Director & Production */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold font-heading text-slate-100">Film Metadata & Crew</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-semibold">Director</p>
                <p className="text-slate-100 font-bold text-sm mt-0.5">{director ? director.name : 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Budget</p>
                <p className="text-slate-100 font-bold text-sm mt-0.5">{formatCurrency(movie.budget)}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Box Office Revenue</p>
                <p className="text-slate-100 font-bold text-sm mt-0.5">{formatCurrency(movie.revenue)}</p>
              </div>
            </div>
          </div>

          {/* Top Cast List */}
          {castList.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-heading text-slate-100">Top Cast Members</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {castList.map((actor) => (
                  <div key={actor.id} className="p-3 rounded-2xl glass-panel border border-slate-800 text-center space-y-2">
                    <img
                      src={getImageUrl(actor.profile_path, 'w185')}
                      alt={actor.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto border border-primary/40"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{actor.name}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Streaming Platforms */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold font-heading text-slate-100">Available to Stream On</h3>
            <div className="flex items-center gap-4 flex-wrap">
              {STREAMING_PLATFORMS.map((platform) => (
                <div key={platform.id} className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-200">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-heading text-slate-100">Community Reviews & Discussions</h3>
            <ReviewForm movieId={movie.id} movieTitle={movie.title} />

            <div className="space-y-4">
              {movieReviews.length > 0 ? (
                movieReviews.map((r) => <ReviewCard key={r.id} review={r} />)
              ) : (
                <div className="p-6 rounded-2xl glass-panel text-center text-slate-400 text-sm">
                  Be the first film enthusiast to review {movie.title}!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Rating Distribution */}
        <div className="space-y-6">
          <RatingDistribution />
        </div>
      </div>

      {/* Similar & Recommendations Rows */}
      {movie.similar?.results?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4">
          <MovieRow title="🎬 Similar Movies You Might Enjoy" movies={movie.similar.results} />
        </div>
      )}

      {/* Trailer Modal */}
      {showTrailerModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <button
              onClick={() => setShowTrailerModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800 text-white hover:bg-primary transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`${movie.title} Official Trailer`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};
