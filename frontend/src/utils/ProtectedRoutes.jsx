import React from 'react';
import { Navigate } from 'react-router-dom';
import SharerHeader from '../components/SharerHeader';
import Header from '../components/Header';
import AdminHeader from '../components/AdminHeader'; // Import AdminHeader component

const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) {
    return <Navigate to="/" />;
  }

  const role = userInfo.is_sharer ? 'sharer' : 'regular';

  // Check if the user is an admin
  const isAdmin = userInfo.user_info.is_admin;

  // Render the appropriate header based on the user's role
  let renderHeader;
  if (isAdmin) {
    renderHeader = <AdminHeader />;
  } else if (role === 'sharer') {
    renderHeader = <SharerHeader />;
  } else {
    renderHeader = <Header />;
  }

  return (
    <>
      {renderHeader}
      {children}
    </>
  );
};

export default ProtectedRoute;
