# Barber Booking Backend

## Project Architecture

### Technologies
- Node.js
- Express.js
- TypeScript
- Prisma (PostgreSQL)
- JWT Authentication
- Zod Validation

### Directory Structure
```
backend/
├── src/
│   ├── controllers/     # Business logic
│   ├── middleware/      # Middleware
│   ├── routes/          # API routes
│   ├── services/        # External services
│   └── utils/           # Helper functions
├── prisma/
│   └── schema.prisma    # Database schema
└── package.json         # Dependencies
```

### Database Models
- User: User information
- Barber: Barber information
- Service: Service information
- WorkingHours: Working hours
- TimeSlot: Available time slots
- Appointment: Appointment information

## Completed Features

### User Operations
- [x] User registration
- [x] User login
- [x] JWT token validation
- [x] Role-based authorization

### Barber Operations
- [x] Barber registration
- [x] Barber profile update
- [x] Working hours management
- [x] Service management

### Appointment Operations
- [x] Appointment creation
- [x] Appointment listing
- [x] Appointment status update
- [x] Available time slot calculation

### API Endpoints
- [x] Auth endpoints
- [x] Barber endpoints
- [x] Service endpoints
- [x] Appointment endpoints
- [x] Working hours endpoints

## Development Status
- [x] Basic API structure
- [x] Database schema
- [x] Authentication system
- [x] CRUD operations
- [ ] Error handling improvements
- [ ] Logging system
- [ ] Rate limiting
- [ ] API documentation

## Installation
1. Install dependencies:
```bash
npm install
```

2. Configure database connection:
```bash
cp .env.example .env
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Current user information

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

## Development

- `npm run dev` - Start development server
- `npm run build` - Build project
- `npm run start` - Run built project

## Database

Prisma ORM is used. Database schema is defined in `prisma/schema.prisma` file.

## Security

- JWT-based authentication
- Password hashing
- CORS configuration
- Rate limiting

## Project Setup and Initialization
- Node.js project created
- TypeScript setup completed
- Express.js framework added
- Required dependencies installed (bcrypt, cors, dotenv, jsonwebtoken)

## Authentication System
### 1. User Registration
- `/auth/register` endpoint created
- Email and password set as required fields
- Passwords stored with bcrypt hashing
- Email addresses set as unique

### 2. User Login
- `/auth/login` endpoint created
- JWT token implementation completed
- User information (id, email, role) stored in token
- Token expiration set to 24 hours

### 3. Authentication Middleware
- Token validation middleware created
- Role-based authorization middleware added
- User information added to request object

## Database Configuration
### 1. Prisma Setup
- Prisma ORM installed
- PostgreSQL database connection configured
- Schema file created

### 2. Database Models
- User model
  - id, email, password, name, phone, role, appointments
  - Role enum: USER, ADMIN, BARBER
- Barber model
  - id, name, email, phone, services, appointments
- Service model
  - id, name, description, duration, price, barber, appointments
- Appointment model
  - id, date, status, user, barber, service
  - Status enum: PENDING, CONFIRMED, CANCELLED, COMPLETED

## Barber Management
### 1. Barber CRUD Operations
- GET `/barbers` - List all barbers
- GET `/barbers/:id` - Barber details
- POST `/barbers` - Add new barber (admin)
- PUT `/barbers/:id` - Update barber (admin)
- DELETE `/barbers/:id` - Delete barber (admin)

## Notes
- Admin user creation script written
- Sequence reset script created
- Error handling added for all endpoints
- Logging implemented for all operations

## Todo
- [ ] Service management
- [ ] Appointment system
- [ ] User profile management
- [ ] Barber profile management
- [ ] Appointment status update
- [ ] Email notification system 