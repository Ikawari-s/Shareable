import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { uploadSharer } from '../actions/sharerActions';

function SharerPost({ uploadSharer }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    videos: [],
    files: [],
    visibility: [], 
  });
  
  

  const [loading, setLoading] = useState(false);

  const VISIBILITY_CHOICES = [
    ['NON_FOLLOWER', 'Preview Content'],
    ['FOLLOWERS_TIER1', 'BRONZE - Tier'],
    ['FOLLOWERS_TIER2', 'SILVER - Tier'],
    ['FOLLOWERS_TIER3', 'GOLD - Tier'],
  ];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
  
    if (name === 'visibility') {
      if (checked) {
        setFormData(prevState => ({
          ...prevState,
          [name]: [...prevState[name], value], // Append value to array
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: prevState[name].filter(item => item !== value), // Remove value from array
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: [...prevState[e.target.name], ...files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
  
    setLoading(true);
  
    const formDataUpload = new FormData();
    formDataUpload.append('title', formData.title);
    formDataUpload.append('description', formData.description);
  
    formData.images.forEach((image) => {
      formDataUpload.append('images', image);
    });
  
    formData.videos.forEach((video) => {
      formDataUpload.append('videos', video);
    });
  
    formData.files.forEach((file) => {
      formDataUpload.append('files', file);
    });
  
    formDataUpload.append('visibility', JSON.stringify(formData.visibility));
  
    await uploadSharer(formDataUpload);
    setLoading(false);
    window.location.reload(); 
  };
  

  return (
    <div style={{position: 'absolute', top: '22rem', padding: '1rem'}}>
      <h1>Sharer Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Upload Image:</label>
          <input type="file" name="images" onChange={handleFileChange} multiple accept="image/*" />
        </div>
        <div>
          <label>Upload Video:</label>
          <input type="file" name="videos" onChange={handleFileChange} multiple accept="video/*" />
        </div>
        <div>
          <label>Upload File:</label>
          <input type="file" name="files" onChange={handleFileChange} multiple />
        </div>
        <div>
          <label>Visibility:</label>
          <div>
            {VISIBILITY_CHOICES.map(choice => (
              <div key={choice[0]}>
                <input
                  type="checkbox"
                  name="visibility"
                  value={choice[0]}
                  onChange={handleChange}
                  checked={formData.visibility.includes(choice[0])}
                />
                <label>{choice[1]}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" disabled={loading}>Upload</button>
      </form>
    </div>
  );
}

export default connect(null, { uploadSharer })(SharerPost);
