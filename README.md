# Barber Booking System

A modern barber appointment system. A web application where customers can book appointments with barbers, barbers can manage their working hours and services, and administrators can control the system.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v14 or higher)
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/kirchhoffing/barber-booking.git
cd barber-booking
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables
```bash
# In backend directory, create .env file
DATABASE_URL="postgresql://username:password@localhost:5432/barber_booking"
JWT_SECRET="your-secret-key"
PORT=3000

# In frontend directory, create .env file
VITE_API_URL="http://localhost:3000"
```

4. Set up the database
```bash
# In backend directory
npx prisma migrate dev
npx prisma db seed
```

### Running the Application

1. Start the backend server
```bash
# In backend directory
npm run dev
```

2. Start the frontend development server
```bash
# In frontend directory
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 👥 User Roles & Features

### Customer
- Account creation and login
- Browse available barbers
- Book appointments
- View appointment history
- Rate and review services

### Barber
- Profile management
- Working hours setup
- Service management
- Appointment tracking
- Calendar integration

### Administrator
- User management (add, edit, delete)
- Barber approval/rejection
- System statistics
- Role management

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Routing**: React Router
- **Forms**: React Hook Form
- **Validation**: Zod
- **UI Libraries**: Headless UI, Heroicons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Validation**: Zod
- **Testing**: Jest

## 📁 Project Structure

```
barber-booking/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── hooks/        # Custom hooks
│   │   ├── types/        # TypeScript types
│   │   └── i18n/         # Internationalization files
│   └── public/           # Static assets
│
└── backend/               # Express backend application
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── routes/       # API routes
    │   ├── middleware/   # Custom middleware
    │   ├── services/     # Business services
    │   └── lib/         # Shared utilities
    └── prisma/          # Database schema and migrations
```

## 🌟 Key Features
- 🔐 JWT Authentication & Role-Based Access Control
- 🌐 Internationalization (English & Turkish)
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS
- 📊 Admin Dashboard
- 💈 Barber Management System
- 📅 Appointment System
- 🔒 Secure Password Handling
- 📈 Real-time Availability Checking

## 🚀 Deployment & DevOps

### Docker Support
- Containerized frontend and backend applications
- Production-ready Docker Compose configuration
- SSL certificate generation script
- Nginx reverse proxy configuration

### CI/CD Pipeline
- GitHub Actions workflow for automated testing and deployment
- Automated build and deployment process
- Environment-specific configurations
- Production deployment automation

## 🔒 Security Features
- SSL/TLS encryption
- Secure password hashing
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- CORS protection
- Rate limiting
- Environment variable management

## 📊 Database Schema
- User management (customers, barbers, admins)
- Appointment scheduling
- Service catalog
- Working hours management
- Reviews and ratings
- Payment tracking
- Notification system

## 🛠 Development Tools
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Jest for testing
- Prisma for database management
- Docker for containerization
- GitHub Actions for CI/CD

## 📱 Frontend Features
- Responsive design for all devices
- Dark/Light mode support
- Real-time appointment updates
- Interactive calendar
- Form validation
- Toast notifications
- Loading states
- Error handling
- Image upload support
- Multi-language support (i18n)

## 🔧 Backend Features
- RESTful API design
- Error handling middleware
- Request validation
- File upload handling
- Email notifications
- Database migrations
- Seeding scripts
- API documentation
- Rate limiting
- Caching support

## 📦 Dependencies
### Frontend
- React 18
- Vite
- Tailwind CSS
- React Query
- React Router
- React Hook Form
- Zod
- Headless UI
- Heroicons
- i18next

### Backend
- Express.js
- Prisma
- PostgreSQL
- JWT
- Zod
- Jest
- Nodemailer
- Multer
- Rate Limiter
- CORS

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Ömer Çalışkan - 34omercaliskan@gmail.com
Project Link: https://github.com/kirchhoffing/barber-booking 