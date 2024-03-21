import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../designs/footer.css';
import logotext from '../designs/images/logotext.png';
import { Link } from "react-router-dom";


function Footer() {
  return (
    <div id="footer">
      <Container>
        <Row className="justify-content-center">
          <Col l={3}>
            <p className="wa">ABOUT</p>
            <p>Share something probably</p>
            <img src={logotext} alt="Logo" />
          </Col>
          <Col l={3}>
            <p className="wa">Sharers</p>
            <p>They</p>
            <p>Make</p>
            <p>Content</p>
          </Col>
          <Col l={3}>
            <p className="wa">Community</p>
            <p>Shareable Community</p>
            <p>Shareable for Sharers</p>
            <p>Shareable for Users</p>
            <p>Become a Sharer</p>
          </Col>
          <Col l={3}>
            <p className="wa">Menu</p>
            <p>Cookies</p>
            <p>Contact</p>
            <p>Privacy Policy</p>
            <p>Terms of use</p>
          </Col>
        </Row>
        <Row >
          <Col className="text-center py-3" >Shareable Copyright &copy;</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;