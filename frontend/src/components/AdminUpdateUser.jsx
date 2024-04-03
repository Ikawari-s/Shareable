import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserAdmin } from '../actions/adminActions';
import { Form, Button, Alert } from 'react-bootstrap';

function AdminUpdateUser({ userId }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    is_active: false,
    is_sharer: false,
    is_staff: false,
    is_superuser: false, // Add is_superuser field
    profile_picture: null
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleProfilePictureChange = (e) => {
    setFormData({
      ...formData,
      profile_picture: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User ID:", userId); // Log userId
    console.log("FormData:", formData); // Log formData
    const response = await dispatch(updateUserAdmin(userId, formData));

    if (response && response.status === 200) {
      window.location.reload();
    } else {
      setError("Failed to update user. Please try again.");
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleChange}  />
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
        <Form.Group controlId="formProfilePicture">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleProfilePictureChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update User
        </Button>
      </Form>
    </div>
  );
}

export default AdminUpdateUser;
