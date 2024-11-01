// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HabitForm from './pages/HabitForm';
import ProgressRewards from './pages/Progress';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import MainLayout from './components/Layout/MainLayout';

const App = () => {
  return (
    <Router>
     
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/habit" element={<HabitForm />} />
          <Route path="/progress-rewards" element={<ProgressRewards />} />

        </Routes>
   
    </Router>
  );
};

export default App;
