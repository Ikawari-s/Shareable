import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listFollowedSharers } from '../actions/followActions';
import {Link} from 'react-router-dom';

const FollowedSharersList = () => {
  const dispatch = useDispatch();
  
  // Fetching data from Redux store
  const { loading, followedSharers, error } = useSelector((state) => state.followedSharerList);

  useEffect(() => {
    // Dispatch the action to get the list of followed sharers
    dispatch(listFollowedSharers());
  }, [dispatch]);

  return (
    <div>
      <div className='bg-white'>
      <h2>Followed Sharers List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {followedSharers.map((sharer) => (
            <Link to={`/sharers/${sharer.id}`}><li key={sharer.id}>{sharer.name}</li></Link>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default FollowedSharersList;
