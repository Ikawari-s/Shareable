import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from '../components/Header';

function AboutScreen() {
  return (
    <div>
        <Header />
        <Row className="m-3 justify-content-center">
          <Col xl={6}>
          <h1 className="text-center">Shareable</h1>
            <p className="m-3">The primary objective of Shareable brings patrons or users exclusive content (art, music, games, podcast, writing, or photography) of their favorite creators through subscriptions or tier, either monthly, annually, or per creation. It aims to bring diverse preferences of users, creating a platform that resonates their needs and drive their engagement.</p>
          </Col>
        
        </Row>
        <Row className="m-3">
            
        </Row >
      <Row className="mt-3">
        <Col>
          <h1 className="text-center">Meet our team</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xl={2}>
          <div className="card text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
              className="card-img-top mx-auto mt-3"
              alt="..."
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">Name</h5>
              <p className="card-text">short info</p>
              <div className="d-flex">
                <i className="fa-brands fa-facebook-f me-2"></i>
                <i className="fa-brands fa-twitter me-2"></i>
                <i class="fa-brands fa-instagram me-2"></i>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={2}>
          <div className="card text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
              className="card-img-top mx-auto mt-3"
              alt="..."
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">Name</h5>
              <p className="card-text">short info</p>
              <div className="d-flex">
                <i className="fa-brands fa-facebook-f me-2"></i>
                <i className="fa-brands fa-twitter me-2"></i>
                <i class="fa-brands fa-instagram me-2"></i>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={2}>
          <div className="card text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
              className="card-img-top mx-auto mt-3"
              alt="..."
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">Name</h5>
              <p className="card-text">short info</p>
              <div className="d-flex">
                <i className="fa-brands fa-facebook-f me-2"></i>
                <i className="fa-brands fa-twitter me-2"></i>
                <i class="fa-brands fa-instagram me-2"></i>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={2}>
          <div className="card text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
              className="card-img-top mx-auto mt-3"
              alt="..."
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">Name</h5>
              <p className="card-text">short info</p>
              <div className="d-flex">
                <i className="fa-brands fa-facebook-f me-2"></i>
                <i className="fa-brands fa-twitter me-2"></i>
                <i class="fa-brands fa-instagram me-2"></i>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={2}>
          <div className="card text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
              className="card-img-top mx-auto mt-3"
              alt="..."
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">Name</h5>
              <p className="card-text">short info</p>
              <div className="d-flex">
                <i className="fa-brands fa-facebook-f me-2"></i>
                <i className="fa-brands fa-twitter me-2"></i>
                <i class="fa-brands fa-instagram me-2"></i>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AboutScreen;