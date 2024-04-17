import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTier1FollowedSharers } from '../actions/subscriptionAction';
import LikeComponent from '../components/LikeComponents';
import Comment from '../components/Comment';
import axios from 'axios';
import { sharerDeletePost } from '../actions/sharerActions';
import { BiComment } from "react-icons/bi";
import { editSharerPost } from "../actions/sharerActions";

function TierOneLatest({ sharerId }) {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.tier1List);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo ? userInfo.user_info.is_admin : false;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const handleButtonClick = (postId) => {
    setShowComment((prevShowComment) => !prevShowComment); // Toggle the showComment state
    };
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPosts, setEditedPosts] = useState({});
  const [editedPostsFormatted, setEditedPostsFormatted] = useState({});

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
      <div className="toppy" style={{width:'60rem', height:'5rem', padding:'1rem 0rem', textAlign:'center', overflow:'visible'}}>
      <h1>Tier 1 Content</h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
<<<<<<< HEAD
{Array.isArray(posts) && posts.length > 0 ? (
=======
          {Array.isArray(posts) && posts.length > 0 ? (
>>>>>>> 2f8f94564fc84102e1b0ba996cc3a608a914afa6
  posts.map((post) => (
    <div
      key={post.id}
      style={{
<<<<<<< HEAD
        borderRadius: '1rem',
        padding:'1rem',
        boxShadow:'0 2px 5px #00000080',
        marginBottom:'2rem'
=======
        maxWidth: '60rem',
        margin: '0 auto',
        border: '1px solid #ccc',
        padding: '1rem',
        marginBottom: '2rem', // Adjust spacing between posts
>>>>>>> 2f8f94564fc84102e1b0ba996cc3a608a914afa6
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
<<<<<<< HEAD
      
<div className="d-flex">
            <h1>{post.title}</h1>
            <p style={{ margin: '1rem 0 0 1rem', color: 'rgba(255, 255, 255, 0.5)' }}>{post.created_at_formatted}</p>
            {post.edited && <p style={{ margin: '1rem 0 0 1rem', color: 'rgba(255, 255, 255, 0.5)' }}>Edited {post.edited_at_formatted}</p>}
          </div>
          <h4 >{post.description}</h4>
          {post.images.length > 0 && (
            <div>
              {post.images.map((image, index) => (
                <img key={index} src={image.image} alt={`Image ${index + 1}`} style={{height:' auto', width:'57rem', objectFit: 'cover', borderRadius:'2rem' }}/>
              ))}
            </div>
          )}
          {post.videos.length > 0 && (
            <div>
              {post.videos.map((video, index) => (
                <video key={index} style={{height:' auto', width:'57rem', objectFit: 'cover', borderRadius:'2rem' }} src={video.video} controls />
              ))}
            </div>
          )}
          {post.files.length > 0 && (
            <div>
              <h3>Files:</h3>
              {post.files.map((file, index) => (
      <button key={index} onClick={() => downloadFile(file.file)}>
      Download File {index + 1}
    </button>
              ))}
            </div>
          )}
<div className="d-flex">
            <LikeComponent uploadId={post.id} />
            <div className="comment-icon">
            <button onClick={() => handleButtonClick(post.id)}><BiComment /></button>
            </div>
          </div>
            
          <div className={`comment-section ${showComment ? 'expanded' : ''}`}>
              {showComment && <Comment uploadId={post.id} />}
            </div>
      </div>

      
  ))
) : (
  <div className="toppy" style={{width:'60rem', height:'5rem', padding:'1rem 0rem', textAlign:'center', overflow:'visible'}}>
  <h1>No posts available for Tier 1 Followed Sharers.</h1>
  </div>
=======
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
>>>>>>> 2f8f94564fc84102e1b0ba996cc3a608a914afa6
)}


        </div>
      )}
    </div>
  );
}

export default TierOneLatest;
