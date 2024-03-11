import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listSharerPosts,
  profileSharers,
  SharerUpdateProfile,
  sharerDeletePost
} from "../actions/sharerActions"; // Import the SharerUpdateProfile action
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
  const [profilePicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState(""); // New state variable for description
  const [newName, setNewName] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    dispatch(listSharerPosts());
    dispatch(profileSharers());
  }, [dispatch]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && !userInfo.is_sharer) {
      navigate("/homepage");
    }
    setProfilePicture(userInfo.profile_picture);
    setName(userInfo.name);
    setUsername(userInfo.user_info.username);
    setDescription(userInfo.user_info.description); // Set description from user info
  }, [navigate, userProfile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        SharerUpdateProfile({
          name: newName,
          image: newProfilePicture,
          username: newUsername,
          description: description, // Pass description to update profile action
        })
      );

      // Dispatch action to fetch updated profile information
      dispatch(profileSharers());

      // Clear input fields
      setNewName("");
      setNewProfilePicture(null);
      setNewUsername("");

      // Update userInfo in localStorage with new profile picture URL
      const updatedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (updatedUserInfo) {
        updatedUserInfo.name = newName;
        updatedUserInfo.user_info.username = newUsername;
        updatedUserInfo.user_info.description = description; // Update description
        // Check if newProfilePicture is not null and contains a file
        if (newProfilePicture) {
          // Replace spaces in the filename with underscores
          const filename = newProfilePicture.name.replace(/\s+/g, "_");
          // Construct the URL for the new profile picture
          updatedUserInfo.profile_picture = `/media/uploads/images/${filename}`;
        }

        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading || !userProfile) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const sortedPosts = sharerPostList
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const handleDeletePost = (uploadId) => {
      // Dispatch the sharerDeletePost action with the uploadId
      dispatch(sharerDeletePost(uploadId));
    };

  return (
    <div>
      <p>PAGE TITLE: {name}</p>
      <p>User Email: {userProfile.email}</p>
      <p>Username: {username}</p>
      <img
        src={profilePicture}
        className="card-img-top"
        alt="Profile"
        id="profile-image"
        onError={() => {
          console.error("Error loading profile picture:", profilePicture);
        }}
      />

<div className="my-4">
  <form onSubmit={handleUpdateProfile}>
    <div>
      <label>New Title:</label>
      <input
        type="text"
        value={newName}
        placeholder={name} // Use the current name as placeholder
        onChange={(e) => setNewName(e.target.value)}
      />
    </div>
    <div>
      <label>New Username:</label>
      <input
        type="text"
        value={newUsername}
        placeholder={username} // Use the current username as placeholder
        onChange={(e) => setNewUsername(e.target.value)}
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
    <div>
      {/* Add input field for description */}
      <label>New Description:</label>
      <input
        type="text"
        value={description}
        placeholder={description} // Use the current description as placeholder
        onChange={(e) => setDescription(e.target.value)}
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
            <h2>{post.title}</h2>  <button onClick={() => handleDeletePost(post.id)}>DELETE POST</button>
            <p>{post.description}</p>
            <p>Time: {post.created_at_formatted}</p>
            {post.image && <img src={post.image} alt="Post Image" />}
            <LikeComponent uploadId={post.id} />
            <Comment uploadId={post.id} />
            
          </div>
        );
      })}
    </div>
  );
}

export default SharerPageScreen;
