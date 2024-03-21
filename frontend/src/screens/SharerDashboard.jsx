import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../actions/sharerActions';

function SharerDashboard() {
  const dispatch = useDispatch();
  const { loading, error, dashboardData } = useSelector(state => state.dashboard);

  useEffect(() => {
    console.log('Dispatching getDashboard action...');
    dispatch(getDashboard());
  }, [dispatch]);

  console.log('Dashboard data in component:', dashboardData); // Log the dashboard data in the component

  return (
    <div>
      <h2>Sharer Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {dashboardData && (
        <div>
          <p>Total Earnings: ${dashboardData.twenty_percent_less_earning_send}</p>
          <p>Total Post Count: {dashboardData.total_post_count}</p>
          <p>Averag Rating: {dashboardData.average_rating}</p>
          <p>Total Likes: {dashboardData.total_likes}</p>
          <p>Total Unlikes: {dashboardData.total_unlikes}</p>
          <p>Total Uploads: {dashboardData.total_uploads}</p>

        </div>
      )}
    </div>
  );
}

export default SharerDashboard;
