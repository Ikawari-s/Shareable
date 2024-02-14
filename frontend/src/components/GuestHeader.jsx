import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import '../designs/GuestHeader.css';




function GuestHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate()  
  return (
    <>
      <Navbar id="Body">
        <Container style={{paddingRight: '10rem'}}>
          <Navbar.Brand style={{ color: 'white', fontWeight: ''}} as={Link} to="/">
            SHAREABLE
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link style={{ color: 'white', fontWeight: ''}} as={Link} to="/userprofile">
              <i className="fas fa-user"></i>FIND A SHARER
            </Nav.Link>
            <Nav.Link style={{ color: 'white', fontWeight: ''}} as={Link} to="/be-sharer">
              <i className="fas fa-user"></i>LOG IN
            </Nav.Link>
            <Nav.Link style={{ color: 'white', fontWeight: ''}} as={Link} to="/be-sharer">
              <i className="fas fa-user"></i>Start Today (going insane)
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default GuestHeader;