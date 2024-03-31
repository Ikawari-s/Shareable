import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listFollowedSharers } from '../actions/followActions';
import { Link } from 'react-router-dom';

const FollowedSharersList = () => {
  const dispatch = useDispatch();

  // Fetching data from Redux store
  const { loading, followedSharers, error } = useSelector((state) => state.followedSharerList);

  useEffect(() => {
    // Dispatch the action to get the list of followed sharers
    dispatch(listFollowedSharers());
  }, [dispatch]);

  // Remove duplicate sharers based on their IDs
  const uniqueFollowedSharers = followedSharers.filter(
    (sharer, index, self) => index === self.findIndex((s) => s.id === sharer.id)
  );

  return (
    <div>
      <div>
        <h1 style={{ borderBottom: '2px solid white', paddingBottom: '1rem', paddingTop: '2rem' }}>Followed Sharers List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {uniqueFollowedSharers.map((sharer) => (
              <Link key={sharer.id} style={{ lineHeight: '3rem', textDecorationLine: 'none', listStyle: 'none', display: 'flex', alignItems: 'center' }} to={`/homepage/sharers/${sharer.id}`}>
                {sharer.image && (
                  <img
                    variant="top"
                    src={sharer.image}
                    style={{ borderRadius: '50%', width: '2rem', height: '2rem', marginTop: '0.55rem', marginRight: '1rem' }}
                  />
                )}
                <li style={{ fontSize: '1.2em' }}>{sharer.name}</li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FollowedSharersList;
