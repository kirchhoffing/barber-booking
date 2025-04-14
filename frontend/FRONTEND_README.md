# Barber Booking Frontend

## 📚 Table of Contents
- [Project Overview](#-project-overview)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development Guide](#-development-guide)
- [Component Documentation](#-component-documentation)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Testing](#-testing)
- [Deployment](#-deployment)

## 🎯 Project Overview

The frontend of the Barber Booking System is built with React and TypeScript, providing a modern and responsive user interface for customers, barbers, and administrators.

### Key Features
- **Authentication System**
  - JWT-based authentication
  - Role-based authorization
  - Protected routes
  - Form validation

- **User Interface**
  - Responsive design
  - Modern UI components
  - Loading states
  - Error handling
  - Toast notifications

- **Data Management**
  - React Query for data fetching
  - Optimistic updates
  - Cache management
  - Real-time updates

## 🛠 Technology Stack

### Core Technologies
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS

### Key Libraries
- **Routing**: React Router v6
- **State Management**: React Query
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **UI Components**: Headless UI
- **HTTP Client**: Axios
- **Internationalization**: i18next

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable components
│   │   ├── auth/          # Authentication components
│   │   ├── barber/        # Barber-related components
│   │   ├── common/        # Common UI components
│   │   └── layout/        # Layout components
│   ├── pages/             # Page components
│   │   ├── auth/          # Authentication pages
│   │   ├── barber/        # Barber pages
│   │   ├── customer/      # Customer pages
│   │   └── admin/         # Admin pages
│   ├── services/          # API services
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   ├── i18n/              # Internationalization
│   └── App.tsx            # Main application
├── public/                # Static assets
└── package.json           # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
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

3. Start development server:
```bash
pnpm run dev
```

## 💻 Development Guide

### Component Development
1. Create components in the appropriate directory
2. Follow the component structure:
```typescript
import React from 'react';

interface ComponentProps {
  // Props interface
}

const Component: React.FC<ComponentProps> = ({ /* props */ }) => {
  // Component logic
  
  return (
    // JSX
  );
};

export default Component;
```

### State Management
- Use React Query for server state
- Use React Context for global UI state
- Use local state for component-specific state

### Form Handling
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  // Validation schema
});

const Form = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema)
  });
  
  return (
    <form onSubmit={handleSubmit(/* handler */)}>
      {/* Form fields */}
    </form>
  );
};
```

## 📦 Component Documentation

### Common Components
- **Button**: Reusable button component
- **Input**: Form input component
- **Select**: Dropdown select component
- **Modal**: Modal dialog component
- **Toast**: Notification component

### Layout Components
- **MainLayout**: Main application layout
- **AuthLayout**: Authentication pages layout
- **DashboardLayout**: Dashboard pages layout

## 🔄 State Management

### React Query Setup
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
```

### Custom Hooks
- **useAuth**: Authentication state
- **useBarber**: Barber data management
- **useAppointment**: Appointment management

## 🔌 API Integration

### API Service Structure
```typescript
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## 🧪 Testing

### Unit Testing
```bash
pnpm run test
```

### Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## 🚀 Deployment

### Production Build
```bash
pnpm run build
```

### Preview Build
```bash
pnpm run preview
```

## 📚 Learning Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [React Router Documentation](https://reactrouter.com/) 