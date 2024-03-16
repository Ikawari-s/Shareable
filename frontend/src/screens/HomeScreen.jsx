import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { login } from "../actions/userActions";
import GuestHeader from "../components/GuestHeader";
import Footer from '../components/Footer'
import creator from '../designs/creator.png';
import Login from "../components/Login";
import Signup from "../components/Signup";


function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading } = useSelector((state) => state.userLogin);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(login(formData.email, formData.password));
      if (response && response.data) {
        navigate("/homepage");
      } else {
        console.error("Invalid login response:", response);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/homepage");
    }
  }, [navigate]);

  
    useEffect(() => {
      if (userInfo) {
        navigate("/homepage");
      }
    }, [userInfo, navigate]);

    return <>
    <div id="FindSharer">
      <GuestHeader />
      <img src={creator} alt="creator" style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${creator})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
      }}></img>

<Login />

<Signup />
      
      <Footer />
    </div>
  );
  </>
}

export default HomeScreen;