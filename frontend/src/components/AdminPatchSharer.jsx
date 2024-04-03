import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { patchSharerAdmin } from '../actions/adminActions';

function AdminPatchSharer({ sharerId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handlePatch = async () => {
    const formData = new FormData();
    if (name.trim() !== '') formData.append('name', name);
    if (coverImage !== null) formData.append('cover_photo', coverImage);
    if (profileImage !== null) formData.append('image', profileImage); // Corrected field name

    console.log('FormData:', formData);
    console.log('Name:', name);
    console.log('Cover Image:', coverImage);
    console.log('Profile Image:', profileImage);

    const response = await dispatch(patchSharerAdmin(sharerId, formData));
    if (response && response.status === 200) {
      window.location.reload();
    } else {
      console.error("Failed to update sharer.");
    }
  };

  return (
    <div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <p>Profile Picture</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <p>Cover Photo</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverImageChange}
          className="form-control"
        />
      </div>
      <button onClick={handlePatch} className="btn btn-primary">
        Update Sharer
      </button>
    </div>
  );
}

export default AdminPatchSharer;