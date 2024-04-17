import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { patchSharerAdmin } from '../actions/adminActions';

function AdminPatchSharer({ sharerId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [confirmUpdate, setConfirmUpdate] = useState(false); // State for confirmation modal

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handlePatch = () => {
    // Show confirmation modal
    setConfirmUpdate(true);
  };

  const confirmUpdateAction = async () => {
    const formData = new FormData();
    if (name.trim() !== '') formData.append('name', name);
    if (coverImage !== null) formData.append('cover_photo', coverImage);
    if (profileImage !== null) formData.append('image', profileImage); // Corrected field name
  
    console.log('FormData:', formData);
    console.log('Name:', name);
    console.log('Cover Image:', coverImage);
    console.log('Profile Image:', profileImage);
  
    await dispatch(patchSharerAdmin(sharerId, formData));
    window.location.reload();
  };

  const cancelUpdate = () => {
    // Hide confirmation modal
    setConfirmUpdate(false);
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

      {confirmUpdate && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div>
              Are you sure you want to update this sharer?
              <button onClick={confirmUpdateAction}>Yes</button>
              <button onClick={cancelUpdate}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPatchSharer;
