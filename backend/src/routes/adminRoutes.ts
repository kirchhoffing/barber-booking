import { Router } from 'express';
import { getAllUsers, deleteUser, updateUserRole } from '../controllers/adminController';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = Router();

// Apply authentication and admin middleware to all routes
router.use(authenticateToken, isAdmin);

router.get('/users', getAllUsers);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

export default router; 