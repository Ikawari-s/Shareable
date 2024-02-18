import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      localStorage.removeItem("userInfo");

      console.log("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };
  return (
    <>
      <Navbar expand="lg" bg="primary" variant="dark" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/homepage">
            SHAREABLE
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/sharer-page">
              Pansamantala
            </Nav.Link>
            <Nav.Link as={Link} to="/userprofile">
              <i className="fas fa-user"></i>User
            </Nav.Link>
            <Nav.Link as={Link} to="/be-sharer">
              <i className="fas fa-user"></i>Be a Sharer!
            </Nav.Link>
            
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
