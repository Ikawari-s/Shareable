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
import SharerbeScreen from './screens/SharerbeScreen';
import ForgotpasswordScreen from './screens/ForgotpasswordScreen';
import NewpasswordScreen from './screens/NewpasswordScreen';
import SharerDetail from './screens/SharerDetail';
import AboutScreen from './screens/AboutScreen';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ForgotpasswordScreen />} />
          <Route path="/new-password" element= {<NewpasswordScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/about" element={<AboutScreen />} />

          <Route path="/sharers/:id" element={<SharerDetail />} />
          <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/be-sharer" element={<ProtectedRoute><SharerbeScreen /></ProtectedRoute>} />
          <Route path="/userprofile" element={<ProtectedRoute><UserProfileScreen /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactScreen /></ProtectedRoute>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;


//CONNECTING URL FOR BE-SHARER