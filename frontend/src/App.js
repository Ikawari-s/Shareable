import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Homepage from './screens/Homepage';
import HomeScreen from './screens/HomeScreen';
import './bootstrap.min.css';
import UserProfileScreen from './screens/UserProfileScreen';
import ProtectedRoute from './utils/ProtectedRoutes';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/userprofile" element={<ProtectedRoute><UserProfileScreen /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
