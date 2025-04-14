import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getWorkingHours,
  updateWorkingHours,
  getServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/barber.controller';

const router = express.Router();

// Tüm rotlar için authentication gerekli
router.use(authenticateToken);

// Çalışma Saatleri
router.get('/:barberId/working-hours', getWorkingHours);
router.put('/:barberId/working-hours', updateWorkingHours);

// Hizmetler
router.get('/:barberId/services', getServices);
router.post('/:barberId/services', createService);
router.put('/:barberId/services/:id', updateService);
router.delete('/:barberId/services/:id', deleteService);

export default router; 