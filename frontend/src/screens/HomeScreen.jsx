import { React,useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import GuestHeader from "../components/GuestHeader";


function HomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/homepage");
    }
  }, [navigate]);
  return (
    <div>
      <GuestHeader />
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
      <h1>WSG MOTHERFUCKER</h1>
    </div>
  );
}

export default HomeScreen;

