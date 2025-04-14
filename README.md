# Barber Booking System

A modern barber appointment system. A web application where customers can book appointments with barbers, barbers can manage their working hours and services, and administrators can control the system.

## Project Architecture

### Technology Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT

### System Components
1. **Frontend Application**
   - Customer Panel
   - Barber Panel
   - Admin Panel
   - Responsive Design

2. **Backend API**
   - RESTful API
   - JWT Authentication
   - Role-based Authorization
   - Prisma ORM

3. **Database**
   - PostgreSQL
   - Prisma Migration
   - Relational Data Model

## Completed Features

### Customer Features
- [x] Account creation and login
- [x] Barber list viewing
- [x] Appointment creation and management
- [x] Appointment history

### Barber Features
- [x] Profile management
- [x] Working hours setup
- [x] Service management
- [x] Appointment tracking

### Admin Features
- [x] User management
- [x] Barber approval/rejection
- [x] System statistics

## Installation

### Requirements
- Node.js (v18 or higher)
- PostgreSQL
- pnpm or npm

### Steps
1. Clone the project:
```bash
git clone https://github.com/kirchhoffing/barber-booking.git
cd barber-booking
```

2. Install dependencies:
```bash
pnpm install
```

3. Backend setup:
```bash
cd backend
cp .env.example .env
pnpm install
npx prisma migrate dev
pnpm run dev
```

4. Frontend setup:
```bash
cd frontend
cp .env.example .env
pnpm install
pnpm run dev
```

## Development Status
- [x] Basic system architecture
- [x] Authentication system
- [x] Barber management
- [x] Appointment system
- [ ] Test coverage
- [ ] CI/CD pipeline
- [ ] Docker support
- [ ] API documentation

## Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
MIT

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
