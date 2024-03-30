import React, { useState, useEffect } from 'react';
import { Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../actions/userActions';
import { profile } from '../actions/profileActions'; //
import '../designs/HomePage.css';
import UserProfileAccount from '../screens/UserProfileAccount.jsx';

const localStorageValue = localStorage.getItem("userInfo");
const userInfo = localStorageValue ? JSON.parse(localStorageValue) : null;

const Countries = [
  { id: 1, name: 'Afghanistan' },
  { id: 2, name: 'Albania' },
];

const Settings = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const userProfile = useSelector(state => state.userProfile);

  useEffect(() => {
    if (userInfo && userInfo.profile_picture) {
      setProfilePicture(userInfo.profile_picture);
    }
    if (userInfo && userInfo.user_info.username) {
      setUsername(userInfo.user_info.username);
    }
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); 
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('profile_picture', profilePicture);
      formData.append('username', username);
  
      const response = await dispatch(updateUserProfile({ profile_picture: profilePicture, username: username }));
  
      if (response && response.data && response.data.user) {
        const updatedUserInfo = {
          ...userInfo,
          profile_picture: response.data.user.profile_picture,
          user_info: {
            ...userInfo.user_info,
            username: response.data.user.user_info.username,
          },
        };
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        setProfilePicture(response.data.user.profile_picture);
        setUsername(response.data.user.user_info.username);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  return (
  <div className="waw">
    <form id="prof-info" className="settings-form">
        <div className="section-container">
          {/* <div className="d-flex justify-content-around">
            <Nav.Link id="itaas" as={Link} to="/userprofile">Profile Information</Nav.Link>
            <Nav.Link id="itaas" as={Link} to="/userprofileaccount">Account</Nav.Link>
          </div> */}
          {/* <div className="card h-10 h5-1 mb-1 custom-card-background text-white" style={{ backgroundColor: "black", width: "50rem", margin: "auto" }}> */}
          <div style={{borderBottom: 'solid rgba(255,255,255,0.5) 1px', paddingBottom: '1.5rem'}}>
            <h1>Profile Information</h1>
            <p style={{width: '28rem'}}>Keep your personal details private. Information you add here is visible to anyone who can view your profile.</p>
            <div>
              <div style={{ marginBottom: '2rem'}}>
                <img 
                src={profilePicture}
                style={{borderRadius: '50%', width: '3rem', height: '3rem', marginRight: '1rem', position: 'relative'}}
                />
                <input type="file" accept="image/*" onChange={handleProfilePictureUpload} />
              </div>
              <label>Display name</label>
              <div><input type="text" className="form-control" id="displayName" value={username} onChange={handleNameChange} /></div>
              <label>Email</label>
              <div><input type="email" id="emal" value={userInfo.user_info.email} disabled /></div>
              <label>Country of Residence</label>   
              <div>
                <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                  <option value="">Please select a country</option>
                  {Countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button className="save-btn" id='paw' variant="primary" onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
        <br />
        <div>
          <div>
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