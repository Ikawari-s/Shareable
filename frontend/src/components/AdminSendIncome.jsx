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
      <h1>{" "}</h1>

      <h3>Send Sharer Income</h3>
      <button 
        onClick={handleSendIncome} 
        style={{
          backgroundColor: '#2ecc71', 
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Send Income
      </button>
    </div>
  );
}

export default AdminSendIncome;
