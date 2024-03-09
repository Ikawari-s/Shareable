import React, { useState } from 'react';
import "../designs/UserProfileScreen.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Form} from "react-bootstrap";

function UserProfileAccount() {
  return (
    <form class="settings-form">
        <div class="title">
          <h1 class="text-white"><b>User</b></h1>
          <div className="section-container">
          <div class="d-flex justify-content-around"><Nav.Link id="itaas" as={Link} to="/userprofile">Profile Information</Nav.Link><Nav.Link id="itaas" as={Link} to="/userprofileaccount">Account</Nav.Link></div>
            <div class="card h-10 h5-1 mb-1"className="card custom-card-background text-white" style={{ backgroundColor: "black", width: "50rem", margin: "auto" }}>
              <h1 class="profInfo">Profile Information</h1>
                <div style={{ width: "47rem", margin: "20px" }}>
                <div>
                <div>
                <label>Current password</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <input
                  class="bar"
                  type="text"
                  placeholder="Current password"
                />
              </Form.Group>
                </div>
                <div>
                <label>Change password</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <input
                  class="bar"
                  type="text"
                  placeholder="Change password"
                />
              </Form.Group>
                </div>
                <div>
                <label>Re-enter password</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <input
                  class="bar"
                  type="text"
                  placeholder="Re-enter password"
                />
              </Form.Group>
                </div>
                <Button className="save-btn" style={{ width: "6rem", margin: "30px" }} variant="primary">Save</Button>
                </div>
            </div>
            </div>
          </div>
        </div>
      </form>
  )
}

export default UserProfileAccount