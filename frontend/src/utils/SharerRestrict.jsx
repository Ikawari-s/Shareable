import React from 'react';
import { Navigate } from 'react-router-dom';
import SharerHeader from '../components/SharerHeader'; 
import Header from '../components/Header'; 

const SharerRestrict = ({ children }) => {

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo || !userInfo.is_active || userInfo.is_sharer) { // Check if user is not logged in, not active, or is a sharer
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default SharerRestrict;
