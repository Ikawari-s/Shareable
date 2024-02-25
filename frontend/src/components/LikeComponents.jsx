import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../actions/userActions';

function LikeComponent({ uploadId }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    
  }, []);

  const handleLike = () => {
    dispatch(likePost(uploadId, userInfo.token));
    setLiked(true);
  };

  const handleUnlike = () => {
    dispatch(unlikePost(uploadId, userInfo.token));
    setLiked(false);
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleUnlike}>Unlike</button>
    </div>
  );
}

export default LikeComponent;
