import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTier1FollowedSharers } from '../actions/subscriptionAction';
import LikeComponent from '../components/LikeComponents';
import Comment from '../components/Comment';
import axios from 'axios';
import { sharerDeletePost } from '../actions/sharerActions';

function TierOneLatest({ sharerId }) {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.tier1List);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo ? userInfo.user_info.is_admin : false;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(listTier1FollowedSharers(sharerId));
  }, [dispatch, sharerId]);

  const downloadFile = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleShowDeleteConfirmation = (postId) => {
    setPostIdToDelete(postId);
    setShowDeleteConfirmation(true);
  };

  const handleDeletePost = async (postId) => {
    try {
      await dispatch(sharerDeletePost(postId));
      setShowDeleteConfirmation(false);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleCancelDelete = () => {
    setPostIdToDelete(null);
    setShowDeleteConfirmation(false);
  };


  return (
    <div>
      <h4>Latest Posts from Tier 1 Followed Sharers</h4>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} style={{ maxWidth: '60rem', margin: '0 auto' }}>
                <div style={{ background: 'black', marginBottom: '2rem', padding: '3rem' }}>
                  {/* Render delete button if user is admin */}
                  {isAdmin && (
                    <>
                      <button onClick={() => handleShowDeleteConfirmation(post.id)}>Delete Post</button>
                      {showDeleteConfirmation && postIdToDelete === post.id && (
                        <div className="confirmation-overlay">
                          <div className="confirmation-modal">
                            <p>Are you sure you want to delete this post?</p>
                            <button onClick={() => handleDeletePost(post.id)}>Yes</button>
                            <button onClick={handleCancelDelete}>No</button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <h2>{post.title}</h2>
                  <p>Description: {post.description}</p>
                  <p>Uploaded at: {post.created_at}</p>
                  {post.edited && <p>Updated at: {post.edited_at_formatted}</p>}
                  {post.images &&
                    post.images.map((image, index) => (
                      <img key={index} src={image.image} style={{ maxWidth: '30rem' }} alt={`Post Image ${index}`} />
                    ))}
                  {post.videos &&
                    post.videos.map((video, index) => (
                      <div key={index}>
                        <video src={video.video} controls></video>
                        <p>Video {index + 1}</p>
                      </div>
                    ))}
                  {post.files &&
                    post.files.map((file, index) => (
                      <div key={index}>
                        <button onClick={() => downloadFile(file.file)}>Download File {index + 1}</button>
                        <p>File {index + 1}</p>
                      </div>
                    ))}
                  {/* Add LikeComponent and Comment here */}
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
