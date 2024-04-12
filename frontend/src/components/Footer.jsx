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
            <Link id="da-link" to="/"><img src={logotext} alt="Logo" /></Link>
          </Col>
          <Col l={3}>
            <p className="wa">Sharers</p>
            <p>They</p>
            <p>Make</p>
            <p>Content</p>
          </Col>
          
          <Col l={3}>
            <p className="wa">Menu</p>
            
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <p>Contact</p>
            </Link>
            <Link to="/privacy-policy" style={{ textDecoration: "none" }}>
              <p>Privacy Policy</p>
            </Link>
            <Link to="/terms-of-use-and-policies" style={{ textDecoration: "none" }}> 
            <p>Terms of use & policies</p>
            </Link>
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