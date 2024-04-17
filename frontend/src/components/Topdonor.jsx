import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopDonor } from '../actions/sharerActions';
import { Spinner } from 'react-bootstrap';
import gold from '../designs/images/gold.png';
import silver from '../designs/images/silver.png';
import bronze from '../designs/images/bronze.png';

function TopDonor({ sharerId }) {
  const dispatch = useDispatch();
  const { loading, error, topDonorData } = useSelector(state => state.topDonor);

  useEffect(() => {
    console.log("Current sharerId in TopDonor component:", sharerId);
    dispatch(getTopDonor(sharerId));
  }, [dispatch, sharerId]);

  const renderBadge = (index) => {
    if (index === 0) {
      return <img src={gold} alt="Gold Badge" className="badge-image" />;
    } else if (index === 1) {
      return <img src={silver} alt="Silver Badge" className="badge-image" />;
    } else if (index === 2) {
      return <img src={bronze} alt="Bronze Badge" className="badge-image" />;
    } else {
      return null; // No badge for other positions
    }
  };

  return (
    <div className="top-donor-container text-center">
  <h1 className="top-donor-title">Top Donors</h1>
  {loading && <Spinner animation="border" role="status" />}
  {error && <p>No Donors yet.</p>}
  {topDonorData && topDonorData.length > 0 ? (
    <div className="d-flex flex-wrap justify-content-center">
      {topDonorData.slice(0, 3).map((donor, index) => (
        <div key={index} className="text-center mx-3 mb-3">
          <div className="rounded-circle overflow-hidden bg-secondary mx-auto mb-2" style={{ width: '10rem', height: '10rem' }}>
            <img src={donor.profile_picture} alt="Profile Picture" className="w-100 h-auto" />
          </div>
          <div style={{marginLeft:'-1.2rem'}}>
          <div style={{ width: '4rem', height: '4rem', display: 'inline-block' }}>
            {renderBadge(index)} {/* Render the badge based on the index */}
          </div>
          <strong className="username">{donor.username}</strong>
          </div>
          <p className="">Amount: ${donor.total_amount}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>No donors yet.</p>
  )}
</div>

  );
}

export default TopDonor;
