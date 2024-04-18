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
          [name]: [...prevState[name], value], 
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
  
    const invalidFiles = formData.files.filter(file => {
      const fileType = file.name.split('.').pop().toLowerCase();
      return !['pdf', 'docx', 'doc', 'txt'].includes(fileType);
    });
  
    if (invalidFiles.length > 0) {
      alert('Unsupported file types detected. Supported file types are: .pdf, .docx, .doc, and .txt');
  

      const initialFormData = {
        title: '',
        description: '',
        images: [],
        videos: [],
        files: [],
        visibility: [], 
      };
  
      setFormData(initialFormData); 
      return;
    }
  
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
  };
  

  return (
    <div className='creat'>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <h2>Title:</h2>
        <input className="form-control mb-2" type="text" placeholder='Title' name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <h2>Description:</h2>
        <textarea className="form-control mb-2" type="text" placeholder='Description' name="description" value={formData.description} onChange={handleChange} required />
      </div>

        <div>
          <label>Upload Image:</label>
          <input className="form-control mb-2" type="file" name="images" onChange={handleFileChange} multiple accept="image/*" />
        </div>
        <div>
          <label>Upload Video:</label>
          <input className="form-control mb-2" type="file" name="videos" onChange={handleFileChange} multiple accept="video/*" />
        </div>
        <div>
          <label>Upload File:</label>
          <input className="form-control mb-2" type="file" name="files" onChange={handleFileChange} multiple />
          <small> Supported file types for Upload file are: .pdf, .docx, .doc, and .txt</small>
          <p>{" "}</p>
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
        <button className="btn btn-primary" type="submit" disabled={loading}>Upload</button>
        <small>Max file size: 200MB</small>
      </form>
    </div>
  );
}

export default connect(null, { uploadSharer })(SharerPost);
