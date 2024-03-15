import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listComments,
  postComment,
  deleteComments,
} from "../actions/userActions";

function Comment({ uploadId }) {
  const dispatch = useDispatch();
  const { loading, comments, error } = useSelector(
    (state) => state.ListComment
  );
  const [content, setContent] = useState("");
  const [fetchError, setFetchError] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const username =
    userInfo && userInfo.user_info ? userInfo.user_info.username : null;

  useEffect(() => {
    dispatch(listComments(uploadId)).catch((error) => {
      console.error("Failed to fetch comments:", error);
      setFetchError("Failed to fetch comments. Please try again.");
    });
  }, [dispatch, uploadId]);

  const handleSubmit = async () => {
    if (!content.trim()) {
      console.error("Please enter a comment.");
      return;
    }

    try {
      console.log("Submitting comment with data:", {
        user: userInfo.user_id,
        post: uploadId,
        comments: content,
      });
      await dispatch(
        postComment(userInfo.user_id, uploadId, content, userInfo.access_token)
      );
      setContent("");
      window.location.reload();
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    console.log("Deleting comment with id:", commentId); // Log the commentId
    try {
      await dispatch(deleteComments(commentId));
      await dispatch(listComments(uploadId));
      // window.location.reload();
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : fetchError ? (
        <div>Error: {fetchError}</div>
      ) : (
        <ul>
          {comments && comments[uploadId] && comments[uploadId].length > 0 ? (
            comments[uploadId].map((comment) => (
              <li key={comment.id}>
                <strong>{comment.username}:</strong> {comment.comments}
                {userInfo.user_id === comment.user && (
                  <button onClick={() => handleDelete(comment.id)}>
                    Delete
                  </button>
                )}
              </li>
            ))
          ) : (
            <p>No comments available for this post.</p>
          )}
        </ul>
      )}

      <textarea
        rows="4"
        cols="50"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment here..."
      ></textarea>
      <br />

      <button onClick={handleSubmit}>Submit Comment</button>
    </div>
  );
}

export default Comment;
