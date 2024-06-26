import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTier3FollowedSharers } from "../actions/subscriptionAction";
import LikeComponent from "../components/LikeComponents";
import Comment from "../components/Comment";
import axios from "axios";
import { sharerDeletePost } from "../actions/sharerActions";
import { BiComment } from "react-icons/bi";
import { editSharerPost } from "../actions/sharerActions";

function TierThreeLatest({ sharerId }) {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.tier3List);
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
  const updatePostCount = () => {
    dispatch(listTier3FollowedSharers(sharerId));
  };

  useEffect(() => {
    dispatch(listTier3FollowedSharers(sharerId));
  }, [dispatch, sharerId]);

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
      console.error("Error deleting post:", error);
    }
  };

  const handleCancelDelete = () => {
    setPostIdToDelete(null);
    setShowDeleteConfirmation(false);
  };

  return (
    <div>
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
        <h1>Tier 3 Content</h1>
      </div>
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
                  borderRadius: "1rem",
                  padding: "1rem",
                  boxShadow: "0 2px 5px #00000080",
                  marginBottom: "2rem",
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
                          <button onClick={() => handleDeletePost(post.id)}>
                            Yes
                          </button>
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
                        <button
                          key={index}
                          onClick={() => downloadFile(file.file)}
                        >
                          Download File {index + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="d-flex">
                  <LikeComponent uploadId={post.id} />
                  <div className="comment-icon">
                    <button onClick={() => handleButtonClick(post.id)}>
                      <BiComment /> {post.comment_count}
                    </button>
                  </div>
                </div>

                <div
                  className={`comment-section ${showComment ? "expanded" : ""}`}
                >
                  {showComment && (
                    <Comment
                      uploadId={post.id}
                      updatePostCount={updatePostCount}
                    />
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
              <h1>No posts available for Tier 3 Followed Sharers.</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TierThreeLatest;
