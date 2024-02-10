import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { Button, Form } from "react-bootstrap";
import { be_sharer } from "../actions/sharerActions";

function SharerbeScreen({ be_sharer }) {
  const [pageTitle, setPageTitle] = useState(""); // State to hold the page title

  useEffect(() => {
    // Dispatch the action when the component mounts
    be_sharer("Your Page Title");
  }, [be_sharer]); // Ensure the action is only dispatched once

  const handlePageTitleChange = (e) => {
    setPageTitle(e.target.value); // Update the page title state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the action with the entered page title
    be_sharer(pageTitle);
  };

  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "3rem" }}>
        <div
          className="card custom-card-background text-white"
          style={{ backgroundColor: "black", width: "40rem", margin: "auto" }}
        >
          <div className="card-header">
            <h3 className="text-center">Let's Name your Page!</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Page Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Page Name"
                  value={pageTitle}
                  onChange={handlePageTitleChange} // Handle input change
                />
              </Form.Group>
              <div className="text-center">
                <Button type="submit" variant="primary">
                  Be A Sharer!
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { be_sharer })(SharerbeScreen);
