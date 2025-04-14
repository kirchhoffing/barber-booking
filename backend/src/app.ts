/**
 * app.ts - Express Application Setup
 * 
 * This file configures the main Express application with:
 * - Middleware setup (CORS, JSON parsing)
 * - Route configuration
 * - API endpoint organization
 * 
 * Key Concepts:
 * - Express middleware
 * - Route organization
 * - API structure
 */

import express, { Express } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import barberRoutes from './routes/barber.routes';
import adminRoutes from './routes/admin.routes';

// Initialize Express application with TypeScript type
const app: Express = express();

/**
 * Middleware Configuration
 * 
 * 1. CORS (Cross-Origin Resource Sharing)
 *    - Enables cross-origin requests
 *    - Configures allowed origins, methods, and headers
 * 
 * 2. JSON Body Parser
 *    - Parses incoming JSON requests
 *    - Makes request body available as JavaScript object
 */
app.use(cors());
app.use(express.json());

/**
 * API Routes Configuration
 * 
 * Organizes routes by feature/domain:
 * - /auth: Authentication endpoints (login, register, etc.)
 * - /api/barber: Barber-specific endpoints
 * - /api/admin: Admin-specific endpoints
 * 
 * Each route group is handled by its own router file
 * for better code organization and maintainability
 */
app.use('/auth', authRoutes);
app.use('/api/barber', barberRoutes);
app.use('/api/admin', adminRoutes);

export default app; 