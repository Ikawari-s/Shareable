import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { profile } from '../actions/profileActions'; 
import { updateUserProfile } from '../actions/userActions';
import '../designs/HomePage.css';
import UserProfileAccount from '../screens/UserProfileAccount.jsx';

const Settings = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const userProfile = useSelector(state => state.userProfile);

  useEffect(() => {
    const localStorageValue = localStorage.getItem("userInfo");
    const userInfo = localStorageValue ? JSON.parse(localStorageValue) : null;

    if (!userInfo) {
      navigate("/login"); 
    } else {
      dispatch(profile());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (userProfile.userData) {
      const { profile_picture_url, username, email } = userProfile.userData;
      setProfilePicture(profile_picture_url);
      setUsername(username);
      setEmail(email);
    }
  }, [userProfile.userData]);

  const handleProfilePictureChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
  };

  const handleSaveProfile = () => {
    // Dispatch update only if either newProfilePicture or username is present
    if (newProfilePicture || username) {
      dispatch(updateUserProfile({ profile_picture: newProfilePicture, username }));
      setNewProfilePicture(null);
    }
  };

  return (
    <div className="waw">
      <form id="prof-info" className="settings-form">
        <div className="section-container">
          <div style={{borderBottom: 'solid rgba(255,255,255,0.5) 1px', paddingBottom: '1.5rem'}}>
            <h1>Profile Information</h1>
            <p style={{width: '28rem'}}>Keep your personal details private. Information you add here is visible to anyone who can view your profile.</p>
            <div>
              <div style={{ marginBottom: '2rem'}}>
                <img 
                  src={newProfilePicture ? URL.createObjectURL(newProfilePicture) : profilePicture}
                  alt="Profile"
                  style={{borderRadius: '50%', width: '3rem', height: '3rem', marginRight: '1rem', position: 'relative'}}
                />
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
              </div>
              <label>Display name</label>
              <div><input type="text" className="form-control" id="displayName" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
              <label>Email</label>
              <div><input type="email" id="email" value={email} disabled /></div>
              <Button className="save-btn" id='paw' variant="primary" onClick={handleSaveProfile}>Save</Button>
            </div>
          </div>
        </div>
        <br />
        <div>
          <div id='memberships'>
            <h4>Memberships ✓</h4>
            <ol>
              <li>Followed sharer 1: TIER 2</li>
              <li>Followed sharer 2: TIER 3</li>
              <li>Followed sharer 3: TIER 1</li>
            </ol>
          </div>
        </div>
      </form>
      <UserProfileAccount />
    </div>    
  );
};

export default Settings;
