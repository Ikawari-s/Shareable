import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSharerPostCount } from '../actions/sharerActions';

function PostCount({ sharerId, tier }) {
  const dispatch = useDispatch();
  const { loading, postCount, error } = useSelector((state) => state.sharerPostCount);

  useEffect(() => {
    dispatch(getSharerPostCount(sharerId));
  }, [dispatch, sharerId]);

  // Function to get total post count
  const getTotalPostCount = () => {
    if (postCount && postCount.post_count) {
      return postCount.post_count;
    }
    return null;
  };

  // Function to get post count based on tier
  const getPostCountByTier = () => {
    if (postCount && postCount.post_counts_per_tier) {
      return postCount.post_counts_per_tier[tier];
    }
    return null;
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {tier ? (
            <p>Post count for {tier}: {getPostCountByTier()}</p>
          ) : (
            <p>Total post count: {getTotalPostCount()}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PostCount;