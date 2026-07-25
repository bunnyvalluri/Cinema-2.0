import express from 'express';
import { getAdminMetrics, updateUserRole } from '../controllers/adminController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/rbacMiddleware.js';

const router = express.Router();

router.use(verifyToken);
router.use(requireRole(['administrator']));

router.get('/metrics', getAdminMetrics);
router.put('/user/role', updateUserRole);

export default router;
