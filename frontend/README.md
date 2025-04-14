# Barber Booking Frontend

## Project Architecture

### Technologies
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Query

### Directory Structure
```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── auth/       # Authentication components
│   │   ├── barber/     # Barber-related components
│   │   └── common/     # Common components
│   ├── pages/          # Page components
│   ├── services/       # API requests
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript types
│   ├── utils/          # Helper functions
│   └── App.tsx         # Main application component
├── public/             # Static files
└── package.json        # Dependencies
```

## Completed Features

### Authentication
- [x] Login page
- [x] Registration page
- [x] JWT token management
- [x] User authorization

### Barber Panel
- [x] Barber profile management
- [x] Working hours setup
- [x] Service management
- [x] Appointment viewing and management

### Customer Panel
- [x] Barber list viewing
- [x] Appointment creation
- [x] Appointment history
- [x] Profile management

### Admin Panel
- [x] User management
- [x] Barber approval/rejection
- [x] System statistics

### UI/UX
- [x] Responsive design
- [x] Form validations
- [x] Error handling
- [x] Loading states
- [x] Toast notifications

## Development Status
- [x] Basic page structure
- [x] Authentication system
- [x] Barber panel
- [x] Customer panel
- [x] Admin panel
- [ ] Performance optimizations
- [ ] Test coverage
- [ ] PWA support
- [ ] Multi-language support

## Installation
1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Features

- User registration and login
- Appointment creation and management
- Appointment history viewing
- Responsive design
- Modern and user-friendly interface

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── services/      # API services
├── types/         # TypeScript types
├── utils/         # Helper functions
└── App.tsx        # Main application component
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build project
- `npm run preview` - Preview built project

## Styling

Tailwind CSS is used to create a responsive and modern design. Theme colors and other style variables are defined in `tailwind.config.js`.

## API Integration

Axios and React Query are used for communication with the backend API. API requests are organized in the `services` directory.

## Security

- JWT token management
- Protected routes
- Form validation
- XSS protection 