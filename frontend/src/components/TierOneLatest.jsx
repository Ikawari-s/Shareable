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
      console.log('File URL:', fileUrl); 
  
      const fileType = getFileType(fileUrl);
  
      if (['docx', 'doc', 'pdf', 'txt'].includes(fileType)) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.log('File type not allowed.');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  
  
  
  const getFileType = (fileUrl) => {
    const path = new URL(fileUrl).pathname;
    const segments = path.split('.');
    const fileNameWithExtension = segments[segments.length - 1];
    const fileNameWithoutQueryParams = fileNameWithExtension.split('?')[0];
    const extension = fileNameWithoutQueryParams.split('.').pop();
    console.log('Extension:', extension); 
    return extension.toLowerCase();
  };
  
  
  const getContentType = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return 'application/pdf';
      case 'png':
        return 'image/png';
      case 'doc':
      case 'docx':
        return 'application/msword';
      case 'txt':
        return 'text/plain';
      default:
        return 'application/octet-stream';
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
    <div
      key={post.id}
      style={{
        maxWidth: '60rem',
        margin: '0 auto',
        border: '1px solid #ccc',
        padding: '1rem',
        marginBottom: '2rem', // Adjust spacing between posts
      }}
    >
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
      <div style={{ maxHeight: '60rem', overflowY: 'auto', background: 'black', padding: '3rem' }}>
        
        {post.images &&
          post.images.map((image, index) => (
            <img key={index} src={image.image} style={{ maxWidth: '30rem', marginBottom: '2rem' }} alt={`Post Image ${index}`} />
          ))}
        {post.videos &&
          post.videos.map((video, index) => (
            <div key={index}>
              <video style={{maxWidth: '30rem', marginBottom: '2rem'}} src={video.video} controls></video>
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
      </div>

      {/* LikeComponent and CommentComponent outside of the scrollable area */}
      <div>
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
