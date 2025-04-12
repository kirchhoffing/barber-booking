// /backend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BarberDetail from './pages/BarberDetail';
import BarberPanel from './pages/BarberPanel';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/barber/:id" element={<BarberDetail />} />
        <Route path="/barber-panel" element={<BarberPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
