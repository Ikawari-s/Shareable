import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Homepage from './screens/Homepage';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import './bootstrap.min.css';
import UserProfileScreen from './screens/UserProfileScreen';
import ProtectedRoute from './utils/ProtectedRoutes';
import FeaturesScreen from './screens/FeaturesScreen';
import SharerDetail from './screens/SharerDetail';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />}/>

          <Route path="/sharers/:id" element={<SharerDetail />} />

          <Route path="/userprofile" element={<ProtectedRoute><UserProfileScreen /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactScreen /></ProtectedRoute>} />
          <Route path="/features" element={<ProtectedRoute><FeaturesScreen /></ProtectedRoute>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
