import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard, getTotalFollowers } from '../actions/sharerActions';
import { useNavigate } from 'react-router-dom';
import SharerFeedBack from '../components/SharerFeedBack';

function SharerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, dashboardData } = useSelector(state => state.dashboard);
  const { totalFollowers } = useSelector(state => state.totalFollower);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && !userInfo.is_sharer) {
      navigate("/homepage");
    } else {
      dispatch(getDashboard());
      dispatch(getTotalFollowers());
    }
  }, [dispatch, navigate]);

  return (
    <div className="container waw">
      <h2>Sharer Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {dashboardData && (
        <div>
          <p>Total Earnings: ${dashboardData.twenty_percent_less_earning_send}</p>
          <p>Total Post Count: {dashboardData.total_post_count}</p>
          <p>Total Rating: {dashboardData.average_rating || 0}/5</p>
          <p>Total Likes: {dashboardData.total_likes}</p>
          <p>Total Unlikes: {dashboardData.total_unlikes}</p>
          <p>Total Uploads: {dashboardData.total_uploads}</p>
          <p>Total Followers: {totalFollowers && totalFollowers.total_followers}</p>
        </div>
      )}
      
      <SharerFeedBack/>
    </div>
  );
}

export default SharerDashboard;
