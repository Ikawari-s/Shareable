import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful signup
        console.log("Signup successful", data);
        // Redirect to the login page after successful signup
        navigate("/");
      })
      .catch((error) => {
        // Handle signup error
        console.error("Signup error", error);
        setError("Signup failed. Please check your information and try again.");
      });
  };
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h3 className="text-center">Sign Up</h3>
        </div>

        <div className="card-body">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="button" onClick={handleSignup}>
                Create!
              </Button>
            </div>
          </Form>
        </div>

        <div className="card-footer text-muted text-center">
          Already have an Account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
