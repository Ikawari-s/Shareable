import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { submitContactRequest } from '../actions/contactActions'; 
import '../designs/Contact.css';
import GuestHeader from '../components/GuestHeader';

const ContactPageScreen = ({ submitContactRequest }) => {
  const [requestType, setRequestType] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  const clearForm = () => {
    setRequestType('');
    setEmail('');
    setSubject('');
    setDescription('');
    setAttachment(null);
    setSubmitStatus(null);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const supportedTypes = ['pdf', 'jpeg', 'jpg', 'png', 'doc', 'docx'];
    if (attachment) {
      const fileExtension = attachment.name.split('.').pop().toLowerCase();
      if (!supportedTypes.includes(fileExtension)) {
        setSubmitStatus('unsupported');
        return; 
      }
    }
  
    if (attachment && attachment.size > 1024 * 1024) {
      setSubmitStatus('fileTooLarge');
      return; 
    }
  
    const formData = new FormData();
    formData.append('request_type', requestType);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('description', description);
  
    if (attachment) {
      formData.append('attachment', attachment);
    }
  
    try {
      await submitContactRequest(formData);
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    }
  };
  
  
  return (


    <div className="bg">

      <GuestHeader />
      <div className="image-container"></div>
      <form style={{ marginTop: '5rem' }} onSubmit={handleSubmit}>
      <h2>Submit a Request</h2>
      <label>Providing as much information as possible in your request will allow us to help you faster.</label>
        <div className="form-group">
          <h6>Request type: *</h6>
          <select className="box custom-select option" value={requestType} onChange={(e) => setRequestType(e.target.value)} required>
            <option value="">-- Please choose a request type --</option>
            <option value="payment">Payment issues</option>
            <option value="membership">Membership issues</option>
            <option value="content">Content issues</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <h6>Your email address: *</h6>
          <input type="email" className="box" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <h6>Subject: *</h6>
          <input type="text" className="box" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div className="form-group">
          <h6>Description: *</h6>
          <input className="box" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <label>Please enter the details of your request. A member of our team will reach out with a response.</label>

        <div className="form-group">
          <h6>Attachment (Optional):</h6>
        </div>
        <div className="box">
          <input type="file" className="form-control-file" onChange={(e) => setAttachment(e.target.files[0])} />
        </div>
        <div className="form-group">
          <label>Supported file types are: .pdf, .jpeg, .jpg, .png, .doc, .docx. Filesize must not exceed 1 MB.</label>
        </div>

        <Button type="submit" variant="primary">Done</Button>
        <Button type="button" variant="secondary" onClick={clearForm} style={{ marginLeft: '10px' }}>Clear Form</Button>

      </form>
      <div className="submit-status-container">
    {submitStatus === 'error' && <p className="error-message">Failed to submit request. Please try again.</p>}
    {submitStatus === 'success' && <p className="success-message">Request submitted successfully! Check your email notification to view the copy of your response.</p>}
    {submitStatus === 'unsupported' && <p className="error-message">Unsupported file type. Please upload a file with one of the following extensions: .pdf, .jpeg, .jpg, .png, .doc, .docx</p>}
    {submitStatus === 'fileTooLarge' && <p className="error-message">The file you are trying to upload is too large. Please make sure the file size does not exceed 1 MB.</p>}
  </div>
    
  <div className="logo-contact"></div>

    </div>
  );
};


export default connect(null, { submitContactRequest })(ContactPageScreen);
