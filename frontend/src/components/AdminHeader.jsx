import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import "../designs/Header.css";
import banner from "../designs/images/banner.png";
import logotext from "../designs/images/logotext.png";
import whitelogo from "../designs/images/whitelogo.png";
import {
  FaExchangeAlt,
  FaHome,
  FaIconName,
  FaLongArrowAltUp,
  FaSearch,
  FaUser,
  FaUserAlt,
  FaUserCheck,
  FaUserCog,
  FaUserTie,
} from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

function AdminHeader() {
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
      <nave
        style={{
          backgroundImage: `linear-gradient(to top, rgba(40, 40, 40, 0.7), rgba(100, 100, 255, 0.3)), url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center left ",
        }}
      >
        <li>
          <Nav.Link id="pluh" as={Link} to="/homepage">
            <span class="nav-item">
              <img src={whitelogo} alt="Logo" id="logo" />
            </span>
            <span class="nav-text">Shareable</span>
          </Nav.Link>
        </li>
        <li>
          <Nav.Link id="pluh" as={Link} to="/adminuser-dashboard">
            <span class="nav-item">
              <span className="nav-icon">
                <FaUser />
              </span>
              <span class="nav-text">Users</span>
            </span>
          </Nav.Link>
        </li>
        <li>
          <Nav.Link id="pluh" as={Link} to="/adminsharer-dashboard">
            <span class="nav-item">
              <span className="nav-icon">
                <FaUserTie />
              </span>
              <span class="nav-text">Sharers</span>
            </span>
          </Nav.Link>
        </li>
        <li>
          <Nav.Link id="pluh" as={Link} to="/admin-contacts">
            <span class="nav-item">
              <span className="special-icon">
                <AiOutlineMail />
              </span>
              <span class="nav-text">Contacts</span>
            </span>
          </Nav.Link>
        </li>
        <li>
          <Nav.Link id="pluh" as={Link} to="/AccountSettings">
            <span class="nav-item">
              <span className="special-icon">
                <FaUserCog />
              </span>
              <span class="nav-text">Account Settings</span>
            </span>
          </Nav.Link>
        </li>
        <li>
          <Nav.Link id="logot" onClick={handleLogout}>
            <span class="nav-item">
              <span className="nav-icon">
                <FaExchangeAlt />
              </span>
              <span class="nav-text">Log Out</span>
            </span>
          </Nav.Link>
        </li>
      </nave>
    </>
  );
}

export default AdminHeader;
