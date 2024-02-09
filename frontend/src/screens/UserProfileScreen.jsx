import React from "react";
import { Row, Col } from "react-bootstrap";
import "../designs/UserProfileScreen.css";
import Header from "../components/Header";
import Leaderboard from "../components/Leaderboard";

function UserProfileScreen() {
  return (
    <>
      <Header />
      <div className="card mb-3" id="username-image">
        <img
          src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
          className="card-img-top"
          alt="..."
          id="profile-image"
        />
        <div className="card-body">
          <h5 className="card-title">User Name</h5>
        </div>
      </div>
      <Row>
        <Col xl={2}>
          <div className="card">
            <h2 className="card-header">Followers</h2>
            <div className="card-body">
              <h5 className="card-title">Follower Name</h5>
              <h5 className="card-title">Follower Name</h5>
              <h5 className="card-title">Follower Name</h5>
            </div>
          </div>
          <div className="card mt-2">
            <h2 className="card-header">Artworks?</h2>
            <div className="card-body">
              <h5 className="card-title">Image here</h5>
              <h5 className="card-title">Image here</h5>
              <h5 className="card-title">Image here</h5>
            </div>
          </div>
        </Col>
        <Col>
          <div className="card h-10 p-1 mb-1">
            <h1>Welcome</h1>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 ">
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-center">₱100</h5>
                  <ul>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-center">₱200</h5>
                  <ul>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-center">₱300</h5>
                  <ul>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-2 p-2">
            <h1 className="cart-title text-center">
              Donate to your favorite creator
            </h1>
            <button type="button" className="btn btn-outline-light">
              Donate
            </button>
          </div>
        </Col>
        <Col xl={4}>
          <div className="card">
            <h5 className="card-header">Reviews</h5>
            <div className="card-body">
              <h5 className="card-title">User Name</h5>
              <p className="card-text">text here</p>
              <h5 className="card-title">User Name</h5>
              <p className="card-text">text here</p>
              <h5 className="card-title">User Name</h5>
              <p className="card-text">text here</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card mt-2">
            <Leaderboard />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default UserProfileScreen;
