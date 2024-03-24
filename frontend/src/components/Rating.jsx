import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSharerRatings, postSharerRatings, deleteSharerRatings, patchSharerRatings } from '../actions/sharerActions';

const FetchSharerRatingsComponent = ({ sharerId }) => {
  const dispatch = useDispatch();
  const { ratings, loading, error } = useSelector((state) => state.sharerRating);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo ? userInfo.user_id : null;
  const followedSharers = userInfo ? userInfo.followed_sharers : [];

  // Define userHasRated state
  const [userHasRated, setUserHasRated] = useState(false);

  useEffect(() => {
    dispatch(fetchSharerRatings(sharerId));
  }, [dispatch, sharerId]);

  useEffect(() => {
    // Check if the user has already rated the sharer
    const userHasRated = ratings.some(rating => rating.user === userId);
    // Update the state accordingly
    setUserHasRated(userHasRated);
  }, [ratings, userId]);

  const [updateRatingId, setUpdateRatingId] = useState(null);
  const [updateRatingValue, setUpdateRatingValue] = useState(0);
  const [updateComment, setUpdateComment] = useState('');
  const [deletingRatingId, setDeletingRatingId] = useState(null);

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
      setDeletingRatingId(ratingId);
    } catch (error) {
      console.error('Error deleting rating:', error);
    }
  };

  const confirmDeleteRating = async () => {
    try {
      await dispatch(deleteSharerRatings(deletingRatingId));
      dispatch(fetchSharerRatings(sharerId));
      setDeletingRatingId(null); // Reset deletingRatingId after successful deletion
    } catch (error) {
      console.error("Failed to delete rating:", error);
      alert("Failed to delete rating. Please try again.");
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
    <div className="scroll-box overflow-auto" style={{ background: 'black', maxWidth: '60rem', margin: '0 auto'}}>
      <h2>Sharer Ratings</h2>
      <div>Total Rating: {averageRating !== null ? ((averageRating).toFixed(1) + "/5") : "No ratings available"}</div>
      <ul>
        {ratings.map((rating) => (
          <li key={rating.id}>
            <div style={{ background: 'green'}}>
              {rating.profile_picture && (
                <img src={rating.profile_picture} alt="Profile" style={{ width: 50, height: 50, borderRadius: "50%" }} />
              )}
              User: {rating.username}, Rating: {rating.rating}, Comment: {rating.comment}
              {(followedSharers.includes(rating.sharer) && rating.user === userId) && (
                <>
                  <button onClick={() => handleDeleteRating(rating.id)}>Delete</button>
                  <button onClick={() => setUpdateRatingId(rating.id)}>Update</button>
                </>
              )}
            </div>
            {deletingRatingId === rating.id && (
              <div className="confirmation-overlay">
                <div className="confirmation-modal">
                  <div>
                    Are you sure you want to delete this rating?
                    <button onClick={confirmDeleteRating}>Yes</button>
                    <button onClick={() => setDeletingRatingId(null)}>No</button>
                  </div>
                </div>
              </div>
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
  const { ratings } = useSelector((state) => state.sharerRating);
  const [userHasRated, setUserHasRated] = useState(false); // Define userHasRated state

  useEffect(() => {
    // Check if the user has already rated the sharer
    const userHasRated = ratings.some(rating => rating.user === userId);
    // Update the state accordingly
    setUserHasRated(userHasRated);
  }, [ratings, userId]);

  if (userHasRated) {
    return null; // Return null to hide the component if user has already rated
  }

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
