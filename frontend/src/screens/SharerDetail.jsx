import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import SharerLatestPost from './SharerLatestPost';
import { DetailSharers } from '../actions/sharerActions';
import { followSharer } from '../actions/followActions';

const SharerDetail = ({ sharer, loading, error, DetailSharers, followSharer }) => {
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();

  useEffect(() => {
    DetailSharers(id);
  }, [id, DetailSharers]);

  useEffect(() => {
    if (userInfo && userInfo.sharer_id && Number(userInfo.sharer_id) === Number(id)) {
      navigate('/sharer-page');
    }
  }, [userInfo, id, navigate]);

  const handleFollowClick = () => {
    // Dispatch the followSharer action here
    followSharer(id);
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
          {sharer.profile_pic && (
            <img
              src={sharer.profile_pic}
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
          <Button onClick={handleFollowClick}>Follow Sharer</Button>

          <SharerLatestPost id={id} />

          <Link to={'/homepage'}>
            <Button variant="primary">Go Back</Button>
          </Link>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SharerDetail);
