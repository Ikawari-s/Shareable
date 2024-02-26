import React from "react";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { listSharers } from "../actions/sharerActions";
import '../designs/Header.css';
import { FontAwesomeIcon } from "@fortawesome/fontawesome-free"
import { faIconName } from "@fortawesome/free-solid-svg-icons"
import { FaExchangeAlt, FaHome, FaIconName, FaLongArrowAltUp, FaSearch, FaUser, FaUserAlt, FaUserCheck } from "react-icons/fa";
import { connect } from "react-redux";  



function Header({ sharerList, listSharers,}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    listSharers(); // Dispatch the action when the component mounts
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
      <nave>
      <li><span class="nav-search"><span className="nav-icon"><FaSearch /></span>
      <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchy"
      />
      </span></li>
      <li><a><Nav.Link as={Link} to="/homepage"><span class="nav-item"><span className="nav-icon"><FaHome/></span>Shareable</span></Nav.Link></a></li>
      <li><a><Nav.Link as={Link} to="/userprofile"><span class="nav-item"><span className="nav-icon"><FaUser/></span>User</span></Nav.Link></a></li>   
      <li><a><Nav.Link as={Link} to="/be-sharer"><span class="nav-item"><span className="nav-icon"><FaUserCheck/></span>Be a Sharer!</span></Nav.Link></a></li>  
      <li><a><Nav.Link onClick={handleLogout}><span class="nav-item"><span className="nav-icon"><FaExchangeAlt/></span>Log Out</span></Nav.Link></a></li>
      

            {/* <Nav.Link as={Link} to="/sharer-page">
              Pansamantala
            </Nav.Link> */}

            



    </nave>
    </>
  );
  
}

const mapStateToProps = (state) => ({
  sharerList: state.sharerList, followState: state.follow, // Mapping Redux state to component props
});


export default connect(mapStateToProps, { listSharers, }) (Header);
