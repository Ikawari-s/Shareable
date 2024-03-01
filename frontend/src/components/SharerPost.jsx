import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploadSharer } from '../actions/sharerActions';

function SharerPost({ uploadSharer }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; 
    setLoading(true);
    const { title, description, image } = formData;
    await uploadSharer({ title, description, image });
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
          <label>Image:</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={loading}>Upload</button>
      </form>
    </div>
  );
}

export default connect(null, { uploadSharer })(SharerPost);
