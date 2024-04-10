import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAdminContact } from '../actions/adminActions';

function AdminContactDelete(props) {
  const { contactId } = props; // Destructure the props to get the contactId
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    dispatch(deleteAdminContact(contactId));
    setShowConfirmation(false);

    window.location.reload();
  };

  return (
    <div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Contact
      </button>
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div>
              Are you sure you want to delete this contact?
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={() => setShowConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminContactDelete;
