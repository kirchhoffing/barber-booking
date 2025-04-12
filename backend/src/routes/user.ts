import express from 'express'
import { authenticateToken, authorizeRole } from '../middleware/auth'

const router = express.Router()

// Kullanıcının kendi profilini görüntüleme
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Profil bilgileri',
    user: req.user
  })
})

// Sadece admin kullanıcıların erişebileceği bir endpoint
router.get('/admin-only', authenticateToken, authorizeRole(['ADMIN']), (req, res) => {
  res.json({
    message: 'Bu endpoint\'e sadece admin kullanıcılar erişebilir'
  })
})

export default router 