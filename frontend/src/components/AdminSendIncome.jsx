import React from 'react';
import { useDispatch } from 'react-redux';
import { sendIncomeToSharer } from '../actions/adminActions';

function AdminSendIncome({ sharerId }) {
  const dispatch = useDispatch();

  const handleSendIncome = () => {
    dispatch(sendIncomeToSharer(sharerId));
    window.location.reload();
  };

  return (
    <div>
      <h2>Admin Send Income</h2>
      <p>Sharer ID: {sharerId}</p>
      <button onClick={handleSendIncome}>Send Income</button>
    </div>
  );
}

export default AdminSendIncome;
