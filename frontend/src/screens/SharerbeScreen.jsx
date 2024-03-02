import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { Button, Form } from "react-bootstrap";
import Header from "../components/Header";
import { beSharer } from "../actions/sharerActions";

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
      dispatch(beSharer(pageName)); 
      const userInfo = JSON.parse(localStorage.getItem('userInfo')); 
      localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, is_sharer: true })); 
      alert("You are now a Sharer");
      navigate("/login");
    } catch (error) {
      console.error("Sharer register error", error);
    }
  };
  

  return (
    <div>
      <div className="container" style={{ marginTop: "3rem" }}>
        <div
          className="card custom-card-background text-white"
          style={{ backgroundColor: "black", width: "40rem", margin: "auto" }}
        >
          <div className="card-header">
            <h3 className="text-center">Let's Name your Page!</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Page Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Page Name"
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                />
              </Form.Group>
              <div className="text-center">
                <Button type="submit" variant="primary">
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
