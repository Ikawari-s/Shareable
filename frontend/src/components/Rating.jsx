import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSharerRatings,
  postSharerRatings,
  deleteSharerRatings,
  patchSharerRatings,
} from "../actions/sharerActions";
import silvertier from "../designs/images/red.png";
import goldtier from "../designs/images/goldtier.png";
import bronzetier from "../designs/images/bronzetier.png";
import gold from "../designs/images/gold.png";
import silver from "../designs/images/silver.png";
import bronze from "../designs/images/bronze.png";
import { BsFillTrash3Fill } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import Button from "react-bootstrap/Button";


const FetchSharerRatingsComponent = ({ sharerId }) => {
  const dispatch = useDispatch();
  const { ratings, loading, error } = useSelector(
    (state) => state.sharerRating
  );
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo ? userInfo.user_id : null;
  const isAdmin = userInfo ? userInfo.user_info.is_admin : false;
  const followedSharers = userInfo
    ? userInfo.followed_sharers
    : { tier1: [], tier2: [], tier3: [] };

  // Define userHasRated state
  const [userHasRated, setUserHasRated] = useState(false);

  useEffect(() => {
    dispatch(fetchSharerRatings(sharerId));
  }, [dispatch, sharerId]);

  useEffect(() => {
    // Check if the user has already rated the sharer
    const userHasRated = ratings.some((rating) => rating.user === userId);
    // Update the state accordingly
    setUserHasRated(userHasRated);
  }, [ratings, userId]);

  const [updateRatingId, setUpdateRatingId] = useState(null);
  const [updateRatingValue, setUpdateRatingValue] = useState(0);
  const [updateComment, setUpdateComment] = useState("");
  const [deletingRatingId, setDeletingRatingId] = useState(null);
  const sortedRatings = [...ratings];

  const handleUpdateRating = async () => {
    try {
      console.log("Updating rating with id:", updateRatingId);
      await dispatch(
        patchSharerRatings(updateRatingId, {
          rating: updateRatingValue,
          comment: updateComment,
        })
      );
      setUpdateRatingId(null);
      setUpdateRatingValue(0);
      setUpdateComment("");
      dispatch(fetchSharerRatings(sharerId));
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };
  
  

  const handleDeleteRating = async (ratingId) => {
    try {
      console.log("Deleting rating with id:", ratingId);
      setDeletingRatingId(ratingId);
    } catch (error) {
      console.error("Error deleting rating:", error);
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

  // DI NA GAMIT, get ko nalang from backend
  // const calculateAverageRating = () => {
  //   if (!ratings || ratings.length === 0) {
  //     return null;
  //   }

  //   const totalRatings = ratings.length;
  //   let totalRatingValue = 0;

  //   for (const rating of ratings) {
  //     const ratingValue = parseFloat(rating.rating);
  //     if (!isNaN(ratingValue)) {
  //       totalRatingValue += ratingValue;
  //     }
  //   }

  //   return totalRatingValue / totalRatings;
  // };

  // const averageRating = calculateAverageRating();

  sortedRatings.sort((a, b) => {
    const badgeOrder = { Gold: 1, Silver: 2, Bronze: 3 };
  
    // Get badge priority for each rating (default to lower priority if badge not present)
    const badgeA = a.badge ? badgeOrder[a.badge] || 4 : 4;
    const badgeB = b.badge ? badgeOrder[b.badge] || 4 : 4;
  
    // Sort by badge priority (ascending order)
    return badgeA - badgeB;
  });

  return (
    <div
      className=""
      style={{textAlign: 'center',  }}
    >
      <div style={{ boxShadow:'0 2px 5px #00000080', borderRadius:'1rem', margin:'1rem 0rem', padding:'1rem 0rem', width:'100%' }}>
      <h1>Sharer Ratings</h1>
      <div>
        Total Rating:{" "}
        {ratings.length > 0
          ? ratings[0].average_rating !== null
            ? ratings[0].average_rating.toFixed(1) + "/5"
            : "No ratings available"
          : "No ratings available"}
      </div>
<<<<<<< HEAD
      </div>
        {ratings.map((rating) => (
          <li key={rating.id} style={{listStyle:"none", justifyContent:'center', display:'flex'}}>
            <div style={{ boxShadow:'0 2px 5px #00000080', borderRadius:'1rem', marginBottom:'1rem', padding:'1rem 0rem', width:'100%' }}>
              <div style={{textAlign:'left', paddingLeft:'1.3rem'}}>
              <div>
=======
      <ul>
        {sortedRatings.map((rating) => (
          <li key={rating.id} style={{ listStyle: "none" }}>
            <div style={{ background: "green" }}>
>>>>>>> 2f8f94564fc84102e1b0ba996cc3a608a914afa6
              {rating.profile_picture && (
                <img
                  src={rating.profile_picture}
                  alt="Profile"
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: "50%",  
                    marginRight: '0.6rem',
                    marginBottom: '0.3rem',
                  }}
                />
              )}
<<<<<<< HEAD
              <strong style={{fontSize: '1.35rem', lineHeight: '2.4rem', fontWeight:'600'}}>{rating.username}</strong>
              {rating.user_tier === "tier3" && (
                <img src={goldtier} style={{maxWidth: '3.4rem', maxHeight: '3.4rem', marginBottom:'0.2rem'}} />
              )}
              {rating.user_tier === "tier2" && (
                <img src={silvertier} style={{maxWidth: '3.4rem', maxHeight: '3.4rem', marginBottom:'0.2rem'}} />
              )}
              {rating.user_tier === "tier1" && (
                <img src={bronzetier} style={{maxWidth: '3.4rem', maxHeight: '3.4rem', marginBottom:'0.2rem'}} />
              )}
=======
              : {rating.username}{" "}
>>>>>>> 2f8f94564fc84102e1b0ba996cc3a608a914afa6
              {rating.badge === "Gold" && (
                <img src={gold} style={{width: '1.5rem', height: '1.5rem', marginBottom:'0.3rem'}} />
              )}
              {rating.badge === "Silver" && (
                <img src={silver} style={{width: '1.5rem', height: '1.5rem', marginBottom:'0.3rem'}} />
              )}
              {rating.badge === "Bronze" && (
                <img src={bronze} style={{width: '1.5rem', height: '1.5rem', marginBottom:'0.3rem'}} />
              )}
              {rating.badge === "None" && null}
<<<<<<< HEAD
              
              <div style={{padding:'0rem 0.8rem', display:'inline-block', background:'darkslategrey', width:'fit-content', borderRadius:'1rem', marginLeft:'1rem'}}>
              {rating.rating}
              </div>
              </div>
              <div style={{padding:'0.5rem 1.5rem'}}>
              {rating.comment}
              </div>
=======
              {rating.user_tier === "tier3" && (
                <img src={goldtier} style={{ maxWidth: "5rem" }} />
              )}
              {rating.user_tier === "tier2" && (
                <img src={silvertier} style={{ maxWidth: "5rem" }} />
              )}
              {rating.user_tier === "tier1" && (
                <img src={bronzetier} style={{ maxWidth: "5rem" }} />
              )}, Rating: {rating.rating},
              Comment: {rating.comment}
>>>>>>> 2f8f94564fc84102e1b0ba996cc3a608a914afa6
              {!rating.edited && rating.time_posted && (
                <em style={{margin:'0rem 1.5rem'}}> {rating.time_posted}</em>
              )}
              {rating.edited && (
                <em style={{margin:'0rem 1.5rem'}}>{rating.last_edit_date}{" "}edited</em>
              )}
              {isAdmin || rating.user === userId ? (
                <>
                <div className="rawr-icon" style={{display:'inline-block'}}>
                  <button onClick={() => handleDeleteRating(rating.id)}>
                  <BsFillTrash3Fill />
                    <text>Delete Post</text>
                  </button>
                </div>
                  {rating.user === userId && (
                  <div className="rawr-icon" style={{display:'inline-block'}}>
                    <button onClick={() => setUpdateRatingId(rating.id)}>
                      <FiEdit2 />
                      <text>Edit Post</text>
                    </button>
                  </div>
                  )}
                </>
              ) : null}
              {updateRatingId === rating.id && (
                <div style={{padding:'1rem'}}>
                  <input
                    style={{
                      width:'100%',
                      border:'none',
                      borderRadius:'0.3rem',
                      height:'3rem',
                      fontSize:'1.1rem',
                      padding:'0rem 0rem 0rem 1rem',
                      marginBottom:'1rem'
                    }}
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={updateRatingValue}
                    onChange={(e) =>
                      setUpdateRatingValue(parseFloat(e.target.value))
                    }
                  />
                  <input
                    style={{
                    width:'100%',
                    border:'none',
                    borderRadius:'0.3rem',
                    height:'3rem',
                    fontSize:'1.1rem',
                    padding:'0rem 0rem 0rem 1rem',
                    marginBottom:'1rem'
                    }}
                    type="text"
                    value={updateComment}
                    onChange={(e) => setUpdateComment(e.target.value)}
                  />
                  <Button style={{marginLeft: '57%'}} id="paw" onClick={handleUpdateRating}>Update Rating</Button>
                </div>
            )}
              </div>
            </div>
            {deletingRatingId === rating.id && (
              <div className="confirmation-overlay">
                <div className="confirmation-modal">
                  <div>
                    Are you sure you want to delete this rating?
                    <button onClick={confirmDeleteRating}>Yes</button>
                    <button onClick={() => setDeletingRatingId(null)}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            
          </li>
        ))}
    </div>
  );
};

const PostSharerRatingsComponent = ({ sharerId }) => {
  const dispatch = useDispatch();
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo ? userInfo.user_id : null;
  const { ratings } = useSelector((state) => state.sharerRating);
  const [userHasRated, setUserHasRated] = useState(false); // Define userHasRated state

  useEffect(() => {
    // Check if the user has already rated the sharer
    const userHasRated = ratings.some((rating) => rating.user === userId);
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
        time_posted: new Date().toISOString(),
      };

      await dispatch(postSharerRatings(sharerId, ratingData));
      window.location.reload();
    } catch (error) {
      console.error("Error posting rating:", error);
    }
  };

  return (
    <div
      className=""
      style={{textAlign: 'center',  }}
    >
      <div style={{ boxShadow:'0 2px 5px #00000080', borderRadius:'1rem', margin:'1rem 0rem', padding:'1rem 0rem', width:'100%', marginBottom:'2rem' }}>
      <h1>Post Rating</h1>
      <div style={{padding:'1rem'}}>
                <input
                  style={{
                    width:'100%',
                    border:'none',
                    borderRadius:'0.3rem',
                    height:'3rem',
                    fontSize:'1.1rem',
                    padding:'0rem 0rem 0rem 1rem',
                    marginBottom:'1rem'
                  }}
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={ratingValue}
                  onChange={(e) => setRatingValue(parseFloat(e.target.value))}
                />
                <input
                  style={{
                  width:'100%',
                  border:'none',
                  borderRadius:'0.3rem',
                  height:'3rem',
                  fontSize:'1.1rem',
                  padding:'0rem 0rem 0rem 1rem',
                  marginBottom:'1rem'
                  }}
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button style={{marginLeft: '64%'}} id="paw" onClick={handlePostRating}>Post Rating</Button>
              </div>
      </div>        
    </div>
  );
};

export { FetchSharerRatingsComponent, PostSharerRatingsComponent };
