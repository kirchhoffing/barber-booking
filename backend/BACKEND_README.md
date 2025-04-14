# Barber Booking Backend

## 📚 Table of Contents
- [Project Overview](#-project-overview)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [Error Handling](#-error-handling)
- [Testing](#-testing)
- [Deployment](#-deployment)

## 🎯 Project Overview

The backend of the Barber Booking System is built with Node.js, Express, and TypeScript, providing a robust API for the frontend application. It handles user authentication, appointment management, and business logic.

### Key Features
- **Authentication System**
  - JWT-based authentication
  - Role-based authorization
  - Password hashing
  - Token refresh

- **API Endpoints**
  - RESTful API design
  - Input validation
  - Error handling
  - Rate limiting

- **Database Operations**
  - Prisma ORM
  - PostgreSQL database
  - Data validation
  - Query optimization

## 🛠 Technology Stack

### Core Technologies
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma

### Key Libraries
- **Authentication**: jsonwebtoken, bcrypt
- **Validation**: Zod
- **Testing**: Jest
- **Logging**: Winston
- **Security**: helmet, cors

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Business logic
│   │   ├── auth/       # Authentication controllers
│   │   ├── barber/     # Barber controllers
│   │   ├── user/       # User controllers
│   │   └── appointment/# Appointment controllers
│   ├── middleware/      # Express middleware
│   │   ├── auth/       # Authentication middleware
│   │   ├── error/      # Error handling
│   │   └── validation/ # Input validation
│   ├── routes/         # API routes
│   ├── services/       # Business services
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   ├── app.ts          # Express application
│   └── index.ts        # Server entry point
├── prisma/             # Database schema
│   ├── migrations/     # Database migrations
│   └── schema.prisma   # Prisma schema
└── package.json        # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- pnpm (recommended) or npm

### Installation
1. Install dependencies:
```bash
pnpm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start development server:
```bash
pnpm run dev
```

## 📝 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "USER"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Barber Endpoints

#### Get Barber Profile
```http
GET /api/barber/profile
Authorization: Bearer <token>
```

#### Update Working Hours
```http
PUT /api/barber/working-hours
Authorization: Bearer <token>
Content-Type: application/json

{
  "monday": {
    "start": "09:00",
    "end": "17:00"
  },
  // ... other days
}
```

### Appointment Endpoints

#### Create Appointment
```http
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "barberId": 1,
  "serviceId": 1,
  "date": "2024-03-20",
  "time": "14:00"
}
```

## 💾 Database Schema

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Barber Model
```prisma
model Barber {
  id            Int      @id @default(autoincrement())
  userId        Int      @unique
  user          User     @relation(fields: [userId], references: [id])
  services      Service[]
  appointments  Appointment[]
  workingHours  WorkingHours[]
}
```

## 🔐 Authentication

### JWT Implementation
```typescript
import jwt from 'jsonwebtoken';

const generateToken = (userId: number, role: string) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
```

### Password Hashing
```typescript
import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
```

## ⚠️ Error Handling

### Error Middleware
```typescript
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors
    });
  }
  
  res.status(500).json({
    error: 'Internal Server Error'
  });
};
```

## 🧪 Testing

### Unit Testing
```bash
pnpm run test
```

### API Testing
```typescript
import request from 'supertest';
import app from '../app';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });
});
```

## 🚀 Deployment

### Production Build
```bash
pnpm run build
```

### Start Production Server
```bash
pnpm run start
```

## 📚 Learning Resources
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [JWT Introduction](https://jwt.io/introduction) 