import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComments, postComment } from "../actions/userActions";

function Comment({ uploadId }) {
  const dispatch = useDispatch();
  const { loading, comments, error } = useSelector((state) => state.ListComment);
  const [content, setContent] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const username = userInfo && userInfo.user_info ? userInfo.user_info.username : null;

  useEffect(() => {
    dispatch(listComments(uploadId));
  }, [dispatch, uploadId]);

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("Please enter a comment.");
      return;
    }

    try {
      await dispatch(postComment(uploadId, content, userInfo.access_token, username));
      setContent("");
      dispatch(listComments(uploadId));
    } catch (error) {
      console.error("Failed to submit comment:", error);
      alert("Failed to submit comment. Please try again.");
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {comments && comments[uploadId] && comments[uploadId].length > 0 ? (
            comments[uploadId].map((comment) => (
              <li key={comment.id}>
                <strong>{comment.username}:</strong> {comment.comments}
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
