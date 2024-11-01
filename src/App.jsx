// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HabitForm from './pages/HabitForm';
import ProgressRewards from './pages/Progress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./App.css"

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/habit" element={<HabitForm />} />
          <Route path="/progress" element={<ProgressRewards />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
