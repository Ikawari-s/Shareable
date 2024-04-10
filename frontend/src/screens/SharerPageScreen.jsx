import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrash3Fill} from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
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
import "../designs/Profile.css";
import axios from 'axios';

function SharerPageScreen() {
  const [showComment, setShowComment] = useState(false);
  const [postId, setPostId] = useState(null);
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
  const [newVisibility, setNewVisibility] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [editedPosts, setEditedPosts] = useState({});
  const [editedPostsFormatted, setEditedPostsFormatted] = useState({});
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false); // State for update confirmation modal
  const [editingPostId, setEditingPostId] = useState(null); // State to track the post being edited
  const userInfo = useSelector((state) => state.userInfo);
  const handleButtonClick = (postId) => {
    setShowComment((prevShowComment) => !prevShowComment); // Toggle the showComment state
    };

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

  const VISIBILITY_CHOICES = [
    ["NON_FOLLOWER", "Preview Content"],
    ["FOLLOWERS_TIER1", "BRONZE - Tier"],
    ["FOLLOWERS_TIER2", "SILVER - Tier"],
    ["FOLLOWERS_TIER3", "GOLD - Tier"],
  ];

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && !userInfo.is_sharer) {
      navigate("/homepage");
    } else {
      dispatch(listSharerPosts());
      dispatch(profileSharers());
      const storedEditedPosts =
        JSON.parse(localStorage.getItem("editedPosts")) || {};
      setEditedPosts(storedEditedPosts);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(listSharerPosts());
    dispatch(profileSharers());
    const storedEditedPosts =
      JSON.parse(localStorage.getItem("editedPosts")) || {};
    setEditedPosts(storedEditedPosts);
  }, [dispatch]);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setUsername(userProfile.username);
      setDescription(userProfile.description);
      setCategory(userProfile.category || ''); 
    }
  }, [userProfile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log("Submitting profile update with the following values:");
    console.log("New Name:", newName);
    console.log("New Username:", newUsername);
    console.log("Description:", description);
    console.log("Category:", category === 'Default Category' ? '' : category);
    console.log("New Profile Picture:", newProfilePicture);
    console.log("Cover Photo:", coverPhoto);
  
    try {
      await dispatch(
        SharerUpdateProfile({
          name: newName,
          image: newProfilePicture,
          username: newUsername,
          description: description,
          category: category === 'Default Category' ? '' : category, 
          coverPhoto: coverPhoto,
        })
      );
      dispatch(profileSharers());
      setNewName("");
      setNewProfilePicture(null);
      setNewUsername("");
      setCoverPhoto(null);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleUpdatePost = async (postId, e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setEditingPostId(postId); // Set post ID being edited
    setShowUpdateConfirmation(true); // Show confirmation modal
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setNewVisibility((prevVisibility) => [...prevVisibility, value]); // Add to array
    } else {
      setNewVisibility((prevVisibility) =>
        prevVisibility.filter((item) => item !== value)
      ); // Remove from array
    }
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

  const handleConfirmUpdate = async () => {
    setShowUpdateConfirmation(false); 
    try {
      await dispatch(
        editSharerPost(editingPostId, {
          title: newTitle || undefined,
          description: newDescription || undefined,
          visibility: JSON.stringify(newVisibility) || undefined,
        })
      );
      dispatch(listSharerPosts());
      setNewTitle("");
      setNewDescription("");
      setNewVisibility("");
      setEditedPosts((prev) => ({ ...prev, [editingPostId]: true }));
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleCancelUpdate = () => {
    setShowUpdateConfirmation(false); 
  };

  const downloadFile = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="brap" style={{paddingTop: '.2rem'}}>
      <div className="col-md-12 cover-stuff">
      <div className="d-flex">
      <div className="main">
      <div className="d-flex" style={{borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom:'3rem', width: '57rem'}}>
          <img
            src={userProfile.image}
            alt="Profile"
            id="profil"
            onError={() => {
              console.error(
                "Error loading profile picture:",
                userProfile.image
              );
            }}
          />
          <div className="names-and-shit"> 
            <h1>{name}</h1>
            <h2>{username}</h2>
            <h4>{userProfile.email}</h4>
            <button className="btn btn-primary create-post"><GrAddCircle style={{margin: '0.2rem 0.8rem 0.2rem', fontSize: '1.5rem', lineHeight:'0rem'}}/>Create Post</button>
          </div>
          </div>
          <div>
          <SharerPost />
        </div>
          {sortedPosts.map((post) => (
        <div key={post.id}>
          <div className="d-flex rat">
            <h1>{post.title}</h1>
            <p style={{ margin: '1rem 0 0 1rem', color: 'rgba(255, 255, 255, 0.5)' }}>{post.created_at_formatted}</p>
            {post.edited && <p style={{ margin: '1rem 0 0 1rem', color: 'rgba(255, 255, 255, 0.5)' }}>Edited {post.edited_at_formatted}</p>}
            <button id="trash" onClick={() => handleDeletePostConfirmation(post.id)}><BsFillTrash3Fill /></button>
          </div>
          {showDeleteConfirmation && deletePostId === post.id && (
            <div className="confirmation-overlay">
              <div className="confirmation-modal">
                <p>Are you sure you want to delete this post?</p>
                <button onClick={handleDeleteConfirmation}>Yes</button>
                <button onClick={handleCancelDelete}>No</button>
              </div>
            </div>
          )}
          <p id="bubble"> {post.visibility}  </p>
          <h3>{post.description}</h3>
          {post.images.length > 0 && (
            <div>
              {post.images.map((image, index) => (
                <img key={index} src={image.image} alt={`Image ${index + 1}`} style={{height:' auto', width:'57rem', objectFit: 'cover', borderRadius:'2rem' }}/>
              ))}
            </div>
          )}
          {post.videos.length > 0 && (
            <div>
              {post.videos.map((video, index) => (
                <video key={index} style={{height:' auto', width:'57rem', objectFit: 'cover', borderRadius:'2rem' }} src={video.video} controls />
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
          {/* <form onSubmit={(e) => handleUpdatePost(post.id, e)}>
            <div>
              <h9>New Title: </h9>
              <input
                type="text"
                value={newTitle || post.title}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div>
              <h9>New Description: </h9>
              <textarea
                value={newDescription || post.description}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div>
              <label>New Visibility:</label>
              <div>
                {VISIBILITY_CHOICES.map((choice) => (
                  <div key={choice[0]}>
                    {" "}
                    <input
                      type="checkbox"
                      name="visibility"
                      value={choice[0]}
                      onChange={handleVisibilityChange}
                      checked={newVisibility.includes(choice[0])}
                    />
                    <label>{choice[1]}</label>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Update Post
            </button>
          </form> */}
          <div>
          <div className="d-flex">
            <LikeComponent uploadId={post.id} />
            <div className="comment-icon">
            <button onClick={() => handleButtonClick(post.id)}><BiComment /></button>
            </div>
          </div>  
            <div className={`comment-section ${showComment ? 'expanded' : ''}`}>
              {showComment && <Comment uploadId={post.id} />}
            </div>
          </div>
        </div>
      ))} 
        </div>    














        <div className="stuf">
          {userProfile.cover_photo && (
            <img
              src={userProfile.cover_photo}
              alt="Cover Photo"
              id="cover"
              onError={() => {
                console.error(
                  "Error loading cover photo:",
                  userProfile.cover_photo
                );
              }}
            />
          )}
<div className="sexy-texty">
          <h2>Category:</h2>
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
          </select> <br />
        
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-3">
            <h2>Page Title</h2>
            <input
              type="text"
              value={newName}
              placeholder={name}
              onChange={(e) => setNewName(e.target.value)}
              className="form-control mb-2"
            />
            <h2> New Username</h2>
            <input
              type="text"
              value={newUsername}
              placeholder={username}
              onChange={(e) => setNewUsername(e.target.value)}
              className="form-control mb-2"
            />
            <h2> Description </h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control mb-2"
            />
            <h3>Change Profile Photo</h3>
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
      </div>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
        <div>
          <SharerPost />
        </div>
=======
        
>>>>>>> bb486b4d826fa9bceede0a1467e733cf001ff7aa
=======
        
>>>>>>> bb486b4d826fa9bceede0a1467e733cf001ff7aa

      
      </div>
      

      {showUpdateConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <p>Are you sure you want to update this post?</p>
            <button onClick={handleConfirmUpdate}>Yes</button>
            <button onClick={handleCancelUpdate}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SharerPageScreen;
