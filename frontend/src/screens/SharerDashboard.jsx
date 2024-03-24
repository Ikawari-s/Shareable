import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../actions/sharerActions';
import { useNavigate } from 'react-router-dom';

function SharerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, dashboardData } = useSelector(state => state.dashboard);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && !userInfo.is_sharer) {
      navigate("/homepage");
    } else {
      dispatch(getDashboard());
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <h2>Sharer Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {dashboardData && (
        <div>
          <p>Total Earnings: ${dashboardData.twenty_percent_less_earning_send}</p>
          <p>Total Post Count: {dashboardData.total_post_count}</p>
          <p>Total Rating: {dashboardData.average_rating}/5</p>
          <p>Total Likes: {dashboardData.total_likes}</p>
          <p>Total Unlikes: {dashboardData.total_unlikes}</p>
          <p>Total Uploads: {dashboardData.total_uploads}</p>
        </div>
      )}
    </div>
  );
}

export default SharerDashboard;
