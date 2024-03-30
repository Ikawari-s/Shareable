import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopDonor } from '../actions/sharerActions'; 
import { Spinner } from 'react-bootstrap'; 

function TopDonor({ sharerId }) {
  const dispatch = useDispatch();
  const { loading, error, topDonorData } = useSelector(state => state.topDonor); 

  useEffect(() => {
    console.log("Current sharerId in TopDonor component:", sharerId); 
    dispatch(getTopDonor(sharerId));
  }, [dispatch, sharerId]); 

  return (
    <div className="top-donor-container text-center">
      <h1 className="top-donor-title">Top Donors</h1>
      {loading && <Spinner animation="border" role="status" />}
      {error && <p>No Donors yet.</p>}
      {topDonorData && topDonorData.length > 0 && (
        <div className="row justify-content-center">
          {topDonorData.slice(0, 3).map((donor, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="rounded-circle overflow-hidden bg-secondary mx-auto mb-3" style={{ width: '150px', height: '150px' }}>
                <img src={donor.profile_picture} alt="Profile Picture" className="w-100 h-auto" />
              </div>
              <p className="username">{donor.username}</p>
              <p className="total-amount">Total Amount: ${donor.total_amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopDonor;
