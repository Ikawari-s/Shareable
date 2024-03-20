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
              {posts.map(post => (
                <div key={post.id} style={{ maxWidth: '60rem', margin: '0 auto' }}>
                  <div style={{ background: 'black', marginBottom: '2rem', padding: '3rem' }}>
                    <h2>{post.title}</h2>
                    <p>Uploaded at: {post.created_at}</p>
                    {post.edited && <p>Updated at: {post.edited_at_formatted}</p>}
                    {post.image && post.image.map((image, index) => (
                      <img key={index} src={image} style={{ maxWidth: '30rem' }} alt={`Post Image ${index}`} />
                    ))}
                    {post.video && post.video.map((video, index) => (
                      <div key={index}>
                        <video src={video} controls></video>
                        <p>Video {index + 1}</p>
                      </div>
                    ))}
                    {post.file && post.file.map((file, index) => (
                      <div key={index}>
                        <a href={file} download>Download File {index + 1}</a>
                        <p>File {index + 1}</p>
                      </div>
                    ))}
                    <LikeComponent uploadId={post.id} />
                    <div style={{ justifyContent: 'center' }}>
                      <Comment uploadId={post.id} postId={post.id} />
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
