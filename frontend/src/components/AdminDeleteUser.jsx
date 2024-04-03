import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserAdmin } from '../actions/adminActions';

function AdminDeleteUser({ userId }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUserAdmin(userId));
    window.location.reload();

  };

  return (
    <div>
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
}

export default AdminDeleteUser;
