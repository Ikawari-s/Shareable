import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrash3Fill} from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
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
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const username =
    userInfo && userInfo.user_info ? userInfo.user_info.username : null;
  const isAdmin =
    userInfo && userInfo.user_info ? userInfo.user_info.is_admin : false;

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
    console.log("Deleting comment with id:", commentId);
    setDeletingCommentId(commentId);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteComments(deletingCommentId));
      await dispatch(listComments(uploadId));
      setDeletingCommentId(null); // Reset deletingCommentId after successful deletion
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  return (
    <div>
      {/* <h2>Comments</h2> */}
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : fetchError ? (
        <div>Error: {fetchError}</div>
      ) : (
        <>
          {comments && comments[uploadId] && comments[uploadId].length > 0 ? (
            comments[uploadId].map((comment) => (
              <li key={comment.id} style={{ listStyle: 'none', marginBottom: '1rem'}}>
                <div style={{ backgroundColor: 'white',
                  padding: '6px 10px 15px',
                  marginBottom: '20rem',
                  borderRadius: '1rem',
                  width: '57rem',
                  overflow: 'auto',
                  borderRadius: '1rem',
                  textAlign: 'left',
                  justifyContent: 'center',
                  margin: '0',
                }}>
                  <div className="d-flex">
                  {comment.profile_picture && (
                    <img src={comment.profile_picture} alt="Profile" style={{ width: 'auto', height: 40, borderRadius: "50%", marginRight: '0.6rem', marginBottom: '1rem' }} />
                  )}
                  <strong style={{color: "black", fontSize: '2rem', lineHeight: '2.4rem'}}>{comment.username}
                  </strong> 
                  <button style={{margin: '0 0 1rem .2rem'}} id="trash" onClick={() => handleDelete(comment.id)}><BsFillTrash3Fill /></button>
                  {comment.badge === 'Gold' && <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/252.png" style={{maxWidth: '3rem'}} />}
                  {comment.badge === 'Silver' && <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png" style={{maxWidth: '3rem'}} />}
                  {comment.badge === 'Bronze' && <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png" style={{maxWidth: '3rem'}} />}
                  {comment.badge === 'None' && null}
                  </div>
                  <div style={{ marginLeft: '1rem', color: 'black'}}>{comment.comments}</div>
                  {(userInfo.user_id === comment.user || isAdmin) && (
                    <>
                      
                      {deletingCommentId === comment.id && (
                        <div className="confirmation-overlay">
                          <div className="confirmation-modal">
                            <div>
                              Are you sure you want to delete this comment?
                              <button onClick={confirmDelete}>Yes</button>
                              <button onClick={() => setDeletingCommentId(null)}>No</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>No comments available for this post.</p>
          )}
        </>
      )}
      <div className="textarea-container">
      <textarea
        rows="4"
        cols="50"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment here..."
        id="write-comment"
      ></textarea>
      <button id="comment-button" onClick={handleSubmit}><IoMdSend /></button>
      </div>
    </div>
  );
}

export default Comment;
