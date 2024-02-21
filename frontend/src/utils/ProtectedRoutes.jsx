import React from 'react';
import { Navigate } from 'react-router-dom';
import SharerHeader from '../components/SharerHeader'; 
import Header from '../components/Header'; 

const ProtectedRoute = ({ children }) => {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) {
    return <Navigate to="/" />;
  }

  const role = userInfo.is_sharer ? 'sharer' : 'regular';

  const renderHeader = role === 'sharer' ? <SharerHeader /> : <Header />;

  return (
    <>
      {renderHeader}
      {children}
    </>
  );
};

export default ProtectedRoute;
