import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { DetailSharers, getSharerPostCount } from '../actions/sharerActions';
import SharerLatestPost from './SharerLatestPost';
import { followSharer, unfollowSharer } from '../actions/followActions';
import { FetchSharerRatingsComponent, PostSharerRatingsComponent } from '../components/Rating';
import PostCount from '../components/PostCount';
import PreviewContent from '../components/PreviewContent';

const SharerDetail = ({ sharer, loading, error, DetailSharers, followSharer, unfollowSharer, getSharerPostCount }) => {
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [isFollowing, setIsFollowing] = useState(false);
  const [userHasRated, setUserHasRated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.sharer_id && Number(userInfo.sharer_id) === Number(id)) {
      navigate('/sharer-page');
    }
  }, [userInfo, id, navigate]);
  
  useEffect(() => {
    DetailSharers(id);
    getSharerPostCount(id); 
    const followedSharers = JSON.parse(localStorage.getItem('followedSharers')) || [];
    setIsFollowing(followedSharers.includes(id));
  }, [id, DetailSharers, getSharerPostCount]);
  
  useEffect(() => {
    const idInt = parseInt(id);
    const followedSharers = userInfo?.followed_sharers || [];
    setIsFollowing(followedSharers.includes(idInt));
  }, [id, userInfo]);
  
  const handleFollowToggle = () => {
    const updatedUserInfo = userInfo ? { ...userInfo } : {};
    updatedUserInfo.followed_sharers = updatedUserInfo.followed_sharers || [];
    const idInt = parseInt(id);
    const updatedFollowedSharers = updatedUserInfo.followed_sharers.includes(idInt)
      ? updatedUserInfo.followed_sharers.filter(sharerId => sharerId !== idInt)
      : [...updatedUserInfo.followed_sharers, idInt]; 
    setIsFollowing(!isFollowing); 
    if (updatedUserInfo.followed_sharers.includes(idInt)) {
      updatedUserInfo.followed_sharers = updatedFollowedSharers;
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      unfollowSharer(id);
    } else {
      updatedUserInfo.followed_sharers = updatedFollowedSharers;
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      followSharer(id);
    }
  };
  
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : sharer ? (
        <div className="text-center py-3" style={{ textAlign: 'center' }}>
          {sharer.cover_photo && <img src={sharer.cover_photo} alt="Cover-Photo" style={{ position: 'relative', width: '100%', height: '50vh' }} />}
          {sharer.image && (
            <img
              src={sharer.image}
              alt="Profile"
              style={{
                width: '10rem',
                height: '10rem',
                borderRadius: '50%',
                padding: '0.2rem',
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
              }}
            />
          )}
          <h2>{sharer.name}</h2>
          <p>{sharer.description}</p>
          <p>Category: {sharer.category}</p>
          <PostCount sharerId={id} />
          <Button onClick={handleFollowToggle}>{isFollowing ? 'Unfollow Sharer' : 'Follow Sharer'}</Button>
          
          <div>
            {isFollowing ? (
              <SharerLatestPost id={id} />
            ) : (
              <div>
                <h6>FOLLOW NOW!</h6>
                <h3>Preview Content</h3>
                <PreviewContent sharerId={id} />
                
              </div>
            )}
          </div>

          <Link to={'/homepage'}>
            <Button variant="primary">Go Back</Button>
          </Link>

          <div className="scroll-box overflow-auto">
            <div className="fetch-ratings-box">
              <FetchSharerRatingsComponent sharerId={id} />
            </div>
            {isFollowing && !userHasRated && <PostSharerRatingsComponent sharerId={id} />}
          </div>
          
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sharer: state.SharerDetail.sharer,
  loading: state.SharerDetail.loading,
  error: state.SharerDetail.error,
});

const mapDispatchToProps = {
  DetailSharers,
  followSharer,
  unfollowSharer,
  getSharerPostCount, // Add the action to mapDispatchToProps
};

export default connect(mapStateToProps, mapDispatchToProps)(SharerDetail);
