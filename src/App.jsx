// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HabitForm from './pages/HabitPage';
import MainLayout from './components/Layout/MainLayout';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Home from './pages/Home';
import ProgressPage from './pages/ProgressPage';

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ProtectedRoute><MainLayout><Home /></MainLayout></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/habit" element={<ProtectedRoute><HabitForm /></ProtectedRoute>} />
        <Route path="/habit/:habitId" element={<ProtectedRoute><HabitForm /></ProtectedRoute>} />
        <Route path="/progress/:habitId" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
     
      </Routes>

    </Router>
  );
};

export default App;
