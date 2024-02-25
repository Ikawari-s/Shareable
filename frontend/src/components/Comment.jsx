import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listComments, postComment } from "../actions/userActions";

function Comment({ postId }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, comments, error } = useSelector(
    (state) => state.ListComment
  );

  useEffect(() => {
    if (postId) {
      dispatch(listComments(postId));
    }
  }, [dispatch, postId]);

  const handleSubmit = () => {
    if (content.trim() !== "") {
      dispatch(postComment(postId, content, userInfo.token));
      setContent("");
    }
  };

  return (
    <div>
      {/* {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h3>Comments:</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      )} */}

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
