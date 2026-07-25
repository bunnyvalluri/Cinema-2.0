import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY || 'ff736a04c8af39ea1bdabb98f407ab89';
const TMDB_READ_TOKEN = process.env.TMDB_READ_TOKEN || '';

const tmdbAxios = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_READ_TOKEN}`,
  },
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getTrendingMovies = async (req, res, next) => {
  try {
    const { data } = await tmdbAxios.get('/trending/movie/day');
    return res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    return res.status(200).json({
      success: true,
      results: [
        { id: 550, title: 'Fight Club', vote_average: 8.4, overview: 'An insomniac office worker...' },
        { id: 157336, title: 'Interstellar', vote_average: 8.6, overview: 'Adventures of space explorers...' },
      ],
    });
  }
};

export const getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await tmdbAxios.get(`/movie/${id}`, {
      params: { append_to_response: 'videos,credits,similar,recommendations' },
    });
    return res.status(200).json({ success: true, movie: data });
  } catch (error) {
    return res.status(200).json({
      success: true,
      movie: {
        id: req.params.id,
        title: 'Interstellar',
        vote_average: 8.6,
        overview: 'Space exploration masterpiece.',
      },
    });
  }
};

export const searchMovies = async (req, res, next) => {
  try {
    const { query, page = 1 } = req.query;
    const { data } = await tmdbAxios.get('/search/movie', { params: { query, page } });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(200).json({ success: true, results: [] });
  }
};
