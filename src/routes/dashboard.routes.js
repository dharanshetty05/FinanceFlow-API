import express from "express";
import * as controller from '../controllers/dashboard.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(protect);

// All roles can access dashboard
router.get('/summary', authorize('viewer', 'analyst', 'admin'), controller.getSummary);
router.get('/category-breakdown', authorize('analyst', 'admin'), controller.getCategoryBreakdown);
router.get('/trends', authorize('analyst', 'admin'), controller.getTrends);
router.get('/recent', authorize('viewer', 'analyst', 'admin'), controller.getRecent);

export default router;