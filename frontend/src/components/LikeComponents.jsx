import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikesCount, likePost, unlikePost } from '../actions/userActions';
import { BiSolidUpvote, BiUpvote, BiSolidDownvote, BiDownvote } from "react-icons/bi";

function LikeComponent({ uploadId }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { likesCount, unlikesCount, loading, error } = useSelector((state) => state.LikeCount[uploadId] || { likesCount: 0, unlikesCount: 0, loading: false, error: null });

  useEffect(() => {
    dispatch(fetchLikesCount(uploadId));
  }, [dispatch, uploadId]);

  const handleLike = async () => {
    try {
      await dispatch(likePost(uploadId, userInfo.access_token));
      dispatch(fetchLikesCount(uploadId));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  
  const handleUnlike = async () => {
    try {
      await dispatch(unlikePost(uploadId, userInfo.access_token));
      dispatch(fetchLikesCount(uploadId));
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='d-flex like'>
      <button onClick={handleLike}>
        {likesCount ? <BiSolidUpvote /> : <BiUpvote />}
      </button>
      <p >{likesCount}</p>
      <button onClick={handleUnlike}>
        {unlikesCount ? <BiSolidDownvote /> : <BiDownvote />}
      </button>
      <p>{unlikesCount}</p>
    </div>
  );
}

export default LikeComponent;
