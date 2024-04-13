import React from "react";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { listSharers } from "../actions/sharerActions";
import '../designs/Header.css';
import { FaExchangeAlt, FaHome, FaIconName, FaLongArrowAltUp, FaSearch, FaUser, FaUserAlt, FaUserCheck, FaUserPlus } from "react-icons/fa";
import { connect } from "react-redux";  
import banner from '../designs/images/banner.png'
import logotext from '../designs/images/logotext.png'
import whitelogo from '../designs/images/whitelogo.png'
import { AiFillMail } from "react-icons/ai";



function Header({ sharerList, listSharers,}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    listSharers();
  }, [listSharers]);

  const { loading, error, sharers } = sharerList;

  const filteredSharers = Array.isArray(sharers)
    ? sharers.filter(
        (sharer) =>
          sharer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sharer.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      localStorage.removeItem("userInfo");

      console.log("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("Logout error", error);
    }

    const sortedSharers = filteredSharers.slice().reverse();
  

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
    
  };
  return (
    <>
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
      <li><Nav.Link id="pluh" as={Link} to="/userprofile"><span class="nav-item"><span className="nav-icon"><FaUser/></span><span class="nav-text">User</span></span></Nav.Link></li>   
      <li><Nav.Link id="pluh" as={Link} to="/be-sharer"><span class="nav-item"><span className="special-icon"><FaUserPlus/></span><span class="nav-text">Be a Sharer!</span></span></Nav.Link></li>
      <li><Nav.Link id="pluh" as={Link} to="/contact"><span class="nav-item"><span className="nav-icon"><AiFillMail /></span><span class="nav-text">Contact Us</span></span></Nav.Link></li>  
      <li><Nav.Link id="logut" onClick={handleLogout}><span class="nav-item"><span className="nav-icon"><FaExchangeAlt/></span><span class="nav-text">Log Out</span></span></Nav.Link></li>
    </nave>
    </>
  );
  
}

const mapStateToProps = (state) => ({
  sharerList: state.sharerList, followState: state.follow, // Mapping Redux state to component props
});


export default connect(mapStateToProps, { listSharers, }) (Header);
