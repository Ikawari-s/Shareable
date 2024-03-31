import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSharerPostCount } from '../actions/sharerActions';

function PostCount({ sharerId }) {
  const dispatch = useDispatch();
  const { loading, postCount, error } = useSelector((state) => state.sharerPostCount);

  useEffect(() => {
    dispatch(getSharerPostCount(sharerId));
  }, [dispatch, sharerId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Post count: {postCount.post_count}</p>
      )}
    </div>
  );
}

export default PostCount;
