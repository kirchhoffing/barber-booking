/**
 * index.ts - Server Entry Point
 * 
 * This file serves as the entry point for the Express server.
 * It configures:
 * - Environment variables
 * - CORS settings
 * - Middleware
 * - Routes
 * - Error handling
 * - Server startup
 * 
 * Key Concepts:
 * - Express server setup
 * - Environment configuration
 * - CORS and security
 * - Error handling
 * - Route organization
 */

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import barberRoutes from './routes/barber'
import adminRoutes from './routes/adminRoutes'

// Load environment variables from .env file
dotenv.config()

// Initialize Express application
const app = express()
const PORT = process.env.PORT || 3000

/**
 * CORS Configuration
 * 
 * Cross-Origin Resource Sharing settings:
 * - origin: Frontend URL (configurable via environment)
 * - methods: Allowed HTTP methods
 * - allowedHeaders: Headers allowed in requests
 * - exposedHeaders: Headers exposed to frontend
 * 
 * Security best practices:
 * - Configure specific origins in production
 * - Limit allowed methods to needed ones
 * - Control headers for security
 */
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization']
}))

/**
 * Middleware Configuration
 * 
 * 1. express.json(): Parses JSON request bodies
 * 2. express.urlencoded(): Parses URL-encoded request bodies
 * 
 * These middleware are essential for handling different types of requests
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * API Routes
 * 
 * Organizes routes by feature/domain:
 * - /auth: Authentication endpoints
 * - /api/user: User management endpoints
 * - /api/barber: Barber-specific endpoints
 * - /admin: Admin-specific endpoints
 * 
 * Each route group is handled by its own router file
 */
app.use('/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/barber', barberRoutes)
app.use('/admin', adminRoutes)

/**
 * Error Handling Middleware
 * 
 * Catches and handles all unhandled errors:
 * 1. Logs error stack trace
 * 2. Sends 500 status with error message
 * 3. Prevents server crashes
 * 
 * @param {Error} err - The error object
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @param {express.NextFunction} next - The next middleware function
 */
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

/**
 * Server Startup
 * 
 * Starts the Express server on the configured port
 * Logs server URL when ready
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
