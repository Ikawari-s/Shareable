import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSharerLatestPost } from '../actions/sharerActions';
import LikeComponent from '../components/LikeComponents';
import Comment from '../components/Comment';

function SharerLatestPost({ id }) {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector(state => state.SharerLatestPost);

  useEffect(() => {
    if (id) {
      dispatch(FetchSharerLatestPost(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <h4>Latest Post</h4>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {Array.isArray(posts) && posts.length > 0 ? (
            <div>
              {posts.slice().reverse().map(post => (
                <div key={post.id}>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <p>Uploaded at: {post.created_at_formatted}</p>
                  {post.image && <img src={post.image} alt="Post Image" />}
                  <LikeComponent uploadId={post.id} />
                  
                 
                  <Comment uploadId={post.id} postId={post.id} />
                </div>
              ))}
            </div>
          ) : (
            <p>No posts available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SharerLatestPost;
