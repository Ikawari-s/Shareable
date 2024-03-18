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
                <div key={post.id} style={{   maxWidth: '60rem', margin: '0 auto',}}>
                  <div style={{ background: 'black',marginBottom: '2rem', padding: '3rem'}}>
                  <h2>{post.title} hello</h2>
                  <p>Uploaded at: {post.created_at_formatted}</p>
                  <p>{post.description}</p>
                  
                  {post.image && <img src={post.image} style={{maxWidth: '30rem'}}alt="Post Image" />}
                  {post.video && <video src={post.video} controls></video>}
                  {post.file && (
                    <a href={post.file} download>
                      Download File
                    </a>
                  )}
                  <LikeComponent uploadId={post.id} />
                  <div style={{ justifyContent: 'center'}}>
                  <Comment uploadId={post.id} postId={post.id}/>
                  </div>
                  </div>
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
