import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTier3FollowedSharers } from '../actions/subscriptionAction';
import LikeComponent from '../components/LikeComponents'; 
import Comment from '../components/Comment'; 

function TierOneLatest({ sharerId }) {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector(state => state.tier3List);

  useEffect(() => {
    dispatch(listTier3FollowedSharers(sharerId));
  }, [dispatch, sharerId]);

  return (
    <div>
      <h4>Latest Posts from Tier 3 Followed Sharers</h4>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} style={{ maxWidth: '60rem', margin: '0 auto' }}>
                <div style={{ background: 'black', marginBottom: '2rem', padding: '3rem' }}>
                  <h2>{post.title}</h2>
                  <p>Description: {post.description}</p>
                  <p>Uploaded at: {post.created_at}</p>
                  {post.edited && <p>Updated at: {post.edited_at_formatted}</p>}
                  {post.images && post.images.map((image, index) => (
                    <img key={index} src={image.image} style={{ maxWidth: '30rem' }} alt={`Post Image ${index}`} />
                  ))}
                  {post.videos && post.videos.map((video, index) => (
                    <div key={index}>
                      <video src={video.video} controls></video>
                      <p>Video {index + 1}</p>
                    </div>
                  ))}
                  {post.files && post.files.map((file, index) => (
                    <div key={index}>
                      <a href={file.file} download>Download File {index + 1}</a>
                      <p>File {index + 1}</p>
                    </div>
                  ))}
                  <LikeComponent uploadId={post.id} />
                  <Comment uploadId={post.id} />
                </div>
              </div>
            ))
          ) : (
            <p>No posts available from tier 1 followed sharers.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TierOneLatest;
