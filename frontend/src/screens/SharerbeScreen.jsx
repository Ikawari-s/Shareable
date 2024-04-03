import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { Button, Form } from "react-bootstrap";
import Header from "../components/Header";
import { beSharer } from "../actions/sharerActions";
import '../designs/HomePage.css';

function SharerbeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.is_sharer) {
      navigate("/homepage");
    }
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!pageName.trim()) {
      alert("Page Name cannot be empty");
      return;
    }
  
    try {
      const response = await dispatch(beSharer(pageName));
      console.log("Response from backend:", response);
  
      if (response.data && response.data.message === 'User is now a sharer') {
        const updatedUserInfo = {
          ...JSON.parse(localStorage.getItem('userInfo')),
          is_sharer: true,
          sharer_id: response.data.sharer_id,
          name: pageName // Update the name here
        };
        
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        console.log("Updated userInfo:", updatedUserInfo);
        alert("You are now a Sharer");
        navigate("/sharer-page"); // Redirect to sharer-page
      } else {
        console.error("Unexpected message from backend:", response.data.message);
        alert("An unexpected error occurred while processing your request.");
      }
    } catch (error) {
      console.error("Sharer register error", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div>
      <div className="container brap">
        <div
          style={{ backgroundColor: "transparent", width: "35rem", margin: "auto", border: 'solid rgba(255,255,255,0.5) 1px', borderRadius: '.5rem', padding: '1rem' }}
        >
          <div style={{padding: '2rem'}}>
            <h1>Let's Name your Page!</h1>
            <p style={{paddingBottom: '2.5rem'}}>Crafting the perfect title sets the tone for your page's identity and purpose. Find the ideal name to make your page stand out!</p>
            <label style={{paddingBottom: '0.3rem'}}>Page Name</label>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3"controlId="formBasicEmail">
                <input
                  type="text"
                  placeholder="Page Name"
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                  id="page-name"
                />
              </Form.Group>
              <div className="text-center">
                <Button id='paw' type="submit" variant="primary">
                  Be A Sharer!  
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharerbeScreen;
