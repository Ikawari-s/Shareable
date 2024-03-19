import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../actions/registerActions';
import { useDispatch } from 'react-redux';
import GuestHeader from "../components/GuestHeader";
import logotext from '../designs/images/logotext.png';
import logo from '../designs/images/logo.png';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    retypePassword: '',
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.retypePassword) {
      setError('Password and retype password don\'t match');
      return;
    }

    setIsLoading(true);

    try {
      const data = await dispatch(register(formData.email, formData.password, formData.username));

      if (data.userId) {
        navigate(`/otp/${data.userId}/${data.otpId}`);
      } else {
        throw new Error('User ID not found in response');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please check your information and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="container mt-5">
    //   <GuestHeader />
    //   <div className="card">
    //     <div className="card-header">
    //       <h3 className="text-center">Sign Up</h3>
    //     </div>

    //     <div className="card-body">
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group className="mb-3">
    //           <Form.Label>Email:</Form.Label>
    //           <Form.Control
    //             type="email"
    //             id="email"
    //             name="email"
    //             onChange={handleChange}
    //           />
    //         </Form.Group>

    //         <Form.Group className="mb-3">
    //           <Form.Label>Username:</Form.Label>
    //           <Form.Control
    //             type="text"
    //             id="username"
    //             name="username"
    //             onChange={handleChange}
    //           />
    //         </Form.Group>

    //         <Form.Group className="mb-3">
    //           <Form.Label>Password:</Form.Label>
    //           <Form.Control
    //             type="password"
    //             id="password"
    //             name="password"
    //             onChange={handleChange}
    //           />
    //         </Form.Group>

    //         <Form.Group className="mb-3">
    //           <Form.Label>Retype Password:</Form.Label>
    //           <Form.Control
    //             type="password"
    //             id="retypePassword"
    //             name="retypePassword"
    //             onChange={handleChange}
    //           />
    //         </Form.Group>

    //         <div className="d-grid gap-2">
    //           <Button variant="primary" type="submit" disabled={isLoading}>
    //             {isLoading ? (
    //               <>
    //                 <Spinner animation="border" size="sm" /> Creating...
    //               </>
    //             ) : (
    //               'Create!'
    //             )}
    //           </Button>
    //         </div>
    //       </Form>
    //       {error && <Alert variant="danger">{error}</Alert>}
    //     </div>

    //     <div className="card-footer text-muted text-center">
    //       Already have an Account? <Link to="/">Login</Link>
    //     </div>
    //   </div>
    //   <br></br>
    //   <br></br>
      
    // </div>

    <div id="LogInPage">
      <br /><br />
    <div id="gab"> <img src={logotext} alt="Logo" /></div>
    <div className="container">
      <div className="card wrapper">
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
      <div className="card-footer text-"> 
      <Link id="da-link" style={{ width: '10rem', left: '12rem' }} to="/login" >Already have an Account?</Link>
        </div> 
      </div>
    </div>
  </div>  
  );
}

export default Signup;
