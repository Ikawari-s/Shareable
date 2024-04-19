import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchSharerPreviewList,
  sharerDeletePost,
} from "../actions/sharerActions";
import axios from "axios";
import { BiComment } from "react-icons/bi";
import { editSharerPost } from "../actions/sharerActions";

function PreviewContent({ sharerId }) {
  const dispatch = useDispatch();
  const previews = useSelector((state) => state.sharerPreviewList.previews);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
        console.error("Error fetching preview data:", error);
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [sharerId, dispatch]);

  const downloadFile = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await dispatch(sharerDeletePost(postId));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
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

  console.log("Loading:", loading);
  console.log("Preview data:", previews);

  return (
    <div>
      {loading ? (
        <p>Loading preview content...</p>
      ) : previews && previews.length > 0 ? (
        previews.map((post) => (
          <div
            key={post.id}
            style={{
              borderRadius: "1rem",
              padding: "1rem",
              boxShadow: "0 2px 5px #00000080",
              marginBottom: "2rem",
              paddingBottom: "2rem",
            }}
          >
            {/* Render delete button if user is admin */}
            {isAdmin && (
              <>
                <button
                  onClick={() => handleShowDeleteConfirmation(post.id)}
                  className="btn btn-danger"
                >
                  Delete Post
                </button>

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
            <div className="d-flex">
                  <h1>{post.title}</h1>
                  <p
                    style={{
                      margin: "1rem 0 0 1rem",
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {post.created_at}
                  </p>
                  {post.edited && (
                    <p
                      style={{
                        margin: "1rem 0 0 1rem",
                        color: "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      (Edited {post.edited_at_formatted})
                    </p>
                  )}
                </div>
            <h4>{post.description}</h4>
            <div style={{ maxHeight: "70rem", overflowY: "auto" }}>
              {post.images.length > 0 && (
                <div>
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.image}
                      alt={`Image ${index + 1}`}
                      style={{
                        height: "auto",
                        width: "57rem",
                        objectFit: "cover",
                        borderRadius: "2rem",
                        padding: "1rem",
                      }}
                    />
                  ))}
                </div>
              )}
              {post.videos.length > 0 && (
                <div>
                  {post.videos.map((video, index) => (
                    <video
                      key={index}
                      style={{
                        height: "auto",
                        width: "57rem",
                        objectFit: "cover",
                        borderRadius: "2rem",
                        padding: "1rem",
                      }}
                      src={video.video}
                      controls
                    />
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
          </div>
        ))
      ) : (
        <div
          className="toppy"
          style={{
            width: "60rem",
            height: "5rem",
            padding: "1rem 0rem",
            textAlign: "center",
            overflow: "visible",
          }}
        >
          <h1>No preview content available.</h1>
        </div>
      )}
    </div>
  );
}

export default PreviewContent;
