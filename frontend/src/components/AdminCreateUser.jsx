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
    is_superuser: false // Add is_superuser field
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
        // Handle error condition here
        setError("Failed to create user");
      }
    }
  };
  
  return (
    <div>
      <h2>Create New User</h2>
      {createUserError && <Alert variant="danger" onClose={() => setError('')} dismissible>{createUserError}</Alert>}
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Password:</label>
          <input type="password" name="password1" value={formData.password1} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Confirm Password:</label>
          <input type="password" name="password2" value={formData.password2} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Is Active:</label>
          <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Is Staff:</label>
          <input type="checkbox" name="is_staff" checked={formData.is_staff} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Is Sharer:</label>
          <input type="checkbox" name="is_sharer" checked={formData.is_sharer} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Is Superuser:</label>
          <input type="checkbox" name="is_superuser" checked={formData.is_superuser} onChange={handleChange} />
        </div>
        <Button type="submit" disabled={loading}>Create User</Button>
        {loading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}
      </form>
    </div>
  );
}

export default AdminCreateUser;
