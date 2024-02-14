import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { Button, Form } from "react-bootstrap";
import { beSharer } from "../actions/sharerActions"; // Import your action

function SharerbeScreen() {
  const dispatch = useDispatch();
  const [pageName, setPageName] = useState("");

  // Access the sharer state if needed
  const sharerState = useSelector((state) => state.sharer);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(beSharer(pageName)); // Dispatch the action with the pageName
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
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
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

export default SharerbeScreen;
