import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import '../designs/Header.css';
function SharerHeader() {
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
                <i className="fas fa-user"></i>Sharer more
              </Nav.Link>
              <Nav.Link as={Link} to="/dashboard">
                <i className="fas fa-user"></i>Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/AccountSettings">
                <i className="fas fa-user"></i>Account Settings
              </Nav.Link>
              
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
              {/* <nave>
      <li><a><Nav.Link as={Link} to="/homepage"><span class="nav-item"><span className="nav-icon"><FaHome/></span>Shareable</span></Nav.Link></a></li>
      <li><a><Nav.Link as={Link} to="/dashboard"><span class="nav-item"><span className="nav-icon"><FaHome/></span>Dashboard</span></Nav.Link></a></li>
      <li><a><Nav.Link as={Link} to="/AccountSettings"><span class="nav-item"><span className="nav-icon"><FaUser/></span>User</span></Nav.Link></a></li>   
      <li><a><Nav.Link as={Link} to="/sharer-"><span class="nav-item"><span className="nav-icon"><FaUserCheck/></span>Sharer Page</span></Nav.Link></a></li>  
      <li><a><Nav.Link onClick={handleLogout}><span class="nav-item"><span className="nav-icon"><FaExchangeAlt/></span>Log Out</span></Nav.Link></a></li>
    </nave> */}
      </>
    );
  }

export default SharerHeader