import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSharerPreviewList, sharerDeletePost } from '../actions/sharerActions';
import axios from 'axios';
import { BiComment } from "react-icons/bi";
import { editSharerPost } from "../actions/sharerActions";

function PreviewContent({ sharerId }) {
  const dispatch = useDispatch();
  const previews = useSelector((state) => state.sharerPreviewList.previews);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = userInfo ? userInfo.user_info.is_admin : false;
  const [loading, setLoading] = useState(true);
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
    const fetchPreviewData = async () => {
      try {
        dispatch(FetchSharerPreviewList(sharerId));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching preview data:', error);
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [sharerId, dispatch]);

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
  
  const handleDeletePost = async (postId) => {
    try {
      await dispatch(sharerDeletePost(postId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
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

  const handleDeleteConfirmation = async () => {
    if (postIdToDelete) {
      await handleDeletePost(postIdToDelete);
      setPostIdToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setPostIdToDelete(null);
    setShowDeleteConfirmation(false);
  };

  console.log('Loading:', loading);
  console.log('Preview data:', previews);

  return (
    <div>
      {loading ? (
        <p>Loading preview content...</p>
      ) : previews && previews.length > 0 ? (
        previews.map((post) => (
          <div key={post.id} 
          style={{
            borderRadius: '1rem',
            padding:'1rem',
            boxShadow:'0 2px 5px #00000080',
            marginBottom:'2rem',
            paddingBottom:'2rem'
          }}>
            {/* Render delete button if user is admin */}
            {isAdmin && (
              <>
                <button onClick={() => handleShowDeleteConfirmation(post.id)}>Delete Post</button>
                {showDeleteConfirmation && postIdToDelete === post.id && (
                  <div className="confirmation-overlay">
                    <div className="confirmation-modal">
                      <p>Are you sure you want to delete this post?</p>
                      <button onClick={handleDeleteConfirmation}>Yes</button>
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
=======
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {post.images &&
              post.images.map((image, index) => (
                <img key={index} src={image.image} alt={`Preview ${index}`} />
              ))}
            {post.videos &&
              post.videos.map((video, index) => (
                <video key={index} controls>
                  <source src={video.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            {post.files &&
              post.files.map((file, index) => (
                <div key={index}>
                   <button
                        key={index}
                        onClick={() => downloadFile(file.file)}
                        className="btn btn-success m-2"
                      >
                        Download File {index + 1}
                      </button>
                  <p>File {index + 1}</p>
                </div>
              ))}
>>>>>>> 2f8f94564fc84102e1b0ba996cc3a608a914afa6
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
      </div>

      
  ))
) : (
  <div className="toppy" style={{width:'60rem', height:'5rem', padding:'1rem 0rem', textAlign:'center', overflow:'visible'}}>
  <h1>No preview content available.</h1>
  </div>
      )}
    </div>
  );
}

export default PreviewContent;

