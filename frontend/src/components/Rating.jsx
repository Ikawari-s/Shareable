import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSharerRatings, postSharerRatings, deleteSharerRatings, patchSharerRatings } from '../actions/sharerActions';

const FetchSharerRatingsComponent = ({ sharerId }) => {
  const dispatch = useDispatch();
  const { ratings, loading, error } = useSelector((state) => state.sharerRating);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo ? userInfo.user_id : null;
  const followedSharers = userInfo ? userInfo.followed_sharers : [];

  useEffect(() => {
    dispatch(fetchSharerRatings(sharerId));
  }, [dispatch, sharerId]);

  const [updateRatingId, setUpdateRatingId] = useState(null);
  const [updateRatingValue, setUpdateRatingValue] = useState(0);
  const [updateComment, setUpdateComment] = useState('');

  const handleUpdateRating = async () => {
    try {
      console.log("Updating rating with id:", updateRatingId);
      await dispatch(patchSharerRatings(updateRatingId, { rating: updateRatingValue, comment: updateComment }));
      setUpdateRatingId(null);
      setUpdateRatingValue(0);
      setUpdateComment('');
      dispatch(fetchSharerRatings(sharerId));
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const handleDeleteRating = async (ratingId) => {
    try {
      console.log("Deleting rating with id:", ratingId);
      await dispatch(deleteSharerRatings(ratingId));
      dispatch(fetchSharerRatings(sharerId));
    } catch (error) {
      console.error('Error deleting rating:', error);
    }
  };

  const calculateAverageRating = () => {
    if (!ratings || ratings.length === 0) {
      return null; 
    }

    const totalRatings = ratings.length;
    let totalRatingValue = 0;

    for (const rating of ratings) {
      const ratingValue = parseFloat(rating.rating);
      if (!isNaN(ratingValue)) {
        totalRatingValue += ratingValue;
      }
    }

    return totalRatingValue / totalRatings;
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="scroll-box overflow-auto">
      <h2>Sharer Ratings</h2>
      <div>Average Rating: {averageRating !== null ? averageRating.toFixed(1) : "No ratings available"}</div>
      <ul>
        {ratings.map((rating) => (
          <li key={rating.id}>
             User: {rating.username}, Rating: {rating.rating}, Comment: {rating.comment}
            {(followedSharers.includes(rating.sharer) && rating.user === userId) && (
              <>
                <button onClick={() => handleDeleteRating(rating.id)}>Delete</button>
                <button onClick={() => setUpdateRatingId(rating.id)}>Update</button>
              </>
            )}
            {updateRatingId === rating.id && (
              <div>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={updateRatingValue}
                  onChange={(e) => setUpdateRatingValue(parseFloat(e.target.value))}
                />
                <input
                  type="text"
                  value={updateComment}
                  onChange={(e) => setUpdateComment(e.target.value)}
                />
                <button onClick={handleUpdateRating}>Update Rating</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};


const PostSharerRatingsComponent = ({ sharerId }) => {
  const dispatch = useDispatch();
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo ? userInfo.user_id : null;

  const handlePostRating = async () => {
    try {
      const ratingData = {
        rating: parseFloat(ratingValue.toFixed(1)),
        comment: comment,
        user: userId,
        sharer: sharerId,
      };

      await dispatch(postSharerRatings(sharerId, ratingData));
      
      window.location.reload();
    } catch (error) {
      console.error('Error posting rating:', error);
    }
  };

  return (
    <div className="scroll-box overflow-auto">
      <h2>Post Rating</h2>
      <label>
        Rating:
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={ratingValue}
          onChange={(e) => setRatingValue(parseFloat(e.target.value))}
        />
      </label>
      <br />
      <label>
        Comment:
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handlePostRating}>Post Rating</button>
    </div>
  );
};

export { FetchSharerRatingsComponent, PostSharerRatingsComponent };
