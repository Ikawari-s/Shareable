import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listSharerPosts,
  profileSharers,
  editSharerPost,
  SharerUpdateProfile,
  sharerDeletePost,
} from "../actions/sharerActions";
import SharerPost from "../components/SharerPost";
import { useNavigate } from "react-router-dom";
import LikeComponent from "../components/LikeComponents";
import Comment from "../components/Comment";
import "../designs/actionConfirmation.css";

function SharerPageScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error,
    posts: sharerPostList,
  } = useSelector((state) => state.sharerPostList);
  const userProfile = useSelector((state) => state.myProfile.profile);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newName, setNewName] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null); // State for cover photo
  const [editedPosts, setEditedPosts] = useState({});
  const [editedPostsFormatted, setEditedPostsFormatted] = useState({});

  const CATEGORY_CHOICES = [
    { value: "", label: "Select a category" },
    { value: "Art", label: "Art" },
    { value: "Comics", label: "Comics" },
    { value: "Writing", label: "Writing" },
    { value: "Music", label: "Music" },
    { value: "Podcasts", label: "Podcasts" },
    { value: "Video & Film", label: "Video & Film" },
    { value: "Photography", label: "Photography" },
    { value: "Crafts & DIY", label: "Crafts & DIY" },
    { value: "Dance & Theater", label: "Dance & Theater" },
    { value: "Gaming", label: "Gaming" },
    { value: "Education", label: "Education" },
    { value: "Science", label: "Science" },
    { value: "Technology", label: "Technology" },
    { value: "Health & Fitness", label: "Health & Fitness" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Fashion & Beauty", label: "Fashion & Beauty" },
    { value: "Food & Cooking", label: "Food & Cooking" },
    { value: "Travel & Outdoor", label: "Travel & Outdoor" },
    {
      value: "Business & Entrepreneurship",
      label: "Business & Entrepreneurship",
    },
    { value: "Parenting & Family", label: "Parenting & Family" },
  ];

  useEffect(() => {
    dispatch(listSharerPosts());
    dispatch(profileSharers());
    const storedEditedPosts =
      JSON.parse(localStorage.getItem("editedPosts")) || {};
    setEditedPosts(storedEditedPosts);
  }, [dispatch]);

  useEffect(() => {
    // Update component state with user profile data when userProfile changes
    if (userProfile) {
      setName(userProfile.name);
      setUsername(userProfile.username);
      setDescription(userProfile.description);
      setCategory(userProfile.category);
    }
  }, [userProfile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        SharerUpdateProfile({
          name: newName,
          image: newProfilePicture,
          username: newUsername,
          description: description,
          category: category,
          coverPhoto: coverPhoto, // Include cover photo in update profile request
        })
      );
      dispatch(profileSharers());
      setNewName("");
      setNewProfilePicture(null);
      setNewUsername("");
      setCoverPhoto(null); // Reset cover photo state after updating
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleUpdatePost = async (postId) => {
    try {
      await dispatch(
        editSharerPost(postId, {
          title: newTitle || undefined,
          description: newDescription || undefined,
        })
      );
      dispatch(listSharerPosts());
      setNewTitle("");
      setNewDescription("");
      setEditedPosts((prev) => ({ ...prev, [postId]: true }));
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  if (loading || !userProfile) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const sortedPosts = Array.isArray(sharerPostList)
    ? sharerPostList
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : [];

  const handleDeletePostConfirmation = (uploadId) => {
    setDeletePostId(uploadId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = () => {
    dispatch(sharerDeletePost(deletePostId));
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="mb-4">
          <h1>COVER PHOTO PAAYOS</h1>
          {userProfile.cover_photo && (
            <img
              src={userProfile.cover_photo}
              alt="Cover Photo"
              className="img-fluid mb-4"
              onError={() => {
                console.error(
                  "Error loading cover photo:",
                  userProfile.cover_photo
                );
              }}
            />
          )}

          <h1>PROFILE: </h1>
          <img
            src={userProfile.image}
            className="card-img-top rounded-circle"
            alt="Profile"
            id="profile-image"
            onError={() => {
              console.error(
                "Error loading profile picture:",
                userProfile.image
              );
            }}
          />
        </div>

        <p className="mb-1">PAGE TITLE: {name}</p>
        <p className="mb-1">User Email: {userProfile.email}</p>
        <p className="mb-1">Username: {username}</p>
        <div className="mb-4">
          <label className="mb-0">Category:</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="form-control"
          >
            <option value="" disabled>
              Select a category
            </option>
            {CATEGORY_CHOICES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-3">
            <input
              type="text"
              value={newName}
              placeholder={name}
              onChange={(e) => setNewName(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="text"
              value={newUsername}
              placeholder={username}
              onChange={(e) => setNewUsername(e.target.value)}
              className="form-control mb-2"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control mb-2"
            />
            <h3>Change Profile   Photo</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewProfilePicture(e.target.files[0])}
              className="form-control mb-2"
            />
            <h3>Change Cover Photo</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverPhoto(e.target.files[0])} // Set cover photo state
              className="form-control mb-2"
            />
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </form>
      </div>
      <div>
        <SharerPost />
      </div>
      {sortedPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <button onClick={() => handleDeletePostConfirmation(post.id)}>
            DELETE POST
          </button>
          {showDeleteConfirmation && deletePostId === post.id && (
            <div className="confirmation-overlay">
              <div className="confirmation-modal">
                <p>Are you sure you want to delete this post?</p>
                <button onClick={handleDeleteConfirmation}>Yes</button>
                <button onClick={handleCancelDelete}>No</button>
              </div>
            </div>
          )}
          <p>{post.description}</p>
          <p>Time: {post.created_at_formatted}</p>
          {post.edited && <p>Edited At: {post.edited_at_formatted}</p>}
          {post.image && <img src={post.image} alt="Post Image" />}
          {post.video && <video src={post.video} controls></video>}
          {post.file && (
            <a href={post.file} download>
              Download File
            </a>
          )}
          <form onSubmit={() => handleUpdatePost(post.id)}>
            <div>
              <label>New Title:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div>
              <label>New Description:</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Update Post
            </button>
          </form>
          <div>
<<<<<<< HEAD
            <LikeComponent uploadId={post.id} />
            <Comment uploadId={post.id} />
=======
          <LikeComponent uploadId={post.id}/>
          <Comment uploadId={post.id}/>
>>>>>>> origin/main
          </div>
        </div>
      ))}
    </div>
  );
}

export default SharerPageScreen;
