import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('cinema_elk_watchlist');
    return saved ? JSON.parse(saved) : [
      { id: 157336, title: 'Interstellar', poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', release_date: '2014-11-05', vote_average: 8.6, overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole.' },
      { id: 27205, title: 'Inception', poster_path: '/edv5CZvWj09upOsy2Y6IwDhK82l.jpg', release_date: '2010-07-15', vote_average: 8.4, overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets.' }
    ];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cinema_elk_favorites');
    return saved ? JSON.parse(saved) : [
      { id: 550, title: 'Fight Club', poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', release_date: '1999-10-15', vote_average: 8.4, overview: 'A ticking-time-bomb insomniac and a slippery soap salesman form an underground fight club.' }
    ];
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('cinema_elk_recent');
    return saved ? JSON.parse(saved) : [];
  });

  const [customReviews, setCustomReviews] = useState(() => {
    const saved = localStorage.getItem('cinema_elk_reviews');
    return saved ? JSON.parse(saved) : [
      {
        id: 'rev_1',
        movieId: 550,
        movieTitle: 'Fight Club',
        userName: 'Alex Rivers',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        rating: 5,
        content: 'A masterclass in psychological thrillers. David Fincher\'s direction combined with Pitt and Norton\'s performances create an unmatched masterpiece.',
        likes: 42,
        replies: [],
        createdAt: '2024-03-12',
      },
      {
        id: 'rev_2',
        movieId: 157336,
        movieTitle: 'Interstellar',
        userName: 'Sarah Jenkins',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
        rating: 4.5,
        content: 'Hans Zimmer\'s soundtrack alone makes this movie an ethereal experience. Visually breathtaking and emotionally resonant.',
        likes: 89,
        replies: [],
        createdAt: '2024-03-18',
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('cinema_elk_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('cinema_elk_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cinema_elk_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('cinema_elk_reviews', JSON.stringify(customReviews));
  }, [customReviews]);

  const toggleWatchlist = (movie) => {
    const exists = watchlist.some((m) => String(m.id) === String(movie.id));
    if (exists) {
      setWatchlist((prev) => prev.filter((m) => String(m.id) !== String(movie.id)));
      toast.success(`Removed "${movie.title}" from Watchlist`);
    } else {
      setWatchlist((prev) => [movie, ...prev]);
      toast.success(`Added "${movie.title}" to Watchlist`);
    }
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.some((m) => String(m.id) === String(movie.id));
    if (exists) {
      setFavorites((prev) => prev.filter((m) => String(m.id) !== String(movie.id)));
      toast.success(`Removed "${movie.title}" from Favorites`);
    } else {
      setFavorites((prev) => [movie, ...prev]);
      toast.success(`Added "${movie.title}" to Favorites`);
    }
  };

  const addRecentlyViewed = (movie) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((m) => String(m.id) !== String(movie.id));
      return [movie, ...filtered].slice(0, 10);
    });
  };

  const addReview = (reviewData) => {
    const newRev = {
      id: 'rev_' + Date.now(),
      likes: 0,
      replies: [],
      createdAt: new Date().toISOString().split('T')[0],
      ...reviewData,
    };
    setCustomReviews((prev) => [newRev, ...prev]);
    toast.success('Review posted successfully!');
  };

  const likeReview = (reviewId) => {
    setCustomReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  return (
    <MovieContext.Provider
      value={{
        watchlist,
        favorites,
        recentlyViewed,
        customReviews,
        toggleWatchlist,
        toggleFavorite,
        addRecentlyViewed,
        addReview,
        likeReview,
        isInWatchlist: (id) => watchlist.some((m) => String(m.id) === String(id)),
        isFavorite: (id) => favorites.some((m) => String(m.id) === String(id)),
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
