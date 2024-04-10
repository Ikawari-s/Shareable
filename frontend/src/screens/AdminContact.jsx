import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminContacts } from "../actions/adminActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminContactDelete from "../components/AdminContactDelete";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AdminContact() {
  const dispatch = useDispatch();
  const contactsData = useSelector((state) => state.adminContacts.contactsData);
  const loading = useSelector((state) => state.adminContacts.loading);
  const error = useSelector((state) => state.adminContacts.error);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && !userInfo.user_info.is_admin) {
      navigate("/homepage");
    } else {
      dispatch(fetchAdminContacts());
    }
  }, [dispatch, navigate]);

  const [zoomedImage, setZoomedImage] = useState(null);

  const renderAttachment = (attachment, contactId) => {
    console.log("Contact ID:", contactId);
    if (!attachment) {
      return "No attachment...";
    }

    const extension = attachment.split(".").pop().toLowerCase();

    if (
      extension === "jpg" ||
      extension === "jpeg" ||
      extension === "png" ||
      extension === "gif"
    ) {
      return (
        <img
          src={attachment}
          alt="Attachment"
          className="img-fluid fixed-image"
          style={{ maxWidth: "10%", maxHeight: "200px", cursor: "pointer" }}
          onClick={() => setZoomedImage(attachment)}
        />
      );
    } else {
      return (
        <button
          className="btn btn-primary"
          onClick={() => downloadFile(attachment)}
        >
          Download File
        </button>
      );
    }
  };

  const downloadFile = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileUrl.split("/").pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleCloseModal = () => {
    setZoomedImage(null);
  };

  useEffect(() => {
    if (contactsData) {
      console.log("All Contact IDs:", contactsData.map(contact => contact.id));
    }
  }, [contactsData]);

  return (
    <div className="container">
      <h1 className="display-4 mb-4">Admin Contacts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div>
          {contactsData && contactsData.length > 0 ? (
            contactsData.map((contact) => (
              <div key={contact.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">
                    Request Type: {contact.request_type}
                  </h5>
                  <p className="card-text">
                    <strong>Email:</strong> {contact.email}
                  </p>
                  <p className="card-text">
                    <strong>Subject:</strong> {contact.subject}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {contact.description}
                  </p>
                  <p className="card-text">
                    <strong>Created At:</strong>{" "}
                    {new Date(contact.created_at).toLocaleString()}
                  </p>
                  <div className="card-text">
                    <strong>Attachment:</strong>{" "}
                    {renderAttachment(contact.attachment, contact.id)}
                  </div>
                  
                  <div className="mt-2">
                    <AdminContactDelete contactId={contact.id} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No contacts found.</p>
          )}
        </div>
      )}
      <Modal show={!!zoomedImage} onHide={handleCloseModal} centered>
        
        <Modal.Header closeButton>
          <Modal.Title>Zoomed Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={zoomedImage}
            alt="Zoomed Attachment"
            className="img-fluid"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminContact;
