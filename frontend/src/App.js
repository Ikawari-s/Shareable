import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Homepage from './screens/Homepage';  
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import './bootstrap.min.css';
import UserProfileScreen from './screens/UserProfileScreen';
import UserProfileAccount from './screens/UserProfileAccount';
import ProtectedRoute from './utils/ProtectedRoutes';
import SharerbeScreen from './screens/SharerbeScreen';
import ForgotpasswordScreen from './screens/ForgotpasswordScreen';
import NewpasswordScreen from './screens/NewpasswordScreen';
import SharerDetail from './screens/SharerDetail';
import AboutScreen from './screens/AboutScreen';
import InvalidScreen from './screens/InvalidScreen';
import VerifyotpScreen from './screens/VerifyotpScreen';
import SharerPageScreen from './screens/SharerPageScreen';
import SharerDashboard from './screens/SharerDashboard';
import ChangePassword from './screens/ChangePassword';



function App() {



  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/reset-password" element={<ForgotpasswordScreen />} />
          <Route path="/new-password" element= {<NewpasswordScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/invalid" element={<InvalidScreen/>}/> 
          <Route path="/otp/:userId/:otpId" element={<VerifyotpScreen />} />
          <Route path="/contact" element={<ContactScreen />}/>

          {/* USER LEVEL ALL PROTECTED  */}

 
          <Route path="/homepage/sharers/:id" element={<ProtectedRoute><SharerDetail /></ProtectedRoute>} />

          <Route path="/dashboard" element={<ProtectedRoute ><SharerDashboard /></ProtectedRoute>} /> 
          <Route path="/homepage" element={<ProtectedRoute ><Homepage /></ProtectedRoute>} />
          <Route path="/AccountSettings" element={<ProtectedRoute ><ChangePassword /></ProtectedRoute>} />


          <Route path="/sharer-page" element={<ProtectedRoute><SharerPageScreen/></ProtectedRoute>} />
          <Route path="/be-sharer" element={<ProtectedRoute><SharerbeScreen /></ProtectedRoute>} />
          <Route path="/userprofile" element={<ProtectedRoute><UserProfileScreen /></ProtectedRoute>} />
          <Route path="/userprofileaccount" element={<ProtectedRoute><UserProfileAccount /></ProtectedRoute>} />  
          <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
          
          

          {/* USER LEVEL ALL PROTECTED  */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

