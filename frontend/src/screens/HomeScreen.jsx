import { React,useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import GuestHeader from "../components/GuestHeader";
import Footer from '../components/Footer'
import creator from '../designs/creator.png';


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
      <img src={creator} alt="creator" style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${creator})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
      }}></img>
      <h1>WSG MOTHERFUCKER1</h1>
      <h1>WSG MOTHERFUCKER2</h1>
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

      <Footer />
    </div>
  );
}

export default HomeScreen;