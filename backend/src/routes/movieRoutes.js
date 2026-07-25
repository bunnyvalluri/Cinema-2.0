import express from 'express';
import { getTrendingMovies, getMovieDetails, searchMovies } from '../controllers/movieController.js';

const router = express.Router();

router.get('/trending', getTrendingMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovieDetails);

export default router;
