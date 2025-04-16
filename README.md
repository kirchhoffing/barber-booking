# Barber Booking System

A modern barber appointment system. A web application where customers can book appointments with barbers, barbers can manage their working hours and services, and administrators can control the system.

## 🎯 Project Overview

### Key Features
- **Customer Features**
  - Account creation and login
  - Barber list viewing
  - Appointment creation and management
  - Appointment history
  - Real-time availability checking

- **Barber Features**
  - Profile management
  - Working hours setup
  - Service management
  - Appointment tracking
  - Calendar integration

- **Admin Features**
  - User management
  - Barber approval/rejection
  - System statistics
  - Role management

## 🏗 Architecture

### Core Components (BACKEND)
- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **Middleware**: Process requests before reaching controllers
- **Routes**: Define API endpoints
- **Models**: Define data structures and database schema
- **Utils**: Shared utility functions

### Component Structure (FRONTEND)
- **Layout Components**: Page structure and navigation
- **UI Components**: Reusable interface elements
- **Feature Components**: Specific functionality blocks
- **Page Components**: Complete page implementations
- **Shared Components**: Common utilities and helpers

### Database Schema (BACKEND)
- **Users**: Customer, Barber, and Admin accounts
- **Appointments**: Booking records
- **Services**: Barber services and pricing
- **Working Hours**: Barber availability
- **Reviews**: Customer feedback

## 🛠 Technology Stack

### Frontend (FRONTEND)
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Routing**: React Router
- **Forms**: React Hook Form
- **Validation**: Zod
- **UI Libraries**: Headless UI, Heroicons, Framer Motion, Recharts, React Map GL

### Backend (BACKEND)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Validation**: Zod
- **Testing**: Jest

## 🔐 Authentication & Authorization (BACKEND)

### Security Features
- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Rate limiting for API endpoints
- Input validation with Zod

### User Roles
- **Customer**: Can book appointments and manage their profile
- **Barber**: Can manage services, working hours, and appointments
- **Admin**: Full system access and management capabilities

## 📊 API Design (BACKEND)

### RESTful Endpoints
- **Auth Routes**: User authentication and authorization
- **User Routes**: User profile management
- **Appointment Routes**: Booking and management
- **Service Routes**: Service listing and management
- **Working Hours Routes**: Availability management
- **Admin Routes**: System administration

### Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "statusCode": 200
}
```

## 🎨 UI/UX Design (FRONTEND)

### Design Principles
- **User-Centric**: Intuitive and accessible interface
- **Responsive**: Mobile-first approach
- **Consistent**: Uniform design language
- **Efficient**: Streamlined booking process
- **Accessible**: WCAG 2.1 compliance

### Key Pages
- **Landing Page**: Introduction and feature showcase
- **Authentication**: Login and registration
- **Dashboard**: User overview and quick actions
- **Booking Flow**: Service selection and scheduling
- **Profile Management**: User settings and preferences
- **Admin Panel**: System management interface

## 📱 Responsive Design (FRONTEND)

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Adaptive Features
- Dynamic layouts
- Responsive images
- Touch-friendly interfaces
- Mobile-optimized forms
- Progressive enhancement

## 🧪 Testing Strategy

### Test Types (BACKEND)
- Unit Tests: Individual component testing
- Integration Tests: API endpoint testing
- E2E Tests: Complete flow testing

### Test Types (FRONTEND)
- Component Tests: Individual component testing
- Integration Tests: Feature interaction testing
- E2E Tests: Complete user flow testing
- Accessibility Tests: WCAG compliance checking

### Testing Tools (FRONTEND)
- Jest for unit testing
- React Testing Library
- Cypress for E2E testing
- Storybook for component testing
- Axe for accessibility testing

## 📈 Performance Optimization

### Implemented Optimizations (BACKEND)
- Database query optimization
- Caching strategies
- Connection pooling
- Request batching
- Response compression

### Implemented Optimizations (FRONTEND)
- Code splitting
- Lazy loading
- Image optimization
- Bundle size reduction
- Caching strategies

### Performance Metrics (FRONTEND)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

### Monitoring (BACKEND)
- Error tracking
- Performance metrics
- API usage statistics
- Database query analysis

## 🔄 Development Workflow

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Git commit conventions

### Branch Strategy
- main: Production-ready code
- develop: Development branch
- feature/*: New features
- bugfix/*: Bug fixes
- release/*: Release preparation

## 📋 Current Status

### Completed
- Basic API structure (BACKEND)
- Authentication system (BACKEND)
- Database schema (BACKEND)
- Core CRUD operations (BACKEND)
- Basic error handling (BACKEND)
- Basic application structure (FRONTEND)
- Authentication flow (FRONTEND)
- Core booking functionality (FRONTEND)
- Responsive layouts (FRONTEND)
- Basic styling system (FRONTEND)

### In Progress
- Real-time updates
- Advanced filtering
- Performance optimization
- Enhanced security features
- Enhanced animations
- Accessibility improvements

### Planned
- WebSocket integration
- Advanced analytics
- Payment integration
- Email notifications
- Progressive Web App (PWA)
- Offline functionality
- Multi-language support
- Dark mode implementation

## 📚 Documentation

### API Documentation (BACKEND)
- Swagger/OpenAPI specification
- Endpoint descriptions
- Request/response examples
- Error codes and handling

### Component Documentation (FRONTEND)
- Props interface
- Usage examples
- State management
- Event handling
- Accessibility notes

### Style Guide (FRONTEND)
- Color palette
- Typography
- Spacing system
- Component variants
- Animation guidelines

## 📁 Project Structure

```
barber-booking/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── hooks/        # Custom hooks
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utility functions
│   └── public/           # Static assets
│
├── backend/              # Express backend application
│   ├── src/
│   │   ├── controllers/ # Business logic
│   │   ├── middleware/  # Express middleware
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business services
│   │   └── utils/       # Utility functions
│   └── prisma/          # Database schema and migrations
│
└── docs/                # Project documentation
```

## 🤝 Contributing

We welcome contributions to the project. Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express](https://expressjs.com/) - Backend framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
