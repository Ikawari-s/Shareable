import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../actions/registerActions";
import { useDispatch, useSelector } from "react-redux";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    retypePassword: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (userLogin.userInfo) {
      navigate("/");
    }
  }, [userLogin.userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (formData.password !== formData.retypePassword) {
      setError("Password and retype password don't match");
      return;
    }

    dispatch(register(formData.email, formData.password, formData.username))
      .then(() => {
        dispatch({ type: 'USER_LOGOUT' });
        localStorage.removeItem("userInfo");
        navigate("/");
      })
      .catch((error) => {
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

            <Form.Group className="mb-3">
              <Form.Label>Retype Password:</Form.Label>
              <Form.Control
                type="password"
                id="retypePassword"
                name="retypePassword"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="button" onClick={handleSignup}>
                Create!
              </Button>
            </div>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>

        <div className="card-footer text-muted text-center">
          Already have an Account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
