import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikesCount, likePost, unlikePost } from '../actions/userActions';

function LikeComponent({ uploadId }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { likesCount, unlikesCount, loading, error } = useSelector((state) => state.LikeCount[uploadId] || { likesCount: 0, unlikesCount: 0, loading: false, error: null });

  useEffect(() => {
    dispatch(fetchLikesCount(uploadId));
  }, [dispatch, uploadId]);

  const handleLike = async () => {
    await dispatch(likePost(uploadId, userInfo.access_token));
    dispatch(fetchLikesCount(uploadId));
  };
  
  const handleUnlike = async () => {
    await dispatch(unlikePost(uploadId, userInfo.access_token));
    dispatch(fetchLikesCount(uploadId));
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <p>Likes: {likesCount}</p>
      <p>Unlikes: {unlikesCount}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleUnlike}>Unlike</button>
    </div>
  );
}

export default LikeComponent;
