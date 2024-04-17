import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSharerPreviewList, sharerDeletePost } from '../actions/sharerActions';
import axios from 'axios';

function PreviewContent({ sharerId }) {
  const dispatch = useDispatch();
  const previews = useSelector((state) => state.sharerPreviewList.previews);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = userInfo ? userInfo.user_info.is_admin : false;
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

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
          <div key={post.id}>
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
          </div>
        ))
      ) : (
        <p>No preview content available.</p>
      )}
    </div>
  );
}

export default PreviewContent;

