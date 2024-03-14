import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listSharerPosts,
  profileSharers,
  SharerUpdateProfile,
  sharerDeletePost,
} from "../actions/sharerActions";
import SharerPost from "../components/SharerPost";
import { useNavigate } from "react-router-dom";
import LikeComponent from "../components/LikeComponents";
import Comment from "../components/Comment";

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
  const [category, setCategory] = useState(""); // New state for category
  const [newName, setNewName] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newVideo, setNewVideo] = useState(null);
  const [newImage, setNewImage] = useState(null);

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
  }, [dispatch]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && !userInfo.is_sharer) {
      navigate("/homepage");
    }
    setName(userInfo.name);
    setUsername(userInfo.user_info.username);
    setDescription(userInfo.user_info.description);
    setCategory(userInfo.user_info.category); // Set category from user info
  }, [navigate, userProfile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        SharerUpdateProfile({
          name: newName,
          image: newProfilePicture,
          username: newUsername,
          description: description,
          category: category, // Include category in update profile request
        })
      );
      dispatch(profileSharers());
      setNewName("");
      setNewProfilePicture(null);
      setNewUsername("");

      const updatedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (updatedUserInfo) {
        updatedUserInfo.name = newName;
        updatedUserInfo.user_info.username = newUsername;
        updatedUserInfo.user_info.description = description;
        updatedUserInfo.user_info.category = category; // Update category in local storage
        if (newProfilePicture) {
          const filename = newProfilePicture.name.replace(/\s+/g, "_");
          updatedUserInfo.image = `/media/uploads/images/${filename}`;
        }
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeletePost = (uploadId) => {
    dispatch(sharerDeletePost(uploadId));
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

  return (
    <div>
      <p>PAGE TITLE: {name}</p>
      <p>User Email: {userProfile.email}</p>
      <p>Username: {username}</p>

      <div>
        <label>Category:</label>
        <select value={category} onChange={handleCategoryChange}>
          {CATEGORY_CHOICES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <img
        src={userProfile.image}
        className="card-img-top"
        alt="Profile"
        id="profile-image"
        onError={() => {
          console.error("Error loading profile picture:", userProfile.image);
        }}
      />

      <div className="my-4">
        <form onSubmit={handleUpdateProfile}>
          <div>
            <label>New Title:</label>
            <input
              type="text"
              value={newName}
              placeholder={name}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <label>New Username:</label>
            <input
              type="text"
              value={newUsername}
              placeholder={username}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label> {/* Add description field */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>New Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewProfilePicture(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Update Profile
          </button>
        </form>
      </div>

      <div>
        <SharerPost />
      </div>
      {sortedPosts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>{" "}
            <button onClick={() => handleDeletePost(post.id)}>
              DELETE POST
            </button>
            <p>{post.description}</p>
            <p>Time: {post.created_at_formatted}</p>
            {post.image && <img src={post.image} alt="Post Image" />}
            {post.video && <video src={post.video} controls></video>}
            {post.file && (
              <a href={post.file} download>
                Download File
              </a>
            )}
            <LikeComponent uploadId={post.id} />
            <Comment uploadId={post.id} />
          </div>
        );
      })}
    </div>
  );
}

export default SharerPageScreen;
