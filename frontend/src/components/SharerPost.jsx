import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploadSharer } from '../actions/sharerActions';

function SharerPost({ uploadSharer }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    video: null,
    file: null,
    visibility: 'ALL', // Set default visibility
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    await uploadSharer(formData);
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
          <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
        </div>
        <div>
          <label>Upload Video:</label>
          <input type="file" name="video" onChange={handleFileChange} accept="video/*" />
        </div>
        <div>
          <label>Upload File:</label>
          <input type="file" name="file" onChange={handleFileChange} />
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
