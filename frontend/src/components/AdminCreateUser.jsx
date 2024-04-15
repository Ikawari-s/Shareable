import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAdmin } from '../actions/adminActions';
import { Alert, Form, Button, Spinner } from "react-bootstrap";

function AdminCreateUser() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    is_active: false,
    is_sharer: false,
    is_staff: false,
    is_superuser: false
  });
  const [error, setError] = useState('');
  const { loading, createUserError } = useSelector(state => state.createUserAdmin);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      setError("Passwords do not match");
    } else {
      const response = await dispatch(createUserAdmin(formData));
      if (response) {
        window.location.reload();
      } else {
        setError("Check username(+4), password(+8, !@,123), email");
      }
    }
  };
  
  return (
    <div>
      <h2>Create New User</h2>
          {createUserError && (
          <Alert variant="danger" onClose={() => setError('')} dismissible style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', marginBottom: '0.5rem' }}>
            {createUserError}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', marginBottom: '0.5rem' }}>
            {error}
          </Alert>
        )}
      <Form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formPassword1">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password1" value={formData.password1} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formPassword2">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" name="password2" value={formData.password2} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formIsActive">
          <Form.Check type="checkbox" label="Is Active" name="is_active" checked={formData.is_active} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formIsStaff">
          <Form.Check type="checkbox" label="Is Staff" name="is_staff" checked={formData.is_staff} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formIsSharer">
          <Form.Check type="checkbox" label="Is Sharer" name="is_sharer" checked={formData.is_sharer} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formIsSuperuser">
          <Form.Check type="checkbox" label="Is Superuser" name="is_superuser" checked={formData.is_superuser} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
  {loading ? (
    <>
      <span className="sr-only"></span>
      <Spinner animation="border" role="status" className="ml-2" />
    </>
  ) : (
    "Create User"
  )}
</Button>

      </Form>
    </div>
  );
}

export default AdminCreateUser;
