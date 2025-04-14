import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { updateUserRole, getAllUsers } from '../controllers/admin.controller';

const router = express.Router();

// Tüm rotalar için authentication gerekli
router.use(authenticateToken);

// Admin rotaları
router.put('/users/:id/role', updateUserRole);
router.get('/users', getAllUsers);

export default router; 