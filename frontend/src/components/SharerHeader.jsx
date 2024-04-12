import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import '../designs/Header.css';
import banner from '../designs/images/banner.png'
import logotext from '../designs/images/logotext.png'
import whitelogo from '../designs/images/whitelogo.png'
import { FaExchangeAlt, FaHome, FaIconName, FaLongArrowAltUp, FaSearch, FaUser, FaUserAlt, FaUserCheck, FaUserCog } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
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
        {/* <Navbar expand="lg" bg="primary" variant="dark" collapseOnSelect>
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
        </Navbar> */}
      <nave style={{
          backgroundImage: `linear-gradient(to top, rgba(40, 40, 40, 0.7), rgba(100, 100, 255, 0.3)), url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center left ",
        }}>
      {/* <li><span class="nav-search"><span className="nav-icon"><FaSearch /></span>
      <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchy"
      />
      </span></li> */}
      <li><Nav.Link id="pluh" as={Link} to="/homepage"><span class="nav-item"><img src={whitelogo} alt="Logo" id='logo' /></span><span class="nav-text">Shareable</span></Nav.Link></li>
      <li><Nav.Link id="pluh" as={Link} to="/sharer-page"><span class="nav-item"><span className="special-icon" ><FaUserCheck/></span><span class="nav-text">Sharer Page</span></span></Nav.Link></li>  
      <li><Nav.Link id="pluh" as={Link} to="/dashboard"><span class="nav-item"><span className="nav-icon"><FaUser/></span><span class="nav-text">Dashboard</span></span></Nav.Link></li>   
      <li><Nav.Link id="pluh" as={Link} to="/AccountSettings"><span class="nav-item"><span className="special-icon"><FaUserCog /></span><span class="nav-text">Account Settings</span></span></Nav.Link></li> 
      <li><Nav.Link id="pluh" as={Link} to="/contact"><span class="nav-item"><span className="special-icon"><AiOutlineMail /></span><span class="nav-text">Contact Us</span></span></Nav.Link></li>  
      <li><Nav.Link id="logot" onClick={handleLogout}><span class="nav-item"><span className="nav-icon"><FaExchangeAlt/></span><span class="nav-text">Log Out</span></span></Nav.Link></li>
    </nave>
    </>
    );
  }

export default SharerHeader