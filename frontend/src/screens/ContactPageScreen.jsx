import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const ContactPageScreen = () => {
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
    
    try {
      if (attachment) {
        const allowedFileTypes = ['pdf', 'jpeg', 'jpg', 'png', 'doc', 'docx'];
        const fileType = attachment.name.split('.').pop().toLowerCase();
        if (!allowedFileTypes.includes(fileType)) {
          setSubmitStatus('unsupported');
          return;
        }

        // Check file size
        const maxFileSize = 1024 * 1024; // 1 MB in bytes
        if (attachment.size > maxFileSize) {
          setSubmitStatus('fileTooLarge');
          return;
        }
      }

      const formData = new FormData();
      formData.append('request_type', requestType);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('description', description);
      if (attachment) {
        formData.append('attachment', attachment);
      }

      const response = await fetch('http://127.0.0.1:8000/api/contacts/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="container">
      <h2>Submit a Request</h2>
      <p>Providing as much information as possible in your request will allow us to help you faster.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h6>Request type: *</h6>
          <select className="form-control" value={requestType} onChange={(e) => setRequestType(e.target.value)} required>
            <option value="">-- Please choose a request type --</option>
            <option value="payment">Payment issues</option>
            <option value="membership">Membership issues</option>
            <option value="content">Content issues</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <h6>Your email address: *</h6>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <h6>Subject: *</h6>
          <input type="text" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          <label>Please use a few words to summarize your question</label>
        </div>
        <div className="form-group">
          <h6>Description: *</h6>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <label>Please enter the details of your request. A member of our team will reach out with a response.</label>
        </div>
        <div className="form-group">
          <h6>Attachment (Optional):</h6>
        </div>
        <div className="form-control">
          <input type="file" className="form-control-file" onChange={(e) => setAttachment(e.target.files[0])} />
        </div>
        <div className="form-group">
          <label>Supported file types are: .pdf, .jpeg, .jpg, .png, .doc, .docx. Filesize must not exceed 1 MB.</label>
        </div>

        <Button type="submit" variant="primary">Done</Button>
        <Button type="button" variant="primary" onClick={clearForm} style={{ marginLeft: '10px' }}>Clear Form</Button>
        <Button type="button" variant="secondary" href='/' style={{ marginLeft: '10px', width: '10rem' }}>Back to Page</Button>


      </form>
      {submitStatus === 'error' && <p style={{ color: 'red', marginTop: '10px' }}>Failed to submit request. Please try again.</p>}
      {submitStatus === 'success' && <p style={{ color: 'green', marginTop: '10px' }}>Request submitted successfully! Check your email notification to view the copy of your response.</p>}
      {submitStatus === 'unsupported' && <p style={{ color: 'red', marginTop: '10px' }}>Unsupported file type. Please upload a file with one of the following extensions: .pdf, .jpeg, .jpg, .png, .doc, .docx</p>}
      {submitStatus === 'fileTooLarge' && <p style={{ color: 'red', marginTop: '10px' }}>The file you are trying to upload is too large. Please make sure the file size does not exceed 1 MB.</p>}
    </div>
  );
};

export default ContactPageScreen;
