import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSharerPosts, profileSharers } from '../actions/sharerActions';
import SharerHeader from '../components/SharerHeader';
import SharerPost from '../components/SharerPost';

function SharerPageScreen() {
  const dispatch = useDispatch();
  const sharerPostList = useSelector((state) => state.sharerPostList);
  const userProfile = useSelector((state) => state.myProfile.profile); 

  useEffect(() => {
    console.log("Dispatching listSharerPosts");
    dispatch(listSharerPosts());
    dispatch(profileSharers()); 
  }, [dispatch]);

  console.log("sharerPostList:", sharerPostList);

  if (sharerPostList.loading || !userProfile) {
    return <p>Loading...</p>;
  }

  if (sharerPostList.error) {
    return <p>Error: {sharerPostList.error}</p>;
  }


  const sortedPosts = sharerPostList.posts.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div>

      <div><SharerPost/></div>
      <p>User Email: {userProfile.email}</p>
      {sortedPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>Time: {post.created_at_formatted}</p> {/* Kayo na bahala design*/}
          {post.image && <img src={post.image} alt="Post Image" />}
        </div>
      ))}
    </div>
  );
}

export default SharerPageScreen;
