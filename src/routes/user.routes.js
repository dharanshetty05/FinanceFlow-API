import express from 'express';
import * as controller from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(protect);

// Read access (Analyst + Admin)
router.get('/', authorize('analyst', 'admin'), controller.getUsers);
router.get('/:id', authorize('analyst', 'admin'), controller.getUserById);

// Write access (Admin only)
router.post('/', authorize('admin'), controller.createUser);
router.patch('/:id', authorize('admin'), controller.updateUser);
router.delete('/:id', authorize('admin'), controller.deleteUser);

export default router;