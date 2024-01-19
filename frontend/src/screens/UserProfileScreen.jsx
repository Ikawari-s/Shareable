import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "../designs/UserProfileScreen.css";
import Header from "../components/Header";
import Leaderboard from "../components/Leaderboard";

function UserProfileScreen() {
  return (
    <>
      <Header />
      <div class="card mb-3" id="username-image">
        <img
          src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
          class="card-img-top"
          alt="..."
          id="profile-image"
        />
        <div class="card-body">
          <h5 class="card-title">User Name</h5>
        </div>
      </div>
      <Row>
        <Col xl={2}>
          <div class="card">
            <h2 class="card-header">Followers</h2>
            <div class="card-body">
              <h5 class="card-title">Follower Name</h5>
              <h5 class="card-title">Follower Name</h5>
              <h5 class="card-title">Follower Name</h5>
            </div>
          </div>
          <div class="card mt-2">
            <h2 class="card-header">Artworks?</h2>
            <div class="card-body">
              <h5 class="card-title">Image here</h5>
              <h5 class="card-title">Image here</h5>
              <h5 class="card-title">Image here</h5>
            </div>
          </div>
        </Col>
        <Col>
          <div class="card h-10 p-1 mb-1">
            <h1>Welcome</h1>
          </div>
          <div class="row row-cols-1 row-cols-md-3 g-4 ">
            <div class="col">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title text-center">₱100</h5>
                  <ul>
                    <li>text</li>
                    <li>text</li>
                    <li>text</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title text-center">₱200</h5>
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
            <div class="col">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title text-center">₱300</h5>
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
          <div class="card mt-2 p-2">
            <h1 class="cart-title text-center">
              Donate to you favorite creator
            </h1>
            <button type="button" class="btn btn-outline-light">
              Donate
            </button>
          </div>
        </Col>
        <Col xl={4}>
          <div class="card">
            <h5 class="card-header">Reviews</h5>
            <div class="card-body">
              <h5 class="card-title">User Name</h5>
              <p class="card-text">text here</p>
              <h5 class="card-title">User Name</h5>
              <p class="card-text">text here</p>
              <h5 class="card-title">User Name</h5>
              <p class="card-text">text here</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div class="card mt-2">
            <Leaderboard />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default UserProfileScreen;
