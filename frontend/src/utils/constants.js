export const USER_ROLES = {
  GUEST: 'guest',
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'administrator',
};

export const MOVIE_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export const SORT_OPTIONS = [
  { label: 'Popularity Descending', value: 'popularity.desc' },
  { label: 'Rating Descending', value: 'vote_average.desc' },
  { label: 'Release Date Descending', value: 'primary_release_date.desc' },
  { label: 'Title (A-Z)', value: 'original_title.asc' },
];

export const STREAMING_PLATFORMS = [
  { id: 'netflix', name: 'Netflix', logo: 'https://image.tmdb.org/t/p/original/pbpMk2JmcoNnQwx5JGpXngfoW me.jpg' },
  { id: 'disney', name: 'Disney+', logo: 'https://image.tmdb.org/t/p/original/7rwE2g23B3wvh2P44y8W0vJ4zR.jpg' },
  { id: 'prime', name: 'Prime Video', logo: 'https://image.tmdb.org/t/p/original/68SpL1v9YvRFFiJwANFACoMhYw5.jpg' },
  { id: 'apple', name: 'Apple TV+', logo: 'https://image.tmdb.org/t/p/original/2E03p91ee2yT2vL1dUvC62sWj.jpg' },
  { id: 'hbo', name: 'Max (HBO)', logo: 'https://image.tmdb.org/t/p/original/7dF3vF4y2V2H3v9W3J3V4K5.jpg' },
];
