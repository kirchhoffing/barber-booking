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

## 🛠 Technology Stack

### Frontend
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **UI Components**: Headless UI

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

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kirchhoffing/barber-booking.git
cd barber-booking
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up the backend:
```bash
cd backend
cp .env.example .env
pnpm install
npx prisma migrate dev
pnpm run dev
```

4. Set up the frontend:
```bash
cd frontend
cp .env.example .env
pnpm install
pnpm run dev
```

## 📚 Learning Resources

### Frontend Development
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Backend Development
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Introduction](https://jwt.io/introduction)

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
pnpm run test        # Run unit tests
pnpm run test:e2e    # Run end-to-end tests
```

### Backend Testing
```bash
cd backend
pnpm run test        # Run unit tests
pnpm run test:e2e    # Run end-to-end tests
```

## 📦 Deployment

### Frontend Deployment
```bash
cd frontend
pnpm run build       # Build production bundle
pnpm run preview     # Preview production build
```

### Backend Deployment
```bash
cd backend
pnpm run build       # Build production bundle
pnpm run start       # Start production server
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
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
