import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading } = useSelector((state) => state.userLogin);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await dispatch(login(formData.email, formData.password));
      if (response && response.data) {
        console.log("User Info after Login:", response.data);
        navigate("/homepage");
      } else {
        console.error("Invalid login response:", response);
      }
    } catch (error) { 
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    console.log("User Info:", userInfo);
    if (userInfo) {
      navigate("/homepage");
    }
  }, [userInfo, navigate]);

  return (
    <div className="container mt-5">
      <div className="card custom-card-background">
        <div className="card-header">
          <h3 className="text-center">Log in</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
                type="submit" // Change button type to "submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
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
