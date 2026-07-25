import axios from 'axios';

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN || '';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'ff736a04c8af39ea1bdabb98f407ab89';

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_READ_TOKEN}`,
    'Content-Type': 'application/json',
  },
  params: {
    api_key: TMDB_API_KEY,
  },
});

// Fallback high quality movie dataset for offline or backup execution
const FALLBACK_MOVIES = [
  {
    id: 550,
    title: 'Fight Club',
    original_title: 'Fight Club',
    overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdrop_path: '/hZkgoQY85WAgW2ZTH2VSDG3q2dM.jpg',
    vote_average: 8.4,
    vote_count: 26000,
    release_date: '1999-10-15',
    genre_ids: [18, 53],
    genres: [{ id: 18, name: 'Drama' }, { id: 53, name: 'Thriller' }],
    runtime: 139,
    tagline: 'Mischief. Mayhem. Soap.',
    status: 'Released',
    budget: 63000000,
    revenue: 100853753,
  },
  {
    id: 157336,
    title: 'Interstellar',
    original_title: 'Interstellar',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/xJHokMbljvjADYdit5fKSuV0yqv.jpg',
    vote_average: 8.6,
    vote_count: 32000,
    release_date: '2014-11-05',
    genre_ids: [12, 18, 878],
    genres: [{ id: 12, name: 'Adventure' }, { id: 18, name: 'Drama' }, { id: 878, name: 'Science Fiction' }],
    runtime: 169,
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    status: 'Released',
    budget: 165000000,
    revenue: 701729206,
  },
  {
    id: 299536,
    title: 'Avengers: Infinity War',
    original_title: 'Avengers: Infinity War',
    overview: 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos.',
    poster_path: '/7WsyChLLEzFiDii2061g0fWv25s.jpg',
    backdrop_path: '/mbfBh23DkfP8p66gBh5nZ8c.jpg',
    vote_average: 8.3,
    vote_count: 28000,
    release_date: '2018-04-25',
    genre_ids: [28, 12, 878],
    genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 878, name: 'Science Fiction' }],
    runtime: 149,
    tagline: 'An entire universe. Once decision.',
    status: 'Released',
    budget: 300000000,
    revenue: 2048359754,
  },
  {
    id: 671,
    title: "Harry Potter and the Philosopher's Stone",
    original_title: "Harry Potter and the Philosopher's Stone",
    overview: 'Harry Potter has lived under the stairs at his aunt and uncle\'s house his whole life. But on his 11th birthday, he learns he\'s a powerful wizard.',
    poster_path: '/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
    backdrop_path: '/hziiv14OpB73u9gAak4XDDfBKa2.jpg',
    vote_average: 7.9,
    vote_count: 25000,
    release_date: '2001-11-16',
    genre_ids: [12, 14],
    genres: [{ id: 12, name: 'Adventure' }, { id: 14, name: 'Fantasy' }],
    runtime: 152,
    tagline: 'Let the magic begin.',
    status: 'Released',
    budget: 125000000,
    revenue: 974755371,
  },
  {
    id: 27205,
    title: 'Inception',
    original_title: 'Inception',
    overview: 'Cobb, a skilled thief who steals valuable secrets from deep within the subconscious during the dream state, is offered a chance at redemption.',
    poster_path: '/oYuLE1311oA8hwoTDhAcOSLFqft.jpg',
    backdrop_path: '/8ZTVqvKDQ8emSGUEMjsS4yHAh4L.jpg',
    vote_average: 8.4,
    vote_count: 35000,
    release_date: '2010-07-15',
    genre_ids: [28, 12, 878],
    genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 878, name: 'Science Fiction' }],
    runtime: 148,
    tagline: 'Your mind is the scene of the crime.',
    status: 'Released',
    budget: 160000000,
    revenue: 825532764,
  },
  {
    id: 155,
    title: 'The Dark Knight',
    original_title: 'The Dark Knight',
    overview: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: '/nMK2819Tyv7yB8pfo3wWmKMmY2C.jpg',
    vote_average: 8.5,
    vote_count: 31000,
    release_date: '2008-07-16',
    genre_ids: [18, 28, 80, 53],
    genres: [{ id: 18, name: 'Drama' }, { id: 28, name: 'Action' }, { id: 80, name: 'Crime' }],
    runtime: 152,
    tagline: 'Welcome to a world without rules.',
    status: 'Released',
    budget: 185000000,
    revenue: 1004558444,
  }
];

export const tmdbService = {
  // Fetch Trending Movies
  async getTrending(timeWindow = 'day') {
    try {
      const response = await tmdbClient.get(`/trending/movie/${timeWindow}`);
      return response.data.results;
    } catch (error) {
      console.warn('TMDB getTrending failed, using fallback data:', error.message);
      return FALLBACK_MOVIES;
    }
  },

  // Fetch Popular Movies
  async getPopular(page = 1) {
    try {
      const response = await tmdbClient.get('/movie/popular', { params: { page } });
      return response.data;
    } catch (error) {
      console.warn('TMDB getPopular failed, using fallback data:', error.message);
      return { page: 1, results: FALLBACK_MOVIES, total_pages: 1, total_results: FALLBACK_MOVIES.length };
    }
  },

  // Fetch Top Rated Movies
  async getTopRated(page = 1) {
    try {
      const response = await tmdbClient.get('/movie/top_rated', { params: { page } });
      return response.data;
    } catch (error) {
      console.warn('TMDB getTopRated failed, using fallback data:', error.message);
      return { page: 1, results: FALLBACK_MOVIES, total_pages: 1, total_results: FALLBACK_MOVIES.length };
    }
  },

  // Fetch Now Playing
  async getNowPlaying(page = 1) {
    try {
      const response = await tmdbClient.get('/movie/now_playing', { params: { page } });
      return response.data;
    } catch (error) {
      console.warn('TMDB getNowPlaying failed, using fallback data:', error.message);
      return { page: 1, results: FALLBACK_MOVIES, total_pages: 1, total_results: FALLBACK_MOVIES.length };
    }
  },

  // Fetch Upcoming Movies
  async getUpcoming(page = 1) {
    try {
      const response = await tmdbClient.get('/movie/upcoming', { params: { page } });
      return response.data;
    } catch (error) {
      console.warn('TMDB getUpcoming failed, using fallback data:', error.message);
      return { page: 1, results: FALLBACK_MOVIES, total_pages: 1, total_results: FALLBACK_MOVIES.length };
    }
  },

  // Fetch Detailed Movie Info
  async getMovieDetails(movieId) {
    try {
      const response = await tmdbClient.get(`/movie/${movieId}`, {
        params: { append_to_response: 'videos,credits,similar,recommendations,keywords' },
      });
      return response.data;
    } catch (error) {
      console.warn(`TMDB getMovieDetails(${movieId}) failed, using fallback data:`, error.message);
      const found = FALLBACK_MOVIES.find((m) => String(m.id) === String(movieId)) || FALLBACK_MOVIES[0];
      return {
        ...found,
        videos: { results: [{ key: 'YoHD9XEInc0', type: 'Trailer', site: 'YouTube' }] },
        credits: {
          cast: [
            { id: 1, name: 'Edward Norton', character: 'The Narrator', profile_path: '/e88sA86y0o5f5431.jpg' },
            { id: 2, name: 'Brad Pitt', character: 'Tyler Durden', profile_path: '/ccEz2m2v277h5321.jpg' },
            { id: 3, name: 'Helena Bonham Carter', character: 'Marla Singer', profile_path: '/5673a56h7.jpg' },
          ],
          crew: [{ id: 4, name: 'David Fincher', job: 'Director' }],
        },
        similar: { results: FALLBACK_MOVIES.slice(1, 4) },
        recommendations: { results: FALLBACK_MOVIES.slice(2, 5) },
      };
    }
  },

  // Global Search Movies
  async searchMovies(query, filters = {}, page = 1) {
    try {
      const params = { query, page, ...filters };
      const response = await tmdbClient.get('/search/movie', { params });
      return response.data;
    } catch (error) {
      console.warn('TMDB searchMovies failed, returning filtered fallback:', error.message);
      const filtered = FALLBACK_MOVIES.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.overview.toLowerCase().includes(query.toLowerCase())
      );
      return { page: 1, results: filtered.length ? filtered : FALLBACK_MOVIES, total_pages: 1, total_results: filtered.length };
    }
  },

  // Discover Movies by Genre / Filters
  async discoverMovies(params = {}) {
    try {
      const response = await tmdbClient.get('/discover/movie', { params });
      return response.data;
    } catch (error) {
      console.warn('TMDB discoverMovies failed:', error.message);
      return { page: 1, results: FALLBACK_MOVIES, total_pages: 1, total_results: FALLBACK_MOVIES.length };
    }
  },
};
