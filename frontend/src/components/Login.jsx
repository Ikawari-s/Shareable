import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Add this line

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful login, e.g., store token, redirect, etc.
        console.log("Login successful", data);
        navigate("/homepage"); // Redirect to homepage
      })
      .catch((error) => {
        // Handle login error
        console.error("Login error", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card custom-card-background">
        <div className="card-header">
          <h3 className="text-center">Log in</h3>
        </div>

        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="card-footer text-muted text-center">
          Don't have an Account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
