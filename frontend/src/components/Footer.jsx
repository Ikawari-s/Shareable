import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './designs/footer.css';
import { Link } from "react-router-dom";


function Footer() {
  return (
    <div className="bg-dark" id="footer">
      <Container>
        <Row className="justify-content-center">
          <Col xl={8}>
            <h1>About</h1>
            <p>Share something probably</p>
          </Col>
          <Col xl={4}>
            <h1>Menu</h1>
            <p>About</p>
            <p>Contact</p>
            <p>Privacy Policy</p>
            <p>Terms of use</p>
          </Col>
        </Row>
        <Row >
          <Col className="text-center py-3">Liam Liam Liam Copyright &copy;</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
