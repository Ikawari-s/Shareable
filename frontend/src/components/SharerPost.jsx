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
    visibility: 'ALL',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      ...formData,
      images: [],
      videos: [],
      files: []
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    formDataUpload.append('visibility', formData.visibility);

    formData.images.forEach((image) => {
      formDataUpload.append('images', image);
    });

    formData.videos.forEach((video) => {
      formDataUpload.append('videos', video);
    });

    formData.files.forEach((file) => {
      formDataUpload.append('files', file);
    });

    await uploadSharer(formDataUpload);
    setLoading(false);
     window.location.reload(); 
  };

  return (
    <div>
      <h2>Sharer Post</h2>
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
          <select name="visibility" value={formData.visibility} onChange={handleChange}>
            <option value="ALL">All (followers and non-followers)</option>
            <option value="FOLLOWERS">Followers only</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>Upload</button>
      </form>
    </div>
  );
}

export default connect(null, { uploadSharer })(SharerPost);
