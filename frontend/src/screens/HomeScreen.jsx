import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { login } from "../actions/userActions";
import GuestHeader from "../components/GuestHeader";
import Footer from '../components/Footer'
import '../designs/HomeScreen.css';
import logotext from '../designs/images/logotext.png';
import logo from '../designs/images/logo.png';
import art1 from '../designs/images/art1.jpg';
import art2 from '../designs/images/art2.jpg';
import art3 from '../designs/images/art3.png';
import creator1 from '../designs/images/creator1.png';
import creator2 from '../designs/images/creator2.jpg';
import food1 from '../designs/images/food1.jpg';
import food2 from '../designs/images/food2.png';
import food3 from '../designs/images/food3.png';
import food4 from '../designs/images/food4.png';
import photo1 from '../designs/images/photo1.jpg';
import photo2 from '../designs/images/photo2.png';
import photo3 from '../designs/images/photo3.png';
import photo4 from '../designs/images/photo4.png';
import photo5 from '../designs/images/photo5.png';


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
      <div className="creator1" style={{
      backgroundImage: `url(${creator1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
      }}>
          <div id="tab">
            <h1>Where Creativity Finds its Audience.</h1>
          </div>
    </div>

    <div className="content1">
      <img src={art3} id="art3"/>
      <img src={art2} id="art2"/>
      <img src={art1} id="art1"/>
          <div id="dab">
            <h1>Feeling Artistic?</h1>
            <p>Explore, Connect, Create - Your Canvas Awaits, plenty of artistic creators in Shareable!</p>
          </div>
    </div>
    
    <div className="content2">
      <img src={food1} id="food1"/>
      <img src={food2} id="food2"/>
      <img src={food3} id="food3"/>
      <img src={food4} id="food4"/>
          <div id="sab">
            <h1>Ready</h1>
            <h1>to Cook?</h1>
            <p>Your Kitchen Awaits, with a feast of talented chefs on Shareable!</p>
          </div>
    </div>
    
    <div className="content3">
      <img src={photo1} id="photo1"/>
      <img src={photo2} id="photo2"/>
      <img src={photo3} id="photo3"/>
      <img src={photo4} id="photo4"/>
      <img src={photo5} id="photo5"/>
          <div id="dab">
            <h1>Interested in Photography?</h1>
            <p>Unleash Your Creativity Through the Lens with Shareable!</p>
          </div>
    </div>
    
    <div id="SignUpPage" style={{
      backgroundImage: `url(${creator2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
      }}> 
      <div id="fab">
      <h1>Sign up today, Become part of Shareable!</h1>
      </div>
    <div className="container">
      <div className="card grabber">
        <div className="card-header logo">
          <img src={logo} alt="Logo" />
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
        <p className="text-center texto">Shareable Copyright ©</p>
      </div>
    </div>
    
  </div>
  <div id="LogInPage">
      <div id="gab"> <img src={logotext} alt="Logo" /></div>
    <div className="container mt-5">
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
          {/* Don't have an Account? <Link to="/signup">Sign Up</Link> */}
          <Link id="da-link" to="/reset-password">Forgot Password? </Link>
        </div>
      </div>
    </div>
  </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;