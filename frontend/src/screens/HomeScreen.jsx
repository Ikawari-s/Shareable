import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { login } from "../actions/userActions";
import GuestHeader from "../components/GuestHeader";
import Footer from '../components/Footer'
import creator from '../designs/creator.png';
import '../designs/HomeScreen.css';


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

  return (
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



      <div id="LogInPage" className="container mt-5">
      <div className="card custom-card-background wrapper">
        <div className="card-header">
          <h1 className="text-center">Log in</h1>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                placeholder="Email"
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
                placeholder="Password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className="d-grid gap-2 cum">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>

        <div className="card-footer text-">
          Don't have an Account? <Link to="/signup">Sign Up</Link>
          <Link to="/reset-password">Forgot Password? </Link>
        </div>
      </div>
    </div>

















      <div id="SignUpPage" className="container mt-5">
      <div className="card grabber">
        <div className="card-header">
          <h1 className="text-center">Sign Up</h1>
        </div>

        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Retype Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Retype Password"
                id="retypePassword"
                name="retypePassword"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid gap-2 cum">
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Creating...
                  </>
                ) : (
                  'Create!'
                )}
              </Button>
            </div>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>

        <div className="card-footer text-muted text-center">
          Already have an Account? <Link to="/">Login</Link>
        </div>
      </div>
      <br></br>
      <br></br>
      
    </div>  
      <Footer />
    </div>
  );
}

export default HomeScreen;