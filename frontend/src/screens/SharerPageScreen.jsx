import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSharerPosts } from '../actions/sharerActions'; // Assuming this is the correct import path
import SharerHeader from '../components/SharerHeader';
import SharerPost from '../components/SharerPost';

function SharerPageScreen() {
  const dispatch = useDispatch();
  const sharerPostList = useSelector((state) => state.sharerPostList);

  useEffect(() => {
    console.log("Dispatching listSharerPosts");
    dispatch(listSharerPosts());
  }, [dispatch]);

  console.log("sharerPostList:", sharerPostList);

  if (sharerPostList.loading) {
    return <p>Loading...</p>;
  }

  if (sharerPostList.error) {
    return <p>Error: {sharerPostList.error}</p>;
  }

  return (
    <div>
      <div><SharerHeader/></div>
      <div><SharerPost/></div>
      {sharerPostList.posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          {post.image && <img src={post.image} alt="Post Image" />}
        </div>
      ))}
    </div>
  );
}

export default SharerPageScreen;



// add ko nalang bukas or later ung SharerPage with profile....