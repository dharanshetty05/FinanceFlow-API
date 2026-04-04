import express from 'express';
import * as controller from '../controllers/record.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createRecordSchema } from '../validators/record.validator.js';

const router = express.Router();

router.use(protect);

// Read access (Analyst + Admin)
router.get('/', authorize('analyst', 'admin'), controller.getRecords);
router.get('/:id', authorize('analyst', 'admin'), controller.getRecord);

// Write access (Admin only)
router.post('/', authorize('admin'), validate(createRecordSchema), controller.createRecord);
router.patch('/:id', authorize('admin'), controller.updateRecord);
router.delete('/:id', authorize('admin'), controller.deleteRecord);

export default router;