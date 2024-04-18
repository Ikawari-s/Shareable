import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendIncomeToSharer } from '../actions/adminActions';

function AdminSendIncome({ sharerId }) {
  const dispatch = useDispatch();
  const [confirmSend, setConfirmSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendIncome = () => {
    setConfirmSend(true);
  };

  const handleConfirmSend = () => {
    setLoading(true);
    dispatch(sendIncomeToSharer(sharerId))
      .then((response) => {
        console.log("Income sent successfully.");
      })
      .catch((error) => {
        console.error("Failed to send income:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const handleCancelSend = () => {
    setConfirmSend(false);
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

      {confirmSend && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div>
              Are you sure you want to send income to this sharer?
              <button onClick={handleConfirmSend} disabled={loading}>{loading ? 'Sending...' : 'Yes'}</button>
              <button onClick={handleCancelSend} disabled={loading}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSendIncome;
