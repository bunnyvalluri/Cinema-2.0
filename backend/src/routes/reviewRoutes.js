import express from 'express';
import { getMovieReviews, createReview } from '../controllers/reviewController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/movie/:movieId', getMovieReviews);
router.post('/', verifyToken, createReview);

export default router;
