import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSharerRatings, postSharerRatings } from '../actions/sharerActions';

const FetchSharerRatingsComponent = ({ sharerId }) => {
  const dispatch = useDispatch();
  const { ratings, loading, error } = useSelector((state) => state.sharerRating);

  useEffect(() => {
    dispatch(fetchSharerRatings(sharerId));
  }, [dispatch, sharerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!ratings || ratings.length === 0) return <div>No ratings available.</div>;

  const calculateAverageRating = () => {
    if (ratings.length === 0) {
      return "No ratings available";
    }
  
    const totalRatings = ratings.length;
    let totalRatingValue = 0;
  
    for (const rating of ratings) {
      const ratingValue = parseFloat(rating.rating);
      if (!isNaN(ratingValue)) {
        totalRatingValue += ratingValue;
      }
    }
  
    if (totalRatings === 0) {
      return "No valid ratings available";
    }
  
    return totalRatingValue / totalRatings;
  };
  
  const averageRating = calculateAverageRating();

  return (
    <div className="scroll-box overflow-auto">
      <h2>Sharer Ratings</h2>
      <div>Average Rating: {averageRating.toFixed(1)}</div>
      <ul>
        {ratings.map((rating) => (
          <li key={rating.id}>
            User: {rating.user}, Rating: {rating.rating}, Comment: {rating.comment}
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
  const { success, error } = useSelector((state) => state.postSharerRatings || {});
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo ? userInfo.user_id : null;

  const handlePostRating = async () => {
    try {
      const ratingData = {
        rating: parseFloat(ratingValue.toFixed(1)), // Ensure the rating is rounded to one decimal place
        comment: comment,
        user: userId,
      };

      console.log('Submitted Rating Data:', ratingData); // Log the submitted rating data
      await dispatch(postSharerRatings(sharerId, ratingData));
    } catch (error) {
      console.error('Error posting rating:', error);
    }
  };

  if (success) return <div>Rating posted successfully!</div>;
  if (error) return <div>Error: {error}</div>;

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
