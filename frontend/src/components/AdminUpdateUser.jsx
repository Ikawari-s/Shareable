import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserAdmin } from '../actions/adminActions';
import { Form, Button, Alert } from 'react-bootstrap';

function AdminUpdateUser({ userId, isActive, isStaff, isSharer, isSuperuser }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    is_active: isActive,
    is_sharer: isSharer,
    is_staff: isStaff,
    is_superuser: isSuperuser,
    profile_picture: null
  });
  const [error, setError] = useState('');
  const [confirmUpdate, setConfirmUpdate] = useState(false);

  useEffect(() => {
    setFormData({
      username: '',
      is_active: isActive,
      is_sharer: isSharer,
      is_staff: isStaff,
      is_superuser: isSuperuser,
      profile_picture: null
    });
  }, [userId, isActive, isStaff, isSharer, isSuperuser]);

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
    setConfirmUpdate(true); // Show confirmation modal
  };

  const confirmUpdateAction = async () => {
    const response = await dispatch(updateUserAdmin(userId, formData));

    if (response && response.status === 200) {
    } else {
      setError("Failed to update user. Please try again.");
    }
  };

  const cancelUpdate = () => {
    setConfirmUpdate(false); // Hide confirmation modal
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
        <p>{" "}</p>
        <Button variant="primary" type="submit">
          Update User
        </Button>
      </Form>

      {/* Confirmation modal */}
      {confirmUpdate && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div>
              Are you sure you want to update this user?
              <button onClick={confirmUpdateAction}>Yes</button>
              <button onClick={cancelUpdate}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUpdateUser;
