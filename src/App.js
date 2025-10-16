import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
=======
import LoginForm from './components/LoginForm';
import './App.css'; // ← Solo si usas App.css para Tailwind

function App() {
  return <LoginForm />;
>>>>>>> 47f7aacd65cb5c6b68bb21c79ed31f844699271d
}

export default App;