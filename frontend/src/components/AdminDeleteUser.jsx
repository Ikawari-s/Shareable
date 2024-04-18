import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserAdmin } from '../actions/adminActions';

function AdminDeleteUser({ userId }) {
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUserAdmin(userId));
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s ease',
        }}
      >
        Delete User
      </button>
      {confirmDelete && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div>
              Are you sure you want to delete this user?
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDeleteUser;
