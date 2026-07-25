import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { authRateLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/register', authRateLimiter, registerUser);
router.post('/login', authRateLimiter, loginUser);
router.get('/me', verifyToken, getCurrentUser);

export default router;
