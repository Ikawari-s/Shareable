import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { login } from "../actions/userActions";
import { register } from "../actions/registerActions";
import GuestHeader from "../components/GuestHeader";
import Footer from "../components/Footer";
import "../designs/HomeScreen.css";
import logotext from "../designs/images/logotext.png";
import logo from "../designs/images/logo.png";
import art1 from "../designs/images/art1.jpg";
import art2 from "../designs/images/art2.jpg";
import art3 from "../designs/images/art3.png";
import creator1 from "../designs/images/creator1.png";
import creator2 from "../designs/images/creator2.jpg";
import food1 from "../designs/images/food1.jpg";
import food2 from "../designs/images/food2.png";
import food3 from "../designs/images/food3.png";
import food4 from "../designs/images/food4.png";
import photo1 from "../designs/images/photo1.jpg";
import photo2 from "../designs/images/photo2.png";
import photo3 from "../designs/images/photo3.png";
import photo4 from "../designs/images/photo4.png";
import photo5 from "../designs/images/photo5.png";

function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: loginLoading, error: loginError } = useSelector(
    (state) => state.userLogin
  );
  const { loading: registerLoading, error: registerError } = useSelector(
    (state) => state.userRegister
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    username: "",
    password: "",
    retypePassword: "",
  });
  const [error, setError] = useState("");

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await dispatch(login(loginFormData.email, loginFormData.password));
      setIsLoading(false);
      navigate("/homepage");
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
  
    if (registerFormData.password !== registerFormData.retypePassword) {
      setError("Password and retype password don't match");
      return;
    }
  
    if (registerFormData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
  
    if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(registerFormData.password)) {
      setError("Password must contain at least one letter, one number, and one special character");
      return;
    }
  
    if (registerFormData.username.length < 4) {
      setError("Username must be at least 4 characters long");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const data = await dispatch(
        register(
          registerFormData.email,
          registerFormData.password,
          registerFormData.username
        )
      );
  
      if (data.userId) {
        navigate(`/otp/${data.userId}/${data.otpId}`);
      } else {
        throw new Error("User ID not found in response");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      let errorMessage = "Registration failed. User might exist or username is already taken";

      if (error.response && error.response.data) {
   
        if (error.response.data.error === "Username already exists") {
          errorMessage = "User already exists";
        }
      }
  
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/homepage");
    }
  }, [navigate]);

  return (
    <div id="FindSharer">
      <GuestHeader />
      <div
        className="creator1"
        style={{
          backgroundImage: `url(${creator1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div id="tab">
          <h1>Where Creativity Finds its Audience.</h1>
        </div>
      </div>

      <div className="content1">
        <img src={art3} id="art3" />
        <img src={art2} id="art2" />
        <img src={art1} id="art1" />
        <div id="dab">
          <h1>Feeling Artistic?</h1>
          <p>
            Explore, Connect, Create - Your Canvas Awaits, plenty of artistic
            creators in Shareable!
          </p>
        </div>
      </div>

      <div className="content2">
        <img src={food1} id="food1" />
        <img src={food2} id="food2" />
        <img src={food3} id="food3" />
        <img src={food4} id="food4" />
        <div id="sab">
          <h1>Ready</h1>
          <h1>to Cook?</h1>
          <p>
            Your Kitchen Awaits, with a feast of talented chefs on Shareable!
          </p>
        </div>
      </div>

      <div className="content3">
        <img src={photo1} id="photo1" />
        <img src={photo2} id="photo2" />
        <img src={photo3} id="photo3" />
        <img src={photo4} id="photo4" />
        <img src={photo5} id="photo5" />
        <div id="dab">
          <h1>Interested in Photography?</h1>
          <p>Unleash Your Creativity Through the Lens with Shareable!</p>
        </div>
      </div>

      <div
        id="SignUpPage"
        style={{
          backgroundImage: `url(${creator2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div id="fab">
          <h1>Sign up today, Become part of Shareable!</h1>
        </div>
        <div className="container">
          <div className="card grabber">
            <div className="card-header logo">
              <img src={logo} alt="Logo" />
            </div>

            <div className="card-body">
              <Form onSubmit={handleRegisterSubmit}>
                <Form.Group className="mb-3">
                <Form.Label>Email (Associated with PayPal):</Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={registerFormData.email}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    value={registerFormData.username}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={registerFormData.password}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Retype Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Retype Password"
                    id="retypePassword"
                    name="retypePassword"
                    value={registerFormData.retypePassword}
                    onChange={handleRegisterChange}
                  />
                </Form.Group>

                <div className="d-grid gap-2 cum">
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Creating...
                      </>
                    ) : (
                      "Create!"
                    )}
                  </Button>
                </div>
              </Form>
              {error && (
                <Alert
                  variant="primary"
                  style={{
                    backgroundColor: "#52c7b8",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {error}
                </Alert>
              )}
            </div>
            <p className="text-center texto">Shareable Copyright ©</p>
          </div>
        </div>
      </div>
      <div id="LogInPage">
        <div id="gab">
          {" "}
          <img src={logotext} alt="Logo" />
        </div>
        <div className="container mt-5">
          <div className="card custom-card-background wrapper">
            <div className="card-header">
              <h1 className="text-center">Log in</h1>
            </div>

            <div className="card-body">
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={loginFormData.email}
                    onChange={handleLoginChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={loginFormData.password}
                    onChange={handleLoginChange}
                  />
                </Form.Group>

                <div className="d-grid gap-2 cum">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loginLoading}
                  >
                    {loginLoading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </Form>
            </div>

            <div className="card-footer text-">
              <Link id="da-link" to="/reset-password">
                Forgot Password?{" "}
              </Link>
              {loginError && (
                <Alert
                  variant="primary"
                >
                  {loginError}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
