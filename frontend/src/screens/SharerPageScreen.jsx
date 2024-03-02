import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSharerPosts, profileSharers } from '../actions/sharerActions';
import SharerHeader from '../components/SharerHeader';
import SharerPost from '../components/SharerPost';
import { useNavigate } from "react-router-dom"; 
import LikeComponent from '../components/LikeComponents';
import Comment from '../components/Comment';

function SharerPageScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { loading, error, posts: sharerPostList } = useSelector((state) => state.sharerPostList);
  const userProfile = useSelector((state) => state.myProfile.profile); 

  useEffect(() => {
    console.log("Dispatching listSharerPosts");
    dispatch(listSharerPosts());
    dispatch(profileSharers()); 
  }, [dispatch]);

  useEffect(() => {
    console.log("User profile:", userProfile);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && !userInfo.is_sharer) {
      console.log("Redirecting to homepage...");
      navigate("/homepage");
    }
  }, [navigate, userProfile]); 

  if (loading || !userProfile) {
    console.log("Loading...");
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Error:", error);
    return <p>Error: {error}</p>;
  }

  console.log("sharerPostList:", sharerPostList);

  const sortedPosts = sharerPostList.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div>
      <p>User Email: {userProfile.email}</p>
      <div><SharerPost/></div>
      {sortedPosts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Time: {post.created_at_formatted}</p>
            {post.image && <img src={post.image} alt="Post Image" />}
            <LikeComponent uploadId={post.id} />
            <Comment uploadId={post.id} />
          </div>
        );
      })}
    </div>
  );
}

export default SharerPageScreen;
